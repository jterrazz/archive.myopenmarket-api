import app from './app';
import config from '@config';
import { TomConsole, ConsoleLevel } from '@tom';

const tomConsole = new TomConsole('CONFIG');

app.listen(config.SERVER_PORT, () => {
    tomConsole.print(`Server is running on port ${config.SERVER_PORT}`, ConsoleLevel.INFO);
});
