import { createFileRoute } from "@tanstack/react-router";
import { SeedCollectionPage } from "@/components/site/SeedCollectionPage";
import { collectionHead } from "@/lib/collectionHead";

export const Route = createFileRoute("/seme-za-klijanje")({
  head: () => collectionHead("sr"),
  component: SeedCollectionPage,
});