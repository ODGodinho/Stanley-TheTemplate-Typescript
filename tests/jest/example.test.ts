import { exampleStanleyTemplate } from "../../src/example";

describe("Example Teste", () => {
    test("Teste exampleStanleyTemplate", () => {
        expect(exampleStanleyTemplate()).toEqual("Stanley The Template");
    });
});
