import assert from 'assert';
import User from '../src/user';

describe('Subdocuments', () => {
  it('can create a subdocuments', (done) => {
    const joe = new User({
       name: 'Joe',
       posts: [{ title: 'PostTitle' }]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'PostTitle');
        done();
      });
  });
});
