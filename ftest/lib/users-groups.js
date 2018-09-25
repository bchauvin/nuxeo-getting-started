const Promise = require('es6-promise').Promise;

module.exports = function usersGroups() {
  const Nuxeo = require('nuxeo');
  const nuxeo = new Nuxeo({
    auth: {
      method: 'basic',
      username: 'Administrator',
      password: 'Administrator'
    }
  });

  const groups = [
    {
      groupname: 'sales',
      grouplabel: 'Sales'
    },
    {
      groupname: 'managers',
      grouplabel: 'Managers'
    }
  ];

  const users = [{
    properties: {
      'entity-type': 'user',
      username: 'jdoe',
      password: 'jdoe',
      firstName: 'John',
      lastName: 'Doe',
      company: 'Big Corp',
      email: 'jdoe@example.com',
      groups: ['members']
    }
  }, {
    properties: {
      'entity-type': 'user',
      username: 'afraser',
      password: 'afraser',
      firstName: 'Alicia',
      lastName: 'Fraser',
      company: 'Big Corp',
      email: 'afraser@example.something',
      groups: ['members', 'sales']
    }
  }, {
    properties: {
      'entity-type': 'user',
      username: 'sconnor',
      password: 'sconnor',
      firstName: 'Sarah',
      lastName: 'Connor',
      company: 'Big Corp',
      email: 'sconnor@example.something',
      groups: ['members', 'sales', 'managers']
    }
  }];

  return Promise.all(groups.map((group) => {
    return nuxeo.groups().create(group);
  }))
    .then(() => {
      return Promise.all(users.map(function(user) {
        return nuxeo.users().create(user);
      }));
    })
    .catch(error => {
      return error;
    });
};