import { ContainerName } from "#enums";
import { ExampleService } from "#services";

import { container } from "../SingletonTest.js";

describe("Example Teste", () => {
    test("Teste ExampleService", async () => {
        const exampleService = container.get(ContainerName.ExampleService);

        expect(exampleService).instanceOf(ExampleService);
        await expect(exampleService.execute()).resolves.toBeUndefined();
    });
});
