# Conversational AI Agent for Starbucks Orders

This project implements a **NestJS-based conversational AI agent** that allows users to order drinks from Starbucks.  
The AI agent is powered by **LangChain's LangGraph** framework, connected to a **MongoDB** database, and enhanced with Google's **Generative AI** model.

---

## 🚀 Features

- 🧩 **Conversational AI** for Starbucks drink ordering  
- 📦 **LangGraph state machine** for managing conversation flows  
- 🛠️ **Tool integration** for creating and managing orders  
- 🗄️ **MongoDB persistence** with checkpointers  
- ✅ **Schema validation** using Zod  
- 🔄 **Order confirmation and progress tracking**  
- 😀 Friendly and engaging responses with emojis  

---

## 📂 Project Structure

- **ChatService** – Main NestJS injectable service handling conversations  
- **LangGraph** – Orchestrates state machine for conversation management  
- **MongoDBSaver** – Saves and restores conversation state  
- **Tools** – Custom tool to create an order in MongoDB  
- **Schemas** – Zod-based schemas for orders and drinks  

---

## 🛠️ How It Works

1. User sends a **query** (e.g., "I want a latte with almond milk").  
2. AI agent checks for missing details and asks follow-up questions.  
3. Once the order is complete, AI asks for **confirmation**.  
4. If confirmed, AI calls the `create_order` tool to save it in MongoDB.  
5. Response always includes structured JSON:  

```json
{
  "message": "Do you want it with some sugar?",
  "current_order": { ... },
  "suggestions": [ "Yes", "No" ],
  "progress": "in_progress | completed"
}
```

---

## ⚙️ Setup

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/starbucks-ai-agent.git
cd starbucks-ai-agent
```

### 2. Install Dependencies
```bash
yarn install
```

### 3. Configure Environment
Create a `.env` file:

```env
GOOGLE_API_KEY=your_google_api_key
MONGO_URI=mongodb+srv://admin:password@cluster0.mongodb.net/?retryWrites=true&w=majority
```

### 4. Run the Service
```bash
yarn start:dev
```

---

## 🗄️ Database

- Database: `drinks_db`  
- Collection: `orders`  

Orders are validated using the **Zod schema** before insertion.

---

## 🧪 Example Conversation

**User:** "I want a caramel macchiato"  
**AI:** "What size would you like? ☕"  
**User:** "Grande"  
**AI:** "Perfect! Do you want any toppings? 🍫"  
**User:** "Yes, whipped cream"  
**AI:** "Got it! Please confirm your order: *Grande Caramel Macchiato with Whipped Cream* ✅"  
**User:** "Yes"  
**AI:** "Order created successfully 🎉"  

---

## 📜 License

MIT License 
