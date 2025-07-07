import { AxiosMessage } from "@odg/axios";
import {
    ODGDecorators,
} from "@odg/chemical-x";
import { JsonConfig } from "@odg/config";
import { EventEmitterBus } from "@odg/events";
import { JSONLoggerPlugin } from "@odg/json-log";
import { ConsoleLogger, Logger } from "@odg/log";
import {
    Container as ContainerInversify, decorate, injectable, type interfaces,
} from "inversify";
import { buildProviderModule } from "inversify-binding-decorators";

import { type ContainerNameType, type ContainerType, type EventTypes } from "#types";
import { type ConfigType, configValidator } from "@configs";
import { ConfigName, ContainerName } from "@enums";

import "~/Console";
import "~/app/Provider";
import "@services";
import "@listeners";

export default class Container {

    public readonly container: ContainerInversify;

    public constructor() {
        this.container = new ContainerInversify({ skipBaseClassChecks: true });
    }

    public async setUp(): Promise<void> {
        await this.prepareInjectable();
        this.container.load(buildProviderModule());
        this.container.load(ODGDecorators.loadModule(this.container));
        await this.bindKernel();
        await this.get(ContainerName.Kernel).init();
        await this.bindStanley();
    }

    /**
     * Get Container Item
     *
     * @template {ContainerNameType} Name
     * @param {Name} serviceIdentifier ContainerName
     * @returns {ContainerType[Name]}
     */
    public get<Name extends ContainerNameType>(serviceIdentifier: Name): ContainerType[Name] {
        return this.container.get(serviceIdentifier);
    }

    /**
     * Get Container Item Optional
     *
     * @template {ContainerNameType} Name
     * @param {Name} serviceIdentifier containerName
     * @returns {ContainerType[Name] | undefined}
     */
    public getOptional<Name extends ContainerNameType>(serviceIdentifier: Name): ContainerType[Name] | undefined {
        if (!this.isBound(serviceIdentifier)) return;

        return this.container.get(serviceIdentifier);
    }

    /**
     * Get Container Item Optional
     *
     * @template {ContainerNameType} Name
     * @param {Name} serviceIdentifier containerName
     * @returns {Promise<ContainerType[Name] | undefined>}
     */
    public async getOptionalAsync<Name extends ContainerNameType>(
        serviceIdentifier: Name,
    ): Promise<ContainerType[Name] | undefined> {
        if (!this.isBound(serviceIdentifier)) return;

        return this.container.getAsync(serviceIdentifier);
    }

    /**
     * Bind Container Item
     *
     * @template {ContainerNameType} Name
     * @param {Name} serviceIdentifier ContainerName
     * @returns {interfaces.BindingToSyntax<ContainerType[Name]>}
     */
    public bind<Name extends ContainerNameType>(
        serviceIdentifier: Name,
    ): interfaces.BindingToSyntax<ContainerType[Name]> {
        return this.container.bind(serviceIdentifier);
    }

    /**
     * Check if Container Item has bind
     *
     * @template {ContainerNameType} Name
     * @param {Name} serviceIdentifier containerName
     * @returns {boolean}
     */
    public isBound<Name extends ContainerNameType>(
        serviceIdentifier: Name,
    ): boolean {
        return this.container.isBound(serviceIdentifier);
    }

    /**
     * Get Async Container Item
     *
     * @template {ContainerNameType} Name
     * @memberof Container
     * @param {Name} serviceIdentifier ContainerName
     * @returns {Promise<ContainerType[Name]>}
     */
    public async getAsync<Name extends ContainerNameType>(serviceIdentifier: Name): Promise<ContainerType[Name]> {
        return this.container.getAsync(serviceIdentifier);
    }

    /**
     * Adapter Injectable class constructor
     *
     * @memberof Container
     * @returns {Promise<void>}
     */
    private async prepareInjectable(): Promise<void> {
        decorate(injectable(), Logger);
        decorate(injectable(), ConsoleLogger);
        decorate(injectable(), EventEmitterBus);
    }

    /**
     * Init all requires class for Kernel
     *
     * @returns {Promise<void>}
     */
    private async bindKernel(): Promise<void> {
        this.bind(
            ContainerName.Config,
        ).toDynamicValue(() => new JsonConfig<ConfigType>(process.env, configValidator)).inSingletonScope();

        this.bind(
            ContainerName.ConsoleLogger,
        ).to(ConsoleLogger).inSingletonScope();

        // Logger Class
        this.bind(
            ContainerName.Logger,
        ).to(Logger).inSingletonScope();

        // Container instance
        this.bind(
            ContainerName.Container,
        ).toDynamicValue(() => this).inSingletonScope();
    }

    /**
     * BindStanley method
     */
    private async bindStanley(): Promise<void> {
        // Message/Request Axios
        this.bind(
            ContainerName.Requester,
        ).to(AxiosMessage).inSingletonScope();

        const appName = await this.get(ContainerName.Config).get(ConfigName.APP_NAME);
        this.bind(
            ContainerName.JSONLoggerPlugin,
        ).toDynamicValue(() => new JSONLoggerPlugin(appName ?? "unknown")).inSingletonScope();

        // EventBus Interface
        this.bind(
            ContainerName.EventBus,
        ).to(EventEmitterBus<EventTypes>).inSingletonScope();
    }

}
