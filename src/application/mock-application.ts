import {Application, RequestParamHandler, Router} from "express";
import * as http from "http";
import {MockApplicationLike} from "./index.types";
import {HttpEvent} from "../shared";
import {$log, Logger} from "@leyyo/common";

let _firstOrigin: Application;

// noinspection JSUnusedGlobalSymbols
export class MockApplication extends HttpEvent<Application> implements MockApplicationLike {
    _router: any;
    locals: Record<string, any>;
    map: any;
    mountpath: string | string[];

    constructor(origin?: Application) {
        super(origin);
    }
    // region methods
    "m-search"(..._a: Array<unknown>): this {
        logger.warn('Should not be called', {fn: 'm-search'});
        return this;
    }

    options(..._a: Array<unknown>): this {
        logger.warn('Should not be called', {fn: 'options'});
        return this;
    }

    patch(..._a: Array<unknown>): this {
        logger.warn('Should not be called', {fn: 'patch'});
        return this;
    }

    post(..._a: Array<unknown>): this {
        logger.warn('Should not be called', {fn: 'post'});
        return this;
    }

    propfind(..._a: Array<unknown>): this {
        logger.warn('Should not be called', {fn: 'propfind'});
        return this;
    }

    proppatch(..._a: Array<unknown>): this {
        logger.warn('Should not be called', {fn: 'proppatch'});
        return this;
    }

    purge(..._a: Array<unknown>): this {
        logger.warn('Should not be called', {fn: 'purge'});
        return this;
    }

    put(..._a: Array<unknown>): this {
        logger.warn('Should not be called', {fn: 'put'});
        return this;
    }

    report(..._a: Array<unknown>): this {
        logger.warn('Should not be called', {fn: 'report'});
        return this;
    }

    link(..._a: Array<unknown>): this {
        logger.warn('Should not be called', {fn: 'link'});
        return this;
    }

    unlink(..._a: Array<unknown>): this {
        logger.warn('Should not be called', {fn: 'unlink'});
        return this;
    }

    all(..._a: Array<unknown>): this {
        logger.warn('Should not be called', {fn: 'all'});
        return this;
    }

    checkout(..._a: Array<unknown>): this {
        logger.warn('Should not be called', {fn: 'checkout'});
        return this;
    }

    connect(..._a: Array<unknown>): this {
        logger.warn('Should not be called', {fn: 'connect'});
        return this;
    }

    copy(..._a: Array<unknown>): this {
        logger.warn('Should not be called', {fn: 'copy'});
        return this;
    }

    delete(..._a: Array<unknown>): this {
        logger.warn('Should not be called', {fn: 'delete'});
        return this;
    }

    get(..._a: Array<unknown>): this {
        logger.warn('Should not be called', {fn: 'get'});
        return this;
    }

    head(..._a: Array<unknown>): this {
        logger.warn('Should not be called', {fn: 'head'});
        return this;
    }

    lock(..._a: Array<unknown>): this {
        logger.warn('Should not be called', {fn: 'lock'});
        return this;
    }

    merge(..._a: Array<unknown>): this {
        logger.warn('Should not be called', {fn: 'merge'});
        return this;
    }

    mkactivity(..._a: Array<unknown>): this {
        logger.warn('Should not be called', {fn: 'mkactivity'});
        return this;
    }

    mkcol(..._a: Array<unknown>): this {
        logger.warn('Should not be called', {fn: 'mkcol'});
        return this;
    }

    move(..._a: Array<unknown>): this {
        logger.warn('Should not be called', {fn: 'move'});
        return this;
    }

    notify(..._a: Array<unknown>): this {
        logger.warn('Should not be called', {fn: 'notify'});
        return this;
    }

    search(..._a: Array<unknown>): this {
        logger.warn('Should not be called', {fn: 'search'});
        return this;
    }

    subscribe(..._a: Array<unknown>): this {
        logger.warn('Should not be called', {fn: 'subscribe'});
        return this;
    }

    trace(..._a: Array<unknown>): this {
        logger.warn('Should not be called', {fn: 'trace'});
        return this;
    }

    unlock(..._a: Array<unknown>): this {
        logger.warn('Should not be called', {fn: 'unlock'});
        return this;
    }

    unsubscribe(..._a: Array<unknown>): this {
        logger.warn('Should not be called', {fn: 'unsubscribe'});
        return this;
    }

    use(..._a: Array<unknown>): this {
        logger.warn('Should not be called', {fn: 'use'});
        return this;
    }

    // endregion methods

    resource: any;
    router: Router;
    routes: any;
    settings: any;
    stack: any[];

    // region static
    // noinspection JSUnusedGlobalSymbols
    static setFirstOrigin(origin: Application): void {
        if ( !_firstOrigin && origin) {
            _firstOrigin = origin;
        }
    }
    static get firstOrigin(): Application {
        return _firstOrigin;
    }

    // endregion static

    defaultConfiguration(): void {
        logger.warn('Should not be called', {fn: 'defaultConfiguration'});
    }

    disable(_s: string): this {
        logger.warn('Should not be called', {fn: 'disable'});
        return this;
    }

    disabled(_s: string): boolean {
        logger.warn('Should not be called', {fn: 'disabled'});
        return false;
    }

    enable(_s: string): this {
        logger.warn('Should not be called', {fn: 'enable'});
        return this;
    }

    enabled(_s: string): boolean {
        logger.warn('Should not be called', {fn: 'enabled'});
        return false;
    }

    engine(_e: string, _f: (path: string, options: object, callback: (e: any, rendered?: string) => void) => void): this {
        logger.warn('Should not be called', {fn: 'engine'});
        return this;
    }

    init(): void {
        logger.warn('Should not be called', {fn: 'init'});
    }

    listen(_p?: any, _h?: string | (() => void), _b?: number | (() => void), _c?: () => void): http.Server {
        logger.warn('Should not be called', {fn: 'listen'});
        return undefined;
    }

    param(name: string | string[] | ((name: string, matcher: RegExp) => RequestParamHandler), handler?: RequestParamHandler): this {
        return this._origin?.param(name as string, handler) as unknown as this;
    }

    path(): string {
        return this._origin?.path();
    }

    render(_n: string, _o?: object | ((err: Error, html: string) => void), _c?: (err: Error, html: string) => void): void {
        logger.warn('Should not be called', {fn: 'render'});
    }

    route(_p: unknown): any {
        logger.warn('Should not be called', {fn: 'route'});
    }

    set(_s: string, _v: any): this {
        logger.warn('Should not be called', {fn: 'set'});
        return this;
    }
}

const logger: Logger = $log.create(MockApplication);
