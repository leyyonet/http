import type {OneOrMore} from "@leyyo/common";

export type HttpStatus = number;
export interface HttpParams {
    [key: string]: string|undefined;
}
// { string; remember: boolean; }
export interface HttpCookies {
    [key: string]: string|undefined;
}

export interface HttpHeaders {
    [key: string]: OneOrMore<string>|undefined;
}

export interface HttpQuery {
    [key: string]: undefined | OneOrMore<string | HttpQuery>;
}

export interface HttpData {}

export type _StreamCompose = (source: any) => void;
export type _StreamBool = (data: any, options?: _StreamAbort) => (boolean | Promise<boolean>);
export type _StreamVoid = (data: any, options?: _StreamAbort) => (void | Promise<void>);
export type _StreamGeneric<T> = (data: any, options?: _StreamAbort) => data is T;
export type _StreamReduce<T> = (previous: any, data: any, options?: _StreamAbort) => T;
export interface _StreamIterator {
    destroyOnReturn?: boolean
}
export interface _StreamAbort {
    signal: AbortSignal;
}
