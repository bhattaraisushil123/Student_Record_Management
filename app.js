
import express from 'express';
import route from './routes/route.js';
import connectDB from './db/db.js'; 
import bodyParser from 'body-parser';

const DATABASEURL = process.env.DATABASEURL || 'mongodb://127.0.0.1:27017';
const app = express();
const port = 3000;

// EJS setup
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database Connection
connectDB(DATABASEURL);

// Route setup
app.use('/', route);

app.listen(port, () => {
    console.log(`server is running : http://localhost:${port}`);
});
