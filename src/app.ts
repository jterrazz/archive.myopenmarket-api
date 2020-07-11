import Koa from 'koa';
import 'reflect-metadata'; // Required by typeorm

import { setStatusMessageMiddleware } from './middleware/http-status';
import trackerMiddleware from './middleware/tracker';
import router from './router';

// App setup

const app = new Koa();

app.use(trackerMiddleware);
app.use(router.routes()).use(router.allowedMethods());
app.use(setStatusMessageMiddleware);

// tmp
import ormconfig from './config/typeorm';
import { createConnection } from 'typeorm';
import { User } from './entity/User';

createConnection(ormconfig)
    .then(async (connection) => {
        console.log('Inserting a new user into the database...');
        const user = new User();
        user.firstName = 'Timber';
        user.lastName = 'Saw';
        user.age = 25;
        await connection.manager.save(user);
        console.log('Saved a new user with id: ' + user.id);

        console.log('Loading users from the database...');
        const users = await connection.manager.find(User);
        console.log('Loaded users: ', users);

        console.log('Here you can setup and run express/koa/any other framework.');
    })
    .catch((error) => console.log(error));

export default app;
