// Imports the 'Drink' type from the schema definition file.
// This ensures type safety when working with drink objects.
import { Drink } from '../schemas/drinks';

// Imports various constant arrays containing menu data (sweeteners, milks, syrups, sizes, toppings).
// These constants provide the detailed information used to construct the summaries.
import {
  SWEETENERS,
  MILKS,
  SYRUPS,
  SIZES,
  TOPPINGS,
} from '../utils/constants/menu_data';

/**
 * @description Generates a concise textual summary for a given drink item.
 * This function takes a `Drink` object and constructs a descriptive string
 * detailing its name, description, and supported customization options (milk, sweeteners, syrup, topping, size).
 *
 * This summary is particularly useful for AI models or user-facing descriptions
 * where a natural language explanation of a drink's features is required,
 * converting structured boolean flags into readable sentences.
 *
 * @param drink The Drink object for which to create the summary.
 * @returns A string containing the comprehensive summary of the drink's features.
 */
export const createDrinkItemSummary = (drink: Drink): string => {
  // Constructs the base name part of the summary.
  const drinkName = 'A drink named ' + drink.name;
  // Constructs the description part of the summary.
  const drinkDescription = 'It is described as ' + drink.description;

  // Conditionally adds text based on the 'supportMilk' boolean flag.
  const milkSupport = drink.supportMilk
    ? 'It can be made with milk.'
    : 'It cannot be made with milk.';
  // Conditionally adds text based on the 'supportSweeteners' boolean flag.
  const sweetenerSupport = drink.supportSweeteners
    ? 'It can be made with sweeteners.'
    : 'Drink cannot contain sweeteners.'; // Corrected "can not" to "cannot"
  // Conditionally adds text based on the 'supportSyrup' boolean flag.
  const syrupSupport = drink.supportSyrup
    ? 'It can be made with syrup.'
    : 'It cannot be made with syrup.';
  // Conditionally adds text based on the 'supportTopping' boolean flag.
  const toppingSupport = drink.supportTopping
    ? 'It can be made with topping.'
    : 'It cannot be made with topping.';
  // Conditionally adds text based on the 'supportSize' boolean flag.
  const sizeSupport = drink.supportSize
    ? 'It can be made in different sizes.'
    : 'It cannot be made in different sizes.';

  // Concatenates all parts into a single summary string.
  return `${drinkName} ${drinkDescription} ${milkSupport} ${sweetenerSupport} ${syrupSupport} ${toppingSupport} ${sizeSupport}`;
};

/**
 * @description Generates a textual summary of all available sweetener options.
 * It iterates through the `SWEETENERS` array and lists each sweetener's
 * name and description in a human-readable, bullet-point format.
 *
 * This function is useful for providing an AI model or user with a clear,
 * comprehensive overview of customization choices.
 *
 * @returns A string containing the summary of available sweeteners.
 */
export const createSweetenersSummary = (): string => {
  return `Available sweeteners are:
${SWEETENERS.map((sweetener) => `- ${sweetener.name}: ${sweetener.description}`).join('\n')}
   `;
};

/**
 * @description Generates a textual summary of all available milk options.
 * It iterates through the `MILKS` array and lists each milk type's
 * name and description in a human-readable, bullet-point format.
 *
 * This function is useful for providing an AI model or user with a clear,
 * comprehensive overview of customization choices.
 *
 * @returns A string containing the summary of available milk types.
 */
export const createAvailableMilksSummary = (): string => {
  // Improved function name
  return `Available milks are:
${MILKS.map((milkOption) => `- ${milkOption.name}: ${milkOption.description}`).join('\n')}
   `;
};

/**
 * @description Generates a textual summary of all available syrup options.
 * It iterates through the `SYRUPS` array and lists each syrup's
 * name and description in a human-readable, bullet-point format.
 *
 * This function is useful for providing an AI model or user with a clear,
 * comprehensive overview of customization choices.
 *
 * @returns A string containing the summary of available syrups.
 */
export const createSyrupsSummary = (): string => {
  // Improved function name
  return `Available syrups are:
${SYRUPS.map((syrupOption) => `- ${syrupOption.name}: ${syrupOption.description}`).join('\n')}
   `;
};

/**
 * @description Generates a textual summary of all available drink sizes.
 * It iterates through the `SIZES` array and lists each size's
 * name and description in a human-readable, bullet-point format.
 *
 * This function is useful for providing an AI model or user with a clear,
 * comprehensive overview of customization choices.
 *
 * @returns A string containing the summary of available drink sizes.
 */
export const createSizesSummary = (): string => {
  // Improved function name
  return `Available sizes are:  
    ${SIZES.map((sizeOption) => `- ${sizeOption.name}: ${sizeOption.description}`).join('\n')}
    `;
};

/**
 * @description Generates a textual summary of all available topping options.
 * It iterates through the `TOPPINGS` array and lists each topping's
 * name and description in a human-readable, bullet-point format.
 *
 * This function is useful for providing an AI model or user with a clear,
 * comprehensive overview of customization choices.
 *
 * @returns A string containing the summary of available toppings.
 */
export const availableToppingsSummary = (): string => {
  return `Available toppings are:
${TOPPINGS.map((toppingOption) => `- ${toppingOption.name}: ${toppingOption.description}`).join('\n')}
   `;
};
