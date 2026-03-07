import * as http from 'http';
import {EventEmitter} from 'events';
import {CoreCallLike, Func0, ObjectLike, OneOrMore, RecLike} from "@leyyo/core";
import {HttpRequest} from "../request";
import {HttpResponse} from "../response";
import {AbstractEventLike} from "../event";

export type HttpAppRenderLambda = (err: Error, html: string) => void;
export type HttpAppEngineLambda = (e: unknown, rendered?: string) => void;
export type HttpRequestHandler = (req: HttpRequest, res: HttpResponse, next: HttpNext) => void;
export type HttpErrorRequestHandler = (err: Error, req: HttpRequest, res: HttpResponse, next: HttpNext) => void;
export type HttpRequestHandlerList = OneOrMore<HttpRequestHandler | HttpErrorRequestHandler>;
export type HttpRequestParamHandler = (req: HttpRequest, res: HttpResponse, next: HttpNext, value: any, name: string) => any;
export type HttpRooterHandler<T> = (...handlers: Array<HttpRequestHandler>) => T;
export type HttpPathLike = OneOrMore<string | RegExp>;
export type HttpRooterWithHandlerList<T> = (path: HttpPathLike, ...handlers: Array<HttpRequestHandlerList>) => T;
export type HttpRooterWithApp<T> = (path: HttpPathLike, subApplication: HttpApplication) => T;
export type HttpRouterMatcher<T> = HttpRooterWithHandlerList<T> | HttpRooterWithApp<T>;
export type HttpRouter = HttpRouterSelf & HttpRequestHandler;
export interface HttpNext {
    (err?: any): void;
    (deferToNext: 'router'): void;
    (deferToNext: 'route'): void;
}
export interface HttpRouterSelf {
    param(name: OneOrMore<string>, handler: HttpRequestParamHandler): unknown|this;
    all: HttpRouterMatcher<this>;
    get: HttpRouterMatcher<this>;
    post: HttpRouterMatcher<this>;
    put: HttpRouterMatcher<this>;
    delete: HttpRouterMatcher<this>;
    patch: HttpRouterMatcher<this>;
    options: HttpRouterMatcher<this>;
    head: HttpRouterMatcher<this>;

    checkout: HttpRouterMatcher<this>;
    connect: HttpRouterMatcher<this>;
    copy: HttpRouterMatcher<this>;
    lock: HttpRouterMatcher<this>;
    merge: HttpRouterMatcher<this>;
    mkactivity: HttpRouterMatcher<this>;
    mkcol: HttpRouterMatcher<this>;
    move: HttpRouterMatcher<this>;
    'm-search': HttpRouterMatcher<this>;
    notify: HttpRouterMatcher<this>;
    propfind: HttpRouterMatcher<this>;
    proppatch: HttpRouterMatcher<this>;
    purge: HttpRouterMatcher<this>;
    report: HttpRouterMatcher<this>;
    search: HttpRouterMatcher<this>;
    subscribe: HttpRouterMatcher<this>;
    trace: HttpRouterMatcher<this>;
    unlock: HttpRouterMatcher<this>;
    unsubscribe: HttpRouterMatcher<this>;
    use: HttpRooterHandler<this> & HttpRouterMatcher<this>;
    route(prefix: HttpPathLike): HttpRoute;
    stack: any[];
}
export interface HttpRoute {
    path: string;
    stack: any;
    all: HttpRooterHandler<this>;
    get: HttpRooterHandler<this>;
    post: HttpRooterHandler<this>;
    put: HttpRooterHandler<this>;
    delete: HttpRooterHandler<this>;
    patch: HttpRooterHandler<this>;
    options: HttpRooterHandler<this>;
    head: HttpRooterHandler<this>;

    checkout: HttpRooterHandler<this>;
    copy: HttpRooterHandler<this>;
    lock: HttpRooterHandler<this>;
    merge: HttpRooterHandler<this>;
    mkactivity: HttpRooterHandler<this>;
    mkcol: HttpRooterHandler<this>;
    move: HttpRooterHandler<this>;
    'm-search': HttpRooterHandler<this>;
    notify: HttpRooterHandler<this>;
    purge: HttpRooterHandler<this>;
    report: HttpRooterHandler<this>;
    search: HttpRooterHandler<this>;
    subscribe: HttpRooterHandler<this>;
    trace: HttpRooterHandler<this>;
    unlock: HttpRooterHandler<this>;
    unsubscribe: HttpRooterHandler<this>;
}
export interface HttpApplication extends EventEmitter, AbstractEventLike<HttpApplication>, HttpRouterSelf, Express.Application {
    // region properties
    _router: any;
    locals: unknown;
    map: any;
    mountpath: OneOrMore<string>;
    resource: any;
    router: string;
    routes: any;
    settings: any;
    // endregion properties

    // region methods
    init(): void;
    defaultConfiguration(): void;
    engine(path: string, options: ObjectLike, callback: HttpAppEngineLambda): HttpApplication;
    set(setting: string, val: any): this;
    path(): string;
    enabled(setting: string): boolean;
    disabled(setting: string): boolean;
    enable(setting: string): this;
    disable(setting: string): this;
    render(name: string, options?: object, callback?: HttpAppRenderLambda): void;
    render(name: string, callback: HttpAppRenderLambda): void;
    listen(port: number, hostname: string, backlog: number, callback?: Func0): http.Server;
    listen(port: number, hostname: string, callback?: Func0): http.Server;
    listen(port: number, callback?: Func0): http.Server;
    listen(callback?: Func0): http.Server;
    listen(path: string, callback?: Func0): http.Server;
    listen(handle: any, listeningListener?: Func0): http.Server;
    // endregion methods
}
export type HttpCallLike<C = RecLike> = CoreCallLike<C, HttpRequest, HttpResponse, HttpApplication, HttpNext>;