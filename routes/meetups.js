const express = require('express');
const router = express.Router();
const axios = require('axios');
const querystring = require("querystring");

//consumer info
const YOUR_CONSUMER_KEY = "ebiiqiv23vk46cm62g40ce8lqk";
const YOUR_CONSUMER_SECRET = "ffb026bgdek54na6simhg0ifb2";
const YOUR_CONSUMER_REDIRECT_URI = "https://mymeetups.herokuapp.com/";
const YOUR_EMAIL = "jack1994@my.yorku.ca";
const YOUR_PASSWORD = "Reasonjack1";

//search meetup
router.post('/', (req,res)=>{
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
                                    const OAUTH_TOKEN = response.data.oauth_token;
                                    console.log(OAUTH_TOKEN);
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

module.exports = router;
