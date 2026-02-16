// noinspection JSUnusedGlobalSymbols
import {defineLoader, loader_leyyoCommon} from "@leyyo/common";
import {FQN} from "./internal.js";

export const loader_leyyoHttpMock = defineLoader(FQN,
    // dependencies
    ...loader_leyyoCommon,

    // enums
    () => import('./enum/http-method.js').then(m => m.HttpMethodItems),
    () => import('./enum/http-protocol.js').then(m => m.HttpProtocolItems),
    // classes
    () => import('./application/mock-application.js').then(m => m.MockApplication),
    () => import('./request/mock.request.js').then(m => m.MockRequest),
    () => import('./response/mock-response.js').then(m => m.MockResponse),
);
