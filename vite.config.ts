import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: true, // <--- EZ KÖTELEZŐ, ez fogja létrehozni az .output mappát!
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    ssr: {
      target: "node",
    },
  },
});