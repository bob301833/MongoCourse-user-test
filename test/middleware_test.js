import assert from 'assert';
import User from '../src/user';
import BlogPost from '../src/blogPost';
import Comment from '../src/comment';

describe('Middleware', () => {
  let joe, blogPost, comment;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' });
    comment = new Comment({ content: 'Congrats on great post' });

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done());
  });

  it.only('users clean up dangling blogposts on remove', (done) => {
    console.log('blogPost.comments[0]:', blogPost.comments[0]);
    joe.remove()
      .then(() => Comment.count())
      .then((count) => {
        console.log(count);
        assert(count === 0);
        done();
      });
  });
});
