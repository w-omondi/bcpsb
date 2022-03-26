import axios from "axios";
import React, { Component } from "react";

export class Manage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    axios
      .get("/system-users")
      .then((res) => {
        this.setState({ users: res.data });
      })
      .catch((err) => console.log(err.message));
  };

  render() {
    return (
      <div className="manage">
        <div className="input-wrapper">
          <h3>Admin Access Control</h3>
        </div>
        <table
          style={{
            width: "100%",
            margin: "20px auto",
          }}
        >
          <thead>
            <tr>
              <th>User</th>
              <th>Access</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user, i) => (
              <AccessView
                key={i}
                user={user.user}
                userid={user.user_id}
                access={user.admin_permisson}
              />
            ))}
          </tbody>
        </table>
        <div
          style={{
            width: "70%",
            margin: "20px auto",
            alignItems: "center",
            textAlign:"center",
          }}
        >
          <button
            onClick={() => (window.location.href = "/admin/dashboard")}
            style={{
              padding: "10px",
              margin: "10px",
              width: "200px",
            }}
          >
            APPLICATIONS
          </button>
          <button
            onClick={() => (window.location.href = "/logout")}
            style={{
              padding: "10px",
              width: "200px",
            }}
          >
            EXIT
          </button>
        </div>
      </div>
    );
  }
}

export class AccessView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userid: this.props.userid,
      user: this.props.user,
      access: this.props.access,
      triggered: false,
    };
  }
  updateAccess = () => {
    const { user, access, userid } = this.state;
    axios
      .post(`/update-access`, { userid, user, access })
      .then((res) => {
        this.setState({ triggered: false });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  handleUpdate = (e) => {
    this.setState({ [e.target.name]: e.target.value, triggered: true });
  };
  render() {
    return (
      <tr>
        <td>{this.props.user}</td>
        <td>
          <select
            name="access"
            value={this.state.access}
            onChange={this.handleUpdate}
          >
            <option value="0">none</option>
            <option value="0">0</option>
            <option value="1">1</option>
          </select>
        </td>
        <td>
          {this.state.triggered ? (
            <button
              style={{
                width: "unset",
              }}
              onClick={this.updateAccess}
              disabled={!this.state.triggered}
            >
              save
            </button>
          ) : null}
        </td>
      </tr>
    );
  }
}

export default Manage;
