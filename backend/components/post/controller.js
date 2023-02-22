

const Model = require('./model');


function addPost({ id, name, description, image, tags }) {
    if (!name || !description || !image){
        return Promise.reject('No estan todos los datos completos');
    }
        const post = {
            idUser:
            id,
            name,
            description, 
            image, 
            tags: tags.split(',')
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

async function remove({ id }) {
    const post = await Model.deleteOne({_id: id});
    
    return "bien";
}

async function getPosts(params){
    const post = await Model.find(params).sort({ createdAt: 'desc' });
    return post;
}

async function getPostsLimit(limit){
    const posts = await Model.find().sort({ createdAt: 'desc' }).limit(limit);
    return posts;
}

async function getMostPostsUser (){
    const count = await Model.aggregate([{$group: {_id: "$name",count: { $sum: 1 }}},{$sort: {count: -1}},{$limit: 1}])
    return {count}
}

module.exports = {
    addPost,
    getPosts,
    addLike,
    remove,
    getPostsLimit,
    getMostPostsUser,
}