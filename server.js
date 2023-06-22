const PORT = 8000
const axios = require('axios').default
//axios request is essentially going to help us make GET requests
//bc we're going to get our data from the database
const express = require('express')
//express is going to help do the routing
const cors = require('cors')
//cors is going to help us when we see the pesky cors message
require('dotenv').config()
//dotenv file is going to help us get information from the .env file 
//that we will create to store our api key

const app = express()

app.use(cors())


app.get('/flights', (req, res) => {
    const options = {
        url: `${process.env.URL}?page-size=6`,  
        headers: {
            accept: 'application/json',
            'X-Cassandra-Token': process.env.TOKEN
        }
    }
    axios.request(options).then(response => {
        console.log(response.data)
        res.json(response.data)
    }).catch(error => {
        console.log(error)
    })

})

app.listen(PORT, () => console.log('running on port ' + PORT))
// 
// const express = require('express');
// const app = express();
// app.get('/flights', (req, res) => {
//     res.send('Welcome to CORS server 😁') })
// //app.get('/cors', (req, res) => {
//     //res.send('This has CORS enabled 🎈')
// //})
// app.get('/cors', (req, res) => {
//     res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.send({ "msg": "This has CORS enabled 🎈" })
//     })