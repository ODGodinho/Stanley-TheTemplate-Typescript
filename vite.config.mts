import { defineConfig } from "vitest/config";

const coverage100 = 100;

const vite = defineConfig({
    resolve: {
        tsconfigPaths: true,
    },
    test: {
        globals: true,
        coverage: {
            enabled: true,
            provider: "istanbul",
            watermarks: {
                branches: [ coverage100, coverage100 ],
                functions: [ coverage100, coverage100 ],
                lines: [ coverage100, coverage100 ],
                statements: [ coverage100, coverage100 ],
            },
            thresholds: {
                "100": true,
            },
            exclude: [
                "src/index.ts",
                "src/index.js",
            ],
        },
        setupFiles: [ "./tests/vitest/init.ts" ],
    },
});

export default vite;
