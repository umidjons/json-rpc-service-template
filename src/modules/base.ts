import * as RPC from 'json-rpc-core';
import * as debug from 'debug';

const log = debug('app:module:base');

@RPC.module('base')
export default class BaseModule {

    @RPC.internal
    @RPC.params({
        name: {type: String}
    })
    static async test(params, ignore?) { // ignore param is required to support internal calls
        log('[test] params=%O', params);
        return `Hello ${params.name}`;
    }

}