import * as http from "http";
import {Application} from "express";
import {ArraySome, Fqn, OneOrMore, RecLike} from "@leyyo/core";
import {LY_INT_FQN} from "../internal";
import {HttpApplication, HttpRoute} from "./types";
import {AbstractEvent} from "../event";

// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols
@Fqn(...LY_INT_FQN)
export class MockApplication extends AbstractEvent<HttpApplication> implements HttpApplication {

    // region statics
    protected static _fake: HttpApplication;
    static get fake(): HttpApplication {
        if (!this._fake) {
            this._fake = new MockApplication();
            (this._fake as MockApplication)._$isFake = true;
        }
        return this._fake;
    }
    static clone(app: Application | HttpApplication): HttpApplication {
        if (!app) {
            return this.fake;
        }
        if (app instanceof MockApplication) {
            return app;
        }
        const ins = new MockApplication();
        ins.$setOrigin(app as HttpApplication);
        return ins;
    }
    // endregion statics

    // region custom
    // endregion custom

    // region properties
    get _router(): unknown {return this.$get('_router');} // todo
    set _router(value: unknown) {this.$set('_router', value);}

    get locals(): RecLike {return this.$get<RecLike>('locals');}
    set locals(value: RecLike) {this.$set('locals', value);}

    get map(): unknown {return this.$get<unknown>('map');} // todo
    set map(value: unknown) {this.$set('map', value);}

    get mountpath(): OneOrMore<string> {return this.$get<OneOrMore<string>>('mountpath');}
    set mountpath(value: OneOrMore<string>) {this.$set('mountpath', value);}

    get resource(): unknown {return this.$get<unknown>('resource');} // todo
    set resource(value: unknown) {this.$set('resource', value);}

    get router(): string {return this.$get<string>('router');}
    set router(value: string) {this.$set('router', value);}

    get routes(): unknown {return this.$get<unknown>('routes');} // todo
    set routes(value: unknown) {this.$set('routes', value);}

    get settings(): unknown {return this.$get<unknown>('settings');} // todo
    set settings(value: unknown) {this.$set('settings', value);}

    get stack(): ArraySome {return this.$get<ArraySome>('stack');}
    set stack(value: ArraySome) {this.$set('stack', value);}
    // endregion properties

    // region methods
    "m-search"(...a): this {
        this.$call('m-search', ...a);
        return this;
    }
    all(...a): this {
        this.$call('all', ...a);
        return this;
    }
    checkout(...a): this {
        this.$call('checkout', ...a);
        return this;
    }
    connect(...a): this {
        this.$call('connect', ...a);
        return this;
    }
    copy(...a): this {
        this.$call('copy', ...a);
        return this;
    }
    delete(...a): this {
        this.$call('delete', ...a);
        return this;
    }
    engine(...a): HttpApplication {
        return this.$call<HttpApplication>('engine', ...a);
    }
    get(...a): this {
        this.$call('get', ...a);
        return this;
    }
    head(...a): this {
        this.$call('head', ...a);
        return this;
    }
    lock(...a): this {
        this.$call('lock', ...a);
        return this;
    }
    merge(...a): this {
        this.$call('merge', ...a);
        return this;
    }
    mkactivity(...a): this {
        this.$call('mkactivity', ...a);
        return this;
    }
    mkcol(...a): this {
        this.$call('mkcol', ...a);
        return this;
    }
    move(...a): this {
        this.$call('move', ...a);
        return this;
    }
    notify(...a): this {
        this.$call('notify', ...a);
        return this;
    }
    options(...a): this {
        this.$call('options', ...a);
        return this;
    }
    patch(...a): this {
        this.$call('patch', ...a);
        return this;
    }
    post(...a): this {
        this.$call('post', ...a);
        return this;
    }
    propfind(...a): this {
        this.$call('propfind', ...a);
        return this;
    }
    proppatch(...a): this {
        this.$call('proppatch', ...a);
        return this;
    }
    purge(...a): this {
        this.$call('purge', ...a);
        return this;
    }
    put(...a): this {
        this.$call('put', ...a);
        return this;
    }
    report(...a): this {
        this.$call('report', ...a);
        return this;
    }
    search(...a): this {
        this.$call('search', ...a);
        return this;
    }
    subscribe(...a): this {
        this.$call('subscribe', ...a);
        return this;
    }
    trace(...a): this {
        this.$call('trace', ...a);
        return this;
    }
    unlock(...a): this {
        this.$call('unlock', ...a);
        return this;
    }
    unsubscribe(...a): this {
        this.$call('unsubscribe', ...a);
        return this;
    }
    use(...a): this {
        this.$call('use', ...a);
        return this;
    }
    defaultConfiguration(...a): void {
        this.$call('defaultConfiguration', ...a);
    }
    disable(...a): this {
        this.$call('disable', ...a);
        return this;
    }
    disabled(...a): boolean {
        return this.$call<boolean>('disabled', ...a);
    }
    enable(...a): this {
        this.$call('enable', ...a);
        return this;
    }
    enabled(...a): boolean {
        return this.$call<boolean>('enabled', ...a);
    }
    init(...a): void {
        this.$call('init', ...a);
    }
    listen(...a): http.Server {
        return this.$call<http.Server>('listen', ...a);
    }
    param(...a): this {
        this.$call('param', ...a);
        return this;
    }
    path(...a): string {
        return this.$call<string>('path', ...a);
    }
    render(...a): void {
        this.$call('render', ...a);
    }
    route(...a): HttpRoute {
        return this.$call<HttpRoute>('route', ...a);
    }
    set(...a): this {
        this.$call('set', ...a);
        return this;
    }
    // endregion methods
}