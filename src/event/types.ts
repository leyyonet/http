import {EventEmitter} from "events";

export interface AbstractEventLike<O = unknown> extends EventEmitter {
    get isFake(): boolean;
    $call<T = unknown>(key: string, ...a): T;
    $get<T = unknown>(key: string): T;
    $set(key: string, value: unknown): void;
    $setOrigin(origin: O): void;
}