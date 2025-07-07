import { CustomValidator } from "~/Validator";

describe("Custom validator test", () => {
    test("Custom validator String to Boolean", () => {
        expect(CustomValidator.zodStringBoolean().parse("true")).toBeTruthy();
    });

    test("Custom validator String to Number", () => {
        expect(CustomValidator.zodStringNumber().parse("123")).toBe(123);
    });
});
