const express = require('express');
const cors  = require('cors')
const axios = require('axios');
const querystring = require("querystring");

const app = express();

const YOUR_CONSUMER_KEY = "1htrmcgkah9g2ma74lu773bf8k";
const YOUR_CONSUMER_SECRET = "4vdiq4m8ukhg0phk3a4asek5rq";
const YOUR_CONSUMER_REDIRECT_URI = "https://mymeetups.herokuapp.com/";

app.use(cors());
app.use(express.json());

app.get('/api', (req,res)=>{
    const user = req.query.user || "Zhixin-Jack-wang";
    axios.get(`https://api.github.com/users/${user}`)
        .then(response => {
            res.json({ user:response.data})
        })
})

// app.get('/login', (req,res)=>{
//     axios
//         .get(
//         "https://secure.meetup.com/oauth2/authorize?"+
//          querystring.stringify({
//             client_id:YOUR_CONSUMER_KEY,
//             redirect_uri:YOUR_CONSUMER_REDIRECT_URI,
//             response_type:"token"
//          }))
//         .then(
//             response=>console.log({response:response})
//         )
//         .catch(
//             error=>console.log({error:error})
//         )
// })
app.get('/', (req,res)=>{
    res.redirect(
        "https://secure.meetup.com/oauth2/authorize?"+
         querystring.stringify({
            client_id:YOUR_CONSUMER_KEY,
            response_type:"token",
            redirect_uri:YOUR_CONSUMER_REDIRECT_URI,
         }))
})



if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));