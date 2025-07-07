import zod from "zod";

/**
 * Class with custom validators
 *
 * @class ConfigValidator
 */
export class CustomValidator {

    public static zodStringBoolean(): zod.ZodUnion<[zod.ZodBoolean, zod.ZodEffects<zod.ZodString, boolean, string>]> {
        return zod.union([
            zod.boolean(),
            zod.string().transform((data): boolean => data === "true"),
        ]);
    }

    public static zodStringNumber(): zod.ZodUnion<[
        zod.ZodNumber,
        zod.ZodEffects<zod.ZodEffects<zod.ZodString, number, string>, number, string>]
    > {
        return zod.union([
            zod.number(),
            zod.string()
                .transform((data): number => Number(String(data).trim()))
                .refine((data) => !Number.isNaN(data), { message: "Invalid number" }),
        ]);
    }

}
