import React, { Component } from "react";
import AcademicQualifications from "./components/AcademicQualifications";
import { Router } from "@reach/router";
import PersonalDetails from "./components/PersonalDetails";
import JobApplication from "./components/JopApplication";
import OtherPersonalDetails from "./components/OtherPersonalDetails";
import Files from "./components/Files";
import Done from "./components/Done";
import "./App.css";
import Certifications from "./components/Certifications";
import Admin from "./components/Admin";
import Manage from "./components/Manage";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      applicantId: "",
      done: false,
      appClosed:false,
    };
    this.mytimer = "";
  }
  componentDidMount() {
    let countDownDate = new Date("Mar 30, 2022 23:59:59").getTime();
    this.mytimer = setInterval(() => {
      let now = new Date().getTime();
      let timeleft = countDownDate - now;
      if (timeleft < 0) {
        this.setState({ appClosed: true });
        clearInterval(this.mytimer);
      } else {
        this.setState({ appClosed: false });
      }
    }, 1000);

    if (this.state.appClosed) {
      clearInterval(this.mytimer);
    }
  }
  setApplicantId = (id) => {
    this.setState({ applicantId: id });
  };
  setDone = (value) => {
    this.setState({ done: value });
  };
  componentWillUnmount() {
    clearInterval(this.mytimer);
  }
  render() {
    return (
      <>
        {!this.state.done ? (
          <Router>
            {this.state.appClosed ? (
              <AppClosed path="/" />
            ) : (
              <>
                <PersonalDetails
                  path="/"
                  setApplicantId={this.setApplicantId}
                />
                <OtherPersonalDetails
                  applicantId={this.state.applicantId}
                  path="/other-personal-details"
                />
                <AcademicQualifications
                  applicantId={this.state.applicantId}
                  path="/academic-qualifications"
                />
                <Certifications
                  applicantId={this.state.applicantId}
                  path="/certifications"
                />
                <JobApplication
                  applicantId={this.state.applicantId}
                  path="/job-details"
                />
                <Files
                  applicantId={this.state.applicantId}
                  setDone={this.setDone}
                  path="/file-upload"
                />
              </>
            )}
            <Admin path="/admin/dashboard" />
            <Manage path="/admin/manage" />
          </Router>
        ) : (
          <Done />
        )}
      </>
    );
  }
}

export default App;

export class AppClosed extends Component {
  render() {
    return (
      <div
        className="input-wrapper"
        style={{
          width: "80%",
          margin: "20px auto",
          textAlign: "center",
        }}
      >
        <h2>Application closed</h2>
      </div>
    );
  }
}
