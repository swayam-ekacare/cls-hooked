import { attachContext, helloWorldHandler, setRequestInfo } from './handlers.js';

import express from 'express'
import { initLogger } from './logger.js';
const app = express();
const port = 3010;

app.use(express.static('static'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(attachContext);

initLogger();

app.get('/:abc', setRequestInfo, helloWorldHandler);

app.post('/:abc', setRequestInfo, (req, res) => {
  console.log('Hello world from POST route');
  res.send("hello world")
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});