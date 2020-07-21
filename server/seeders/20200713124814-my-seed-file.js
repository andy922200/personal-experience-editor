'use strict';
const bcrypt = require('bcryptjs')
const faker = require('faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('Users', [{
      name: 'root',
      email: 'root@example.com',
      password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
      profile_img: faker.image.avatar(),
      age: 30,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'user1',
      email: 'user1@example.com',
      password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
      profile_img: faker.image.avatar(),
      age: 35,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'user2',
      email: 'user2@example.com',
      password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
      profile_img: faker.image.avatar(),
      age: 40,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    return queryInterface.bulkInsert('JobRecords',
      Array.from({ length: 20 }).map(d =>
        ({
          title: faker.name.jobTitle(),
          company_name: faker.company.companyName(),
          company_logo: faker.image.imageUrl(),
          start_date: faker.date.past(),
          end_date: faker.date.recent(20),
          current_position: Math.random() >= 0.5 ? true : false,
          UserId: Math.floor(Math.random() * 3) + 1,
          description: faker.lorem.sentence(8),
          public_status: Math.random() >= 0.5 ? true : false,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      ), {})
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Users', null, {});
    return queryInterface.bulkDelete('JobRecords', null, {})
  }
};
