import { FastifyInstance, FastifyPluginOptions, FastifyRequest } from 'fastify';
import { getLogById } from '../db';
import { LogParams } from '../types/interfaces';

async function detailedRoutes(app: FastifyInstance, options: FastifyPluginOptions) {
    app.get('/log/:id', async (request: FastifyRequest<{ Params: LogParams }>, reply) => {
        const { id } = request.params;
        console.log('Requested log ID:', id);
        const log = await getLogById(Number(id));
        if (!log) {
            console.log('Log not found');
            return reply.code(404).send('Log not found');
        }
        console.log('Log data:', log);
        return reply.view('detailed', { log });
    });
}

export default detailedRoutes;
