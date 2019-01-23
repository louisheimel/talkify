require("dotenv").config();

const GoogleSpreadsheet = require("google-spreadsheet");

const {
  GOOGLE_SPREADSHEET_KEY: key,
  GOOGLE_CREDENTIALS_PATH: googleCredentialsPath
} = process.env;

// spreadsheet key is the long id in the sheets URL
var doc = new GoogleSpreadsheet(key);
var sheet;

function setAuth() {
  // see notes below for authentication instructions!
  return new Promise((resolve, reject) => {
    var { client_email, private_key } = require(googleCredentialsPath);
    const creds = { client_email, private_key };
    console.log(creds);
    doc.useServiceAccountAuth(creds, () => {
      resolve("success!");
    });
  });
}

function getInfoAndWorksheets(step) {
  return new Promise((resolve, reject) => {
    doc.getInfo(function(err, info) {
      if (err) {
        console.log(err);
      }
      console.log("Loaded doc: " + info.title + " by " + info.author.email);
      sheet = info.worksheets[0];
      //   console.log(
      //     "sheet 1: " + sheet.title + " " + sheet.rowCount + "x" + sheet.colCount
      //   );
      console.log("got info and worksheets");
      resolve("got info and worksheets!");
    });
  });
}

function workingWithRows() {
  // google provides some query options
  return new Promise((resolve, reject) => {
    sheet.getRows(
      {
        offset: 1,
        limit: 20,
        orderby: "col1"
      },
      function(err, rows) {
        resolve("success working with rows!");
      }
    );
  });
}

const initAPI = () =>
  setAuth()
    .then(getInfoAndWorksheets)
    .then(() => ({
      logIn({ username, password }) {
        console.log("user is: ", username);

        sheet.getRows({}, (err, rows) => {
          if (err) {
            throw err;
          }
          const user = rows.filter(row => row.username === username)[0];
          if (user.password === password) {
            user.isloggedin = "TRUE";
          } else {
            throw new Error("incorrect password!");
          }
          user.save(() => {
            console.log("user successfully logged in!");
          });
        });
      }
    }));

module.exports = {
  initAPI
};
