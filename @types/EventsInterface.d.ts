import type { EventObjectType } from "@odg/events";

import type { EventName } from "#enums";

export interface EventDefaultParameters {
    exampleParameterToEvent?: string;
}

export interface ExampleParameters extends EventDefaultParameters {
}

export interface EventBaseInterface extends EventObjectType {
    [EventName.Example]: ExampleParameters;
}

export type EventTypes<T extends Record<EventName, unknown> = EventBaseInterface> = T;
