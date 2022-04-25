import express, { json } from 'express';

const app = express();
app.use(json());
app.use(cors());

const users = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
    const user = req.body;
    if(user.username === "" || user.userimage === "") {
        return res.status(400).send("Preencher todos os campos!");
    }
    users.push(user);
    res.status(201).send("Usuário cadastrado!");
})