// Imports necessary types from the schema definition file.
// These types provide strong type-checking for the constant data arrays defined below,
// ensuring that each item conforms to its expected structure.
import {
  Drink, // Type for a single drink item (e.g., Espresso, Latte)
  Size, // Type for a single drink size (e.g., Tall, Grande)
  Milk, // Type for a single milk option (e.g., Whole Milk, Oat Milk)
  Syrup, // Type for a single syrup flavor (e.g., Vanilla, Caramel)
  SupportSweetener, // Type for a single sweetener option (e.g., Classic Syrup, Stevia)
  Topping, // Type for a single topping option (e.g., Whipped Cream, Caramel Drizzle)
} from '../../schemas/drinks';

// --- Drink Menu Data ---

/**
 * @description An array of available drinks on the menu.
 * Each object in this array conforms to the `Drink` type,
 * specifying its name, description, and supported customization options.
 *
 * This constant serves as the single source of truth for the base drink offerings.
 */
export const DRINKS: Drink[] = [
  {
    name: 'Espresso',
    description: 'Strong concentrated coffee shot.',
    supportMilk: false, // Espresso typically doesn't take milk directly in the shot.
    supportSweeteners: true, // Can be sweetened.
    supportSyrup: true, // Can have syrup added.
    supportTopping: false, // Typically no toppings.
    supportSize: false, // Espresso usually has a standard serving size.
  },
  {
    name: 'Latte',
    description: 'Espresso with steamed milk, smooth and creamy.',
    supportMilk: true, // Highly customizable milk.
    supportSweeteners: true, // Can be sweetened.
    supportSyrup: true, // Can have syrup added.
    supportTopping: true, // Can have toppings (e.g., latte art, drizzle).
    supportSize: true, // Available in different sizes.
  },
  {
    name: 'Cappuccino',
    description: 'Espresso with steamed milk and a deep layer of foam.',
    supportMilk: true, // Highly customizable milk.
    supportSweeteners: true, // Can be sweetened.
    supportSyrup: true, // Can have syrup added.
    supportTopping: true, // Can have toppings (e.g., cinnamon powder).
    supportSize: true, // Available in different sizes.
  },
  {
    name: 'Cold Brew',
    description: 'Smooth, cold-steeped coffee served over ice.',
    supportMilk: true, // Can add milk/cream.
    supportSweeteners: true, // Can be sweetened.
    supportSyrup: true, // Can have syrup added.
    supportTopping: false, // Typically no toppings.
    supportSize: true, // Available in different sizes.
  },
  {
    name: 'Frappuccino',
    description: 'Blended iced coffee drink with flavors and toppings.',
    supportMilk: true, // Often blended with milk.
    supportSweeteners: true, // Can be sweetened.
    supportSyrup: true, // Flavored with syrups.
    supportTopping: true, // Frequently includes whipped cream and drizzles.
    supportSize: true, // Available in different sizes.
  },
];

// --- Size Options Data ---

/**
 * @description An array of available drink sizes.
 * Each object conforms to the `Size` type.
 *
 * This constant provides standard size options for customizable drinks.
 */
export const SIZES: Size[] = [
  { name: 'Tall', description: '12 fl oz (small)' },
  { name: 'Grande', description: '16 fl oz (medium)' },
  { name: 'Venti', description: '20 fl oz (large for hot, 24 fl oz for cold)' },
  { name: 'Trenta', description: '31 fl oz (cold drinks only)' },
];

// --- Milk Options Data ---

/**
 * @description An array of available milk options.
 * Each object conforms to the `Milk` type.
 *
 * This constant defines the types of milk customers can choose for their beverages.
 */
export const MILKS: Milk[] = [
  { name: 'Whole Milk', description: 'Rich, full-bodied dairy milk.' },
  { name: '2% Milk', description: 'Reduced fat milk option.' },
  { name: 'Nonfat Milk', description: 'Fat-free dairy milk.' },
  { name: 'Oat Milk', description: 'Smooth, plant-based oat milk.' },
  { name: 'Soy Milk', description: 'Plant-based soy milk.' },
  { name: 'Almond Milk', description: 'Nutty, plant-based almond milk.' },
  { name: 'Coconut Milk', description: 'Creamy, tropical plant-based milk.' },
];

// --- Syrup Flavor Data ---

/**
 * @description An array of available syrup flavors.
 * Each object conforms to the `Syrup` type.
 *
 * This constant lists the various syrup additions for customizing drinks.
 */
export const SYRUPS: Syrup[] = [
  { name: 'Vanilla Syrup', description: 'Classic sweet vanilla flavor.' },
  { name: 'Caramel Syrup', description: 'Rich caramel sweetness.' },
  { name: 'Hazelnut Syrup', description: 'Nutty, sweet hazelnut flavor.' },
  { name: 'Mocha Syrup', description: 'Chocolate syrup for coffee drinks.' },
  {
    name: 'Pumpkin Spice Syrup',
    description: 'Seasonal pumpkin spice flavor.',
  },
];

// --- Sweetener Options Data ---

/**
 * @description An array of available sweetener options.
 * Each object conforms to the `SupportSweetener` type (ideally named `Sweetener`).
 *
 * This constant provides a list of sweeteners customers can add to their drinks.
 */
export const SWEETENERS: SupportSweetener[] = [
  // Consider renaming SupportSweetener to Sweetener in schema
  { name: 'Classic Syrup', description: 'Standard liquid sweetener.' },
  { name: 'Raw Sugar', description: 'Natural cane sugar.' },
  { name: 'Stevia', description: 'Zero-calorie natural sweetener.' },
  { name: 'Honey', description: 'Natural honey sweetener.' },
  { name: 'Splenda', description: 'Low-calorie artificial sweetener.' },
];

// --- Topping Options Data ---

/**
 * @description An array of available topping options.
 * Each object conforms to the `Topping` type.
 *
 * This constant lists the toppings that can be added to applicable beverages.
 */
export const TOPPINGS: Topping[] = [
  { name: 'Whipped Cream', description: 'Fluffy whipped topping.' },
  { name: 'Caramel Drizzle', description: 'Sweet caramel sauce topping.' },
  { name: 'Mocha Drizzle', description: 'Chocolate drizzle topping.' },
  { name: 'Cinnamon Powder', description: 'Warm spice powder.' },
  { name: 'Vanilla Bean Powder', description: 'Sweet vanilla topping.' },
  { name: 'Caramel Crunch', description: 'Crunchy caramelized sugar bits.' },
];
