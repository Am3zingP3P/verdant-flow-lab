import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  // Add hozzá ezt a részt a meglévő confighoz:
  vite: {
    ssr: {
      // Ez segít a Vercelnek a megfelelő környezetben futtatni a kódot
      target: "node",
    },
  },
});