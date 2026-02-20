import { vi } from "vitest";

import { ContainerName } from "@enums";
import { Container } from "src/app/Container";

describe("Container Kernel Test", () => {
    let container: Container;

    beforeEach(async () => {
        container = new Container();
        await container.setUp();

        const loggerMock = vi.spyOn(container.get(ContainerName.Logger), "info");

        loggerMock.mockImplementation(async (): Promise<void> => {
            // Not action
        });
    });

    test("Kernel setup and shutdown", async () => {
        const kernel = container.get(ContainerName.Kernel);

        await expect(kernel.boot()).resolves.toBeUndefined();
        await expect(kernel.shutdown()).resolves.toBeUndefined();
    });

    test("Kernel boot process.send", async () => {
        process.send = (): boolean => true;
        const kernel = container.get(ContainerName.Kernel);

        await expect(kernel.boot()).resolves.toBeUndefined();
    });
});
