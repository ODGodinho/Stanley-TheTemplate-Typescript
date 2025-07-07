import { assert, vi } from "vitest";

import { ContainerName } from "@enums";

import { container } from "../SingletonTest";

describe("Test process kernel", async () => {
    test("KernelProcess called uncaughtException", async () => {
        const logger = container.get(ContainerName.Logger);
        const processKernel = container.get(ContainerName.ProcessKernel);
        assert(logger);

        const mock = vi.spyOn(logger, "emergency");
        expect(() => {
            processKernel["uncaughtException"](new Error("Uncaught exception"));
        }).not.toThrow();
        expect(mock).toHaveBeenCalled();
    });

    test("KernelProcess called uncaughtException", async () => {
        const logger = container.get(ContainerName.Logger);
        const processKernel = container.get(ContainerName.ProcessKernel);
        assert(logger);

        const mock = vi.spyOn(logger, "debug");
        expect(() => {
            processKernel["messageShutdownListen"]("shutdown");
        }).not.toThrow();
        expect(mock).toHaveBeenCalled();
        expect(mock.mock.calls[0][0]).toBe("Waiting for the crawler to kill the process");
    });

    test("KernelProcess called other message", async () => {
        const logger = container.get(ContainerName.Logger);
        const processKernel = container.get(ContainerName.ProcessKernel);
        assert(logger);

        const mock = vi.spyOn(logger, "debug");
        expect(() => {
            processKernel["messageShutdownListen"]("other");
        }).not.toThrow();
        expect(mock).not.toHaveBeenCalled();
    });
});
