import * as debug from 'debug';
import * as config from './config';
import Server from './server';
import {Service} from './service';

const log = debug('app:main');

const server = new Server(config.server, Service);

log('App Initialized');