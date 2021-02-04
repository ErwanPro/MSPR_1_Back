import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';


const app = express();
const port = process.env.PORT || 3000;
const password = process.env.MONGODB_PASSWD;
const username = process.env.MONGODB_USER;

const uri = `mongodb+srv://${username}:${password}@cluster0.mff6b.mongodb.net/<dbname>?retryWrites=true&w=majority`;


mongoose.connect(uri,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  
  app.use(bodyParser.json());

  
  //default route "/"
  app.get("/", (req, res) => {
    res.status(200).json({ Welcome: "Welcome to the MSPR API" });
  });

  const listener = app.listen(port, () => {
    console.log(`Server is running on port ${listener.address().port}.`);
  });

export default app;