import { container } from "./SingletonTest.js";

export default void (async (): Promise<void> => {
    process.env = {
        ...process.env,
    };

    await container.setUp();
})();
