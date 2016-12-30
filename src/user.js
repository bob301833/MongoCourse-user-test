import mongoose from 'mongoose';
import PostSchema from './post';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  posts: [PostSchema],
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

UserSchema.pre('remove', function(next) {
  const BlogPost = mongoose.model('blogPost');

  BlogPost.remove({ _id: { $in: this.blogPosts } })
    .then(() => next());

  /* remove commit

  const Comment = mongoose.model('comment');

  for (const blogPost of this.blogPosts) {
    BlogPost.findById(blogPost)
      .then((blog) => {
         Comment.remove({ _id: { $in: blog.comments } })
          .then(() => {
            BlogPost.remove({ _id: blogPost });
          });
      })
      .then(() => next());
  }
  */
});

const User = mongoose.model('user', UserSchema);

export default User;
