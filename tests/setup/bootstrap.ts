import "reflect-metadata";

import { container } from "./container.js";

export default void (async (): Promise<void> => {
    process.env = {
        ...process.env,
    };

    await container.setUp();
})();
