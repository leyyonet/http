import type {EventEmitter} from "node:events";
import type {RequestParamHandler, Router} from "express";
import type http from "http";

export interface MockApplicationLike extends EventEmitter {
    "m-search"(...a: Array<unknown>): this;

    _router: any;
    locals: Record<string, any>;
    map: any;
    mountpath: string | string[];

    // region methods
    options(...a: Array<unknown>): this

    patch(...a: Array<unknown>): this

    post(...a: Array<unknown>): this

    propfind(...a: Array<unknown>): this

    proppatch(...a: Array<unknown>): this

    purge(...a: Array<unknown>): this

    put(...a: Array<unknown>): this

    report(...a: Array<unknown>): this

    link(...a: Array<unknown>): this

    unlink(...a: Array<unknown>): this

    all(...a: Array<unknown>): this

    checkout(...a: Array<unknown>): this

    connect(...a: Array<unknown>): this

    copy(...a: Array<unknown>): this

    delete(...a: Array<unknown>): this

    get(name: string): any;
    get(...a: Array<unknown>): this;

    head(...a: Array<unknown>): this

    lock(...a: Array<unknown>): this

    merge(...a: Array<unknown>): this

    mkactivity(...a: Array<unknown>): this

    mkcol(...a: Array<unknown>): this

    move(...a: Array<unknown>): this

    notify(...a: Array<unknown>): this

    search(...a: Array<unknown>): this

    subscribe(...a: Array<unknown>): this

    trace(...a: Array<unknown>): this

    unlock(...a: Array<unknown>): this

    unsubscribe(...a: Array<unknown>): this

    use(...a: Array<unknown>): this

    // endregion methods

    resource: any;
    router: Router;
    routes: any;
    settings: any;
    stack: any[];


    defaultConfiguration(): void;

    disable(_s: string): this;

    disabled(_s: string): boolean;

    enable(_s: string): this;

    enabled(_s: string): boolean;

    engine(_e: string, _f: (path: string, options: object, callback: (e: any, rendered?: string) => void) => void): this;

    init(): void;

    listen(_p?: any, _h?: string | (() => void), _b?: number | (() => void), _c?: () => void): http.Server;

    param(name: string | string[] | ((name: string, matcher: RegExp) => RequestParamHandler), handler?: RequestParamHandler): this;

    path(): string;

    render(_n: string, _o?: object | ((err: Error, html: string) => void), _c?: (err: Error, html: string) => void): void;

    route(_p: unknown): any;

    set(_s: string, _v: any): this;

}
