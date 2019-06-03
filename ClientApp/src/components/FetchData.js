import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor (props) {
    super(props);
      this.state = {result: {}, loading: true, count : 0, username: "", password: ""};

      fetch('api/Cache/')
          .then(response => response.json())
          .then(data => {
              this.setState({ result: data, loading: false });
              console.log(data);
          }).catch(err => {
              console.log(err.message);
          });
      this.clickEvent = this.clickEvent.bind(this);
      this.onChange = this.onChange.bind(this);
      FetchData.renderForecastsTable = FetchData.renderForecastsTable.bind(this);
      
    }
    onChange(e) {
        const { target } = e;
        const { value, name } = target;
        switch(name)
        {
          case "username":
              this.setState({ username: value });
              break;
          case "password":
              this.setState({ password: value });
              break;
          default:
            break;
        }
    }

    async clickEvent() {
        await this.setState({ count: this.state.count + 1 });
        fetch('api/Cache/', {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            }),
        })
        .then(response => response.json()).then(data => {
          console.log(data);
          this.setState({ result: data, loading: false });
          this.setState({ username: "", password: "" });
        }).catch(err => {
            console.log(err.message);
        });;

        fetch('api/Cache/')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({ result: data, loading: false });
            this.setState({ message: "" });
        }).catch(err => {
            console.log(err.message);
        });;
        
    }

  static renderForecastsTable (result) {
    return (
      <table className='table table-striped'>
        <thead>
            <tr>
                <th>Id</th>
                <th>Username</th>
                <th>Password</th>
          </tr>
        </thead>
            <tbody>
                {
                    Object.keys(result).map((element, index) => (
                        <tr key={index}>
                        <td>{result[element].user_id}</td>
                        <td>{result[element].username}</td>
                        <td>{result[element].password}</td>
                    </tr>
                ))
            }
            
        </tbody>
      </table>
    );
  }

  render () {
    let contents = this.state.loading
        ? <p><em>Loading...</em></p>
        : FetchData.renderForecastsTable(this.state.result);

    return (
      <div>
          <p>Users</p>
          {contents}
      </div>
    );
  }
}
