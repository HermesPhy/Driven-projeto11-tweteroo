import express, { json } from 'express';

const app = express();
app.use(json());
app.use(cors());

const users = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
    const user = req.body;
    if(user.username === "" || user.avatar === "") {
        return res.status(400).send("Preencher todos os campos!");
    }
    users.push(user);
    res.status(201).send("Usuário cadastrado!");
});

app.post("/tweets", (req, res) => {
    let username = req.header("User");
    if(!username) {
        username = users[users.length - 1].username;
    }
    const {avatar} = users[users.length - 1];
    const {tweet} = req.body;
    if(username === "" || tweet === "") {
        return res.status(400).send("Preencher todos os campos!");
    }
    tweets.push({
        username,
        avatar,
        tweet
    });
    res.status(201).send("Tweet criado!");
});

app.get("/tweets", (req, res) => {
    const {page} = req.query;
    const recentTweets = tweets.slice(0).reverse();
    if(!page) {
        const lastTenTweets = recentTweets.filter((tweet, i) => i < 10);
        return res.send(lastTenTweets);
    }
    if(page < 1) {
        return res.status(400).send("Informe uma página válida!");
    }
    const tweetsPage = recentTweets.filter((tweet, i) => i < page*10 && i >= page*10 - 10);
    res.send(tweetsPage);
})

app.get("/tweets/:username", (req, res) => {
    const {username} = req.params;
    const recentTweets = tweets.slice(0).reverse();
    const userTweets = recentTweets.filter(tweet => tweet.username === username);
    res.send(userTweets);
})

app.listen(5000, () => console.log("Server is running on: http://localhost:5000"));