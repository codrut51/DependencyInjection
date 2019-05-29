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
        let newMsg = e.target.value;
        this.setState({ message: newMsg })
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
                {/*result.map(res => (<tr>
                    <td>{res.key}</td>
                    <td>{res.value}</td>
                    </tr>
                ))*/}
                {
                //     Object.keys(result).map((element, index) => (
                //         <tr key={index}>
                //         <td>{element}</td>
                //         <td>{result[element]}</td>
                //     </tr>
                // ))
                <tr>
                  <td></td>
                  <td><input type="text" name="username" value={this.state.username} onChange={(e) => { this.onChange(e); }} /> </td>
                  <td><input type="text" name="password" value={this.state.password} onChange={(e) => { this.onChange(e); }} /> </td>
                </tr>
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
        <h1>Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
            {contents}
            <p> <button onClick={this.clickEvent}>AddUser</button> </p>
      </div>
    );
  }
}
