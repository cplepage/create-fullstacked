import Server from "fullstacked/server";
import express from "express"

const app = express();

app.get("/hello-world", (req, res) => {
    res.send("Hello World");
});

const { promisifiedListener, resolver } = Server.promisify(app);

// express bottoms out here
app.use(resolver)

Server.addListener(promisifiedListener)
