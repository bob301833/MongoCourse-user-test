//import assert from 'assert';
import User from '../src/user';

describe('Creating records', () => {
  it('saves a user', () => {
    const joe = new User({ name: 'Joe' });

    joe.save();
  });
});
