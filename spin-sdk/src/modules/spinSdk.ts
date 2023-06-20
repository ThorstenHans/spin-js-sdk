import { router, routerType } from "./router"
import { utils } from "./utils"

interface SpinConfig {
    get(arg0: string): string
}

interface KvStore {
    delete: (key: string) => void
    exists: (key: string) => boolean
    get: (key: string) => ArrayBuffer | null
    getKeys: () => Array<string>
    set: (key: string, value: ArrayBuffer | string) => void
}

type RdbmsParam = null | boolean | string | number | ArrayBuffer

interface RdbmsReturn {
    columns: string[],
    rows: [
        [RdbmsParam]
    ]
}

/** @deprecated*/
interface SpinSdk {
    utils: {
        toBuffer: (arg0: ArrayBufferView) => Buffer
    }
    Router: () => routerType
    config: SpinConfig
    redis: {
        execute: (address: string, command: string, args: Array<ArrayBuffer | bigint>) => undefined | string | bigint | ArrayBuffer
        get: (address: string, key: string) => ArrayBuffer
        incr: (address: string, key: string) => bigint
        publish: (address: string, channel: string, value: ArrayBuffer) => undefined
        set: (address: string, key: string, value: ArrayBuffer) => undefined
        del: (address: string, key: Array<string>) => bigint
        sadd: (address: string, key: string, values: Array<string>) => bigint
        smembers: (address: string, key: string) => Array<string>
        srem: (address: string, key: string, values: Array<string>) => bigint
    }
    /**
     * Object that allows access to the Spin Key-Value Store 
     */
    kv: {
        /**
         * 
         * @param name - The name of the KV store to open
         * @returns A KV store handle
         */
        open: (name: string) => KvStore
        /**
         * @returns The handle to the default KV store
         */
        openDefault: () => KvStore
    }
    mysql: {
        execute: (address: string, statement: string, params: RdbmsParam[]) => void
        query: (address: string, statement: string, params: RdbmsParam[]) => RdbmsReturn
    }
    pg: {
        execute: (address: string, statement: string, params: RdbmsParam[]) => void
        query: (address: string, statement: string, params: RdbmsParam[]) => RdbmsReturn
    }
}


declare global {
    const __internal__: {
        spin_sdk: SpinSdk
    }
}


/**  features
 */
/** @deprecated */
const spinSdk: SpinSdk = __internal__.spin_sdk
spinSdk.utils = utils
spinSdk.Router =  () => {
    return router()
}

const Config = __internal__.spin_sdk.config
const Redis = __internal__.spin_sdk.redis
const Kv = __internal__.spin_sdk.kv
const Mysql = __internal__.spin_sdk.mysql
const Pg = __internal__.spin_sdk.pg

export { spinSdk, SpinSdk}
export { Config, Redis, Kv, router, Mysql, Pg }
