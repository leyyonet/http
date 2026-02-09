import type {Fnc} from "@leyyo/common";
import type {EventEmitter} from "node:events";

/**
 * Abstract class for Request and Response
 * */
export abstract class HttpEvent<O extends EventEmitter> implements EventEmitter {

    protected constructor(protected _origin: O) {
    }

    /** @inheritDoc */
    addListener(e: string | symbol, l: Fnc): this {
        this._origin?.addListener(e, l);
        return this;
    }

    /** @inheritDoc */
    emit(e: string | symbol, ...a: any[]): boolean {
        return this._origin?.emit(e, a) ?? false;
    }

    /** @inheritDoc */
    eventNames(): Array<string | symbol> {
        return this._origin?.eventNames() ?? [];
    }

    /** @inheritDoc */
    getMaxListeners(): number {
        return this._origin?.getMaxListeners() ?? 10;
    }

    /** @inheritDoc */
    listenerCount(e: string | symbol): number {
        return this._origin?.listenerCount(e) ?? 0;
    }

    /** @inheritDoc */
    listeners(e: string | symbol): Array<Fnc> {
        return this._origin?.listeners(e) as Array<Fnc> ?? [];
    }

    /** @inheritDoc */
    off(e: string | symbol, l: Fnc): this {
        this._origin?.off(e, l);
        return this;
    }

    /** @inheritDoc */
    on(e: string | symbol, l: Fnc): this {
        this._origin?.on(e, l);
        return this;
    }

    /** @inheritDoc */
    once(e: string | symbol, l: Fnc): this {
        this._origin?.once(e, l);
        return this;
    }

    /** @inheritDoc */
    prependListener(e: string | symbol, l: Fnc): this {
        this._origin?.prependListener(e, l);
        return this;
    }

    /** @inheritDoc */
    prependOnceListener(e: string | symbol, l: Fnc): this {
        this._origin?.prependOnceListener(e, l);
        return this;
    }

    /** @inheritDoc */
    rawListeners(e: string | symbol): Array<Fnc> {
        return this._origin?.rawListeners(e) as Array<Fnc> ?? [];
    }

    /** @inheritDoc */
    removeAllListeners(e?: string | symbol): this {
        this._origin?.removeAllListeners(e);
        return this;
    }

    /** @inheritDoc */
    removeListener(e: string | symbol, l: Fnc): this {
        this._origin?.removeListener(e, l);
        return this;
    }

    /** @inheritDoc */
    setMaxListeners(m: number): this {
        this._origin?.setMaxListeners(m);
        return this;
    }
}
