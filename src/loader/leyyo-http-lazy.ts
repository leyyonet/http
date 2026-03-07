import { PCK } from "./internal.js";
import {defineLazy, leyyoCommonLazy} from "@leyyo/common";

// noinspection JSUnusedGlobalSymbols
export const leyyoHttpLazy = defineLazy(PCK)
  .dependency(leyyoCommonLazy)
  .add(
    // literals
    () => import("./literal/http-method.js").then((m) => m.HttpMethodItems),
    () => import("./literal/http-place.js").then((m) => m.HttpPlaceItems),
    () => import("./literal/http-place-extended.js").then((m) => m.HttpPlaceExtendedItems),
    () => import("./literal/http-protocol.js").then((m) => m.HttpProtocolItems),
    // enums
    () => import("./literal/http-state-error.js").then((m) => m.HttpStateError),
    () => import("./literal/http-state-informational.js").then((m) => m.HttpStateInformational),
    () => import("./literal/http-state-redirect.js").then((m) => m.HttpStateRedirect),
    () => import("./literal/http-state-success.js").then((m) => m.HttpStateSuccess),
    // classes
    () => import("./application/mock-application.js").then((m) => m.MockApplication),
    () => import("./request/mock.request.js").then((m) => m.MockRequest),
    () => import("./response/mock-response.js").then((m) => m.MockResponse),
    // instances
    () => import("./http-common.js").then((m) => m.httpCommon),
  )
  .end();
