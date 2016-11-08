$(document).ready(function() {
  $("#petitionform").submit(function() {
    var fname = $("input.darkgrey.form-control.fnm").val();
    var lname = $("input.darkgrey.form-control.lnm").val();
    var address = $("input.darkgrey.form-control.address").val();
    var city = $("input.darkgrey.form-control.city").val();
    var province = $("input.darkgrey.form-control.province").val();
    var postalcode = $("input.darkgrey.form-control.postal").val();

    var VALID = true;

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
    }

    //Validation Functions - Returns true when input is valid
    function stringValidate(str) {
      var regex = /[^a-z,\s]/gi;
      return !regex.test(str);
    }
    function stringAndNumberValidate(str) {
      var regex = /[^a-z,\s,\d]/gi;
      return !regex.test(str);
    }
    function postalValidate(str) {
      var regex = /[^a-z,\d]/gi;
      str = str.replace(" ", "")
      return !(regex.test(str) && (str.length == 6));
    }

    //Submit form with ajax if valid
    if (VALID) {
      $.ajax({
                url: "https://docs.google.com/forms/d/e/1FAIpQLScMawBqg4oxvJVarWwRPjDpqtSu5MUdNq_dBgphyruz5e8z0g/formResponse",
                data: {"entry.843751608" : fname,
                       "entry.786666914" : lname,
                       "entry.113893232" : address,
                       "entry.475910473" : city,
                       "entry.1430871484": province,
                       "entry.2000257846": postalcode},
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
    }
  })

})

// We are listening. :)
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
