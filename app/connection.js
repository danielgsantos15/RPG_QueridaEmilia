const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://backend:q1w2e3r4@cluster0.inqin.mongodb.net/RPG?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function close() {
    console.log('connect closed')
    return client.close();
}

async function connect() {
    await client.connect();
    console.log('Connected successfully to server');
}


async function getPersonas() {
    const db = client.db('RPG');
    const collection = db.collection('personagens');
    
    const findResult = await collection.find({}).toArray();
}

connect()
.then(async () => {
    await getPersonas();
})
.then(async()=> {
    await close();
})
.then(() => {
    console.log('done')
})
.catch(err => {
    console.log(err)
})