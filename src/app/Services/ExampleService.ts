import { provide } from "@inversifyjs/binding-decorators";
import { LoggerInterface } from "@odg/log";
import { inject, injectable } from "inversify";

import { ContainerName } from "@enums";

@injectable("Singleton")
@provide(ContainerName.ExampleService)
export class ExampleService {

    public constructor(@inject(ContainerName.Logger) protected log: LoggerInterface) {
    }

    public async execute(): Promise<void> {
        await this.log.info("Example Only");
    }

}
