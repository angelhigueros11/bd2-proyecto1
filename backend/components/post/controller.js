

const Model = require('./model');
const ModelUser = require('../auth/model');


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


async function info({id, phone, address, email}){
    const userr = await ModelUser.findById(id);
    userr.contact.phone = phone
    userr.contact.address = address
    userr.contact.email = email
    userr.save()
}


async function newTag({id, tag}){
    const post = await Model.find({_id: id});
    try {
        const posts = await Model.find({_id: id});
        const updatedPosts = posts.map(post => {
          post.tags = [...post.tags, tag];
          return post.save();
        });
        return Promise.all(updatedPosts);
      } catch (err) {
        console.error(err);
      }
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
    newTag,
    info
}
