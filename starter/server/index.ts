import Server from "fullstacked/server";

const server = new Server();

const emojis = ["🚀", "🤘", "👋", "⭐️"]
server.get<string>("/hello",
    (req, res) => res.send(emojis[Math.floor(Math.random()*emojis.length)]));

server.start();

export default server;
