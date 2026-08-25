import { randomUUID } from "node:crypto";

import type { ContainerInterface } from "#types";
import { ODGDecorators } from "@odg/chemical-x";
import type { Logger, LoggerInterface } from "@odg/log";

import type { Container } from "#app/Container.js";
import { $inject } from "#app/ContainerInject.js";
import { ContainerName } from "#enums";
import type { ProcessKernel } from "#kernel";

/**
 * Kernel command class
 *
 * @class Kernel
 */
@ODGDecorators.injectable(ContainerName.Kernel, "Singleton")
export class Kernel {

    public constructor(
        @$inject(ContainerName.Config) public readonly config: ContainerInterface[ContainerName.Config],
        @$inject(ContainerName.ConsoleLogger) public readonly consoleLogger: LoggerInterface,
        @$inject(ContainerName.Logger) public readonly logger: Logger,
        @$inject(ContainerName.Container) public readonly container: Container,
        @$inject(ContainerName.ProcessKernel) public readonly processKernel: ProcessKernel,
    ) {
    }

    /**
     * Boot all containers, and prepare robot to execution
     *
     * @returns {Promise<void>}
     */
    public async boot(): Promise<void> {
        await this.bootLogs();
        await Promise.all([
            this.logger.info("Kernel Starting"),
            this.container.get(ContainerName.EventServiceProvider).boot(),
        ]);
        process.send?.("ready");
    }

    public async shutdown(): Promise<void> {
        await Promise.all([
            this.logger.info("Kernel Shutting down"),
            this.container.get(ContainerName.EventServiceProvider).shutdown(),
        ]);
    }

    /**
     * Init before all binders registers, just the essentials before starting all containers.
     *
     * @returns {Promise<void>}
     */
    public async init(): Promise<void> {
        await Promise.all([
            this.processKernel.register(),
            this.config.init(),
        ]);
    }

    private async bootLogs(): Promise<void> {
        const jsonLogger = this.container.get(ContainerName.JSONLoggerPlugin);

        this.logger.pushHandler(this.consoleLogger);
        this.logger.pushProcessor(jsonLogger);
        jsonLogger.setIdentifier(randomUUID());
    }

}
