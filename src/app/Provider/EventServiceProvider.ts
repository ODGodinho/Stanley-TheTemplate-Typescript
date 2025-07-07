import { ODGDecorators } from "@odg/chemical-x";
import {
    EventBusInterface,
    EventServiceProvider as EventServiceProviderBase,
    type EventListener,
} from "@odg/events";
import {
    inject,
} from "inversify";
import { fluentProvide } from "inversify-binding-decorators";

import { type EventTypes } from "#types/EventsInterface";
import { ContainerName } from "@enums";

import Container from "../Container";

/**
 * Event Service Provider to Register all event Listeners
 *
 * @template {EventTypes} Events Events List
 */
@(fluentProvide(ContainerName.EventServiceProvider).inSingletonScope().done())
export class EventServiceProvider<Events extends EventTypes> extends EventServiceProviderBase<Events> {

    /**
     * Listeners for events in the application.
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
        @inject(ContainerName.EventBus) protected bus: EventBusInterface<Events>,
        @inject(ContainerName.Container) private readonly container: Container,
    ) {
        super();
        this.listeners = this.getListeners();
    }

    /**
     * Boot EventServiceProvider
     *
     * @memberof EventServiceProvider
     * @returns {Promise<void>}
     */
    public async boot(): Promise<void> {
        await super.boot();
    }

    /**
     * Shutdown remove all Events Service Provider
     *
     * @memberof EventServiceProvider
     * @returns {Promise<void>}
     */
    public async shutdown(): Promise<void> {
        await super.shutdown();
    }

    /**
     * Listeners to Load
     *
     * @returns {EventListener<EventTypes>}
     */
    private getListeners(): EventListener<EventTypes> {
        return {
            ...ODGDecorators.getEvents(this.container.container),
        };
    }

}
