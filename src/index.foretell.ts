// noinspection JSUnusedGlobalSymbols
import {foretell_leyyoCommon, literalPool} from "@leyyo/common";
import {FQN} from "./internal.js";

export const foretell_leyyoHttpMock = [
    // dependencies
    ...foretell_leyyoCommon,

    () => literalPool.register({
        name: 'HttpMethod',
        fqn: FQN,
        i18n: true,
        lazyTarget: import('./enum/http-method.js').then(m => m.HttpMethodItems)}
    ),
    () => literalPool.register({
        name: 'HttpProtocol',
        fqn: FQN,
        i18n: true,
        lazyTarget: import('./enum/http-protocol.js').then(m => m.HttpProtocolItems)}
    )
];
