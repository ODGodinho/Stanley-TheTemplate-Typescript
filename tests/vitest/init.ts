import "vitest/globals.d.ts";

import { container } from "./SingletonTest";

export default void (async (): Promise<void> => {
    process.env = {
        ...process.env,
    };

    await container.setUp();
})();
