import {MockResponse, MockResponseLike, MockResponseResolve, ResponseData} from "./response";
import {leyyo, RecLike} from "@leyyo/core";
import {MockRequest, MockRequestLike, MockServiceRequest, RequestBody} from "./request";
import {Request, Response} from "express";
import {COMPONENT_NAME} from "./internal-component";

class HttpMock {
    request<T = RequestBody, L extends RecLike = RecLike>(service?: MockServiceRequest, origin?: Request, custom?: RecLike): MockRequestLike<T, L> {
        return new MockRequest(service, origin, custom);
    }
    response<D = ResponseData, L extends RecLike = RecLike>(resolver?: MockResponseResolve, origin?: Response): MockResponseLike<D, L> {
        return new MockResponse(resolver, origin);
    }
    static {
        leyyo.component.add(COMPONENT_NAME);
    }
}
export const httpMock = new HttpMock();