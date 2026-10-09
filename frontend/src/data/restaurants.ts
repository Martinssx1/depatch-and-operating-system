import type { CartProduct } from "../state/DispatchContext";

export type Restaurant = {
  slug: string;
  name: string;
  cuisine: string;
  rating: string;
  delivery: string;
  fee: string;
  emoji: string;
  color: string;
  description: string;
  menu: CartProduct[];
};

export const restaurants: Restaurant[] = [
  {
    slug: "the-green-bowl", name: "The Green Bowl", cuisine: "Fresh, healthy bowls", rating: "4.9", delivery: "20–30 min", fee: "Free delivery", emoji: "🥑", color: "sage", description: "Bright, nourishing bowls made fresh to order.",
    menu: [
      { id: "green-harvest", name: "Harvest bowl", price: 6800, restaurant: "The Green Bowl", description: "Roasted sweet potato, avocado, greens, and lemon tahini.", emoji: "🥗" },
      { id: "green-chicken", name: "Crispy chicken bowl", price: 7400, restaurant: "The Green Bowl", description: "Crunchy chicken, brown rice, pickled cabbage, and sesame.", emoji: "🍗" },
      { id: "green-ginger", name: "Ginger glow shot", price: 1800, restaurant: "The Green Bowl", description: "Fresh ginger, lemon, and a little natural sweetness.", emoji: "🍋" },
    ],
  },
  {
    slug: "bun-and-barrel", name: "Bun & Barrel", cuisine: "Burgers, fries & shakes", rating: "4.8", delivery: "20–35 min", fee: "₦500 delivery", emoji: "🍔", color: "sand", description: "Smash burgers and comfort food worth slowing down for.",
    menu: [
      { id: "bun-smash", name: "Double smash burger", price: 8500, restaurant: "Bun & Barrel", description: "Two seared beef patties, cheddar, pickles, house sauce.", emoji: "🍔" },
      { id: "bun-fries", name: "Truffle parmesan fries", price: 4200, restaurant: "Bun & Barrel", description: "Golden fries tossed with parmesan and truffle oil.", emoji: "🍟" },
      { id: "bun-shake", name: "Vanilla bean shake", price: 3800, restaurant: "Bun & Barrel", description: "Creamy vanilla bean milkshake, blended to order.", emoji: "🥤" },
    ],
  },
  {
    slug: "sora-sushi", name: "Sora Sushi", cuisine: "Japanese, sushi & ramen", rating: "4.9", delivery: "30–40 min", fee: "Free delivery", emoji: "🍣", color: "blush", description: "Thoughtful Japanese favorites, rolled fresh every day.",
    menu: [
      { id: "sora-salmon", name: "Salmon maki set", price: 11200, restaurant: "Sora Sushi", description: "Eight pieces of salmon maki with pickled ginger.", emoji: "🍣" },
      { id: "sora-miso", name: "Miso soup", price: 3200, restaurant: "Sora Sushi", description: "Silky miso broth with tofu, wakame, and spring onion.", emoji: "🍜" },
      { id: "sora-crunch", name: "Crispy prawn roll", price: 9800, restaurant: "Sora Sushi", description: "Tempura prawn, cucumber, and spicy mayo.", emoji: "🍤" },
    ],
  },
];

export const formatNaira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;
