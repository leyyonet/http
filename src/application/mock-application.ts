import {Application, IRoute, IRouterMatcher, RequestParamHandler} from "express";
import * as http from "http";
import {emptyFn} from "@leyyo/core";

// noinspection JSUnusedGlobalSymbols
export class MockApplication {
    "m-search"(...a: Array<unknown>): this {return this;}
    _router: any;
    all(...a: Array<unknown>): this {return this;}
    checkout(...a: Array<unknown>): this {return this;}
    connect(...a: Array<unknown>): this {return this;}
    copy(...a: Array<unknown>): this {return this;}
    delete(...a: Array<unknown>): this {return this;}
    get: ((name: string) => any) & IRouterMatcher<this>;
    head(...a: Array<unknown>): this {return this;}
    locals: Record<string, any>;
    lock(...a: Array<unknown>): this {return this;}
    map: any;
    merge(...a: Array<unknown>): this {return this;}
    mkactivity(...a: Array<unknown>): this {return this;}
    mkcol(...a: Array<unknown>): this {return this;}
    mountpath: string | string[];
    move(...a: Array<unknown>): this {return this;}
    notify(...a: Array<unknown>): this {return this;}

    on(event: string, callback: (parent: Application) => void): this {
        return undefined;
    }

    options(...a: Array<unknown>): this {return this;}
    patch(...a: Array<unknown>): this {return this;}
    post(...a: Array<unknown>): this {return this;}
    propfind(...a: Array<unknown>): this {return this;}
    proppatch(...a: Array<unknown>): this {return this;}
    purge(...a: Array<unknown>): this {return this;}
    put(...a: Array<unknown>): this {return this;}
    report(...a: Array<unknown>): this {return this;}
    resource: any;
    router: string;
    routes: any;
    search(...a: Array<unknown>): this {return this;}
    settings: any;
    stack: any[];
    subscribe(...a: Array<unknown>): this {return this;}
    trace(...a: Array<unknown>): this {return this;}
    unlock(...a: Array<unknown>): this {return this;}
    unsubscribe(...a: Array<unknown>): this {return this;}
    use(...a: Array<unknown>): this {return this;}

    addListener(eventName: string | symbol, listener: (...args: any[]) => void): this {
        return undefined;
    }

    defaultConfiguration(): void {
        emptyFn();
    }

    disable(setting: string): this {
        return undefined;
    }

    disabled(setting: string): boolean {
        return false;
    }

    emit(eventName: string | symbol, ...args: any[]): boolean {
        return false;
    }

    enable(setting: string): this {
        return undefined;
    }

    enabled(setting: string): boolean {
        return false;
    }

    engine(ext: string, fn: (path: string, options: object, callback: (e: any, rendered?: string) => void) => void): this {
        return undefined;
    }

    eventNames(): Array<string | symbol> {
        return undefined;
    }

    getMaxListeners(): number {
        return 0;
    }

    init(): void {
        emptyFn();
    }

    listen(port?: any, hostname?: string | (() => void), backlog?: number | (() => void), callback?: () => void): http.Server {
        return undefined;
    }

    listenerCount(eventName: string | symbol): number {
        return 0;
    }

    listeners(eventName: string | symbol): Function[] {
        return [];
    }

    off(eventName: string | symbol, listener: (...args: any[]) => void): this {
        return undefined;
    }

    once(eventName: string | symbol, listener: (...args: any[]) => void): this {
        return undefined;
    }

    param(name: string | string[] | ((name: string, matcher: RegExp) => RequestParamHandler), handler?: RequestParamHandler): this {
        return undefined;
    }

    path(): string {
        return "";
    }

    prependListener(eventName: string | symbol, listener: (...args: any[]) => void): this {
        return undefined;
    }

    prependOnceListener(eventName: string | symbol, listener: (...args: any[]) => void): this {
        return undefined;
    }

    rawListeners(eventName: string | symbol): Function[] {
        return [];
    }

    removeAllListeners(event?: string | symbol): this {
        return undefined;
    }

    removeListener(eventName: string | symbol, listener: (...args: any[]) => void): this {
        return undefined;
    }

    render(name: string, options?: object | ((err: Error, html: string) => void), callback?: (err: Error, html: string) => void): void {
        emptyFn();
    }

    route(prefix): any {
        emptyFn();
    }

    set(setting: string, val: any): this {
        return undefined;
    }

    setMaxListeners(n: number): this {
        return undefined;
    }
}