import React, { Component } from "react";
import { navigate } from "@reach/router";
import axios from "axios";
import { Header, Footer } from "./HeaderAndFooter";

export default class JopApplication extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: ["none", "Health workers", "Teachers", "Other"],
      categorySelected: "",
      employed: "",
      experience: "",
      current_employer: "",
      membership_no: "",
      vacancy_no: "",
      position_applied: "",
      tsc_egistration_number: "",
      school_applied: "",
      professional_membership: "  ",
      applicantId: this.props.applicantId,
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  save = (e) => {
    e.preventDefault();
    console.log(this.state);
    axios.post(`/job-details`, { data: this.state }).then((res) => {
      console.log(res.data);
      navigate("/file-upload", {
        state: { applicantId: this.state.applicantId },
      }).catch((err) => {
        console.log(err.message);
      });
    });
  };

  render() {
    let element = "";
    switch (this.state.categorySelected) {
      case "Teachers":
        element = (
          <div>
            <div className="input-wrapper">
              <span>TSC registration number</span>
              <input
                type="text"
                name="tsc_egistration_number"
                placeholder="Your answer"
                onChange={this.changeHandler}
                value={this.state.tsc_egistration_number}
              />
            </div>
            <div className="input-wrapper">
              <span>School your are applying for</span>
              <input
                type="text"
                name="school_applied"
                placeholder="Your answer"
                onChange={this.changeHandler}
                value={this.state.school_applied}
              />
            </div>
          </div>
        );
        break;
      case "Health workers":
        element = (
          <div style={{ width: "100%" }}>
            <div className="input-wrapper">
              <span>(a): Professional membership in good standing</span>
              <br />
              <input
                type="text"
                name="professional_membership"
                placeholder="Your answer"
                onChange={this.changeHandler}
                value={this.state.professional_membership}
              />
            </div>
            <div className="input-wrapper">
              <span>(b): Membership no.</span>
              <input
                type="text"
                name="membership_no"
                placeholder="Your answer"
                onChange={this.changeHandler}
                value={this.state.membership_no}
              />
            </div>
            <div className="input-wrapper">
              <span>
                (b): Possession of a valid letter or certificate of confirmation
                of membership in good standing (if any to be uploaded)
              </span>
            </div>
          </div>
        );
        break;
      default:
        element = <></>;
        break;
    }
    return (
      <>
        <Header />

        <form className="main-wrapper">
          <h3>4. Job application details</h3>
          <div className="input-wrapper">
            <span>Are you currently Employed?</span>
            <select
              name="employed"
              onChange={this.changeHandler}
              id=""
              value={this.state.employed}
            >
              <option value="NA">select</option>
              <option value="no">NO</option>
              <option value="yes">YES</option>
            </select>
          </div>
          <div className="input-wrapper">
            <span>If Yes, Kindly Indicate Your Current Employer?</span>
            <input
              type="text"
              name="current_employer"
              placeholder="Your answer"
              required
              onChange={this.changeHandler}
              value={this.state.current_employer}
            />
          </div>
          <div className="input-wrapper">
            <span>Experience (Number of years)</span>
            <input
              type="number"
              name="experience"
              placeholder="Your answer"
              onChange={this.changeHandler}
              min={0}
              value={this.state.experience}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="category">Job Category</label>
            <select
              name="categorySelected"
              id="category"
              value={this.state.categorySelected}
              onChange={this.changeHandler}
            >
              <option value="NA">select</option>
              {this.state.categories.map((q, i) => (
                <option key={i} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </div>
          {element}
          <div className="input-wrapper">
            <span>Vacancy no ( unique to each post)</span>
            <input
              type="text"
              name="vacancy_no"
              placeholder="Your answer"
              required
              onChange={this.changeHandler}
              value={this.state.vacancy_no}
            />
          </div>

          <div className="input-wrapper">
            <span>Position Applied For( as it appears in the advert).</span>
            <input
              type="text"
              name="position_applied"
              placeholder="Your answer"
              onChange={this.changeHandler}
              value={this.state.position_applied}
            />
          </div>

          <div className="button-wrapper">
            <button onClick={this.save}>Next</button>
          </div>
        </form>
        <Footer />
      </>
    );
  }
}
