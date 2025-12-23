import React from 'react';
import axios from 'axios';

class Api extends React.Component {

  state = {
    details: []
  };

  componentDidMount() {
    axios.get('http://localhost:8000/api/get_listings')
      .then(res => {
        this.setState({
          details: res.data
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const filtered = this.state.details.filter(item => item.category === "Construction");
    return (
      <div>
           {filtered.map((item, i) => (
        <div key={i}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p>Price: {item.price}</p>
        </div>
      ))}
      </div>
    );
  }
}

export default Api;

