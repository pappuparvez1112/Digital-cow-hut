/* eslint-disable prefer-const */
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';

process.on('uncaughtException', error => {
  console.log('uncoughtException is detect', error);
  console.log(error);
  process.exit(1);
});
let server: Server;
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(`✔ Database is connected successfully `);
  } catch (err) {
    console.log(' 😢 Failed to connect database', err);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });

  server = app.listen(config.port, () => {
    console.log(`Application listening on port ${config.port}`);
  });
}

bootstrap();

process.on('SIGTERM', () => {
  console.log('Sigterm is recieved');
  if (server) {
    console.log('check');
    server.close();
  }
});
