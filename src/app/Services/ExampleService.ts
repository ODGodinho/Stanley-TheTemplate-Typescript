import { ODGDecorators } from "@odg/chemical-x";
import type { LoggerInterface } from "@odg/log";

import { $inject } from "#app/ContainerInject.js";
import { ContainerName } from "#enums";

@ODGDecorators.injectable(ContainerName.ExampleService, "Singleton")
export class ExampleService {

    public constructor(@$inject(ContainerName.Logger) protected logger: LoggerInterface) {
    }

    public async execute(): Promise<void> {
        await this.logger.debug("Example Only Code Is running");
    }

}
