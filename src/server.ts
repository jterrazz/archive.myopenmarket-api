import app from './app';
import config from '@config';

app.listen(config.SERVER.PORT, () => {
    console.info(`Listening to ${config.SERVER.PORT} 🚀`);
});
