import React, { Component } from "react";
import { navigate } from "@reach/router";
import axios from "axios";
import MultipleChoices from "./MultipleChoices";

export class OtherPersonalDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      applicantId: this.props.applicantId,
      ethnicity: "",
      minority_group: "",
      plwd: "",
      disability_nature_APDK: "",
      chapter6_compliance: [],
      referees: "",
    };
  }
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  setValue = (chapter6_compliance) => {
    this.setState({ chapter6_compliance: chapter6_compliance });
  };

  save = () => {
    console.log(this.state);
    axios.post(`/other-personal-data`, { data: this.state }).then((res) => {
      console.log(res.data);
      navigate("/academic-qualifications", {
        state: { applicantId: this.state.applicantId },
      }).catch((err) => {
        console.log(err.message);
      });
    });
  };

  render() {
    return (
      <div className="main-wrapper">
        <h3>2. Other Personal Details ( applicable to all applicants) </h3>
        <div className="input-wrapper">
          <span>Ethnicity</span>
          <input
            type="text"
            name="ethnicity"
            placeholder="Your answer"
            onChange={this.changeHandler}
            value={this.state.ethnicity}
          />
        </div>
        <div className="input-wrapper">
          <span>Minority Group</span>
          <select
            name="minority_group"
            id=""
            value={this.state.minority_group}
            onChange={this.changeHandler}
          >
            <option value="NA">select</option>
            <option value="yes">YES</option>
            <option value="no">NO</option>
          </select>
        </div>
        <div className="input-wrapper">
          <span>Are you a PLWD?</span>
          <select
            name="plwd"
            id=""
            value={this.state.plwd}
            onChange={this.changeHandler}
          >
            <option value="NA">select</option>
            <option value="yes">YES</option>
            <option value="no">NO</option>
          </select>
        </div>
        <div className="input-wrapper">
          <span>
            If yes, please state the nature of disability and APDK Registration
            no
          </span>
          <textarea
            name="disability_nature_APDK"
            placeholder="Your answer"
            width="90"
            value={this.state.disability_nature_APDK}
            onChange={this.changeHandler}
          />
        </div>

        <div className="input-wrapper">
          <span>
            Chapter 6 compliance. (Tick where applicable), NB: Not mandatory but
            those who will be shortlisted might be required to avail during the
            interviews
          </span>
          <MultipleChoices
            element="chapter_compliance"
            checks={[
              "KRA tax compliance certificate",
              "EACC clearance",
              "CRB clearance",
              "HELB clearance",
              "CID clearance/Good conduct",
            ]}
            setValue={this.setValue}
          />
        </div>

        <div className="input-wrapper">
          <span>Referees</span>
          <textarea
            name="referees"
            placeholder="Your answer"
            width="90"
            value={this.state.referees}
            onChange={this.changeHandler}
          />
        </div>

        <div className="button-wrapper">
          <button onClick={this.save}>Next</button>
        </div>
      </div>
    );
  }
}

export default OtherPersonalDetails;