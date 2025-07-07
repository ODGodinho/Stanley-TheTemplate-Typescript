import { LoggerInterface } from "@odg/log";
import { inject } from "inversify";
import { fluentProvide } from "inversify-binding-decorators";

import { ContainerName } from "@enums";

@(fluentProvide(ContainerName.ExampleService).inSingletonScope().done())
export class ExampleService {

    public constructor(@inject(ContainerName.Logger) protected log: LoggerInterface) {
    }

    public async execute(): Promise<void> {
        await this.log.info("Example Only");
    }

}
