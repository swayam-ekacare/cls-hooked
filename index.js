import { helloWorldHandler } from './handlers.js';
import express from 'express'
import { initLogger } from './logger.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { getId } from './util.js';
const app = express();
const port = 3010;

app.use(express.static('static'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cookieParser())
app.use(session({
  secret: "abc",
  resave: true,
  // genid: function() {
  //   return v4()
  // },
  saveUninitialized: true
}))

app.all('*', (req, _, next) => {
  const reqId = getId(req)
  req.session.requestInfo = { id: reqId, params: req.params, body: req.body, method: req.method }
  initLogger(req.session)
  next()
})

app.get('/:abc', helloWorldHandler);

app.post('/:abc', (req, res) => {
  console.log('Hello world from POST route');
  res.send("hello world")
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});