import "reflect-metadata";

import { Container } from "#app/Container.js";
import { ContainerName } from "#enums";

const project = new Container();

let exitCode = 0;

try {
    await project.setUp();

    const kernel = await project.getAsync(ContainerName.Kernel);

    await kernel.boot();

    const service = await project.getAsync(ContainerName.ExampleService);

    await service.execute();
} catch (exception) {
    exitCode = 1;

    const loggerName = project.isBound(ContainerName.Logger) ? ContainerName.Logger : ContainerName.ConsoleLogger;
    const logger = project.getOptional(loggerName);

    await logger?.error(exception);

    if (!logger) {
        // eslint-disable-next-line no-console -- Disabled only for critical errors
        console.error(exception);
    }
} finally {
    await project.getOptional(ContainerName.Kernel)?.shutdown();
}

process.exit(exitCode);
