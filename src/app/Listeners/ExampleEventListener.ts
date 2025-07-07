import { ODGDecorators } from "@odg/chemical-x";
import { type EventListenerInterface } from "@odg/events";
import { LoggerInterface } from "@odg/log";
import { inject } from "inversify";
import { fluentProvide } from "inversify-binding-decorators";

import { type EventDefaultParameters, type EventTypes } from "#types/EventsInterface";
import { ContainerName, EventName } from "@enums";

@ODGDecorators.registerListener(EventName.Example, ContainerName.ExampleEventListener, {})
@(fluentProvide(ContainerName.ExampleEventListener).inSingletonScope().done())
export class ExampleEventListener implements EventListenerInterface<EventTypes, EventName.Example> {

    public constructor(
        @inject(ContainerName.Logger) public readonly log: LoggerInterface,
    ) {
    }

    public async handler(_eventsData: EventDefaultParameters): Promise<void> {
        await this.log.debug("Example Event Listener Action not implemented");
    }

}
