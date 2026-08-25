import type { EventTypes, ExampleParameters } from "#types";
import { ODGDecorators } from "@odg/chemical-x";
import type { EventListenerInterface } from "@odg/events";
import type { Logger } from "@odg/log";

import { $inject } from "#app/ContainerInject.js";
import { ContainerName, EventName } from "#enums";

@ODGDecorators.injectable(ContainerName.ExampleEventListener, "Singleton")
@ODGDecorators.registerListener(EventName.Example, ContainerName.ExampleEventListener, {})
export class ExampleEventListener implements EventListenerInterface<EventTypes, EventName.Example> {

    public constructor(
        @$inject(ContainerName.Logger) public readonly logger: Logger,
    ) {
    }

    public async handler(eventsData: ExampleParameters): Promise<void> {
        await this.logger.debug("Example Event Listener Action not implemented", { ...eventsData });
    }

}
