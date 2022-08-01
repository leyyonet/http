import {Application, MediaType, Request} from "express";
import {RecLike, HttpMethod, leyyo, logger, FuncLike, emptyFn, OneOrMore} from "@leyyo/core";
import {Socket} from "net";
import {IncomingHttpHeaders} from "http";
import RangeParser from "range-parser";
import { Response, NextFunction } from "express-serve-static-core";
import {MockRequestLike, MockServiceRequest, PipeOption, RequestBody, RequestErrorCallback} from "./index-types";
import {Fqn} from "@leyyo/fqn";
import {FQN_NAME} from "../internal-component";
import {MockApplication} from "../application";

// noinspection JSUnusedGlobalSymbols
@Fqn(...FQN_NAME)
export class MockRequest<T = RequestBody, L extends RecLike = RecLike> implements MockRequestLike<T, L>, RecLike {
    readonly isFake: boolean;
    locals: L;

    [key: string]: unknown;
    [Symbol.asyncIterator](): AsyncIterableIterator<any> {
        throw new Error("Method not implemented.");
    }
    res?: Response<unknown, L>;
    next?: NextFunction;
    closed: boolean;
    errored: Error;

    aborted: boolean;
    accepted: MediaType[];
    app: Application;
    baseUrl: string;
    body: RequestBody;
    complete: boolean;
    connection: Socket;
    cookies: any;


    destroyed: boolean;
    fresh: boolean;
    headers: IncomingHttpHeaders;
    host: string;
    hostname: string;
    httpVersion: string;
    httpVersionMajor: number;
    httpVersionMinor: number;
    ip: string;
    ips: string[];



    method: string;
    originalUrl: string;
    params: RecLike;
    path: string;


    protocol: string;


    query: RecLike;
    rawHeaders: string[];
    rawTrailers: string[];


    readable: boolean;
    readonly readableAborted: boolean;
    readonly readableDidRead: boolean;
    readonly readableEncoding: BufferEncoding | null;
    readonly readableEnded: boolean;
    readonly readableFlowing: boolean | null;
    readonly readableHighWaterMark: number;
    readonly readableLength: number;
    readonly readableObjectMode: boolean;
    route: any;
    secure: boolean;
    signedCookies: any;
    socket: Socket;
    stale: boolean;
    statusCode: number | undefined;
    statusMessage: string | undefined;
    subdomains: string[];
    trailers: NodeJS.Dict<string>;
    url: string;
    xhr: boolean;

    constructor(service?: MockServiceRequest, origin?: Request, custom?: RecLike) {
        if (!leyyo.is.object(service)) {
            service = {
                method: HttpMethod.GET,
                url: '/',
                body: {},
                headers: {},
                cookies: {},
                signedCookies: {}
            };
        }
        this.isFake = true;
        this.method = service?.method ?? HttpMethod.GET;
        this.url = service?.url ?? '';
        this.body = service?.body as T;
        this.headers = leyyo.is.object(service?.headers) ? service.headers : {};
        this.cookies = leyyo.is.object(service?.cookies) ? service.cookies : {};
        this.signedCookies = leyyo.is.object(service?.signedCookies) ? service.signedCookies : {};
        if (!origin?.app) {
            this.app = new MockApplication() as Application;
        } else {
            this.app = origin.app;
        }
        if (origin) {
            for (const [prop, value] of Object.entries(origin)) {
                switch (prop) {
                    case 'method':
                    case 'url':
                    case 'body':
                        break;
                    case 'headers':
                    case 'cookies':
                    case 'signedCookies':
                        if (leyyo.is.object(value)) {
                            for (const [k, v] of Object.entries(value)) {
                                if (this[prop][k] === undefined) {
                                    this[prop][k] = v;
                                }
                            }
                        }
                        break;
                    default:
                        switch (typeof value) {
                            case "symbol":
                            case "bigint":
                            case "number":
                            case "string":
                            case "boolean":
                                this[prop] = value;
                                break;
                            case "object":
                                if (leyyo.is.array(value, true)) {
                                    this[prop] = [...value];
                                } else if (leyyo.is.object(value, true)) {
                                    this[prop] = {...value};
                                }
                                break;
                        }
                        break;
                }
            }
        }
        if (!this.route) {
            this.route = {
                path: this.path,
                stack: [],
                methods: {[this.method]: true,},
            };
        }
        if (leyyo.is.object(custom)) {
            for (const [key, value] of Object.entries(custom)) {
                if (typeof this[key] !== undefined) {
                    LOG.warn('request.forbidden.custom', {key, actual: typeof value});
                } else {
                    this[key] = value;
                }
            }
        }
    }


    _construct(callback: RequestErrorCallback): void {
        emptyFn();
    }

    _destroy(error: Error | null, callback: RequestErrorCallback): void {
        emptyFn();
    }

    _read(size: number): void {
        emptyFn();
    }
    destroy(error?: Error): this {
        return this;
    }
    read(size: number | undefined): string | Buffer {
        return undefined;
    }
    push(chunk: any, encoding?: BufferEncoding): boolean {
        return false;
    }
    isPaused(): boolean {
        return false;
    }
    resume(): this {
        return this;
    }


    setEncoding(encoding: BufferEncoding): this {
        return this;
    }

    setTimeout(msecs: number, callback?: FuncLike): this {
        return this;
    }



    unpipe(destination?: NodeJS.WritableStream): this {
        return this;
    }

    unshift(chunk: string | Uint8Array, encoding?: BufferEncoding): void {
        emptyFn();
    }


    wrap(stream: NodeJS.ReadableStream): this {
        return undefined;
    }

    accepts(): string[];
    accepts(type: string): string | false;
    accepts(type: string[]): string | false;
    accepts(...type: string[]): string | false;
    accepts(...type: (string | string[])[]): string[] | string | false {
        return false;
    }

    acceptsCharsets(): string[];
    acceptsCharsets(charset: string): string | false;
    acceptsCharsets(charset: string[]): string | false;
    acceptsCharsets(...charset: string[]): string | false;
    acceptsCharsets(...charset: (string | string[])[]): string[] | string | false {
        return false;
    }

    acceptsEncodings(): string[];
    acceptsEncodings(encoding: string): string | false;
    acceptsEncodings(encoding: string[]): string | false;
    acceptsEncodings(...encoding: string[]): string | false;
    acceptsEncodings(...encoding: (string | string[])[]): string[] | string | false {
        return false;
    }

    acceptsLanguages(): string[];
    acceptsLanguages(lang: string): string | false;
    acceptsLanguages(lang: string[]): string | false;
    acceptsLanguages(...lang: string[]): string | false;
    acceptsLanguages(...lang: (string | string[])[]): string[] | string | false {
        return false;
    }

    addListener(eventName: string | symbol, listener: FuncLike): this {
        return this;
    }

    emit(eventName: string | symbol, ...args: any[]): boolean {
        return false;
    }

    eventNames(): Array<string | symbol> {
        return [];
    }

    get(name: "set-cookie"): string[] | undefined;
    get(name: string): string | undefined;
    get(name: "set-cookie" | string): string[] | undefined | string {
        return this.header(name);
    }

    getMaxListeners(): number {
        return 0;
    }

    header(name: "set-cookie"): string[] | undefined;
    header(name: string): string | undefined;
    header(name: "set-cookie" | string): string[] | undefined | string {
        return (typeof name === 'string') ? this.headers[name] as string : undefined;
    }

    is(type: string | string[]): string | false | null {
        return undefined;
    }

    listenerCount(eventName: string | symbol): number {
        return 0;
    }

    listeners(eventName: string | symbol): Array<FuncLike> {
        return [];
    }

    off(eventName: string | symbol, listener: FuncLike): this {
        return this;
    }

    on(eventName: string | symbol, listener: FuncLike): this {
        return this;
    }

    once(eventName: string | symbol, listener: FuncLike): this {
        return this;
    }

    param(name: string, defaultValue?: any): string {
        return (typeof name === 'string') ? this.params[name] as string : undefined;
    }

    pause(): this {
        return this;
    }

    pipe<T>(destination: T, options?: PipeOption): T {
        return destination;
    }

    prependListener(eventName: string | symbol, listener: FuncLike): this {
        return this;
    }

    prependOnceListener(eventName: string | symbol, listener: FuncLike): this {
        return this;
    }

    range(size: number, options?: RangeParser.Options): RangeParser.Ranges | RangeParser.Result | undefined {
        return undefined;
    }

    rawListeners(eventName: string | symbol): Array<FuncLike> {
        return [];
    }


    removeAllListeners(event?: string | symbol): this {
        return this;
    }
    removeListener(eventName: string | symbol, listener: FuncLike): this {
        return this;
    }

    setMaxListeners(n: number): this {
        return this;
    }
}
const LOG = logger.assign(MockRequest);