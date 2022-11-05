import {Fqn, FuncLike, RecLike} from "@leyyo/core";
import {AbstractEventLike} from "./types";
import {LY_INT_FQN} from "../internal";

@Fqn(...LY_INT_FQN)
export class AbstractEvent<O = unknown> implements AbstractEventLike<O> {
    protected _$origin: O;
    protected _$isFake: boolean;
    protected readonly _$value: RecLike;

    constructor() {
        this._$value = {};
    }
    get isFake(): boolean {
        return this._$isFake;
    }
    $call<T = unknown>(key: string, ...a): T {
        if (this._$origin && typeof this._$origin[key] === 'function') {
            return this._$origin[key](...a) as T;
        }
        return undefined;
    }
    // noinspection JSUnusedGlobalSymbols
    $get<T = unknown>(key: string): T {
        return (this._$origin ? this._$origin[key] : this._$value[key]) as T;
    }
    $set(key: string, value: unknown): void {
        if (this._$origin) {
            this._$origin[key] = value;
        } else {
            this._$value[key] = value;
        }
    }
    $setOrigin(origin: O): void {
        this._$origin = origin;
    }
    addListener(...a): this {
        this.$call('addListener', ...a);
        return this;
    }

    emit(...a): boolean {
        return this.$call<boolean>('emit', ...a);
    }

    eventNames(...a): Array<string | symbol> {
        return this.$call<Array<string | symbol>>('eventNames', ...a);
    }

    getMaxListeners(...a): number {
        return this.$call<number>('getMaxListeners', ...a);
    }

    listenerCount(...a): number {
        return this.$call<number>('listenerCount', ...a);
    }

    listeners(...a): Array<FuncLike> {
        return this.$call<Array<FuncLike>>('listeners', ...a);
    }

    off(...a): this {
        this.$call('off', ...a);
        return this;
    }

    on(...a): this {
        this.$call('on', ...a);
        return this;
    }

    once(...a): this {
        this.$call('once', ...a);
        return this;
    }

    prependListener(...a): this {
        this.$call('prependListener', ...a);
        return this;
    }

    prependOnceListener(...a): this {
        this.$call('prependOnceListener', ...a);
        return this;
    }

    rawListeners(...a): Array<FuncLike> {
        return this.$call<Array<FuncLike>>('rawListeners', ...a);
    }

    removeAllListeners(...a): this {
        this.$call('removeAllListeners', ...a);
        return this;
    }

    removeListener(...a): this {
        this.$call('removeListener', ...a);
        return this;
    }

    setMaxListeners(...a): this {
        this.$call('setMaxListeners', ...a);
        return this;
    }

}