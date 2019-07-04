const express = require('express');
const cors  = require('cors')
const axios = require('axios');

const app = express();

app.use(cors());

app.get('/api', (req,res)=>{
    const user = req.query.user || "Zhixin-Jack-wang";
    axios.get(`https://api.github.com/users/${user}`)
        .then(response => {
            res.json({ user:response.data})
        })
})

if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));