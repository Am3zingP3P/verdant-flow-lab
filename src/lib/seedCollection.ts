import broccoli from "@/assets/gallery/01-jar-broccoli.jpg";
import alfalfa from "@/assets/gallery/09-alfalfa.jpg";
import mung from "@/assets/gallery/04-mung.jpg";
import radish from "@/assets/gallery/03-radish.jpg";
import fenugreek from "@/assets/gallery/08-fenugreek.jpg";
export { default as collectionPhoto } from "@/assets/gallery/06-family.jpg";

// Each price individually confirmed by the owner on 2026-10-13.
export const seedProducts = [
  { key: "broccoli", image: broccoli, price: 349 },
  { key: "alfalfa", image: alfalfa, price: 349 },
  { key: "mung", image: mung, price: 349 },
  { key: "fenugreek", image: fenugreek, price: 349 },
  { key: "radish", image: radish, price: 349 },
] as const;

export const collectionPaths = { hu: "/csiramagok", sr: "/seme-za-klijanje" } as const;