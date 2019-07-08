const express = require('express');
const cors  = require('cors')
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

//keys
const  db = `mongodb+srv://corey:indahouse@userdata-foiq0.mongodb.net/StickyBoard?retryWrites=true&w=majority`;

// Connect to Mongo
mongoose.connect(db,{useNewUrlParser:true,useFindAndModify:false})
.then(()=>console.log('MongoDB Connected...'))
.catch(err => console.log(err));

//routes
app.use('/meetups',require('./routes/meetups'));
app.use('/pin',require('./routes/pin'));

//heroku build
if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));