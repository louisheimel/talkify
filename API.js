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
        // console.log("Read " + rows.length + " rows");
        // console.log(rows);

        // the row is an object with keys set by the column headers
        //   rows[0].colname = "new val";
        //   rows[0].save(); // this is async

        // deleting a row
        //   rows[0].del(); // this is async
        resolve("success working with rows!");
      }
    );
  });
}
// async.series(
//   [
//     function setAuth(step) {
//       // see notes below for authentication instructions!
//       var creds = require("./talkify-fbd34c562ff2.json");
//       doc.useServiceAccountAuth(creds, step);
//     },
//     function getInfoAndWorksheets(step) {
//       doc.getInfo(function(err, info) {
//         console.log("Loaded doc: " + info.title + " by " + info.author.email);
//         sheet = info.worksheets[0];
//         console.log(
//           "sheet 1: " +
//             sheet.title +
//             " " +
//             sheet.rowCount +
//             "x" +
//             sheet.colCount
//         );
//         step();
//       });
//     },
//     function workingWithRows(step) {
//       // google provides some query options
//       sheet.getRows(
//         {
//           offset: 1,
//           limit: 20,
//           orderby: "col2"
//         },
//         function(err, rows) {
//           console.log("Read " + rows.length + " rows");

//           // the row is an object with keys set by the column headers
//           rows[0].colname = "new val";
//           rows[0].save(); // this is async

//           // deleting a row
//           rows[0].del(); // this is async

//           step();
//         }
//       );
//     },
//     function workingWithCells(step) {
//       sheet.getCells(
//         {
//           "min-row": 1,
//           "max-row": 5,
//           "return-empty": true
//         },
//         function(err, cells) {
//           var cell = cells[0];
//           console.log(
//             "Cell R" + cell.row + "C" + cell.col + " = " + cell.value
//           );

//           // cells have a value, numericValue, and formula
//           cell.value == "1";
//           cell.numericValue == 1;
//           cell.formula == "=ROW()";

//           // updating `value` is "smart" and generally handles things for you
//           cell.value = 123;
//           cell.value = "=A1+B2";
//           cell.save(); //async

//           // bulk updates make it easy to update many cells at once
//           cells[0].value = 1;
//           cells[1].value = 2;
//           cells[2].formula = "=A1+B1";
//           sheet.bulkUpdateCells(cells); //async

//           step();
//         }
//       );
//     },
//     function managingSheets(step) {
//       doc.addWorksheet(
//         {
//           title: "my new sheet"
//         },
//         function(err, sheet) {
//           // change a sheet's title
//           sheet.setTitle("new title"); //async

//           //resize a sheet
//           sheet.resize({ rowCount: 50, colCount: 20 }); //async

//           sheet.setHeaderRow(["name", "age", "phone"]); //async

//           // removing a worksheet
//           sheet.del(); //async

//           step();
//         }
//       );
//     }
//   ],
//   function(err) {
//     if (err) {
//       console.log("Error: " + err);
//     }
//   }
// );
// const API = {};

const initAPI = () =>
  setAuth()
    .then(getInfoAndWorksheets)
    .then(() => ({
      logIn({ username }) {
        console.log("user is: ", username);

        sheet.getRows({}, (err, rows) => {
          const user = rows.filter(row => row.username === username)[0];
          user.isloggedin = "TRUE";
          user.save(() => {
            console.log("user successfully logged in!");
          });
        });

        // console.log(
        //   "rows are: ",
        //   sheet.getRows().map(e => e.username == user.username)
        // );
      }
    }));

module.exports = {
  initAPI
};
