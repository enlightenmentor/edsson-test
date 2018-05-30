const faker = require("faker");

module.exports = () => ({
  feeds: new Array(10).fill(null).map((entry, index) => ({
    id: index,
    name: faker.name.findName(),
    avatarUrl: faker.image.avatar(),
    post: faker.lorem.sentence()
  }))
});