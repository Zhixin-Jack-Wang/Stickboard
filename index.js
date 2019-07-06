const express = require('express');
const cors  = require('cors')
const axios = require('axios');
const querystring = require("querystring");

const app = express();

const YOUR_CONSUMER_KEY = "ebiiqiv23vk46cm62g40ce8lqk";
const YOUR_CONSUMER_SECRET = "ffb026bgdek54na6simhg0ifb2";
const YOUR_CONSUMER_REDIRECT_URI = "https://mymeetups.herokuapp.com/";

app.use(cors());
app.use(express.json());

// app.get('/api', (req,res)=>{
//     const user = req.query.user || "Zhixin-Jack-wang";
//     axios.get(`https://api.github.com/users/${user}`)
//         .then(response => {
//             res.json({ user:response.data})
//         })
// })

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
app.get('/auth', (req,res)=>{
    console.log("here");
    res.redirect(
        "https://secure.meetup.com/oauth2/authorize?"+
         querystring.stringify({
            client_id:YOUR_CONSUMER_KEY,
            redirect_uri:YOUR_CONSUMER_REDIRECT_URI,
            response_type:anonymous_code
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