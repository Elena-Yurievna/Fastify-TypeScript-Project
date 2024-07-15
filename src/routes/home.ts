import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { getLogs } from '../db';

async function homeRoutes(app: FastifyInstance, options: FastifyPluginOptions) {
    app.get('/', async (request, reply) => {
        console.log('Home route accessed');
        const logs = await getLogs();
        return reply.view('home', { logs });
    });
}

export default homeRoutes;
