import express from 'express';
import cors from "cors";
import './config/dotenv'
import path from 'path'
import dotenv from 'dotenv'

// import the router from your routes file
import usersRouter from './routes/users'
import cardsRouter from './routes/cards'

dotenv.config()

const PORT = process.env.PORT || 8080;

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", async (request, response) => {
  response.status(200).json({ message: "Bye World" });
});

// specify the api path for the server to use
app.use('/users', usersRouter)
app.use('/cards', cardsRouter)

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})