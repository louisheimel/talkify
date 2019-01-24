require("dotenv").config();

const GoogleSpreadsheet = require("google-spreadsheet");

const {
  GOOGLE_SPREADSHEET_KEY: key,
  GOOGLE_CREDENTIALS_PATH: googleCredentialsPath
} = process.env;

// spreadsheet key is the long id in the sheets URL
var doc = new GoogleSpreadsheet(key);
var sheet, numberOfRows;

function setAuth() {
  // see notes below for authentication instructions!
  return new Promise((resolve, reject) => {
    var { client_email, private_key } = require(googleCredentialsPath);
    const creds = { client_email, private_key };
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
      numberOfRows = sheet.getRows({}, (err, rows) => {
        numberOfRows = rows.length;
        console.log("got info and worksheets");

        resolve("got info and worksheets!");
      });
      //   console.log(
      //     "sheet 1: " + sheet.title + " " + sheet.rowCount + "x" + sheet.colCount
      //   );
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
        return new Promise((resolve, reject) => {
          console.log("user is: ", username);

          sheet.getRows({}, (err, rows) => {
            if (err) {
              reject("user was not logged in");
              throw err;
            }
            const user = rows.filter(row => row.username === username)[0];
            console.log(user.password, password);
            if (user.password === password) {
              user.isloggedin = "TRUE";
              user.save(() => {
                console.log("user successfully logged in!");
                resolve("user successfully logged in!");
              });
            } else {
              reject("incorrect password");
            }
          });
        });
      },
      signUp({ username, password }) {
        console.log();
        console.log("in API, username and password are: ", username, password);

        console.log("about to create user, sheet is assigned: " + !!sheet);
        sheet.addRow(
          {
            userId: numberOfRows + 1,
            username: username,
            password: password,
            isLoggedIn: "TRUE"
          },
          () => {}
        );
      }
    }));

module.exports = {
  initAPI
};
