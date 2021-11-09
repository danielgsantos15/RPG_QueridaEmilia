const { MongoClient } = require('mongodb');
const uri = process.env.CONNECTION_DB;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function close() {
    console.log('connect closed')
    return client.close();
}

async function connect() {
    await client.connect();
    console.log('Connected successfully to server');
}

const connection = {
    getcharacters: async () => {
        await connect();
        const db = client.db('RPG');
        const collection = db.collection('personagens');
        
        const findResult = await collection.find({}).toArray();
        console.log(findResult)
        await close();
        return findResult;
    },
    insertCharacter: async () => {

    }
}

module.exports = connection;