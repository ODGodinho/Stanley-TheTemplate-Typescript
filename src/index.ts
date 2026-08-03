import "reflect-metadata";

import { Container } from "#app/Container.js";
import { ContainerName } from "#enums";

const project = new Container();

try {
    await project.setUp();

    const kernel = project.get(ContainerName.Kernel);

    await kernel.boot();

    const service = await project.getAsync(ContainerName.ExampleService);

    await service.execute();

    await kernel.shutdown();

    process.exit(0);
} catch (exception) {
    const loggerName = project.isBound(ContainerName.Logger) ? ContainerName.Logger : ContainerName.ConsoleLogger;

    const logger = project.getOptional(loggerName);

    await logger?.error(exception);

    if (logger) {
        // eslint-disable-next-line no-console -- Disabled only for critical errors
        console.error(exception);
    }

    process.exit(1);
}
