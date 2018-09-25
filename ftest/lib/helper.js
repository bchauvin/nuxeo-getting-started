const Promise = require('es6-promise').Promise;
const Nuxeo = require('nuxeo');
const nuxeo = new Nuxeo({
  auth: {
    method: 'basic',
    username: 'Administrator',
    password: 'Administrator'
  }
});

module.exports = {

  getGroup: (group) => {
    return nuxeo.http({ url: `http://localhost:8080/nuxeo/api/v1/group/${group}`, resolveWithFullResponse: true})
      .then(res => {
        return res.json();
      });
  },

  deleteGroups: () => {
    return nuxeo.http({ url: 'http://localhost:8080/nuxeo/api/v1/group/search?q=%2A&pageSize=1000'})
      .then(res => {
        return Promise.all(res.entries.map(group => {
          if (group.groupname !== 'administrators' &&
            group.groupname !== 'members' &&
            group.groupname !== 'powerusers') {
            return nuxeo.groups().delete(group.groupname);
          }
        }, {concurrency: 10}));
      });
  },

  getUser: (user) => {
    return nuxeo.http({ url: `http://localhost:8080/nuxeo/api/v1/user/${user}`, resolveWithFullResponse: true})
      .then(res => {
        return res.json();
      });
  },

  deleteUsers: () => {
    return nuxeo.http({ url: 'http://localhost:8080/nuxeo/api/v1/user/search?q=%2A&pageSize=1000'})
      .then(res => {
        return Promise.all(res.entries.map(user => {
          if (user.id !== 'Administrator') {
            return nuxeo.users().delete(user.id);
          }
        }, {concurrency: 10}));
      });
  }

};