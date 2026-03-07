import {Application, Request, Response} from "express";
import {RecLike} from "@leyyo/core";
import {HttpApplication, HttpCallLike, HttpNext, HttpRouterSelf} from "../application";
import {HttpRequestService, HttpRequest} from "../request";
import {HttpResponseFakeResolver, HttpResponse} from "../response";

export type HttpMockVendor = 'express' | 'fastify';
export interface FakeCallOptions {
    req?: Request | HttpRequest;
    res?: Response | HttpResponse;
    app?: Application | HttpApplication;
    next?: HttpNext;
}
export interface HttpMockLike {
    asExpress(): HttpMockLike;
    asFastify(): HttpMockLike;
    newApp(): HttpApplication;
    newRouter(): HttpRouterSelf;
    fakeCall<C = RecLike>(service: HttpRequestService, resolver: HttpResponseFakeResolver, opt?: FakeCallOptions): HttpCallLike<C>;
    cloneCall<C = RecLike>(req: Request | HttpRequest, res: Response | HttpResponse): HttpCallLike<C>;
    get fakeApp();
    cloneApp(app: Application | HttpApplication): HttpApplication;
    fakeRequest(service: HttpRequestService, req?: Request | HttpRequest): HttpRequest;
    cloneRequest(req: Request | HttpRequest): HttpRequest;
    fakeResponse(resolver: HttpResponseFakeResolver, req?: Response | HttpResponse): HttpResponse;
    cloneResponse(req: Response | HttpResponse): HttpResponse;
}