import {Fqn, leyyo, OneOrMore, RecLike} from "@leyyo/core";
import {OutgoingHttpHeaders} from "http";
import {Response} from "express";
import {Socket} from "net";
import mime from "mime";
import {HttpResponseCookieOption, HttpResponseFakeResolver, HttpResponseCookie, HttpResponse} from "./types";
import {LY_INT_FQN} from "../internal";
import {HttpApplication} from "../application";
import {HttpRequest} from "../request";
import {AbstractEvent} from "../event";


// noinspection JSUnusedGlobalSymbols
@Fqn(...LY_INT_FQN)
export class MockResponse extends AbstractEvent<HttpResponse> implements HttpResponse {
    [key: string]: unknown;

    // region statics
    static fake(resolver: HttpResponseFakeResolver, origin?: Response | HttpResponse): HttpResponse {
        const res = new MockResponse();
        if (typeof resolver != "function") {
            // noinspection JSUnusedLocalSymbols
            resolver = (dto => {
                leyyo.emptyFn();
            }) as HttpResponseFakeResolver;
        }
        res._resolver = resolver;
        res._$isFake = true;

        if (origin) {
            for (const [k, v] of Object.entries(origin)) {
                res[k] = v;
            }
            res.$set('locals', leyyo.primitive.isObjectFilled(origin.locals) ? {...origin.locals} : {});
        }
        res._$headerSent = false;
        res._clear();
        return res;
    }
    static clone(res: Response | HttpResponse): HttpResponse {
        if (res instanceof MockResponse) {
            return res;
        }
        const ins = new MockResponse();
        ins.$setOrigin(res as HttpResponse);
        return ins;
    }
    // endregion statics

    // region custom
    private _resolver: HttpResponseFakeResolver;
    private _$headerSent: boolean; // after send it is true
    private _$duration?: number;
    private _$error?: Error;
    private _headers: RecLike<OneOrMore<string>>;
    private _cookies: RecLike<HttpResponseCookie>;
    private _clearedCookies: RecLike<HttpResponseCookieOption>;
    private _data: unknown;
    private _status: number;
    private _send(data?: unknown): this {
        if (!this._$headerSent) {
            this._$headerSent = true;
            if (data !== undefined) {
                this._data = data;
            }
            this._resolver({
                status: this._status,
                statusMessage: this.statusMessage,
                headers: this._headers,
                cookies: this._cookies,
                clearedCookies: this._clearedCookies,
                data: this._data,
                locals: this.locals,
            });
        }
        return this;
    }
    private _setHeader(key: string, value: OneOrMore<string>): this {
        this._headers[key] = value;
        return this;
    }

    private _setCookie(key: string, value: string, opt?: HttpResponseCookieOption): this {
        this._cookies[key] = {value, opt};
        return this;
    }

    private _cancelCookieClear(key: string): boolean {
        if (this._clearedCookies[key] !== undefined) {
            delete this._clearedCookies[key];
            return true
        }
        return false;
    }

    private _clear() {
        this.statusMessage = undefined;
        this._headers = {}
        this._cookies = {};
        this._clearedCookies = {};
        this._data = undefined;
        this._status = 200;
    }
    protected _refactor(): void {
        this.flushHeaders = (): void => {
            this._headers = {};
        }
        this.getHeader = (...a): number | OneOrMore<string> => {
            return this.get(...a);
        }
        this.getHeaderNames = (): Array<string> => {
            return this._headers ? Object.keys(this._headers) : [];
        }
        this.getHeaders = (): OutgoingHttpHeaders => {
            return this._headers ?? {};
        }
        this.hasHeader = (...a): boolean => {
            return this.getHeaderNames().includes(a[0] as string);
        }
        this.json = (...a): this => {
            this._setHeader('Content-Type', 'application/json');
            this._send(a[0] ?? null);
            return this;
        }
        this.jsonp = (...a): this => {
            this._setHeader('Content-Type', 'application/json');
            this._send(a[0] ?? null);
            return this;
        }
        this.removeHeader = (...a): void => {
            if (this._headers && typeof a[0] === 'string') {
                delete this._headers[a[0] as string];
            }
        }
        this.send = (...a): this => {
            this._send(a[0] ?? null);
            return this;
        }
        this.append = (...a): this => {
            return this._setHeader(a[0] as string, a[1] as string);
        }
        this.attachment = (...a): this => {
            const filename = (typeof a[0] === 'string') ? `; filename="${a[0] as string}"` : '';
            return this._setHeader('Content-Disposition', `attachment${filename}`);
        }
        this.clearCookie = (...a): this => {
            this._clearedCookies[a[0] as string] = a[1] as HttpResponseCookieOption;
            return this;
        }
        this.contentType = (...a): this => {
            return this.type(...a);
        }
        this.cookie = (...a): this => {
            const key = a[0] as string | RecLike;
            const value = a[1] as string | HttpResponseCookieOption;
            const option = a[2] as HttpResponseCookieOption;
            if (typeof key === 'string') {
                this._cancelCookieClear(key);
                return this._setCookie(key, value as string, option);
            }
            if (leyyo.primitive.isObjectFilled(key)) {
                for (const [k, v] of Object.entries(key)) {
                    this._cancelCookieClear(k);
                    this._setCookie(k, v as string, (value ?? option) as HttpResponseCookieOption);
                }
            }
            return this;
        }
        this.end = (): this => {
            this._clear();
            this._send();
            return this;
        }
        this.get = (...a): string => {
            return (typeof a[0] === 'string') ? this._headers[a[0]] as string : undefined;
        }
        this.header = (...a): this => {
            return this._setHeader(a[0] as string, a[1] as string);
        }
        this.links = (...a): this => {
            const map = a[0] as RecLike;
            if (leyyo.primitive.isObjectFilled(map)) {
                const values = [];
                for (const [k, v] of Object.entries(map)) {
                    values.push(`<${v}>; rel="${k}"`);
                }
                if (values.length > 0) {
                    this._setHeader('Link', values);
                }
            }
            return this;
        }
        this.sendStatus = (...a): this => {
            this._status = a[0] as number;
            this._send();
            return this;
        }
        this.set = (...a): this => {
            if (typeof a[0] === 'string') {
                return this._setHeader(a[0] as string, a[1] as string);
            }
            if (leyyo.primitive.isObjectFilled(a[0])) {
                for (const [k, v] of Object.entries(a[0])) {
                    this._setHeader(k, v as string);
                }
            }
            return this;
        }
        this.status = (...a): this => {
            this._status = a[0] as number;
            return this;
        }
        this.type = (...a): this => {
            const type = a[0] as string;
            if (typeof type === 'string') {
                if (type.includes('/')) {
                    this.header('Content-Type', type);
                } else {
                    this.header('Content-Type', mime.getType(type));
                }
            }
            return this;
        }
        this.vary = (...a): this => {
            this.header('Vary', a[0] as string);
            return this;
        }
    }

    get duration(): number {
        return this._$duration;
    }
    get isFake(): boolean {
        return this._$isFake;
    }
    get error(): Error {
        return this._$error;
    }
    $setRelations(app: HttpApplication, req: HttpRequest): void {
        this.$set('app', app);
        this.$set('req', req);

    }
    // endregion custom


    // region properties
    get req(): HttpRequest {return this.$get<HttpRequest>('req');}
    get app(): HttpApplication {return this.$get<HttpApplication>('app');}
    get connection(): Socket {return this.$get<Socket>('connection');}
    get writable(): boolean {return this.$get<boolean>('writable');}
    get writableCorked(): number {return this.$get<number>('writableCorked');}
    get writableEnded(): boolean {return this.$get<boolean>('writableEnded');}
    get writableFinished(): boolean {return this.$get<boolean>('writableFinished');}
    get writableHighWaterMark(): number {return this.$get<number>('writableHighWaterMark');}
    get writableLength(): number {return this.$get<number>('writableLength');}
    get writableObjectMode(): boolean {return this.$get<boolean>('writableObjectMode');}
    get socket(): Socket {return this.$get<Socket>('socket');}
    get locals(): RecLike {return this.$get<RecLike>('locals');}
    set locals(value: RecLike) {this.$set('locals', value);}
    get statusMessage(): string {return this.$get<string>('statusMessage');}
    set statusMessage(value: string) {this.$set('statusMessage', value);}
    get charset(): string {return this.$get<string>('charset');}
    set charset(value: string) {this.$set('charset', value);}
    get sendDate(): boolean {return this.$get<boolean>('sendDate');}
    set sendDate(value: boolean) {this.$set('sendDate', value);}
    get chunkedEncoding(): boolean {return this.$get<boolean>('chunkedEncoding');}
    set chunkedEncoding(value: boolean) {this.$set('chunkedEncoding', value);}
    get destroyed(): boolean {return this.$get<boolean>('destroyed');}
    set destroyed(value: boolean) {this.$set('destroyed', value);}
    get finished(): boolean {return this.$get<boolean>('finished');}
    set finished(value: boolean) {this.$set('finished', value);}
    get useChunkedEncodingByDefault(): boolean {return this.$get<boolean>('useChunkedEncodingByDefault');}
    set useChunkedEncodingByDefault(value: boolean) {this.$set('useChunkedEncodingByDefault', value);}
    get shouldKeepAlive(): boolean {return this.$get<boolean>('shouldKeepAlive');}
    set shouldKeepAlive(value: boolean) {this.$set('shouldKeepAlive', value);}
    get closed(): boolean {return this.$get<boolean>('closed');}
    set closed(value: boolean) {this.$set('closed', value);}
    get writableNeedDrain(): boolean {return this.$get<boolean>('writableNeedDrain');}
    set writableNeedDrain(value: boolean) {this.$set('writableNeedDrain', value);}
    get headersSent(): boolean {
        if (this._$isFake) {return this._$headerSent;}
        return this.$get<boolean>('headersSent');
    }
    set headersSent(value: boolean) {
        if (this._$isFake) {
            this._$isFake = value;
            return;
        }
        this.$set('headersSent', value);
    }
    get statusCode(): number {return this.$get<number>('statusCode');}
    set statusCode(value: number) {this.$set('statusCode', value);}
    get errored(): Error {return this.$get<Error>('errored');}
    set errored(value: Error) {this.$set('errored', value);}
    // endregion properties

    // region methods
    _construct(...a): void {
        this.$call('_construct', ...a);
    }
    _destroy(...a): void {
        this.$call('_destroy', ...a);
    }
    _final(...a): void {
        this.$call('_final', ...a);
    }
    _write(...a): void {
        this.$call('_write', ...a);
    }
    _writev(...a): void {
        this.$call('_writev', ...a);
    }
    addTrailers(...a): void {
        this.$call('addTrailers', ...a);
    }
    assignSocket(...a): void {
        this.$call('assignSocket', ...a);
    }
    cork(...a): void {
        this.$call('cork', ...a);
    }
    destroy(...a): this {
        this.$call('destroy', ...a);
        return this;
    }
    detachSocket(...a): void {
        this.$call('detachSocket', ...a);
    }
    flushHeaders(...a): void {
        this.$call('flushHeaders', ...a);
    }
    getHeader(...a): number | OneOrMore<string> {
        return this.$call<number | OneOrMore<string>>('getHeader', ...a);
    }
    getHeaderNames(...a): Array<string> {
        return this.$call<Array<string>>('getHeaderNames', ...a);
    }
    getHeaders(...a): OutgoingHttpHeaders {
        return this.$call<OutgoingHttpHeaders>('getHeaders', ...a);
    }
    hasHeader(...a): boolean {
        return this.$call<boolean>('hasHeader', ...a);
    }
    json(...a): this {
        this.$call('json', ...a);
        return this;
    }
    jsonp(...a): this {
        this.$call('jsonp', ...a);
        return this;
    }
    pipe<T>(...a): T {
        return this.$call<T>('pipe', ...a);
    }
    removeHeader(...a): void {
        this.$call('removeHeader', ...a);
    }
    send(...a): this {
        this.$call('send', ...a);
        return this;
    }
    setDefaultEncoding(...a): this {
        this.$call('setDefaultEncoding', ...a);
        return this;
    }
    setHeader(...a): this {
        this.$call('setHeader', ...a);
        return this;
    }
    setTimeout(...a): this {
        this.$call('setTimeout', ...a);
        return this;
    }
    uncork(...a): void {
        this.$call('uncork', ...a);
    }
    writeContinue(...a): void {
        this.$call('writeContinue', ...a);
    }
    writeProcessing(...a): void {
        this.$call('writeProcessing', ...a);
    }
    append(...a): this {
        this.$call('append', ...a);
        return this;
    }
    attachment(...a): this {
        this.$call('attachment', ...a);
        return this;
    }
    clearCookie(...a): this {
        this.$call('clearCookie', ...a);
        return this;
    }
    contentType(...a): this {
        this.$call('contentType', ...a);
        return this;
    }
    cookie(...a): this {
        this.$call('cookie', ...a);
        return this;
    }
    download(...a): void {
        this.$call('download', ...a);
    }
    end(...a): this {
        this.$call('end', ...a);
        return this;
    }
    format(...a): this {
        this.$call('format', ...a);
        return this;
    }
    get(...a): string {
        return this.$call<string>('get', ...a);
    }
    header(...a): this {
        this.$call('header', ...a);
        return this;
    }
    links(...a): this {
        this.$call('links', ...a);
        return this;
    }
    location(...a): this {
        this.$call('location', ...a);
        return this;
    }
    redirect(...a): void {
        this.$call('redirect', ...a);
    }
    render(...a): void {
        this.$call('render', ...a);
    }
    sendFile(...a): void {
        this.$call('sendFile', ...a);
    }
    sendStatus(...a): this {
        this.$call('sendStatus', ...a);
        return this;
    }
    sendfile(...a): void {
        this.$call('sendfile', ...a);
    }
    set(...a): this {
        this.$call('set', ...a);
        return this;
    }
    status(...a): this {
        this.$call('status', ...a);
        return this;
    }
    type(...a): this {
        this.$call('type', ...a);
        return this;
    }
    vary(...a): this {
        this.$call('vary', ...a);
        return this;
    }
    write(...a): boolean {
        return this.$call<boolean>('write', ...a);
    }
    writeHead(...a): this {
        this.$call('writeHead', ...a);
        return this;
    }
    writeEarlyHints(...a): void {
        this.$call('writeEarlyHints', ...a);
    }

    // endregion methods
}