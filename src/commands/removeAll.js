const User = require('../models/user');
const { getOrCreateUser } = require('./middleware');

const middleware = [getOrCreateUser()];

module.exports = () => ({
  middleware,
  handler: User.removeAllImageLinks.bind(User),
  triggers: ['removeall'],
  description: 'Remove all image links',
});
