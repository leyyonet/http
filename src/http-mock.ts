import {MockResponse, type MockResponseResolve, type ResponseData} from "./response";
import {MockRequest, type MockServiceRequest} from "./request";
import type {Application, Request} from "express";
import {MockApplication} from "./application";
import type {Dict} from "@leyyo/common";
import type {HttpMockLike, HttpMockTuple} from "./index.types";

class HttpMock implements HttpMockLike {
    private _initialized: boolean;
    init(req: Request): void {
        if (this._initialized) {
            return;
        }
        this._initialized = true;
        MockRequest.setFirstOrigin(req);
        MockResponse.setFirstOrigin(req.res);
        MockApplication.setFirstOrigin(req.app);
    }
    fork(): HttpMockTuple {
        return [MockRequest.firstOrigin, MockResponse.firstOrigin, MockApplication.firstOrigin];
    }

    forBulk<R = ResponseData>(req: Request, service: MockServiceRequest<R>, resolver: MockResponseResolve<R>, custom?: Dict): HttpMockTuple {
        const newReq = new MockRequest(service, req, custom);
        const newRes = new MockResponse(resolver, req.res);
        const newApp = MockApplication.firstOrigin ?? (new MockApplication(req.app) as unknown as Application);
        return [newReq, newRes, newApp];
    }
}
// noinspection JSUnusedGlobalSymbols
export const httpMock: HttpMockLike = new HttpMock();
