import express from 'express';
import {Application, Request, Response} from "express";
import {MockResponse, HttpResponseFakeResolver, HttpResponse} from "../response";
import {Fqn, leyyo, RecLike} from "@leyyo/core";
import {MockRequest, HttpRequestService, HttpRequest} from "../request";
import {LY_INT_FQN, LY_INT_PACKAGE} from "../internal";
import {HttpApplication, HttpCallLike, HttpRouterSelf, MockApplication} from "../application";
import {FakeCallOptions, HttpMockLike, HttpMockVendor} from "./types";

@Fqn(...LY_INT_FQN)
export class HttpMock implements HttpMockLike {
    protected _vendor: HttpMockVendor;
    constructor() {
        this._vendor = 'express';
    }
    asExpress(): HttpMockLike {
        this._vendor = 'express';
        return this;
    }
    asFastify(): HttpMockLike {
        this._vendor = 'fastify';
        return this;
    }
    newApp(): HttpApplication {
        return express() as unknown as HttpApplication;
    }
    newRouter(): HttpRouterSelf {
        return express.Router as unknown as HttpRouterSelf;
    }

    fakeCall<C = RecLike>(service: HttpRequestService, resolver: HttpResponseFakeResolver, opt?: FakeCallOptions): HttpCallLike<C> {
        if (!leyyo.primitive.isObject(opt)) {
            opt = {};
        }
        const req = this.fakeRequest(service, opt.req);
        const res = this.fakeResponse(resolver, opt.res);
        const next = [opt.next, req.next].filter(fn => typeof fn === 'function').shift();
        const app = this.cloneApp([opt.app, req.app, res.app].filter(a => !!a).shift());
        const ctx = leyyo.context.get(req, res) as C;
        req.$setRelations(app, res, next);
        res.$setRelations(app, req);
        return {req, res, app, next, ctx} as HttpCallLike<C>;
    }
    cloneCall<C = RecLike>(reqGiven: Request | HttpRequest, resGiven: Response | HttpResponse): HttpCallLike<C> {
        const req = this.cloneRequest(reqGiven);
        const res = this.cloneResponse(resGiven);
        const next = req.next;
        const app = this.cloneApp([req.app, res.app].filter(a => !!a).shift());
        const ctx = leyyo.context.get(req, res) as C;
        req.$setRelations(app, res, next);
        res.$setRelations(app, req);
        return {req, res, app, next, ctx} as HttpCallLike<C>;
    }
    get fakeApp(): HttpApplication {
        return MockApplication.fake;
    }
    cloneApp(app: Application | HttpApplication): HttpApplication {
        return MockApplication.clone(app);
    }
    fakeRequest(service: HttpRequestService, req?: Request | HttpRequest): HttpRequest {
        return MockRequest.fake(service, req);
    }
    cloneRequest(req: Request | HttpRequest): HttpRequest {
        return MockRequest.clone(req);
    }
    fakeResponse(resolver: HttpResponseFakeResolver, res?: Response | HttpResponse): HttpResponse {
        return MockResponse.fake(resolver, res);
    }
    cloneResponse(res: Response | HttpResponse): HttpResponse {
        return MockResponse.clone(res);
    }
    static {
        leyyo.package.add(LY_INT_PACKAGE);
    }
}