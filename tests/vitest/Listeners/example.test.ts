import { type EventListenerInterface } from "@odg/events";

import { type EventTypes } from "#types";
import { ContainerName } from "@enums";
import { ExampleEventListener } from "@listeners";
import { container } from "tests/vitest/SingletonTest";

const listeners = Object.values(ContainerName).filter((value) => String(value).includes("event.listener"));

describe.each(listeners)("Event Listeners", (pageName: ContainerName) => {
    test(`Instance Page ${pageName.toString()}`, async () => {
        const callable = container.container.get<EventListenerInterface<EventTypes, keyof EventTypes>>(pageName);

        expect(callable.handler).toBeDefined();
        expect(callable.handler).toBeTypeOf("function");
    });
});

test("Example Listeners", async () => {
    const listener = container.get(ContainerName.ExampleEventListener);
    expect(listener).toBeDefined();
    expect(listener).toBeInstanceOf(ExampleEventListener);
    await expect(listener.handler({})).resolves.toBeUndefined();
});
