import { randomUUID } from "node:crypto";

import { provide } from "@inversifyjs/binding-decorators";
import { Logger, LoggerInterface } from "@odg/log";
import { inject, injectable } from "inversify";

import type { ContainerInterface } from "#types";
import { ContainerName } from "@enums";
import type { Container } from "~/app/Container";
import { ProcessKernel } from "~/Console";

/**
 * Kernel command class
 *
 * @class Kernel
 */
@injectable("Singleton")
@provide(ContainerName.Kernel)
export class Kernel {

    public constructor(
        @inject(ContainerName.Config) public readonly config: ContainerInterface[ContainerName.Config],
        @inject(ContainerName.ConsoleLogger) public readonly consoleLogger: LoggerInterface,
        @inject(ContainerName.Logger) public readonly logger: LoggerInterface,
        @inject(ContainerName.Container) public readonly container: Container,
        @inject(ContainerName.ProcessKernel) public readonly processKernel: ProcessKernel,
    ) {
    }

    /**
     * Boot all containers, and prepare robot to execution
     *
     * @returns {Promise<void>}
     */
    public async boot(): Promise<void> {
        await Promise.all([
            this.logger.info("Kernel Starting"),
            this.bootLogs(),
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
        const logger: Logger = this.container.get(ContainerName.Logger);
        const jsonLogger = this.container.get(ContainerName.JSONLoggerPlugin);

        logger.pushHandler(this.consoleLogger);
        logger.pushProcessor(jsonLogger);
        jsonLogger.setIdentifier(randomUUID());
    }

}
