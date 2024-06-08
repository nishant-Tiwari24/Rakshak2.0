// import react from "@vitejs/plugin-react";
// import { defineConfig } from "vite";
// import { nodePolyfills } from "vite-plugin-node-polyfills";

// export default defineConfig({
//   build: {
//     target: 'esnext',
//   },
//   plugins: [react(), nodePolyfills()],
//   define: {
//     "process.env": {},
//   },
//   optimizeDeps: {
//     esbuildOptions: {
//       target: 'esnext', 
//     },
//   },
  
// });


import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  build: {
    target: 'esnext',
  },
  plugins: [react(), nodePolyfills()],
  define: {
    "process.env": {},
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://chat-phi-kohl.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/api2': {
        target: 'https://bd-one-omega.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api2/, '')
      },

    }
  }
});
// https://chat-phi-kohl.vercel.app/getreceiveData/0x6ad330dd68BeAF54cf4ACd311d91991F8Faa94E9