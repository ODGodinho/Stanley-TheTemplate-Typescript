import { type EventObjectType } from "@odg/events";

import { type EventName } from "@enums";

export interface EventDefaultParameters {
}

export interface EventBaseInterface extends EventObjectType {
    [EventName.Example]: EventDefaultParameters;
}

export type EventTypes<T extends Record<EventName, unknown> = EventBaseInterface> = T;
