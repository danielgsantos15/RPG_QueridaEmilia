const { MongoClient } = require('mongodb');
const uri = "";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function close() {
    console.log('connect closed')
    return client.close();
}

async function connect() {
    await client.connect();
    console.log('Connected successfully to server');
}

connect()
.then(async () => {
    const db = client.db('RPG');
    const collection = db.collection('personagens');

    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);
    close()
})
.catch(err => {
    console.log(err)
})