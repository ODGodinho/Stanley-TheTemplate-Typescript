import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

const vite = defineConfig({
    test: {
        globals: true,
        coverage: {
            enabled: true,
            provider: "v8",
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
            exclude: [
                "src/index.ts",
                "src/index.js",
            ],
        },
        setupFiles: [
            "./tests/vitest/init.ts",
        ],
    },
    plugins: [ tsconfigPaths() ],

});

export default vite;
