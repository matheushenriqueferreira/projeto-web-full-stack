import { createLogger, transports, format } from "winston";

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports:[
    new transports.File({
      filename:'./logs/user.log',
      level:'info'
    }),
    new transports.File({
      filename:'./logs/error.log',
      level:'error'
    }),
  ]
});

export default logger;