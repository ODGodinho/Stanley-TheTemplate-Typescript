import { ConsoleLogger } from "@odg/log";
import { vi } from "vitest";

import { ConfigName, ContainerName } from "@enums";
import { container } from "tests/vitest/SingletonTest";
import Container from "~/app/Container";

describe("Container teste", () => {
    test("Container Functions", async () => {
        expect(container.isBound(ContainerName.ConsoleLogger)).toBe(true);

        expect(container.getOptional(ContainerName.ConsoleLogger)).toBeInstanceOf(ConsoleLogger);
        expect(container.getOptional("Not_Bound" as ContainerName)).toBeUndefined();

        await expect(container.getOptionalAsync(ContainerName.ConsoleLogger)).resolves.toBeInstanceOf(ConsoleLogger);
        await expect(container.getOptionalAsync("Not_Bound" as ContainerName)).resolves.toBeUndefined();

        await expect(container.getAsync(ContainerName.ConsoleLogger)).resolves.toBeInstanceOf(ConsoleLogger);
    });

    test("Container Optional Application Name", async () => {
        process.env.APP_NAME = undefined;
        const newContainer = new Container();
        newContainer["prepareInjectable"] = async (): Promise<void> => Promise.resolve();

        await expect(newContainer.setUp()).resolves.toBeUndefined();
        expect(newContainer.get(ContainerName.JSONLoggerPlugin)["appName"]).toBe("unknown");
    });

    test("Container With Application Name", async () => {
        process.env[ConfigName.APP_NAME] = "Name";
        vi.stubEnv(ConfigName.APP_NAME, "Name");
        const newContainer = new Container();
        newContainer["prepareInjectable"] = async (): Promise<void> => Promise.resolve();

        await expect(newContainer.setUp()).resolves.toBeUndefined();
        expect(newContainer.get(ContainerName.JSONLoggerPlugin)["appName"]).toBe("Name");
    });
});
