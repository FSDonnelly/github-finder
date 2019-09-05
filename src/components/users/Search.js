import React, { Component } from 'react';

class Search extends Component {
  state = {
    text: ''
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();

    console.log(this.state.text);
  };

  render() {
    const { text } = this.state;
    return (
      <div>
        <form className='form' onSubmit={this.onSubmit}>
          <input
            type='text'
            name='text'
            placeholder='Search Github Users...'
            value={text}
            onChange={this.onChange}
          />
          <input
            type='submit'
            value='Search'
            className='btn btn-dark btn-block'
          />
        </form>
      </div>
    );
  }
}

export default Search;
