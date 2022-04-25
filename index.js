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
})