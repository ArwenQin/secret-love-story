import * as postsDao from './post-dao.js'



const createPost = async (req, res) => {


      const newPost = req.body;
      const insertedPost = await postsDao.createPost(newPost);

  res.json(insertedPost);

}
const findPosts = async (req, res) => {
  const post = await postsDao.findPosts()
  res.json(post);
}

const updatePost = async (req, res) => {
  const postIdToUpdate = req.params.rid;
  const updates = req.body;

  const status = await postsDao
    .updatePost(postIdToUpdate, updates);
  res.json(status);


}
const deletePost = async (req, res) => {
  const postIdToDelete = req.params.pid;
  const status = await postsDao.deletePost(postIdToDelete);
  res.json(status);


}


const searchPosts = async (req, res) => {
  try {
    const searchTerm = req.query.q;
    const posts = await postsDao.searchPosts(searchTerm);
    res.json(posts);
  } catch (error) {
    console.error('Error during post search:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const findPostById = async (req, res) => {
  const id = req.params.id;
  const post = await postsDao.findPostById(id);
  res.json(post);
};

const fetchUserPosts = async (req, res) => {
  try {
    const owner = req.params.userId;

    const posts = await postsDao.findPosByOwnerId(owner);
    res.json(posts);
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
export default (app) => {
  app.post('/api/posts', createPost);
  app.get('/api/posts', findPosts);
  app.get('/api/posts/user/:userId', fetchUserPosts);
  app.get('/api/posts/search', searchPosts);
  app.put('/api/posts/:pid', updatePost);
  app.delete('/api/posts/:pid', deletePost);
  app.get('/api/posts/:id', findPostById);
}


