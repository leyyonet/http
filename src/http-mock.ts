import {MockResponse, type MockResponseResolve, type ResponseData} from "./response";
import {MockRequest, type MockServiceRequest} from "./request";
import {Application, Request} from "express";
import {MockApplication} from "./application";
import {Dict} from "@leyyo/common";
import {HttpMockLike, HttpMockTuple} from "./index.types";

/**
 * Http mock class
 * */
class HttpMock implements HttpMockLike {
    /**
     * Is it initialized?
     * */
    private _initialized: boolean;

    /** @inheritDoc */
    init(req: Request): void {
        if (this._initialized) {
            return;
        }
        this._initialized = true;
        MockRequest.setFirstOrigin(req);
        MockResponse.setFirstOrigin(req.res);
        MockApplication.setFirstOrigin(req.app);
    }

    /** @inheritDoc */
    fork(): HttpMockTuple {
        return [MockRequest.firstOrigin, MockResponse.firstOrigin, MockApplication.firstOrigin];
    }

    /** @inheritDoc */
    forBulk<R = ResponseData>(req: Request, service: MockServiceRequest<R>, resolver: MockResponseResolve<R>, custom?: Dict): HttpMockTuple {
        const newReq = new MockRequest(service, req, custom);
        const newRes = new MockResponse(resolver, req.res);
        const newApp = MockApplication.firstOrigin ?? (new MockApplication(req.app) as unknown as Application);
        return [newReq, newRes, newApp];
    }
}

// noinspection JSUnusedGlobalSymbols
/**
 * Http mock instance
 *
 * @type {HttpMockLike}
 * */
export const httpMock: HttpMockLike = new HttpMock();
