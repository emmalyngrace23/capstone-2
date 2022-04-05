const express = require ('express') 

const mongoose = require ('mongoose')

const cors = require ('cors')

const userRoutes = require ('./routes/userRoutes');
const supplementRoutes = require ('./routes/supplementRoutes');

const port = 5000;

const app = express(); 


mongoose.connect("mongodb+srv://Admin_Bumaa:admin169@cluster0.cvssk.mongodb.net/onlineStoreAPI169?retryWrites=true&w=majority", {
		useNewUrlParser: true,
		useUnifiedTopology: true
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error'));
db.once('open', () => console.log('Connected to MongoDB'));


// middleware
app.use(express.json());
app.use('/users', userRoutes);
app.use('/supplements', supplementRoutes);


app.use(cors());



app.listen(port, () => console.log(`Server is running at port ${port}` ));