// Imports the 'z' object from the 'zod' library.
// Zod is a TypeScript-first schema declaration and validation library.
// 'z' is the primary object used to define schemas (e.g., z.object, z.string, z.boolean, z.array).
import z from 'zod';

// Imports the 'StructuredOutputParser' from 'langchain/output_parsers'.
// THIS IS CRUCIAL FOR AI INTEGRATION:
// Large Language Models (LLMs) DO NOT inherently understand TypeScript types or Zod schemas.
// They operate on text. The StructuredOutputParser bridges this gap by providing
// a mechanism to instruct the LLM on the *textual format* it should produce,
// and then to parse that textual output back into a type-safe TypeScript object
// defined by our Zod schemas.
import { StructuredOutputParser } from 'langchain/output_parsers';

/**
 * @description Zod schema defining the structure of a single drink item.
 * This schema specifies the required properties and their types for a beverage.
 */
export const DrinkSchema = z.object({
  /**
   * @description The name of the drink (e.g., "Espresso", "Latte").
   * It's a required string.
   */
  name: z.string(),
  /**
   * @description A brief description of the drink, explaining its characteristics.
   * It's a required string.
   */
  description: z.string(),
  /**
   * @description Indicates whether this drink supports different milk options (e.g., whole, almond, oat).
   * It's a required boolean.
   */
  supportMilk: z.boolean(),
  /**
   * @description Indicates whether this drink supports various sweetener options.
   * It's a required boolean.
   */
  supportSweeteners: z.boolean(),
  /**
   * @description Indicates whether this drink supports adding different syrup flavors.
   * It's a required boolean.
   */
  supportSyrup: z.boolean(),
  /**
   * @description Indicates whether this drink supports various toppings (e.g., whipped cream, chocolate shavings).
   * It's a required boolean.
   */
  supportTopping: z.boolean(),
  /**
   * @description Indicates whether this drink is available in different sizes (e.g., small, medium, large).
   * It's a required boolean.
   */
  supportSize: z.boolean(),
  /**
   * @description Optional URL to an image representing the drink.
   * 'z.string().url()' validates that if present, it must be a valid URL string.
   * '.optional()' means this property is not mandatory.
   */
  image: z.string().url().optional(),
});

/**
 * @description Zod schema defining the structure of a single sweetener option.
 * Examples: Sugar, Splenda, Stevia.
 */
export const SweetenerSchema = z.object({
  /**
   * @description The name of the sweetener. Required string.
   */
  name: z.string(),
  /**
   * @description A brief description of the sweetener. Required string.
   */
  description: z.string(),
  /**
   * @description Optional URL to an image representing the sweetener.
   */
  image: z.string().url().optional(),
});

/**
 * @description Zod schema defining the structure of a single syrup option.
 * Examples: Vanilla, Caramel, Hazelnut.
 */
export const SyrupSchema = z.object({
  /**
   * @description The name of the syrup. Required string.
   */
  name: z.string(),
  /**
   * @description A brief description of the syrup. Required string.
   */
  description: z.string(),
  /**
   * @description Optional URL to an image representing the syrup.
   */
  image: z.string().url().optional(),
});

/**
 * @description Zod schema defining the structure of a single topping option.
 * Examples: Whipped Cream, Chocolate Shavings, Cinnamon.
 */
export const ToppingSchema = z.object({
  /**
   * @description The name of the topping. Required string.
   */
  name: z.string(),
  /**
   * @description A brief description of the topping. Required string.
   */
  description: z.string(),
  /**
   * @description Optional URL to an image representing the topping.
   */
  image: z.string().url().optional(),
});

/**
 * @description Zod schema defining the structure of a single size option for drinks.
 * Examples: Small, Medium, Large.
 */
export const SizeSchema = z.object({
  /**
   * @description The name of the size. Required string.
   */
  name: z.string(),
  /**
   * @description A brief description of the size. Required string.
   */
  description: z.string(),
  /**
   * @description Optional URL to an image representing the size.
   */
  image: z.string().url().optional(),
});

/**
 * @description Zod schema defining the structure of a single milk option.
 * Examples: Whole Milk, Skim Milk, Almond Milk, Oat Milk.
 */
export const MilkSchema = z.object({
  /**
   * @description The name of the milk type. Required string.
   */
  name: z.string(),
  /**
   * @description A brief description of the milk type. Required string.
   */
  description: z.string(),
  /**
   * @description Optional URL to an image representing the milk.
   */
  image: z.string().url().optional(),
});


// --- Collections ---
// These schemas define arrays of the individual item schemas.

/**
 * @description Zod schema for an array (list) of ToppingSchema objects.
 * This would represent all available topping options.
 */
export const ToppingsSchema = z.array(ToppingSchema);
/**
 * @description Zod schema for an array (list) of SizeSchema objects.
 * This would represent all available drink sizes.
 */
export const SizesSchema = z.array(SizeSchema);
/**
 * @description Zod schema for an array (list) of MilkSchema objects.
 * This would represent all available milk options.
 */
export const MilksSchema = z.array(MilkSchema);
/**
 * @description Zod schema for an array (list) of SyrupSchema objects.
 * This would represent all available syrup flavors.
 */
export const SyrupsSchema = z.array(SyrupSchema);
/**
 * @description Zod schema for an array (list) of SweetenerSchema objects.
 * This would represent all available sweetener options.
 */
export const SweetenersSchema = z.array(SweetenerSchema);
/**
 * @description Zod schema for an array (list) of DrinkSchema objects.
 * This would represent the entire menu of drinks.
 */
export const DrinksSchema = z.array(DrinkSchema);

// --- Types (inferred from schemas) ---
// These lines use Zod's `z.infer` utility to automatically create TypeScript types
// based on the defined Zod schemas. This ensures type safety throughout the application
// and keeps the types in sync with the validation schemas.

/**
 * @description TypeScript type inferred from DrinkSchema.
 * Represents a single drink object.
 */
export type Drink = z.infer<typeof DrinkSchema>;
/**
 * @description TypeScript type inferred from SweetenerSchema.
 * Represents a single sweetener option.
 */
export type SupportSweetener = z.infer<typeof SweetenerSchema>;
/**
 * @description TypeScript type inferred from SyrupSchema.
 * Represents a single syrup option.
 */
export type Syrup = z.infer<typeof SyrupSchema>;
/**
 * @description TypeScript type inferred from ToppingSchema.
 * Represents a single topping option.
 */
export type Topping = z.infer<typeof ToppingSchema>;
/**
 * @description TypeScript type inferred from SizeSchema.
 * Represents a single size option.
 */
export type Size = z.infer<typeof SizeSchema>;
/**
 * @description TypeScript type inferred from MilkSchema.
 * Represents a single milk option.
 */
export type Milk = z.infer<typeof MilkSchema>;

/**
 * @description TypeScript type for an array of Topping objects.
 */
export type Toppings = z.infer<typeof ToppingsSchema>;
/**
 * @description TypeScript type for an array of Size objects.
 */
export type Sizes = z.infer<typeof SizesSchema>;
/**
 * @description TypeScript type for an array of Milk objects.
 */
export type Milks = z.infer<typeof MilksSchema>;
/**
 * @description TypeScript type for an array of Syrup objects.
 */
export type Syrups = z.infer<typeof SyrupsSchema>;
/**
 * @description TypeScript type for an array of Sweetener objects.
 */
export type Sweeteners = z.infer<typeof SweetenersSchema>;
/**
 * @description TypeScript type for an array of Drink objects.
 */
export type Drinks = z.infer<typeof DrinksSchema>;





// --- Structured Output Parsers ---
// THESE ARE ESSENTIAL FOR AI WORKFLOWS.
// An AI model (like an LLM) cannot directly understand TypeScript types or Zod schemas.
// It generates and understands plain text.
//
// The StructuredOutputParser serves two primary functions in this context:
// 1.  It generates a *textual instruction* (often in the form of a JSON schema string)
//     that can be included in the prompt given to the AI model. This instructs the AI
//     on the precise JSON format it should use for its output.
//     For example, it might tell the AI: "Your response MUST be a JSON object with 'name' (string)
//     and 'description' (string) properties, and a boolean 'supportMilk' property."
// 2.  It then takes the AI model's *raw text output* (which is hopefully a JSON string
//     following the instructions) and attempts to parse and validate it against
//     the underlying Zod schema. If successful, it transforms the text into a
//     fully typed and validated TypeScript object. If the AI's output doesn't match
//     the expected format, the parser will throw an error, preventing malformed data
//     from entering the application.
//
// In essence, these parsers are the bridge that allows us to leverage the type safety
// and validation of Zod for data generated by text-based AI models.

/**
 * @description StructuredOutputParser for parsing unstructured text from an AI model
 * into a single, validated Drink object conforming to DrinkSchema.
 */
export const DrinkParser = StructuredOutputParser.fromZodSchema(
  DrinkSchema as any, // 'as any' is a TypeScript cast, sometimes used with libraries for flexibility.
);
/**
 * @description StructuredOutputParser for parsing unstructured text from an AI model
 * into a single, validated Topping object conforming to ToppingSchema.
 */
export const ToppingParser = StructuredOutputParser.fromZodSchema(
  ToppingSchema as any,
);
/**
 * @description StructuredOutputParser for parsing unstructured text from an AI model
 * into a single, validated Size object conforming to SizeSchema.
 */
export const SizeParser = StructuredOutputParser.fromZodSchema(
  SizeSchema as any,
);
/**
 * @description StructuredOutputParser for parsing unstructured text from an AI model
 * into a single, validated Milk object conforming to MilkSchema.
 */
export const MilkParser = StructuredOutputParser.fromZodSchema(
  MilkSchema as any,
);
/**
 * @description StructuredOutputParser for parsing unstructured text from an AI model
 * into a single, validated Syrup object conforming to SyrupSchema.
 */
export const SyrupParser = StructuredOutputParser.fromZodSchema(
  SyrupSchema as any,
);
/**
 * @description StructuredOutputParser for parsing unstructured text from an AI model
 * into a single, validated Sweetener object conforming to SweetenerSchema.
 */
export const SweetenerParser = StructuredOutputParser.fromZodSchema(
  SweetenerSchema as any,
);

// Parsers for arrays
// These are used when the AI model is expected to output a list of items,
// which the parser will then transform into a TypeScript array of validated objects.

/**
 * @description StructuredOutputParser for parsing unstructured text from an AI model
 * into an array of validated Drink objects conforming to DrinksSchema.
 */
export const DrinksParser = StructuredOutputParser.fromZodSchema(
  DrinksSchema as any,
);
/**
 * @description StructuredOutputParser for parsing unstructured text from an AI model
 * into an array of validated Topping objects conforming to ToppingsSchema.
 */
export const ToppingsParser = StructuredOutputParser.fromZodSchema(
  ToppingsSchema as any,
);
/**
 * @description StructuredOutputParser for parsing unstructured text from an AI model
 * into an array of validated Size objects conforming to SizesSchema.
 */
export const SizesParser = StructuredOutputParser.fromZodSchema(
  SizesSchema as any,
);
/**
 * @description StructuredOutputParser for parsing unstructured text from an AI model
 * into an array of validated Milk objects conforming to MilksSchema.
 */
export const MilksParser = StructuredOutputParser.fromZodSchema(
  MilksSchema as any,
);
/**
 * @description StructuredOutputParser for parsing unstructured text from an AI model
 * into an array of validated Syrup objects conforming to SyrupsSchema.
 */
export const SyrupsParser = StructuredOutputParser.fromZodSchema(
  SyrupsSchema as any,
);
/**
 * @description StructuredOutputParser for parsing unstructured text from an AI model
 * into an array of validated Sweetener objects conforming to SweetenersSchema.
 */
export const SweetenersParser = StructuredOutputParser.fromZodSchema(
  SweetenersSchema as any,
);
