const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./db.json"); // Path to your db.json file
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

module.exports.handler = async (event, context) => {
  const response = await new Promise((resolve, reject) => {
    server.handle(event, context, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          statusCode: res.statusCode,
          headers: res.getHeaders(),
          body: res.body,
        });
      }
    });
  });

  return response;
};
