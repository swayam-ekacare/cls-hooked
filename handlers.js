  export const nestedHandler = () => {
  console.log('This is a nested handler.');
};
  
export const helloWorldHandler = (req, res) => {
  console.log('This is a hello world log message.');
  nestedHandler();
  res.send('Hello world');
};