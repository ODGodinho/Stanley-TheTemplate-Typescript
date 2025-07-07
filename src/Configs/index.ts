import zod from "zod";

import { ConfigName } from "@enums";

export const configValidator = zod.object({
    [ConfigName.APP_NAME]: zod.string().nullish(),
});

export type ConfigType = zod.infer<typeof configValidator>;
