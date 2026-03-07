import { definePredictor, enumPool, literalPool } from "@leyyo/common";
import { PCK } from "../internal.js";

// noinspection JSUnusedGlobalSymbols
export const leyyoHttpPredictor = definePredictor(PCK)
  .dependency(() => import("@leyyo/common").then((m) => m.leyyoCommonPredictor))
  // literals
  .add(
    () =>
      literalPool.register({
        name: "HttpMethod",
        pck: PCK,
        i18n: true,
        lazyTarget: import("../literal/http-method.js").then((m) => m.HttpMethodItems),
      }),
    () =>
      literalPool.register({
        name: "HttpPlace",
        pck: PCK,
        i18n: true,
        lazyTarget: import("../literal/http-place.js").then((m) => m.HttpPlaceItems),
      }),
    () =>
      literalPool.register({
        name: "HttpPlaceExtended",
        pck: PCK,
        i18n: true,
        lazyTarget: import("../literal/http-place-extended.js").then(
          (m) => m.HttpPlaceExtendedItems,
        ),
      }),
    () =>
      literalPool.register({
        name: "HttpProtocol",
        pck: PCK,
        i18n: true,
        lazyTarget: import("../literal/http-protocol.js").then((m) => m.HttpProtocolItems),
      }),
  )
  // enums
  .add(
    () =>
      enumPool.register({
        name: "HttpStateError",
        pck: PCK,
        i18n: true,
        lazyTarget: import("../literal/http-state-error.js").then((m) => m.HttpStateError),
      }),
    () =>
      enumPool.register({
        name: "HttpStateInformational",
        pck: PCK,
        i18n: true,
        lazyTarget: import("../literal/http-state-informational.js").then(
          (m) => m.HttpStateInformational,
        ),
      }),
    () =>
      enumPool.register({
        name: "HttpStateRedirect",
        pck: PCK,
        i18n: true,
        lazyTarget: import("../literal/http-state-redirect.js").then((m) => m.HttpStateRedirect),
      }),
    () =>
      enumPool.register({
        name: "HttpStateSuccess",
        pck: PCK,
        i18n: true,
        lazyTarget: import("../literal/http-state-success.js").then((m) => m.HttpStateSuccess),
      }),
  )
  .end();
