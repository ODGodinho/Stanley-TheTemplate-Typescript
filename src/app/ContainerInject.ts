import type { ContainerInterface } from "#types";
import type { TypedInject, TypedMultiInject } from "@inversifyjs/strongly-typed";
import { inject, multiInject } from "inversify";

export const $inject = inject as TypedInject<ContainerInterface>;

export const $multiInject = multiInject as TypedMultiInject<ContainerInterface>;
