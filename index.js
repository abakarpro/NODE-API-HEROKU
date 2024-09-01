import express from 'express';
import cors from 'cors';
import  'dotenv/config';
import { MongoClient } from 'mongodb';




const MONGO_URI = process.env.MONGO_URI;   

const client = new MongoClient(MONGO_URI); 
const database = client.db('game-store');
const games = database.collection('games');


 client.connect();
//client.connect();
console.log('MongoDB Connected');


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', async(req, res) => {
    const allGames = await games.find().toArray()
    res.json(allGames)
})


app.post('/', async(req, res) => {
   await games.insertOne({name: 'God of War', favorite: true})
   res.json('Item was added')
})