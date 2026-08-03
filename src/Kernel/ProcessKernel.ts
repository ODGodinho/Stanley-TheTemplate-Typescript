import { detach, ODGDecorators } from "@odg/chemical-x";

import type { Container } from "#app/Container.js";
import { $inject } from "#app/ContainerInject.js";
import { ContainerName } from "#enums";

@ODGDecorators.injectable(ContainerName.ProcessKernel, "Singleton")
export class ProcessKernel {

    public constructor(
        @$inject(ContainerName.Container) public readonly container: Container,
    ) {
    }

    /**
     * Register Process Kernel used for request end process and uncaughtException handlers
     *
     * @returns {Promise<void>}
     */
    public async register(): Promise<void> {
        process.on("uncaughtException", this.uncaughtException.bind(this));
        process.on("message", this.messageShutdownListen.bind(this));
    }

    /**
     * Callback for uncaughtException or unhandledRejection errors to send log
     *
     * @param {Error} error Error Variable
     * @returns {void}
     */
    private uncaughtException(error: Error): void {
        const logger = this.container.getOptional(ContainerName.Logger);

        void detach(logger?.emergency(error), logger ?? null);
    }

    /**
     * Message listener for shutdown
     * Fust ignore so that the end of processing can wait for the crawler to finish
     *
     * This example can be used with `pm2 stop`
     * You can use: `process.exit(1);` to force exit
     *
     * @param {string} message Message send to process
     * @returns {void}
     */
    private messageShutdownListen(message: string): void {
        const logger = this.container.getOptional(ContainerName.Logger);

        if (message === "shutdown") {
            void detach(logger?.debug("Waiting for the crawler to kill the process"), logger ?? null);
        }
    }

}
