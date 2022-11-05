import Server from "fullstacked/server";
import express from "express"

const server = new Server();

const app = express();
app.use(express.static(server.publicDir));

app.get("/hello-world", (req, res) => {
    res.send("Hello World");
});

server.addListener(app);
server.start();

export default server;
