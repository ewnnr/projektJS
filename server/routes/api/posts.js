const { response } = require('express');
const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();
//Get posts
router.get('/', async(req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

//Add post
router.post('/', async(req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

//Update post
router.put('/:id', async(req, res) => {
    const posts = await loadPostsCollection();
    const updatedPost = await posts.updateOne({ _id: req.params._id }, { $set: { text: req.body.text } })
    res.json(updatedPost);
})

//Delete post
router.delete('/:id', async(req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
    res.status(200).send();
});


//Mongodb
async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb://localhost/vuedb', {
        useNewUrlParser: true
    });
    return client.db('vuedb').collection('posts');
}

module.exports = router;