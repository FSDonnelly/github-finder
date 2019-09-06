import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import Search from './components/users/Search';
import User from './components/users/User';
import About from './components/pages/About';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Search Github Users
  const searchUsers = async text => {
    setLoading(true);

    const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${clientId}&client_secret=${clientSecret}`
    );
    setUsers(res.data.items);
    setLoading(false);
  };

  // Get a single Github user
  const getUser = async username => {
    setLoading(true);

    const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${clientId}&client_secret=${clientSecret}`
    );
    setUser(res.data);
    setLoading(false);
  };

  // Get users repos
  const getUserRepos = async username => {
    setLoading(true);

    const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${clientId}&client_secret=${clientSecret}`
    );
    setRepos(res.data);
    setLoading(false);
  };
  // Clear users from state
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  // Set alert if no search term
  const showAlert = (msg, type) => {
    setAlert({ msg, type });

    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <Router>
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path='/'
              render={props => (
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={showAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )}
            />
            <Route exact path='/about' component={About} />
            <Route
              exact
              path='/user/:login'
              render={props => (
                <User
                  {...props}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  user={user}
                  repos={repos}
                  loading={loading}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
