import express from 'express';
//enables express to employ the 'use' method
import bodyParser from 'body-parser'; 

import cartsRoutes from './routes/shoppingCarts.js';

//import userRoutes from './routes/usersID.js';


const app = express();
const PORT = 5001;
const CONNECTION_URL = 'mongodb+srv://erzihark:<erzihark1>@cluster0.dqdlr.mongodb.net/<dbname>?retryWrites=true&w=majority';

app.use(bodyParser.json());

//starting point of route (domain)
app.use('/carts', cartsRoutes); 

app.get('/',(req, res) => res.send('Hello from Homepage.'));

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));

