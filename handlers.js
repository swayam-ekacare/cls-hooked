import { v4 } from 'uuid';
import { applicationNamespace, REQUEST_BODY, REQUEST_ID_KEY, REQUEST_METHOD, REQUEST_PARAMS } from './namespace.js';

export const attachContext = (req, res, next) => {
  // applicationNamespace.bind(req)
  // applicationNamespace.bind(res)

  applicationNamespace.run(() => {
    applicationNamespace.set(REQUEST_ID_KEY, v4())
    next()
  })
};
  
export const setRequestInfo = (req, res, next) => {
  applicationNamespace.set(REQUEST_PARAMS, req.params);
  applicationNamespace.set(REQUEST_BODY, req.body);
  applicationNamespace.set(REQUEST_METHOD, req.method);
  next();
};
  
export const nestedHandler = () => {
  console.log('This is a nested handler.');
};
  
export const helloWorldHandler = (req, res) => {
  console.log('This is a hello world log message.');
  nestedHandler();
  res.send('Hello world');
};