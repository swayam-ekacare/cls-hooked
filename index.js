import { helloWorldHandler } from './handlers.js';
import express from 'express'
import { initLogger } from './logger.js';
import session from 'express-session';
import { v4 } from 'uuid';
import cookieParser from 'cookie-parser';
const app = express();
const port = 3010;

app.use(express.static('static'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cookieParser())
app.use(session({
  secret: "abc",
  genid: function(_) {
    return v4()
  },
  resave: true,
  saveUninitialized: true
}))

app.use((req, _, next) => {
  req.session.requestInfo = { params: req.params, body: req.body, method: req.method }
  next()
})

app.use((req, _, next) => {
  initLogger(req.session, req.sessionID)
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