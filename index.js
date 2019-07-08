const express = require('express');
const cors  = require('cors')
const axios = require('axios');
const querystring = require("querystring");

const app = express();

const YOUR_CONSUMER_KEY = "ebiiqiv23vk46cm62g40ce8lqk";
const YOUR_CONSUMER_SECRET = "ffb026bgdek54na6simhg0ifb2";
const YOUR_CONSUMER_REDIRECT_URI = "https://mymeetups.herokuapp.com/";
const YOUR_EMAIL = "jack1994@my.yorku.ca";
const YOUR_PASSWORD = "Reasonjack1";

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

app.post('/meetups', (req,res)=>{
    console.log("here");
    console.log(req.body);
    const term = req.body.term;
    axios.get(
        "https://secure.meetup.com/oauth2/authorize?"+
         querystring.stringify({
            client_id:YOUR_CONSUMER_KEY,
            redirect_uri:YOUR_CONSUMER_REDIRECT_URI,
            response_type:"anonymous_code"
         }))
         .then(
             response=>{
                const path = response.request.path;
                code = path.split("/?code=")[1];
                axios.post(
                    "https://secure.meetup.com/oauth2/access?"+
                    querystring.stringify({
                        client_id:YOUR_CONSUMER_KEY,
                        client_secret:YOUR_CONSUMER_SECRET,
                        grant_type:"anonymous_code",
                        redirect_uri:YOUR_CONSUMER_REDIRECT_URI,
                        code:code,
                     }))
                    .then(
                        response=>{
                            // console.log(response);
                            const ACCESS_TOKEN = response.data.access_token;
                            const REFRESH_TOKEN = response.data.refresh_token;
                            console.log(ACCESS_TOKEN);
                            // console.log(REFRESH_TOKEN);

                            let config = {
                                headers: {
                                    'Authorization':'Bearer ' + ACCESS_TOKEN
                                }
                              }
                            let data = {};
                            axios.post(
                                "https://api.meetup.com/sessions?"+
                                querystring.stringify({
                                    email:YOUR_EMAIL,
                                    password:YOUR_PASSWORD
                                }),
                                data,config
                            ).then(
                                response=>{
                                    // console.log(response)
                                    const OAUTH_TOKEN = response.data.oauth_token;
                                    console.log(OAUTH_TOKEN);
                                    // axios.get(`https://api.meetup.com/find/groups?zip=11211&radius=1&category=25&order=members&access_token=${OAUTH_TOKEN}`)
                                    //     .then(
                                    //         response=>console.log(response)
                                    //     )
                                    axios.get(`https://api.meetup.com/2/open_events?&sign=true&photo-host=public&country=ca&city=toronto&text=${term}&page=20&only=id,name,photo_url,how_to_find_us,time,venue,event_url,description&access_token=${OAUTH_TOKEN}`)
                                        .then(
                                            response=>{
                                                console.log(response.data);
                                                res.send(response.data.results);
                                            }
                                        )
                                }
                            ).catch(
                                // err=>console.log(err)
                                err=>console.log("error")
                                
                            )

                        }
                    )
             }
         )
})



https://api.meetup.com/2/open_events?&sign=true&photo-host=public&country=ca&city=toronto&text=tech&page=20
// https://secure.meetup.com/oauth2/access?
// client_id=YOUR_CONSUMER_KEY
// &client_secret=YOUR_CONSUMER_SECRET
// &grant_type=anonymous_code
// &redirect_uri=SAME_REDIRECT_URI_USED_FOR_PREVIOUS_STEP
// &code=CODE_YOU_RECEIVED_FROM_THE_AUTHORIZATION_RESPONSE




if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));