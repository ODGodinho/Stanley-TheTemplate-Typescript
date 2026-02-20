import { buildProviderModule } from "@inversifyjs/binding-decorators";
import { AxiosMessage } from "@odg/axios";
import {
    Container as ContainerBase,
    ODGDecorators,
} from "@odg/chemical-x";
import { JsonConfig } from "@odg/config";
import { EventEmitterBus } from "@odg/events";
import { JSONLoggerPlugin } from "@odg/json-log";
import { ConsoleLogger, Logger } from "@odg/log";

import type { ContainerInterface, EventTypes } from "#types";
import { type ConfigType, configValidator } from "@configs";
import { ConfigName, ContainerName } from "@enums";

import "@listeners";
import "@services";
import "~/Console";
import "~/app/Provider";

export class Container extends ContainerBase<ContainerInterface> {

    public async setUp(): Promise<void> {
        await this.load(buildProviderModule());
        await ODGDecorators.loadModule(this);
        await this.bindKernel();
        await this.get(ContainerName.Kernel).init();
        await this.bindStanley();
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

        this.bind(ContainerName.ConsoleLogger).toConstantValue(new ConsoleLogger());

        // Logger Class
        this.bind(ContainerName.Logger).toConstantValue(new Logger());

        // Container instance
        this.bind(ContainerName.Container).toConstantValue(this);
    }

    /**
     * BindStanley method
     */
    private async bindStanley(): Promise<void> {
        // Message/Request Axios
        this.bind(ContainerName.Requester).toConstantValue(new AxiosMessage());

        const appName = await this.get(ContainerName.Config).get(ConfigName.APP_NAME);

        this.bind(
            ContainerName.JSONLoggerPlugin,
        ).toDynamicValue(() => new JSONLoggerPlugin(appName ?? "unknown")).inSingletonScope();

        // EventBus Interface
        this.bind(
            ContainerName.EventBus,
        ).toDynamicValue(() => new EventEmitterBus<EventTypes>()).inSingletonScope();
    }

}
