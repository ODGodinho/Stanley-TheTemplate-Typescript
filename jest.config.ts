import { type Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";

import { compilerOptions } from "./tsconfig.json";

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
    modulePaths: [ compilerOptions.baseUrl ],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" }),
    moduleDirectories: [ "node_modules", "src" ],
};

export default jest;
