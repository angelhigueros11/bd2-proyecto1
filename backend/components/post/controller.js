const Model = require('./model');


function addPost({ name, description, image }) {
    if (!name || !description || !image){
        return Promise.reject('No estan todos los datos completos');
    }
        const post = {
            name,
            description, 
            image
        }

    
    const myPost = new Model(post);
    return myPost.save();
}

async function addLike({ id }) {
    const post = await Model.findById(id);
    if (!post) {
      throw new Error(`Post with id ${id} not found`);
    }
    post.likes += 1;
    return post.save();
}

async function getPosts(params){
    const post = await Model.find(params);
    return post;
}

module.exports = {
    addPost,
    getPosts,
    addLike
}