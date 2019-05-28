import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor (props) {
    super(props);
    this.state = { result: "", loading: true, count : 0, message: ""};

      fetch('api/Cache/' + this.state.count)
        .then(response => response.json())
        .then(data => {
        this.setState({ result: data, loading: false });
        });
      this.clickEvent = this.clickEvent.bind(this);
      this.onChange = this.onChange.bind(this);
      
    }
    onChange(e) {
        let newMsg = e.target.value;
        this.setState({ message: newMsg })
    }

    async clickEvent() {
        await this.setState({ count: this.state.count + 1 });
        fetch('api/Cache/', {    
                method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                    message : this.state.message,
                }),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                this.setState({ result: data, loading: false });
                this.setState({ message: "" });
            });
    }

  static renderForecastsTable (result) {
    return (
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
                <tr>
                    <td>{result.message}</td>
                </tr>
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
            <p> <input type="text" value={this.state.message} onChange={(e) => { this.onChange(e); }} /></p>
            <p> <button onClick={this.clickEvent}>Click</button> </p>
      </div>
    );
  }
}
