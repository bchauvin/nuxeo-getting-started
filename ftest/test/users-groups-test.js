const assert = require('assert');
const usersGroups = require('../lib/users-groups');
const helper = require('../lib/helper');

const groups = ['managers', 'sales'];
const users = ['jdoe', 'afraser', 'sconnor'];

describe('usersGroups', function() {
  before(function() {
    return usersGroups();
  });

  after(function() {
    helper.deleteGroups();
    helper.deleteUsers();
  });

  groups.forEach(function(group) {
    it(`creates the ${group} group`, function() {
      return helper.getGroup(group).then(function(result) {
        assert.equal(result.properties.groupname, group);
      });
    });
  });

  users.forEach(function(user) {
    it(`creates user ${user}`, function() {
      return helper.getUser(user).then(function(result) {
        assert.equal(result.properties.username, user);
      });
    });
  });

});
