// noinspection JSUnusedGlobalSymbols
import { enumPool, foretell_leyyoCommon, literalPool } from "@leyyo/common";
import { FQN } from "./internal.js";

// noinspection JSUnusedGlobalSymbols
export const foretell_leyyoHttpCommon = [
  // dependencies
  ...foretell_leyyoCommon,

  () =>
    literalPool.register({
      name: "HttpMethod",
      fqn: FQN,
      i18n: true,
      lazyTarget: import("./literal/http-method.js").then((m) => m.HttpMethodItems),
    }),
  () =>
    literalPool.register({
      name: "HttpPlace",
      fqn: FQN,
      i18n: true,
      lazyTarget: import("./literal/http-place.js").then((m) => m.HttpPlaceItems),
    }),
  () =>
    literalPool.register({
      name: "HttpPlaceExtended",
      fqn: FQN,
      i18n: true,
      lazyTarget: import("./literal/http-place-extended.js").then((m) => m.HttpPlaceExtendedItems),
    }),
  () =>
    literalPool.register({
      name: "HttpProtocol",
      fqn: FQN,
      i18n: true,
      lazyTarget: import("./literal/http-protocol.js").then((m) => m.HttpProtocolItems),
    }),
  () =>
    enumPool.register({
      name: "HttpStateError",
      fqn: FQN,
      i18n: true,
      lazyTarget: import("./literal/http-state-error.js").then((m) => m.HttpStateError),
    }),
  () =>
    enumPool.register({
      name: "HttpStateInformational",
      fqn: FQN,
      i18n: true,
      lazyTarget: import("./literal/http-state-informational.js").then(
        (m) => m.HttpStateInformational,
      ),
    }),
  () =>
    enumPool.register({
      name: "HttpStateRedirect",
      fqn: FQN,
      i18n: true,
      lazyTarget: import("./literal/http-state-redirect.js").then((m) => m.HttpStateRedirect),
    }),
  () =>
    enumPool.register({
      name: "HttpStateSuccess",
      fqn: FQN,
      i18n: true,
      lazyTarget: import("./literal/http-state-success.js").then((m) => m.HttpStateSuccess),
    }),
];
