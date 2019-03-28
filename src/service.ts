import * as RPC from 'json-rpc-core';
import * as debug from 'debug';

import Base from './modules/base';
import User from './modules/user';

const log = debug('app:service');

const modules = [
    Base,
    User
];

const handlers = {

    async init(): Promise<void> {

    },

    async end(): Promise<void> {

    },

    async call(method, params): Promise<void> {

    },

    async done(method, params, result): Promise<void> {

    },

    async fail(method, params, error): Promise<void> {
        log('[fail] method=%s params=%O error=$O', method, params, error);
    }
};

export const Service = new RPC.Server(modules, handlers);