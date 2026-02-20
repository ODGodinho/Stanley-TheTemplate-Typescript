import { Exception } from "@odg/exception";
import {
    assert,
    beforeEach,
    describe,
    expect,
    test,
    vi,
} from "vitest";

import { ContainerName } from "@enums";

import { container } from "../SingletonTest";

describe("Test process kernel", async () => {
    let capturedUncaughtException: ((...parameters: unknown[]) => void) | undefined;
    let capturedMessageListener: ((...parameters: unknown[]) => void) | undefined;
    const messageToEnd = "Waiting for the crawler to kill the process";

    beforeEach(() => {
        vi.restoreAllMocks();
        capturedUncaughtException = undefined;
        capturedMessageListener = undefined;
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("ProcessKernel register method", async () => {
        const processKernel = container.get(ContainerName.ProcessKernel);

        vi.spyOn(process, "on").mockImplementation(
            (event: string | symbol, listener: (...parameters: unknown[]) => void) => {
                if (event === "uncaughtException") {
                    capturedUncaughtException = listener;
                } else if (event === "message") {
                    capturedMessageListener = listener;
                }

                return process;
            },
        );

        await processKernel.register();

        expect(capturedUncaughtException).toBeDefined();
        expect(capturedMessageListener).toBeDefined();
    });

    test("ProcessKernel register callbacks execution", async () => {
        const processKernel = container.get(ContainerName.ProcessKernel);

        vi.spyOn(process, "on").mockImplementation(
            (event: string | symbol, listener: (...parameters: unknown[]) => void) => {
                if (event === "uncaughtException") {
                    capturedUncaughtException = listener;
                } else if (event === "message") {
                    capturedMessageListener = listener;
                }

                return process;
            },
        );

        await processKernel.register();

        const logger = container.get(ContainerName.Logger);
        const emergencyMock = vi.spyOn(logger, "emergency").mockResolvedValue();

        capturedUncaughtException?.(new Exception("Test error"));

        expect(emergencyMock).toHaveBeenCalledWith(expect.any(Exception));
    });

    test("ProcessKernel register callbacks with logger rejection", async () => {
        const processKernel = container.get(ContainerName.ProcessKernel);

        vi.spyOn(process, "on").mockImplementation(
            (event: string | symbol, listener: (...parameters: unknown[]) => void) => {
                if (event === "uncaughtException") {
                    capturedUncaughtException = listener;
                } else if (event === "message") {
                    capturedMessageListener = listener;
                }

                return process;
            },
        );

        await processKernel.register();

        const logger = container.get(ContainerName.Logger);
        const emergencyMock = vi.spyOn(logger, "emergency").mockRejectedValue(new Exception("Logger error"));

        expect(() => {
            capturedUncaughtException?.(new Exception("Test error"));
        }).not.toThrow();

        expect(emergencyMock).toHaveBeenCalledWith(expect.any(Error));
    });

    test("ProcessKernel message shutdown listener", async () => {
        const processKernel = container.get(ContainerName.ProcessKernel);

        vi.spyOn(process, "on").mockImplementation(
            (event: string | symbol, listener: (...parameters: unknown[]) => void) => {
                if (event === "message") {
                    capturedMessageListener = listener;
                }

                return process;
            },
        );

        await processKernel.register();

        const logger = container.get(ContainerName.Logger);
        const debugMock = vi.spyOn(logger, "debug").mockResolvedValue();

        capturedMessageListener?.("shutdown");

        expect(debugMock).toHaveBeenCalledWith(messageToEnd);
    });

    test("ProcessKernel message listener with logger rejection", async () => {
        const processKernel = container.get(ContainerName.ProcessKernel);

        vi.spyOn(process, "on").mockImplementation(
            (event: string | symbol, listener: (...parameters: unknown[]) => void) => {
                if (event === "message") {
                    capturedMessageListener = listener;
                }

                return process;
            },
        );

        await processKernel.register();

        const logger = container.get(ContainerName.Logger);
        const debugMock = vi.spyOn(logger, "debug").mockRejectedValue(new Exception("Logger error"));

        expect(() => {
            capturedMessageListener?.("shutdown");
        }).not.toThrow();

        expect(debugMock).toHaveBeenCalledWith(messageToEnd);
    });

    test("KernelProcess called uncaughtException", async () => {
        const logger = container.get(ContainerName.Logger);
        const processKernel = container.get(ContainerName.ProcessKernel);

        assert(logger);

        const mock = vi.spyOn(logger, "emergency");

        expect(() => {
            processKernel["uncaughtException"](new Exception("Uncaught exception"));
        }).not.toThrow();
        expect(mock).toHaveBeenCalled();
    });

    test.skip("KernelProcess called uncaughtException", async () => {
        const logger = container.get(ContainerName.Logger);
        const processKernel = container.get(ContainerName.ProcessKernel);

        assert(logger);

        const mock = vi.spyOn(logger, "debug");

        expect(() => {
            processKernel["messageShutdownListen"]("shutdown");
        }).not.toThrow();
        expect(mock).toHaveBeenCalled();
        expect(mock.mock.calls[0][0]).toBe(messageToEnd);
    });

    test("KernelProcess called other message", async () => {
        const logger = container.get(ContainerName.Logger);
        const processKernel = container.get(ContainerName.ProcessKernel);

        const mock = vi.spyOn(logger, "debug");

        expect(() => {
            processKernel["messageShutdownListen"]("other");
        }).not.toThrow();
        expect(mock).not.toHaveBeenCalled();
    });
});
