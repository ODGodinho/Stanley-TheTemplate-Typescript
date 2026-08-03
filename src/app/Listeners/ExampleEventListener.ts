import type { EventDefaultParameters, EventTypes } from "#types";
import { ODGDecorators } from "@odg/chemical-x";
import type { EventListenerInterface } from "@odg/events";
import type { LoggerInterface } from "@odg/log";

import { $inject } from "#app/ContainerInject.js";
import { ContainerName, EventName } from "#enums";

@ODGDecorators.injectable(ContainerName.ExampleEventListener, "Singleton")
@ODGDecorators.registerListener(EventName.Example, ContainerName.ExampleEventListener, {})
export class ExampleEventListener implements EventListenerInterface<EventTypes, EventName.Example> {

    public constructor(
        @$inject(ContainerName.Logger) public readonly log: LoggerInterface,
    ) {
    }

    public async handler(_eventsData: EventDefaultParameters): Promise<void> {
        await this.log.debug("Example Event Listener Action not implemented");
    }

}
