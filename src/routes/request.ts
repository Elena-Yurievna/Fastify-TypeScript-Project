import { FastifyInstance, FastifyPluginOptions, FastifyRequest } from 'fastify';
import axios from 'axios';
import { addLog } from '../db';
import { RequestBody, AxiosError } from '../types/interfaces';

async function requestRoutes(app: FastifyInstance, options: FastifyPluginOptions) {
    app.get('/request', async (request, reply) => {
        return reply.view('request');
    });

    app.post('/send-request', async (request: FastifyRequest<{ Body: RequestBody }>, reply) => {
        const { url, method, body } = request.body;
        const requestHeaders = JSON.stringify(request.headers);
        try {
            const response = await axios({ url, method, data: body });
            const log = {
                timestamp: new Date().toISOString(),
                url,
                method,
                body: JSON.stringify(body),
                status: response.status,
                response: JSON.stringify(response.data),
                requestHeaders: requestHeaders,
                responseHeaders: JSON.stringify(response.headers)
            };
            await addLog(log);
            return reply.send(response.data);
        } catch (error) {
            const err = error as AxiosError;
            const log = {
                timestamp: new Date().toISOString(),
                url,
                method,
                body: JSON.stringify(body),
                status: err.response ? err.response.status : 500,
                response: err.message,
                requestHeaders: requestHeaders,
                responseHeaders: err.response ? JSON.stringify(err.response.headers) : ''
            };
            await addLog(log);
            return reply.status(500).send(err.message);
        }
    });
}

export default requestRoutes;