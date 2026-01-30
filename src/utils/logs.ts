import {createLogger,transports,format} from 'winston'
export const LoggerInstance = createLogger({
    transports:[
        new transports.File({
            filename: './logs/index.logs',
            level: 'error'
        }),
        new transports.File({
            filename: './logs/info.logs',
            level: 'info'
        }),
        new transports.Console()
    ],
    format: format.combine(format.timestamp({format: 'YYYY-DD-MM, HH:mm:ss'}), format.printf((info)=>
            `${info.timestamp} ${info.level}:${info.message}`))
});

declare global {
  var Logger: typeof LoggerInstance;
}
global.Logger =LoggerInstance
