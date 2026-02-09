import {FQN} from "./internal";
import {defineLazyEnum, defineLoader, foretell_leyyoCommon, loader_leyyoCommon} from "@leyyo/common";

// noinspection JSUnusedGlobalSymbols
export const loader_leyyoHttpMock = defineLoader(FQN,
    // dependencies
    ...loader_leyyoCommon,

    // enums
    () => import('./enum').then(m => m.HttpMethodItems),
    () => import('./enum').then(m => m.HttpProtocolItems),
    // classes
    () => import('./application').then(m => m.MockApplication),
    () => import('./request').then(m => m.MockRequest),
    () => import('./response').then(m => m.MockResponse),
);

// noinspection JSUnusedGlobalSymbols
export const foretell_leyyoHttpMock = [
    // dependencies
    ...foretell_leyyoCommon,

    () => defineLazyEnum({
        name: 'HttpMethod',
        fqn: FQN,
        i18n: true,
        lazyData: import('./enum').then(m => m.HttpMethodItems)}
    ),
    () => defineLazyEnum({
        name: 'HttpProtocol',
        fqn: FQN,
        i18n: true,
        lazyData: import('./enum').then(m => m.HttpProtocolItems)}
    )
];
