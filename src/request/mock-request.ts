import {Fqn, HttpMethod, leyyo, OneOrMore, RecLike} from "@leyyo/core";
import {Socket} from "net";
import {IncomingHttpHeaders} from "http";
import {Request} from "express";
import RangeParser from "range-parser";
import {
    HttpRequestMedia,
    HttpRequestService,
    HttpRequestFile,
    HttpRequest,
    HttpContextLike,
    HttpRequestLocals
} from "./types";
import {LY_INT_FQN} from "../internal";
import {HttpApplication, HttpNext} from "../application";
import {AbstractEvent} from "../event";
import {HttpResponse} from "../response";

// noinspection JSUnusedGlobalSymbols
@Fqn(...LY_INT_FQN)
export class MockRequest<C extends HttpContextLike = HttpContextLike, L extends HttpRequestLocals<C> = HttpRequestLocals<C>> extends AbstractEvent<HttpRequest> implements HttpRequest<C, L> {
    protected _$lyChecked: boolean;
    [key: string]: unknown;
    [Symbol.asyncIterator](): AsyncIterableIterator<any> {
        throw new Error("Method not implemented.");
    }

    // region statics
    protected static _checkRoute(req: HttpRequest) {
        if (!req.route) {
            req.$set('route', {
                path: req.path,
                stack: [],
                methods: {[req.method]: true},
            });
        }
    }
    static fake(service: HttpRequestService, origin?: Request | HttpRequest): HttpRequest {
        const req = new MockRequest();
        req._$isFake = true;
        if (!leyyo.primitive.isObject(service)) {
            service = {
                method: 'get',
                url: '/',
                body: {},
                headers: {},
                cookies: {},
                signedCookies: {}
            };
        }
        if (origin) {
            for (const [k, v] of Object.entries(origin)) {
                req[k] = v;
            }
        }
        req.$set('method', service?.method ?? HttpMethod.GET);
        req.$set('url', service?.url ?? '');
        req.$set('body', service?.body);
        req.$set('headers', leyyo.primitive.isObject(service?.headers) ? service.headers : {});
        req.$set('cookies', leyyo.primitive.isObject(service?.cookies) ? service.cookies : {});
        req.$set('signedCookies', leyyo.primitive.isObject(service?.signedCookies) ? service.signedCookies : {});
        this._checkRoute(req);
        return req;
    }
    static clone(req: Request | HttpRequest): HttpRequest {
        if (req instanceof MockRequest) {
            return req;
        }
        const ins = new MockRequest();
        ins.$setOrigin(req as HttpRequest);
        return ins;
    }
    // endregion statics

    // region properties
    get readableAborted(): boolean {return this.$get<boolean>('readableAborted');}
    get readableDidRead(): boolean {return this.$get<boolean>('readableDidRead');}
    get readableEncoding(): BufferEncoding {return this.$get<BufferEncoding>('readableEncoding');}
    get readableEnded(): boolean {return this.$get<boolean>('readableEnded');}
    get readableFlowing(): boolean {return this.$get<boolean>('readableFlowing');}
    get readableHighWaterMark(): number {return this.$get<number>('readableHighWaterMark');}
    get readableLength(): number {return this.$get<number>('readableLength');}
    get readableObjectMode(): boolean {return this.$get<boolean>('readableObjectMode');}
    get res(): HttpResponse {return this.$get<HttpResponse>('res');}
    get next(): HttpNext {return this.$get<HttpNext>('next');}
    get app(): HttpApplication {return this.$get<HttpApplication>('app');}
    get route(): unknown {return this.$get('route');} // todo

    get body(): unknown {return this.$get('body');}
    set body(value: unknown) {this.$set('body', value);}
    get cookies(): RecLike {return this.$get<RecLike>('cookies');}
    set cookies(value: RecLike) {this.$set('cookies', value);}
    get headers(): IncomingHttpHeaders {return this.$get<IncomingHttpHeaders>('headers');}
    set headers(value: IncomingHttpHeaders) {this.$set('headers', value);}
    get params(): RecLike {return this.$get<RecLike>('params');}
    set params(value: RecLike) {this.$set('params', value);}
    get query(): RecLike {return this.$get<RecLike>('query');}
    set query(value: RecLike) {this.$set('query', value);}
    get signedCookies(): RecLike {return this.$get<RecLike>('signedCookies');}
    set signedCookies(value: RecLike) {this.$set('signedCookies', value);}
    get files(): RecLike<HttpRequestFile> {return this.$get<RecLike<HttpRequestFile>>('files');}
    set files(value: RecLike<HttpRequestFile>) {this.$set('files', value);}
    get locals(): L {
        const value = this.$get<L>('locals');
        if (this._$lyChecked) {
            return value;
        }
        return this._checkLocal(value);
    }
    set locals(value: L) {
        this._checkLocal(value);
    }


    get method(): string {return this.$get<string>('method');}
    set method(value: string) {this.$set('method', value);}
    get url(): string {return this.$get<string>('url');}
    set url(value: string) {this.$set('url', value);}
    get originalUrl(): string {return this.$get<string>('originalUrl');}
    set originalUrl(value: string) {this.$set('originalUrl', value);}
    get path(): string {return this.$get<string>('path');}
    set path(value: string) {this.$set('path', value);}
    get baseUrl(): string {return this.$get<string>('baseUrl');}
    set baseUrl(value: string) {this.$set('baseUrl', value);}
    get host(): string {return this.$get<string>('host');}
    set host(value: string) {this.$set('host', value);}
    get hostname(): string {return this.$get<string>('hostname');}
    set hostname(value: string) {this.$set('hostname', value);}
    get ip(): string {return this.$get<string>('ip');}
    set ip(value: string) {this.$set('ip', value);}
    get ips(): Array<string> {return this.$get<Array<string>>('ips');}
    set ips(value: Array<string>) {this.$set('ips', value);}
    get protocol(): string {return this.$get<string>('protocol');}
    set protocol(value: string) {this.$set('protocol', value);}
    get httpVersion(): string {return this.$get<string>('httpVersion');}
    set httpVersion(value: string) {this.$set('httpVersion', value);}
    get statusMessage(): string {return this.$get<string>('statusMessage');}
    set statusMessage(value: string) {this.$set('statusMessage', value);}
    get httpVersionMajor(): number {return this.$get<number>('httpVersionMajor');}
    set httpVersionMajor(value: number) {this.$set('httpVersionMajor', value);}
    get httpVersionMinor(): number {return this.$get<number>('httpVersionMinor');}
    set httpVersionMinor(value: number) {this.$set('httpVersionMinor', value);}
    get statusCode(): number {return this.$get<number>('statusCode');}
    set statusCode(value: number) {this.$set('statusCode', value);}
    get closed(): boolean {return this.$get<boolean>('closed');}
    set closed(value: boolean) {this.$set('closed', value);}
    get aborted(): boolean {return this.$get<boolean>('aborted');}
    set aborted(value: boolean) {this.$set('aborted', value);}
    get complete(): boolean {return this.$get<boolean>('complete');}
    set complete(value: boolean) {this.$set('complete', value);}
    get destroyed(): boolean {return this.$get<boolean>('destroyed');}
    set destroyed(value: boolean) {this.$set('destroyed', value);}
    get fresh(): boolean {return this.$get<boolean>('fresh');}
    set fresh(value: boolean) {this.$set('fresh', value);}
    get readable(): boolean {return this.$get<boolean>('readable');}
    set readable(value: boolean) {this.$set('readable', value);}
    get secure(): boolean {return this.$get<boolean>('secure');}
    set secure(value: boolean) {this.$set('secure', value);}
    get stale(): boolean {return this.$get<boolean>('stale');}
    set stale(value: boolean) {this.$set('stale', value);}
    get xhr(): boolean {return this.$get<boolean>('xhr');}
    set xhr(value: boolean) {this.$set('xhr', value);}
    get connection(): Socket {return this.$get<Socket>('connection');}
    set connection(value: Socket) {this.$set('connection', value);}
    get socket(): Socket {return this.$get<Socket>('socket');}
    set socket(value: Socket) {this.$set('socket', value);}
    get errored(): Error {return this.$get<Error>('errored');}
    set errored(value: Error) {this.$set('errored', value);}
    get trailers(): NodeJS.Dict<string> {return this.$get<NodeJS.Dict<string>>('trailers');}
    set trailers(value: NodeJS.Dict<string>|RecLike<string>) {this.$set('trailers', value);}
    get accepted(): Array<HttpRequestMedia> {return this.$get<Array<HttpRequestMedia>>('accepted');}
    set accepted(value: Array<HttpRequestMedia>) {this.$set('accepted', value);}
    get subdomains(): Array<string> {return this.$get<Array<string>>('subdomains');}
    set subdomains(value: Array<string>) {this.$set('subdomains', value);}
    get rawHeaders(): Array<string> {return this.$get<Array<string>>('rawHeaders');}
    set rawHeaders(value: Array<string>) {this.$set('rawHeaders', value);}
    get rawTrailers(): Array<string> {return this.$get<Array<string>>('rawTrailers');}
    set rawTrailers(value: Array<string>) {this.$set('rawTrailers', value);}

    // endregion properties

    // region private
    protected _checkLocal(value: unknown): L {
        let data = value as L;
        if (!data) {
            data = {ly: {
                    context: {} as C,
                    base: {},
                    isolated: {},
                    cache: {}
                }
            } as L;
        } else if (!data.ly) {
            data.ly = {
                context: {} as C,
                base: {},
                isolated: {},
                cache: {}
            };
        } else {
            ['context', 'base', 'isolated', 'cache'].forEach(k => {
                if (!data.ly[k]) {
                    data.ly[k] = {};
                }
            })
        }
        this._$lyChecked = true;
        this.$set('locals', data);
        return data;
    }
    // endregion private

    // region custom
    $setRelations(app: HttpApplication, res: HttpResponse, next?: HttpNext): void {
        this.$set('app', app);
        this.$set('res', res);
        if (next) {
            this.$set('next', next);
        }
    }
    // endregion custom

    // region methods
    _construct(...a): void {
        this.$call('_construct', ...a);
    }
    _destroy(...a): void {
        this.$call('_destroy', ...a);
    }
    _read(...a): void {
        this.$call('_read', ...a);
    }
    destroy(...a): this {
        this.$call('destroy', ...a);
        return this;
    }
    read(...a): string | Buffer {
        return this.$call<string | Buffer>('read', ...a);
    }
    push(...a): boolean {
        return this.$call<boolean>('push', ...a);
    }
    isPaused(...a): boolean {
        return this.$call<boolean>('isPaused', ...a);
    }
    resume(...a): this {
        this.$call('resume', ...a);
        return this;
    }
    setEncoding(...a): this {
        this.$call('setEncoding', ...a);
        return this;
    }
    setTimeout(...a): this {
        this.$call('setTimeout', ...a);
        return this;
    }
    unpipe(...a): this {
        this.$call('unpipe', ...a);
        return this;
    }
    unshift(...a): void {
        this.$call('unshift', ...a);
    }
    wrap(...a): this {
        this.$call('wrap', ...a);
        return this;
    }
    accepts(...a): OneOrMore<string> | false {
        return this.$call<OneOrMore<string> | false>('accepts', ...a);
    }
    acceptsCharsets(...a): OneOrMore<string> | false {
        return this.$call<OneOrMore<string> | false>('acceptsCharsets', ...a);
    }
    acceptsEncodings(...a): OneOrMore<string> | false {
        return this.$call<OneOrMore<string> | false>('acceptsEncodings', ...a);
    }
    acceptsLanguages(...a): OneOrMore<string> | false {
        return this.$call<OneOrMore<string> | false>('acceptsLanguages', ...a);
    }
    get(...a): OneOrMore<string> {
        return this.$call<OneOrMore<string>>('get', ...a);
    }
    header(...a): OneOrMore<string> {
        return this.$call<OneOrMore<string>>('header', ...a);
    }
    is(...a): string | false {
        return this.$call<string | false>('is', ...a);
    }
    param(...a): string {
        return this.$call<string>('param', ...a);
    }
    pause(...a): this {
        this.$call('pause', ...a);
        return this;
    }
    pipe<T>(...a): T {
        return this.$call<T>('pipe', ...a);
    }
    range(...a): RangeParser.Ranges | RangeParser.Result {
        return this.$call<RangeParser.Ranges | RangeParser.Result>('range', ...a);
    }
    // endregion methods
}