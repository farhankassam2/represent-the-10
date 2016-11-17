// Global Variables
var VALID = true;
var SUBMITTEDDATA = [];
var PASTDATA = [];

$(document).ready(function() {
  // ID of the Google Spreadsheet
  var spreadsheetID = "1CtNuBMA4dzxWaSZZ50GtN4993aHfhgqLUDcW00hkm4Y";
  // Make sure url is public or set to Anyone with link can view
  var fullurl = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/1/public/values?alt=json";
  $.getJSON(fullurl, function( data ) {
    var recordedData = data.feed.entry;
    if (recordedData) {
        var temp = PASTDATA;
        for (var i = 0; i < recordedData.length; i++) {
        var pastData = [recordedData[i]["gsx$firstname"]["$t"],
                        recordedData[i]["gsx$lastname"]["$t"],
                        recordedData[i]["gsx$address"]["$t"],
                        recordedData[i]["gsx$city"]["$t"],
                        recordedData[i]["gsx$provinceterritory"]["$t"],
                        recordedData[i]["gsx$postalcode"]["$t"]];
        temp.push(pastData);
      }
      PASTDATA=temp;
    }
  });
  $("#petitionform").submit(function() {
    var fname = $("input.darkgrey.form-control.fnm").val();
    var lname = $("input.darkgrey.form-control.lnm").val();
    var address = $("input.darkgrey.form-control.address").val();
    var city = $("input.darkgrey.form-control.city").val();
    var province = $("input.darkgrey.form-control.province").val();
    var postalcode = $("input.darkgrey.form-control.postal").val();
    SUBMITTEDDATA = [fname, lname, address, city, province, postalcode]

    // Alerts when input is invalid
    if (!stringValidate(fname)) {
      VALID=false;
      alert("The first name field is invalid! It must only have characters and spaces.");
    } else if (!stringValidate(lname)) {
      VALID=false;
      alert("The last name field is invalid! It must only have characters and spaces.");
    } else if (!stringAndNumberValidate(address)) {
      VALID=false;
      alert("The address field is invalid! It must only have characters, numbers and spaces.");
    } else if (!stringValidate(city)) {
      VALID=false;
      alert("The city field is invalid! It must only have characters and spaces.");
    } else if (!stringValidate(province)) {
      VALID=false;
      alert("The province field is invalid! It must only have characters and spaces.");
    } else if (!postalValidate(postalcode)) {
      VALID=false;
      alert("The postal code field is invalid! It must only have characters, numbers and spaces.");
    } else if (!duplicateValidate(SUBMITTEDDATA, PASTDATA)) {
      VALID = false;
      alert("Your information is a duplicate.")
    }

    //Validation Functions - Returns true when input is valid
    function stringValidate(str) {
      var regex = /[^a-z,\s]/gi;
      return !regex.test(str);
    }
    function stringAndNumberValidate(str) {
      var regex = /[^a-z,\s,\d,\-,\.,\@,\/]/gi;
      return !regex.test(str);
    }
    function postalValidate(str) {
      var regex = /[^a-z,\d]/gi;
      str = str.replace(" ", "")
      return !(regex.test(str) && (str.length == 6));
    }
    function duplicateValidate(arrs, arrp) {
      for (var i = 0; i < arrp.length; i++) {
        if (arrp[i][0] == arrs[0] && arrp[i][1] == arrs[1] && arrp[i][2] == arrs[2] && arrp[i][3] == arrs[3] && arrp[i][4] == arrs[4] && arrp[i][5] == arrs[5]) {
          return false;
        }
      }
      return true;
    }
    //Submit form with ajax if valid
    if (VALID) {
      submitForm();
    }
    function newData(arrs, arrp) {
      return arrp.push(arrs);
    }
    function submitForm() {
        $.ajax({
                  url: "https://docs.google.com/forms/d/e/1FAIpQLScMawBqg4oxvJVarWwRPjDpqtSu5MUdNq_dBgphyruz5e8z0g/formResponse",
                  data: {"entry.843751608" : SUBMITTEDDATA[0],
                         "entry.786666914" : SUBMITTEDDATA[1],
                         "entry.113893232" : SUBMITTEDDATA[2],
                         "entry.475910473" : SUBMITTEDDATA[3],
                         "entry.1430871484": SUBMITTEDDATA[4],
                         "entry.2000257846": SUBMITTEDDATA[5]},
                  type: "POST",
                  dataType: "xml",
                  statusCode: {
                      0: function (){
                        alert("Thank you for signing the petition.")
                      },
                      200: function (){
                        alert("Thank you for signing the petition.")
                      },
                      //400 - Bad Request
                      400: function(){
                        alert("There was error within the server. Please try again at later time.");
                      }
                      ,
                      //404 - Not Found
                      404: function(){
                        alert("There was error with the form. Please try again at later time.");
                      }
                  }
              });
        location.reload();
    };
  });
});

// We are listening. :)
/*
         ▒▓
       ▓██░
     ░██    ░██     ░▓█████▓░
    ██▓    ██▓   ▒███▒░    ▓███▓
  ░██░   ██░   ███     ▒▓▓▒   ▓███
  ██    ██   ▒██   ▒██████████  ███░
 ██░   ██   ███  ▒███░       ██░  ██▓
 ██   ██   ███  ███▒   ░░░ ░   █▓  ██▓
▒█   ░██   ██  ▓██▒ ░░░       █ █▒  ███
██   ██   ██   ███ ░░░       █▓ ██   ██░
█   ▒██   ██  ░██  ░░     ███▒   ██   ██
    ██░   █   ▓█▓ ░░░    ██   ░░ ▓█░
    ██   ▒█ ░ ██  ░░      ██▓     █▓
    ██   ██ ░ ██ ░░    ░▒  ▒▒▒█▓ ▒█▒
    ██   ██   █▓ ░  ▓██████▓▓▓▓░██▒
     █   ██   █▒   ██░   ▒░░░░▒▓░
         ██  ▒█   ▒█   ░█▓▒▓█▓
         ██  ▒█   ██        ▓████▒
          █   █   ██  ░ ░░    ██ ░░
          ██  █▓  ██  ░░░░░  █▓ ░░░░
           █░  █░  ██  ░░    ██░  ░
            ██  ▓█  ▒█░  ▒█▒  ▒██▓
             ██▓  ██  ███▓░██   ░█
              ▓██░ ░██      ████ ▒ ██
                ███ ░█  ░░░  ██▒   ██░
                 ██▒   ░░░░░░   ░ ▒██
                  ██  ░░░░░░░░░░  ██▒
                   ██   ░░░░░░   ██░
                     ░██▒       ░▓██
                     ░███▓▓▓▓▓▒░
*/
