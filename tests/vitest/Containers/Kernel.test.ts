import { vi } from "vitest";

import { ContainerName } from "@enums";
import { container } from "tests/vitest/SingletonTest";

describe("Kernel Teste", () => {
    test("Boot", async () => {
        const kernel = container.get(ContainerName.Kernel);

        const bootLogsSpy = vi.spyOn(kernel as unknown as { bootLogs(): void }, "bootLogs");
        expect(bootLogsSpy).not.toBeCalled();
        await expect(kernel.boot()).resolves.toBeUndefined();
        expect(bootLogsSpy).toBeCalledTimes(1);
    });

    test("Shutdown", async () => {
        const kernel = container.get(ContainerName.Kernel);

        await expect(kernel.shutdown()).resolves.toBeUndefined();
    });
});
