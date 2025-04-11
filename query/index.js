const express = require('express');
const cors  = require('cors');
const bodyParser = require('body-parser');  

const app = express();

app.use(bodyParser.json());     
app.use(cors()); 

const posts = {}; // Store posts in memory  
app.get('/posts', (req, res) => {   
    res.send(posts);
}   
)


app.post('/events', (req, res) => {   
  const {type, data} = req.body;    

    if (type === 'PostCreated') {   

        const { id, title } = data;    
        posts[id] = { id, title };    
    }
    if (type === 'CommentsCreated') {   
        const { id, content, postId } = data;    
        const post = posts[postId];    
        post.comments.push ({ id, content });
       
    }   
}   )


app.post('/events', (req, res) => {
    console.log('Event received:', req.body.type);
    res.send({}); // Acknowledge the event
  }
  );

app.listen(4002, () => {    
    console.log('Server is running on posrt  4002');
}   
)




