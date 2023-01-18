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

app.all('*', setRequestInfo)

app.get('/:abc', helloWorldHandler);

app.post('/:abc', (req, res) => {
  console.log('Hello world from POST route');
  res.send("hello world")
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});