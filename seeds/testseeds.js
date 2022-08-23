import { sequelize } from '../config/connection.js';
import { Comment, Post, User } from '../models/index.js';

sequelize.sync().
then(async () => {
    await createUsers();
    await createPosts();
    await createComments();
});

async function createUsers() {
    const userPromises = [];

    userPromises.push(User.create({ username: 'kurtbixby', email: 'kurtbixby@gmail.com', password: 'qwerty123'}));
    userPromises.push(User.create({ username: 'gyroz', email: 'gyrozep@gmail.com', password: 'qwerty123'}));
    userPromises.push(User.create({ username: 'diegob', email: 'konodioda@gmail.com', password: 'qwerty123'}));

    await Promise.all(userPromises);
}

async function createPosts() {
    const postPromises = [];
    postPromises.push(createPost('Hello', 'World', 1));
    postPromises.push(createPost('Jello', 'Squirrel', 2));

    await Promise.all(postPromises);
}

async function createPost(title, body, userId) {
    const post = await Post.create({title: title, body: body});
    const user = await User.findByPk(userId);
    post.setUser(user);
}

async function createComments() {
    const commentPromises = [];
    commentPromises.push(createComment('Best. Post. Ever', 2, 1));
    commentPromises.push(createComment('Worst. Post. Ever', 2, 2));

    await Promise.all(commentPromises);
}

async function createComment(body, postId, userId) {
    const post = await Post.findByPk(postId);
    const user = await User.findByPk(userId);
    const comment = await Comment.create({body: body});

    comment.setUser(user);
    comment.setPost(post);
}