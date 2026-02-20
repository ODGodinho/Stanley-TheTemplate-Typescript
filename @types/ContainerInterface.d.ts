import type { ConfigInterface } from "@odg/config";
import type { EventBusInterface } from "@odg/events";
import type { JSONLoggerPlugin } from "@odg/json-log";
import type { Logger, LoggerInterface } from "@odg/log";
import type { MessageInterface } from "@odg/message";

import type { EventTypes } from "#types";
import type { ConfigType } from "@configs";
import type { ContainerName } from "@enums";
import type { ExampleEventListener } from "@listeners";
import type { ExampleService } from "@services";
import type { Container } from "~/app/Container";
import type { EventServiceProvider } from "~/app/Provider";
import type { Kernel, ProcessKernel } from "~/Console";

export interface ContainerInterface {
    [ContainerName.Logger]: Logger | LoggerInterface;
    [ContainerName.Requester]: MessageInterface;
    [ContainerName.ProcessKernel]: ProcessKernel;
    [ContainerName.Kernel]: Kernel;
    [ContainerName.Container]: Container;
    [ContainerName.Config]: ConfigInterface<ConfigType>;
    [ContainerName.ConsoleLogger]: LoggerInterface;
    [ContainerName.JSONLoggerPlugin]: JSONLoggerPlugin;

    // Listeners
    [ContainerName.EventBus]: EventBusInterface<EventTypes>;
    [ContainerName.EventServiceProvider]: EventServiceProvider<EventTypes>;
    [ContainerName.ExampleEventListener]: ExampleEventListener;

    // Services
    [ContainerName.ExampleService]: ExampleService;
}

export type ContainerType<T extends Record<ContainerName, unknown> = ContainerInterface> = T;

export type ContainerNameType = keyof ContainerType;
