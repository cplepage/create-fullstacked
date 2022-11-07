import Server from "fullstacked/server";
import express from "express"

const app = express();
app.use(express.static(Server.publicDir));

app.get("/hello-world", (req, res) => {
    res.send("Hello World");
});

Server.addListener(app);
