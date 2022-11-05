import {Module} from "@leyyo/core";

import {AbstractEvent} from "../event";
import {MockApplication} from "../application";
import {HttpMock} from "./http-mock";
import {MockRequest} from "../request";
import {MockResponse} from "../response";

@Module(AbstractEvent, MockRequest, MockResponse, MockApplication, HttpMock)
export class LeyyoHttpModule {

}
// noinspection JSUnusedGlobalSymbols
export const httpMock = new HttpMock();