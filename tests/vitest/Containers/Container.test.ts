import { ConsoleLogger } from "@odg/log";
import { vi } from "vitest";

import { Container } from "#app/Container.js";
import { ConfigName, ContainerName } from "#enums";

import { container } from "../SingletonTest.js";

describe("Container teste", () => {
    test("Container Functions", async () => {
        expect(container.isBound(ContainerName.ConsoleLogger)).toBe(true);

        expect(container.getOptional(ContainerName.ConsoleLogger)).toBeInstanceOf(ConsoleLogger);
        expect(container.getOptional("Not_Bound")).toBeUndefined();

        await expect(container.getAsync(ContainerName.ConsoleLogger)).resolves.toBeInstanceOf(ConsoleLogger);
    });

    test("Container Optional Application Name", async () => {
        process.env.APP_NAME = undefined;
        const newContainer = new Container();

        await expect(newContainer.setUp()).resolves.toBeUndefined();
        expect(newContainer.get(ContainerName.JSONLoggerPlugin)["appName"]).toBe("unknown");
    });

    test("Container With Application Name", async () => {
        process.env[ConfigName.APP_NAME] = "Name";
        vi.stubEnv(ConfigName.APP_NAME, "Name");
        const newContainer = new Container();

        await expect(newContainer.setUp()).resolves.toBeUndefined();
        expect(newContainer.get(ContainerName.JSONLoggerPlugin)["appName"]).toBe("Name");
    });
});
