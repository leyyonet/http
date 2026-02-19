// noinspection JSUnusedGlobalSymbols
import { defineLoader, loader_leyyoCommon } from "@leyyo/common";
import { FQN } from "./internal.js";

export const loader_leyyoHttpCommon = defineLoader(
  FQN,
  // dependencies
  ...loader_leyyoCommon,

  // enums
  () => import("./literal/http-method.js").then((m) => m.HttpMethodItems),
  () => import("./literal/http-place.js").then((m) => m.HttpPlaceItems),
  () => import("./literal/http-place-extended.js").then((m) => m.HttpPlaceExtendedItems),
  () => import("./literal/http-protocol.js").then((m) => m.HttpProtocolItems),
  () => import("./literal/http-state-error.js").then((m) => m.HttpStateError),
  () => import("./literal/http-state-informational.js").then((m) => m.HttpStateInformational),
  () => import("./literal/http-state-redirect.js").then((m) => m.HttpStateRedirect),
  () => import("./literal/http-state-success.js").then((m) => m.HttpStateSuccess),
  // classes
  () => import("./application/mock-application.js").then((m) => m.MockApplication),
  () => import("./request/mock.request.js").then((m) => m.MockRequest),
  () => import("./response/mock-response.js").then((m) => m.MockResponse),
  () => import("./http-common.js").then((m) => m.httpCommon),
);
