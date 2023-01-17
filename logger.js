import { applicationNamespace, REQUEST_BODY, REQUEST_ID_KEY, REQUEST_METHOD, REQUEST_PARAMS } from './namespace.js';
import { createLogger, transports, format  } from 'winston'
const { printf } = format

const addReqInfo = printf((info) => {
    let message = info.message
    const requestId = applicationNamespace.get(REQUEST_ID_KEY);
    const requestParams = applicationNamespace.get(REQUEST_PARAMS);
    const requestBody = applicationNamespace.get(REQUEST_BODY);
    const requestMethod = applicationNamespace.get(REQUEST_METHOD);

    return JSON.stringify({
        message,
        level: info.level,
        id: requestId,
        params: requestParams,
        body: requestBody,
        method: requestMethod
        // timestamp: info.timestamp
    })
})

export function initLogger () {
    const logger = createLogger({
        format: addReqInfo,
        transports: [new transports.Console()],
    })
    
    console.log = function(){
        return logger.info.apply(logger, arguments);
    };
    console.error = function(){
        return logger.error.apply(logger, arguments);
    };
}