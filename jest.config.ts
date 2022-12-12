import { type Config } from "jest";

const jest: Config = {
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.ts",
        "src/**/*.js",
        "!src/index.ts",
        "!src/index.js",
    ],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    },
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: [
        "<rootDir>/tests/jest/**/*.test.ts",
    ],
};

export default jest;
