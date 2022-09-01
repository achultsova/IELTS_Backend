import express, { Application} from "express";
var mongoose = require('mongoose');

const app: Application = express();
const port = 8000;


const mongoDB = 'mongodb+srv://Anastas:Test1234@cluster0.jx5qy0j.mongodb.net/test';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const Test = mongoose.Schema({
    id: String,
    
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error) {
    let errorMessage = "Failed to do something exceptional";
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    console.log(errorMessage);
}