// init express object
const express = require("express")
const app = express()
app.use(express.json())

// init Mongo object
const { MongoClient } = require("mongodb")
const uri = require("./atlas_uri")
const client = new MongoClient(uri)
const dbname = "test"

const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log(`Connected to the ${dbname} database`);
    }
    catch (err) {
        console.error(`1 Error connecting to the database: ${err}`);
    }


};

const main = async () => {
    try {
        await connectToDatabase();
    }
    catch (err) {
        console.error(`2 Error connecting to the database: ${err}`);
    }
    finally {
        await client.close();
    }

};

//console.log(uri);
main();





