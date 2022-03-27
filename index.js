require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { db } = require("./dbconnection");
const cors = require("cors");
const {
  applicationSubmitHandler,
  updateOtherPersonalDetails,
  insertIntoAcademicQualifications,
  updateJobDetails,
  saveCertifications,
  getFullApplications,
  getLimitedApplications,
} = require("./application");
const {
  upload,
  zipDownload,
  filesToZip,
  downLoadAllFiles,
} = require("./fileController");
const { Auth } = require("./Verify");
const app = express();
const port = process.env.PORT || 5000;
const session = require("express-session");
const MySQLstore = require("express-mysql-session")(session);

const sessionStore = new MySQLstore(
  {
    expiration: 1000 * 60 * 60 * 24,
    createDatabaseTable: true,
    schema: {
      session_id: "session_id",
      expires: "expires",
      data: "data",
    },
  },
  db
);

// app.use(express.static(path.join(__dirname, "/client/build")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: "dev",
    resave: false,
    store: sessionStore,
    saveUninitialized: false,
    cookie: { expires: 1000 * 60 * 60 * 12 },
  })
);

//db connection
db.getConnection((err) => {
  if (err) throw err;
  console.log("db connected");
});

//Security
app.post("/login", (req, res, next) => {
  console.log("Login requests");
  const { username, pword } = req.body;
  let q = `SELECT EXISTS(SELECT * FROM manage_admin WHERE user ='${username}' AND pword ='${pword}') AS USER;`;
  db.query(q, (err, result) => {
    if (err) throw err;
    if (result[0].USER) {
      req.session.user = username;
      req.session.bonus = pword;
      req.session.view = "/admin/dashboard";
      let query = `SELECT admin_permission FROM manage_admin WHERE user ='${username}' AND pword ='${pword}';`;
      db.query(query, (err, result) => {
        if (err) throw err;
        console.log(result[0].admin_permission);
        req.session.adminPermission = result[0].admin_permission;
        if (username == "admin") {
          req.session.view = "/admin/manage";
          res.json({ success: 1, next: "/admin/manage" });
        } else {
          res.json({ success: 1, next: "/admin/dashboard" });
        }
      });
    } else {
      req.session.message = `Login failed`;
      console.log(req.session.message);
      res.json({ susccess: 0, next: "/login" });
    }
  });
});

//logout
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.sendFile(__dirname + "/public/Login.html");
    console.log("session killed");
  });
});

//saving applications
app.post("/personal-data", applicationSubmitHandler);

app.post("/other-personal-data", updateOtherPersonalDetails);

app.post("/academic-qualifications", insertIntoAcademicQualifications);
app.get("/academic-qualifications/:applicantId", (req, res) => {
  let query = `SELECT * FROM academic_qualifications WHERE applicantId =${req.params.applicantId};`;
  db.query(query, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.post("/check-applicant", (req, res) => {
  let query = `SELECT EXISTS(SELECT * FROM applicants WHERE national_id=${req.body.national_id} OR email='${req.body.email}') AS exist;`;
  db.query(query, (err, result) => {
    if (err) throw err;
    console.log(result[0].exist);
    res.json({ exist: result[0].exist });
  });
});

app.post("/update-access", (req, res) => {
  let query = `UPDATE manage_admin SET admin_permission =${req.body.access} WHERE user_id=${req.body.userid};`;
  db.query(query, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get(`/`, (req, res) => {
  res.sendFile(__dirname + "/Redirect.html");
});

app.get(`/login`, (req, res) => {
  if (req.session.user) {
    res.redirect(req.session.view);
  } else {
    res.sendFile(__dirname + "/public/Login.html");
  }
});
app.get(`/admin/dashboard`, Auth);

app.get(`/system-users`, Auth, (req, res) => {
  let query = `SELECT user_id,user,admin_permission FROM manage_admin;`;
  db.query(query, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.get(`/admin/manage`, Auth);

app.post("/certifications", saveCertifications);

app.get("/getcertif/:applicantId", (req, res) => {
  let q = `SELECT * FROM certifications WHERE applicantId =${req.params.applicantId};`;
  db.query(q, (err, result) => {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
});

app.post("/job-details", updateJobDetails);

//handles file uploads and downloads
app.post("/upload", upload, (req, res) => {
  console.log("Uploading file ...");
  if (!req.body.applicantId) {
    res.status(200).end();
  } else {
    console.log(req.body.applicantId);
    let q = `UPDATE applicants SET upload ='${req.file.filename}' WHERE applicant_id=${req.body.applicantId};`;
    db.query(q, (err, result) => {
      if (err) throw err;
      console.log("file uploaded");
      res.send(JSON.stringify(result));
    });
  }
});
app.get(`/download-zip/:zipPath`, zipDownload);

//fetching applications
app.get("/applications/:limit", getLimitedApplications);
app.get("/full", getFullApplications);
//download a whole zip

app.get("/download-all-files", downLoadAllFiles);

// Captures unmatched routes
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/client/build", "index.html"));
// });

//Server listenning 5000
app.listen(port, (err) => {
  if (err) throw err;
  console.log("Server started on port", port);
});
