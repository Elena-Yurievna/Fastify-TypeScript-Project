import fastify from 'fastify';
import path from 'path';
import fastifyStatic from '@fastify/static';
import view from '@fastify/view';
import formbody from '@fastify/formbody';
import ejs from 'ejs';
import homeRoutes from './routes/home';
import detailedRoutes from './routes/detailed';
import requestRoutes from './routes/request';
import { initializeDb, getLogs } from './db';

const app = fastify({ logger: true });

// Настройка статических файлов
app.register(fastifyStatic, {
    root: path.join(__dirname, '../public'),
    prefix: '/public/',
});

// Настройка шаблонизатора
app.register(view, {
    engine: {
        ejs,
    },
    root: path.join(__dirname, 'views'),
    includeViewExtension: true,
});

// Настройка обработки данных форм
app.register(formbody);

// Маршруты
app.register(homeRoutes);
app.register(detailedRoutes);
app.register(requestRoutes);

const start = async () => {
    try {
        await initializeDb(); // Инициализация базы данных
        const logs = await getLogs();
        console.log('Current logs in the database:', logs); // Логирование записей из базы данных
        await app.listen(3000);
        console.log('Server is running at http://localhost:3000');
        console.log(app.printRoutes()); // Вывод всех маршрутов
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();
