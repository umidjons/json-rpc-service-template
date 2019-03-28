import * as http from 'http';
import * as RPC from 'json-rpc-core';
import * as debug from 'debug';

const log = debug('app:server');

export default class Server {
    private native: http.Server;

    constructor(private options: any,
                private service: any) {
        this.init();
    }

    init() {
        this.native = http.createServer(this.onRequest.bind(this));
        this.native.listen(this.options);
        log(`Server listining on ${this.options.host}:${this.options.port}`);
    }

    async onRequest(request, response) {
        let client: any;

        const sendResponse = (wClient, data) => {
            data = Buffer.from(RPC.stringifyResponse(data));

            const headers = {
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            };

            response.writeHead(200, headers);
            response.end(data);
        };

        try {
            const data = await getData(request);
            client = await prepareClient(request);
            const result = await this.service.request(client, data);
            sendResponse(result.client, result.respose);
        } catch (error) {
            log('onRequest() error=%O', error);
            sendResponse(client, {error: error});
        }
    }
}

function getData(request): Promise<any> {
    if (request.method !== 'POST') {
        throw RPC.Errors.TransportError();
    }

    return new Promise((done, fail) => {
        request.once('data', (data) => {
            try {
                done(RPC.parseRequest(data));
            } catch (error) {
                log('getData() error=%O', error);
                fail(error);
            }
        });
    });
}

async function prepareClient(request) {
    return {
        ip: request.headers['x-real-ip'],
        device: request.headers['user-agent']
    };
}