import axios from "axios";
import React, { Component } from "react";
import { navigate } from "@reach/router";

export class Certifications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateFrom: "",
      dateTo: "",
      institution: "",
      award: "",
      specialization: "",
      savedCertifications: [],
      applicantId: this.props.applicantId,
      active: true,
    };
  }
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  componentDidMount() {
    this.loadsavedCertifications();
  }

  addQulification = () => {
    console.log(this.state);
    axios.post(`/certifications`, { data: this.state }).then((res) => {
      //fetch data saved
      //clear state variables
      console.log(res.data);
      this.setState({
        dateFrom: "",
        dateTo: "",
        institution: "",
        award: "",
        specialization: "",
        active: false,
      });
      this.loadsavedCertifications();
    });
  };

  loadsavedCertifications = () => {
    if (!this.state.applicantId) {
      return;
    } else {
      axios
        .get(`/getcertif/${this.state.applicantId}`)
        .then((res) => {
          this.setState({ savedCertifications: res.data });
        })
        .catch((err) => console.log(err.message));
    }
  };

  render() {
    return (
      <div className="main-wrapper">
        <h3>3. Professional Certifications.</h3>
        <div className="input-wrapper">
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <label htmlFor="date-from">From: </label>
            <input
              type="number"
              name="dateFrom"
              id="date-from"
              min={1800}
              onChange={this.changeHandler}
              placeholder="Year"
              value={this.state.dateFrom}
            />
            <label htmlFor="date-to">To: </label>
            <input
              type="number"
              name="dateTo"
              id="date-to"
              min={1800}
              onChange={this.changeHandler}
              placeholder="Year"
              value={this.state.dateTo}
            />
          </div>
        </div>
        <div className="input-wrapper">
          <label htmlFor="institution">Institution </label>
          <input
            type="text"
            name="institution"
            id="institution"
            onChange={this.changeHandler}
            value={this.state.institution}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="award">Award/certificate </label>
          <input
            name="award"
            id="award"
            onChange={this.changeHandler}
            value={this.state.award}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="specialization">Specialization</label>
          <input
            type="text"
            name="specialization"
            id="specialization"
            onChange={this.changeHandler}
            value={this.state.specialization}
          />
        </div>
        <div className="button-wrapper">
          <button onClick={this.addQulification}>Add</button>
          <button
            onClick={() =>
              navigate("/job-details", {
                state: { applicantId: this.state.applicantId },
              })
            }
            disabled={this.state.active}
          >
            Next
          </button>
        </div>
        <div className="input-wrapper" style={{ width: "100%" }}>
          <table>
            <thead>
              <th>Start</th>
              <th>End</th>
              <th>Institution</th>
              <th>Attainment</th>
              <th>Specialization</th>
            </thead>
            <tbody>
              {this.state.savedCertifications.map((q, i) => (
                <tr key={i} style={{ width: "100%" }}>
                  <td>{q.dateFrom}</td>
                  <td>{q.dateTo}</td>
                  <td>{q.institution}</td>
                  <td>{q.award}</td>
                  <td>{q.specialization}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Certifications;
