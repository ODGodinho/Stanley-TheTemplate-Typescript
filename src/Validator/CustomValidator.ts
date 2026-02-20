import zod from "zod";

/**
 * Class with custom validators
 *
 * @class CustomValidator
 */
export class CustomValidator {

    public static zodStringToBoolean(): zod.ZodUnion<
        readonly [zod.ZodBoolean, zod.ZodPipe<zod.ZodString, zod.ZodTransform<boolean, string>>]
    > {
        return zod.union([
            zod.boolean(),
            zod.string().transform((value): boolean => value === "true"),
        ]);
    }

    public static zodStringToNumber(): zod.ZodUnion<
        readonly [zod.ZodNumber, zod.ZodPipe<zod.ZodString, zod.ZodTransform<number, string>>]
    > {
        return zod.union([
            zod.number(),
            zod.string()
                .transform((value): number => Number(value.trim()))
                .refine((value) => !Number.isNaN(value), { message: "Invalid number" }),
        ]);
    }

}
