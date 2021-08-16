import reactPlugin from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";

const config = defineConfig({
  plugins: [reactPlugin()],
});

export default config
