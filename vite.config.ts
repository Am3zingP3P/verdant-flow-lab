import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: true, // <--- EZT A SORT ADDD HOZZÁ! Ez kötelezi a Lovable-t, hogy külső szerveren is felépítse a Nitro-t.
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    ssr: {
      target: "node",
    },
  },
});