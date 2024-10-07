import { resolve } from "path";
import handlebars from "vite-plugin-handlebars";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import createSvgSpritePlugin from "vite-plugin-svg-spriter";

const pageData = {
  "/index.html": {
    title: "Main Page",
  },
};

const SRC_PATH = resolve(__dirname, "src");
const SVG_FOLDER_PATH = resolve(SRC_PATH, "svgicons");

export default {
  plugins: [
    handlebars({
      context(pagePath) {
        return pageData[pagePath];
      },
      partialDirectory: resolve(__dirname, "src/html/components/"),
    }),
    ViteImageOptimizer({}),
    createSvgSpritePlugin({ svgFolder: SVG_FOLDER_PATH }),
  ],
  resolve: {
    alias: {
      "@": resolve(process.cwd(), "src"),
      "@scss": resolve(__dirname, "./src/scss/"),
    },
  },
  build: {
    // minify: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
};
