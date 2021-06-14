const {MongoClient} = require('mongodb')

// create async function to connect to mongo DB
async function main(){
    
    // connection uri
    const uri = "mongodb+srv://dboi:Exkiller444@cluster0.pon7o.mongodb.net/MoviesDB?retryWrites=true&w=majority"

    const client = new MongoClient(uri,{ useUnifiedTopology: true });
    
    
    try{
        // wait till connection is complete
        await client.connect();
        await listDatabases(client)
    
    }catch (error) {
        console.error(e)

    } finally{
        await client.close()

    }
}

main().catch(console.error)

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases()

    console.log(databasesList)
}