import React, { Component } from "react";
import { CSVLink } from "react-csv";
import axios from "axios";
import AdminHeader from "./AdminHeader";
export class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      applications: [],
      filterDate: "",
      limit: 5,
    };
  }
  componentDidMount() {
    this.Applications();
  }
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.getApplications(this.state.filterDate, this.state.limit);
    });
  };
  getApplications = (date, limit) => {
    !limit || !date
      ? this.Applications()
      : axios
          .get(`/filter-applications/${date}/${limit}`)
          .then((response) => {
            console.log(response.data);
            this.setState({ applications: response.data });
          })
          .catch((err) => {
            console.log(err.message);
          });
  };

  Applications = () => {
    axios
      .get(`/applications`)
      .then((response) => {
        console.log(response.data);
        this.setState({ applications: response.data });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  clearFilter = () => {
    this.setState({ filterDate: "", limit: 5 }, () => this.Applications());
  };

  render() {
    const columns = [
      "timestamp",
      "salutation_title",
      "firstname",
      "middlename",
      "lastname",
      "email",
      "position_applied",
      "vacancy_no",
      "national_id",
      "phone",
      "uploads",
      // "academic_professional_credentials",
      // "date_of_birth",
      // "home_county",
      // "sub_county",
      // "ward",
      // "location",
      // "sub_location",
      // "postal_address",
      // "postal_code",
      // "academic_qualifications",
      // "certification",
      // "professional_membership",
      // "testimonials",
      // "experience",
      // "employed",
      // "current_employer",
      // "ethnicity",
      // "minority_group",
      // "plwd",
      // "chapter6_compliance",
      // "referees"
    ];
    return (
      <div className="admin">
        <AdminHeader />
        <div className="admin-tab">
          <div className="control-wrapper" style={{ width: "40%" }}>
            <div className="tabcontrol">
              <label htmlFor="limit">Limit</label>
              <input
                id="limit"
                type="number"
                onChange={this.changeHandler}
                min={5}
                name="limit"
                value={this.state.limit}
                placeholder="limit"
              />
            </div>
            <div className="tabcontrol">
              <label htmlFor="date">From</label>
              <input
                id="date"
                type="date"
                onChange={this.changeHandler}
                name="filterDate"
                value={this.state.filterDate}
              />
            </div>
            <span
              onClick={this.clearFilter}
              style={{ textDecoration: "underline" }}
              className="check-applications"
            >
              Check applications
            </span>
          </div>
          <div className="control-wrapper" style={{ width: "60%" }}>
            <CSVLink
              style={{ color: "white" }}
              data={this.state.applications}
              filename={"BCPSB DATA CAPTURE FORM " + Date.now()}
            >
              Download full .csv file
            </CSVLink>
          </div>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              {columns.map((column, index) => (
                <th key={index}>{column.replace(/_/g, " ")}</th>
              ))}
            </thead>
            <tbody>
              {this.state.applications.map((colvalue, index) => (
                <tr key={index}>
                  <td>
                    {new Date(colvalue.timestamp).toLocaleDateString()}{" "}
                    {new Date(colvalue.timestamp).toLocaleTimeString()}
                  </td>
                  <td>{colvalue.salutation_title.toLowerCase()}</td>
                  <td>{colvalue.firstname}</td>
                  <td>{colvalue.middlename}</td>
                  <td>{colvalue.lastname}</td>
                  <td>{colvalue.email}</td>
                  <td>{colvalue.position_applied}</td>
                  <td>{colvalue.vacancy_no}</td>
                  <td>{colvalue.national_id}</td>
                  <td>{colvalue.phone}</td>
                  {/* <td>{colvalue.date_of_birth.split("T")[0]}</td> */}
                  <td>
                    {/* <button
                      onClick={() =>
                        this.downloadZip(colvalue.academic_certificates)
                      }
                      style={{
                        padding: "3px",
                        backgroundColor: "transparent",
                        width: "unset",
                        textDecoration: "underline",
                        color: "blue"
                      }}
                    >
                      download
                    </button> */}
                    <a href={`/download-zip/${colvalue.upload}`} download>
                      Download
                    </a>
                  </td>
                  {/* <td>{colvalue.academic_professional_credentials}</td> */}
                  {/* <td>{colvalue.home_county}</td>
                <td>{colvalue.sub_county}</td>
                <td>{colvalue.ward}</td>
                <td>{colvalue.location}</td>
                <td>{colvalue.sub_location}</td>
                <td>{colvalue.postal_address}</td>
                <td>{colvalue.postal_code}</td>
                <td>{colvalue.academic_qualifications}</td>
                <td>{colvalue.certification}</td>
                <td>{colvalue.professional_membership}</td>
                <td>{colvalue.testimonials}</td>
                <td>{colvalue.experience}</td>
                <td>{colvalue.employed}</td>
                <td>{colvalue.current_employer}</td>
                <td>{colvalue.ethnicity}</td>
                <td>{colvalue.minority_group}</td>
                <td>{colvalue.plwd}</td>
                <td>{colvalue.chapter6_compliance}</td>
                <td>{colvalue.referees}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Admin;
