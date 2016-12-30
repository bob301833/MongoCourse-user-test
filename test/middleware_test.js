import assert from 'assert';
import User from '../src/user';
import BlogPost from '../src/blogPost';
import Comment from '../src/comment';

describe('Middleware', () => {
  let joe,
      blogPost;
    //  comment;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' });
    //comment = new Comment({ content: 'Congrats on great post' });

    joe.blogPosts.push(blogPost);
    //blogPost.comments.push(comment);
    //comment.user = joe;

    Promise.all([joe.save(), blogPost.save()])
      .then(() => done());
  });

  it('users clean up dangling blogposts on remove', (done) => {
    joe.remove()
      .then(() => BlogPost.count())
      .then((count) => {
        assert(count === 0);
        done();
      });
  });
});
