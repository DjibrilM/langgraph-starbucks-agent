/**
 * @fileoverview This file defines the ChatService, a NestJS injectable service
 * that implements a conversational AI agent for ordering drinks.
 * The agent is built using LangChain's LangGraph framework and interacts with a MongoDB database.
 */

import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { tool } from '@langchain/core/tools';

import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts';

import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { StateGraph } from '@langchain/langgraph';
import { ToolNode } from '@langchain/langgraph/prebuilt';
import { Annotation } from '@langchain/langgraph';
import { AIMessage, BaseMessage, HumanMessage } from '@langchain/core/messages';
import { START, END } from '@langchain/langgraph';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './schemas/order.schema';

import { MongoDBSaver } from '@langchain/langgraph-checkpoint-mongodb';
import z from 'zod';
import { OrderParser, OrderSchema, OrderType } from 'src/lib/schemas/orders';
import { DrinkParser } from 'src/lib/schemas/drinks';
import { DRINKS } from 'src/lib/utils/constants/menu_data';
import {
  createSweetenersSummary,
  availableToppingsSummary,
  createAvailableMilksSummary,
  createSyrupsSummary,
  createSizesSummary,
  createDrinkItemSummary,
} from 'src/lib/summaries';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || '';
const client: MongoClient = new MongoClient(process.env.MONGO_URI || '');
const database_name = 'drinks_db';

/**
 * ChatService is a NestJS injectable service that orchestrates the
 * conversational AI agent.
 */
@Injectable()
export class ChatService {
  /**
   * Constructs the ChatService with the Mongoose Order model injected.
   * @param orderModel The Mongoose model for the Order schema.
   */
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  /**
   * Main method to chat with the AI agent. It orchestrates the LangGraph
   * state machine to handle user queries, manage conversation state, and
   * interact with the database.
   * @param thread_id A unique identifier for the conversation thread.
   * @param query The user's message.
   * @returns A JSON object containing the AI's response, current order details,
   * suggestions, and progress status.
   */
  chatWithAgent = async ({ thread_id, query}:{thread_id: string, query: string}) => {
    // Connect to the MongoDB client.
    await client.connect();

    /**
     * Defines the state of the LangGraph. The state is an annotation root
     * containing a list of messages. The reducer ensures new messages are
     * appended to the list.
     */
    const graphState = Annotation.Root({
      messages: Annotation<BaseMessage[]>({ reducer: (x, y) => [...x, ...y] }),
    });

    /**
     * Defines a LangChain tool to create an order in the database.
     * The tool is given a zod schema for validation and a description for the
     * AI to understand its purpose.
     */
    const orderTool = tool(
      /**
       * The function executed when the tool is called. It attempts to create
       * a new document in the 'orders' collection.
       * @param order The order object validated against OrderType.
       * @returns A success or failure message string.
       */
      async ({ order }: { order: OrderType }) => {
        try {
          console.log({ order });
          await this.orderModel.create(order);
          return 'Order created successfully';
        } catch (error) {
          console.log(error);
          return 'Failed to create the order'; //This message will confirm the model about the creation success.
        }
      },
      {
        schema: z.object({
          order: OrderSchema.describe(
            'This is the order that will be passed to ',
          ),
        }),
        name: 'create_order',
        description: 'Creates a new order in the database',
      },
    );

    const tools = [orderTool];

    /**
     * A node function that represents the AI's turn in the conversation.
     * It constructs a detailed prompt, invokes the generative AI model,
     * and returns the AI's response.
     * @param states The current state of the graph.
     * @returns An object containing the AI's response message.
     */
    const callModal = async (states: typeof graphState.State) => {
      // Defines the system prompt with detailed instructions for the AI.
      const prompt = ChatPromptTemplate.fromMessages([
        {
          role: 'system',
          content: `
    
        Your are a helpful assistant that helps people buy drinks from starbucks.
        You take the user request and find missing details based on how a full order looks like.
        A full order looks like this:  ${OrderParser}.
              

            *IMPORTANT
              You have access to a create_order tool, this tool is used to create orders in the database and you should call it when
              you want to create an order.

            You should confirm the order once the tool call has been successful, and if it fails you inform the user.

              Ech drink has its own set of properties like size, milk, syrup, sweetener, topping.   
              Here is how a drink schema looks like : ${DrinkParser}
            Make sure to ask for any missing details in the order before creating it.
            If the user user asks for modification thats can not be done based on the choosen drink just tell them its not possible.
            If the user asks for something that is not related to the order just politely tell them you can only help with drink orders.
   
            Here is the list of all available drinks and what they can accept as modifications : ${DRINKS.map((drink) => `-${createDrinkItemSummary(drink)}`)} 

            Here is the list all available sweeteners : ${createSweetenersSummary()},
            Here is a list of all available toppings: ${availableToppingsSummary()}
            Here is the list of all available milks: ${createAvailableMilksSummary()}
            Here is the list of all available syrups: ${createSyrupsSummary()}
            Here is the list of all available sizes: ${createSizesSummary()}
            
            
            Here is how the order schema look like: ${OrderParser}.

            If the query is not clear you should tell the user that the query is not clear.

            **VERY IMPORTANT
            Once the order is ready you should ask the user to confirm and if thet do you should call the create_order right away 
            and only come back to the user once the order has been confirmed or failed.

          In the response you should include this part it's used by the frontend to track the progress of the current order and to track chats. It's an object expressed in json format, even when there user's query is not clear just add this part to your response:

          "message": "The ai response(example do you want it with some sugar)",
          "current_order": "The current order that is being constructed",
          "suggestions": "The list of options the user can choose from based on your message",
          "progress": "This field is used to show wether the order has been placed or not, once the order has been placed it should be "completed". it should be part of the order, once the user confirms the order you call the create_order tool directly then you mark the progress as "completed" "


          **IMPORTANT 
          Be friendly and use emojis what you want to add some humor.

          **IMPORTANT
           For fields that haven't been filled yet you place null.
           Never miss this part in any message you send 
          `,
        },
        new MessagesPlaceholder('messages'),
      ]);

      const formattedPrompt = await prompt.formatMessages({
        time: new Date().toISOString(),
        messages: states.messages,
      });

      // Initializes the Google Generative AI model.
      const chat = new ChatGoogleGenerativeAI({
        model: 'gemini-2.0-flash',
        temperature: 0,
        apiKey: GOOGLE_API_KEY,
      }).bindTools(tools);

      // Invokes the AI model with the formatted prompt.
      const result = await chat.invoke(formattedPrompt);
      return { messages: [result] };
    };

    /**
     * A conditional edge function that determines the next step in the graph.
     * If the last AI message contains tool calls, the graph moves to the
     * 'tools' node; otherwise, the conversation ends.
     * @param state The current state of the graph.
     * @returns The name of the next node ('tools') or END.
     */
    const shouldContinue = (state: typeof graphState.State) => {
      const messages = state.messages;
      const lastMessage = messages[messages.length - 1] as AIMessage;
      return lastMessage.tool_calls?.length ? 'tools' : END;
    };

    // Creates a ToolNode to execute the defined tools.
    const toolsNode = new ToolNode<typeof graphState.State>(tools);

    /**
     * Builds the LangGraph state machine.
     * - Adds the 'agent' and 'tools' nodes.
     * - Defines edges for the flow of control.
     * - The graph starts at the 'agent' node.
     * - From the 'agent', it conditionally moves to 'tools' or ends.
     * - After executing a tool, it returns to the 'agent' for a new response.
     */
    const graph = new StateGraph(graphState)
      .addNode('agent', callModal)
      .addNode('tools', toolsNode)
      .addEdge(START, 'agent')
      .addConditionalEdges('agent', shouldContinue)
      .addEdge('tools', 'agent');

    // Initializes a MongoDB checkpointer to save and load graph state.
    const checkpointer = new MongoDBSaver({ client, dbName: database_name });

    // Compiles the graph with the checkpointer.
    const app = graph.compile({ checkpointer });

    /**
     * Invokes the compiled graph with the user's initial query.
     * The `configurable` object is used by the checkpointer to identify the thread.
     */
    const finalState = await app.invoke(
      { messages: [new HumanMessage(query)] },
      { recursionLimit: 15, configurable: { thread_id } },
    );

    /**
     * A helper function to extract a JSON object from a string response.
     * @param response The AI's string response.
     * @returns The parsed JSON object.
     * @throws If the JSON cannot be extracted or parsed.
     */
    function extractJson(response: any) {
      console.log(response);
      const match = response.match(/```json\s*([\s\S]*?)\s*```/i);
      if (match && match[1] && typeof response === 'string') {
        return JSON.parse(match[1].trim());
      }
      throw response;
    }

    // Extracts and returns the JSON payload from the final AI message.
    const lastMessage = finalState.messages.at(-1) as AIMessage;
    return extractJson(lastMessage.content);
  };
}
