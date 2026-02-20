import { ConsoleLogger } from "@odg/log";
import { vi } from "vitest";

import { ConfigName, ContainerName } from "@enums";
import { Container } from "src/app/Container";
import { container } from "tests/vitest/SingletonTest";

describe("Container teste", () => {
    test("Container Functions", async () => {
        expect(container.isBound(ContainerName.ConsoleLogger)).toBe(true);

        expect(container.getOptional(ContainerName.ConsoleLogger)).toBeInstanceOf(ConsoleLogger);
        expect(container.getOptional("Not_Bound" as ContainerName)).toBeUndefined();

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
