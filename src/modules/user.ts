import * as RPC from 'json-rpc-core';
import * as debug from 'debug';

import Base from './base';

const log = debug('app:module:user');

@RPC.module('users')
export default class User extends Base {

    @RPC.params({
        name: {type: String}
    })
    static async hello(params) {
        log('[hello] params=%O', params);
        const result = await Base.test(this, params);
        log('[hello] result=%O', result);
        return result;
    }
}