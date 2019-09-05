import React, { Component } from 'react';
import axios from 'axios';

import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import './App.css';

class App extends Component {
  state = {
    users: [],
    loading: false
  };

  // async componentDidMount() {
  //   this.setState({ loading: true });
  //   const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  //   const clientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
  //   const res = await axios.get(
  //     `https://api.github.com/users?client_id=${clientId}&client_secret=${clientSecret}`
  //   );

  //   this.setState({
  //     users: res.data,
  //     loading: false
  //   });
  // }

  // Search Github Users
  searchUsers = async text => {
    const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${clientId}&client_secret=${clientSecret}`
    );

    this.setState({
      users: res.data.items,
      loading: false
    });
  };

  render() {
    const { loading, users } = this.state;
    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Search searchUsers={this.searchUsers} />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
