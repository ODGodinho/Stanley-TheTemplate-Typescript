import type { EventTypes } from "#types";
import { ODGDecorators } from "@odg/chemical-x";
import {
    type EventBusInterface,
    type EventListener,
    EventServiceProvider as EventServiceProviderBase,
} from "@odg/events";

import type { Container } from "#app/Container.js";
import { $inject } from "#app/ContainerInject.js";
import { ContainerName } from "#enums";

/**
 * Event Service Provider to Register all event Listeners
 *
 * @template {EventTypes} Events Events List
 */
@ODGDecorators.injectable(ContainerName.EventServiceProvider, "Singleton")
export class EventServiceProvider<Events extends EventTypes> extends EventServiceProviderBase<Events> {

    /**
     * Listeners for events in the app.
     *
     * @type {EventListener<EventTypes>}
     * @memberof EventServiceProvider
     * @protected
     */
    protected readonly listeners: EventListener<EventTypes>;

    /**
     * Constructor inject container
     *
     * @memberof EventServiceProvider
     * @param {EventBusInterface<Events>} bus Event Bus to Register
     * @param {Container} container Container to get listeners
     */
    public constructor(
        @$inject(ContainerName.EventBus) protected bus: EventBusInterface<Events>,
        @$inject(ContainerName.Container) private readonly container: Container,
    ) {
        super();
        this.listeners = this.getListeners();
    }

    /**
     * Listeners to Load
     *
     * @returns {EventListener<EventTypes>}
     */
    private getListeners(): EventListener<EventTypes> {
        return {
            ...ODGDecorators.getEvents(this.container),
        };
    }

}
