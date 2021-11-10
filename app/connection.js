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
    insertCharacter: async (personagem) => {
        await connect();
        const db = client.db('RPG');
        const collection = db.collection('personagens');
        
        const insertResult = await collection.insertOne(personagem);
        
        await close();
        return insertResult;
    },
    updateCharacter: async (personagem) => {
        console.log(personagem)
        await connect();
        const db = client.db('RPG');
        const collection = db.collection('personagens');
        const filter = {name: personagem.name}
        const toUpdate = {
            $set: {
                currentLife: personagem.currentLife,
                currentStability: personagem.currentStability
            }
        }
        const updateResult = await collection.updateOne(filter, toUpdate, {upsert: true});

        await close();
        return updateResult;
    }
}

module.exports = connection;