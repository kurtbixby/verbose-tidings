export { Comment, Post, User };

import { Comment } from "./Comment.js";
import { Post } from "./Post.js";
import { User } from "./User.js";

User.hasMany(Post);
Post.belongsTo(User);

User.hasMany(Comment);
Post.hasMany(Comment);
Comment.belongsTo(User);
Comment.belongsTo(Post);