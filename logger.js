import { createLogger, transports, format } from 'winston'
const { printf } = format

const addReqInfo = function ({ requestInfo: { params, body, method, id } }) {
    return printf((info) => {  // here all the request info is added to the log message
    let message = info.message

    const requestId = id;
    const requestParams = params;
    const requestBody = body;
    const requestMethod = method;

    const logObject = {
        Id: requestId,
        Message: message,
        Level: info.level,
        timestamp: new Date(),
        "Request Params": requestParams,
        "Request Body": requestBody,
        "Request Method": requestMethod,
    }

    return JSON.stringify(logObject)
})
}

export function initLogger (session, id) {
    const logger = createLogger({
        format: addReqInfo(session, id),
        transports: [new transports.Console(), new transports.File({
            dirname: '.',
            filename: "test_logs.csv",
        })],
    })

    console.log = function(){
        return logger.info.apply(logger, [...arguments, () => sumoLogger.apply(sumoLogger, logObject)]);
    };

    console.error = function(){
        return logger.error.apply(logger, arguments);
    };
}