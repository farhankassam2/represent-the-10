$(document).ready(function() {
  var VALID = true;
  var SUBMITTEDDATA = [];
  var PASTDATA = [];

  // ID of the Google Spreadsheet
  var spreadsheetID = "1CtNuBMA4dzxWaSZZ50GtN4993aHfhgqLUDcW00hkm4Y";
  // Make sure url is public or set to Anyone with link can view
  var fullurl = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/1/public/values?alt=json";
  $.getJSON(fullurl, function( data ) {
    var recordedData = data.feed.entry;
    for (var i = 0; i < recordedData.length; i++) {
      var pastData = [recordedData[i]["gsx$firstname"]["$t"],
                      recordedData[i]["gsx$lastname"]["$t"],
                      recordedData[i]["gsx$address"]["$t"],
                      recordedData[i]["gsx$city"]["$t"],
                      recordedData[i]["gsx$provinceterritory"]["$t"],
                      recordedData[i]["gsx$postalcode"]["$t"]];
      PASTDATA.push(pastData);
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
        var count = 0;
        for (var j = 0; j < arrs.length; j++) {
          if (arrs[j] == arrp[j]) {
            count++;
          }
          //I don't know why, but putting console.log(count++) fixed it....
          console.log(count++);
          if (count == 6) {
            return false;
          }
        }
      }
      return true;
    }
    //Submit form with ajax if valid
    if (VALID) {
      submitForm();
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
                        //Clearing fields after submission
                        $("input.darkgrey.form-control.fnm").val("");
                        $("input.darkgrey.form-control.lnm").val("");
                        $("input.darkgrey.form-control.address").val("");
                        $("input.darkgrey.form-control.city").val("");
                        $("input.darkgrey.form-control.province").val("");
                        $("input.darkgrey.form-control.postal").val("");
                      },
                      200: function (){
                        //Clearing fields after submission
                        $("input.darkgrey.form-control.fnm").val("");
                        $("input.darkgrey.form-control.lnm").val("");
                        $("input.darkgrey.form-control.address").val("");
                        $("input.darkgrey.form-control.city").val("");
                        $("input.darkgrey.form-control.province").val("");
                        $("input.darkgrey.form-control.postal").val("");
                      },
                      //400 - Bad Request
                      400: function(){
                        alert("There was error within the server. Please try again at later time.");
                        //Clearing fields after submission
                        $("input.darkgrey.form-control.fnm").val("");
                        $("input.darkgrey.form-control.lnm").val("");
                        $("input.darkgrey.form-control.address").val("");
                        $("input.darkgrey.form-control.city").val("");
                        $("input.darkgrey.form-control.province").val("");
                        $("input.darkgrey.form-control.postal").val("");
                      }
                      ,
                      //404 - Not Found
                      404: function(){
                        alert("There was error with the form. Please try again at later time.");
                        //Clearing fields after submission
                        $("input.darkgrey.form-control.fnm").val("");
                        $("input.darkgrey.form-control.lnm").val("");
                        $("input.darkgrey.form-control.address").val("");
                        $("input.darkgrey.form-control.city").val("");
                        $("input.darkgrey.form-control.province").val("");
                        $("input.darkgrey.form-control.postal").val("");
                      }
                  }
              });
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
