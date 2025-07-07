import "reflect-metadata";

import { ContainerName } from "@enums";

import Container from "./app/Container";

const project = new Container();

(async (): Promise<void> => {
    await project.setUp();

    const kernel = project.get(ContainerName.Kernel);
    await kernel.boot();

    const service = await project.getAsync(ContainerName.ExampleService);
    await service.execute();

    await kernel.shutdown();
})()
    .then(() => process.exit(0))
    .catch(async (exception) => {
        const loggerName = project.isBound(ContainerName.Logger) ? ContainerName.Logger : ContainerName.ConsoleLogger;
        if (!project.isBound(loggerName)) console.error(exception);
        await project.getOptional(loggerName)?.error(exception);

        process.exit(1);
    });
