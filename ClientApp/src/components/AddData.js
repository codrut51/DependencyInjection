import React, { Component } from 'react';
import './AddData.css';

export class AddData extends Component {
  static displayName = AddData.name;

  constructor (props) {
    super(props);
      this.state = {username: "", password: "", status: ""};
      this.clickEvent = this.clickEvent.bind(this);
      this.onChange = this.onChange.bind(this);
      
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
        const {username, password} = this.state;
        if(username !== undefined &&
           username !== null &&
           username !== "" &&
           password !== undefined &&
           password !== null &&
           password !== "")
           {
                fetch('api/Cache/', {
                    method: "post",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                    }),
                })
                .then(response => response.json()).then(data => {
                console.log(data);
                this.setState({ username: "", password: "" });
                this.setState({ status: "successful" });
                }).catch(err => {
                    console.log(err.message);
                    this.setState({ status: "error: " + err.message });
                });
           }else{
               this.setState({status: "Please fill in username and/or password"});
           }
    }

  render () {
    return (
      <div className="form">
         <div id="input_fields">
            <p id="status">{this.state.status}</p>
            <input type="text" name="username" value={this.state.username} 
                   id="username"
                   placeholder="Username" 
                   onChange={(e) => { this.onChange(e) }} />
            <input type="password" name="password" value={this.state.password}
                   placeholder="Password" 
                   id="password"
                   onChange={(e) => { this.onChange(e) }} />
            <button id="insert" onClick={this.clickEvent}>Add User</button>
         </div>
      </div>
    );
  }
}
