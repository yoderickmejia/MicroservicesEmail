
const express = require('express');
const { randomBytes } = require('crypto');  
const bodyParser = require('body-parser');
const cors = require('cors');  
const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all route
const axios = require('axios'); 

const posts ={};

app.get('/posts', (req, res ) => {
    res.send(posts)
});




app.post('/posts', async(req,res) =>{
    const id = randomBytes(4).toString('hex');

    const { title } = req.body; 
    posts[id] = {
      id, title
    };
    await  axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: {
            id, title
        }
    }).catch((err) => {
        console.log('Error sending event:', err.message);
    });

    res.status(201).send(posts[id]);
}); 


app.listen(4005, () => {
  console.log('Server is running on port 4000');
});





