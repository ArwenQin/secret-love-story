import postModel from "./post-model.js";


export const findPosts = () => postModel.find();

export const findPostById = (id) =>
    postModel.findById(id);
export const createPost = (pos) => postModel.create(pos);
export const deletePost = (pid) => postModel.deleteOne({ _id: pid });
export const updatePost = (pid, pos) => postModel.updateOne({ _id: pid }, { $set: pos })
export const findPosByOwnerId = (userId) =>
    postModel.find({  userId: userId  });


export const searchPosts = (searchTerm) =>
    postModel.find({ name: new RegExp(searchTerm, 'i') });

