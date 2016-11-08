$(document).ready(function() {
  $("#petitionform").submit(function() {
    var fname = $("input.darkgrey.form-control.fnm").val();
    var lname = $("input.darkgrey.form-control.lnm").val();
    var address = $("input.darkgrey.form-control.address").val();
    var city = $("input.darkgrey.form-control.city").val();
    var province = $("input.darkgrey.form-control.province").val();
    var postalcode = $("input.darkgrey.form-control.postal").val();

    var valid=true;

    // Alerts when input is invalid
    if (!stringValidate(fname)) {
      valid=false;
      alert("The first name field is invalid! It must only have characters and spaces.");
    }

    if (!stringValidate(lname)) {
      valid=false;
      alert("The last name field is invalid! It must only have characters and spaces.");
    }

    if (!stringAndNumberValidate(address)) {
      valid=false;
      alert("The address field is invalid! It must only have characters, numbers and spaces.");
    }

    if (!stringValidate(city)) {
      valid=false;
      alert("The city field is invalid! It must only have characters and spaces.");
    }

    if (!stringValidate(province)) {
      valid=false;
      alert("The province field is invalid! It must only have characters and spaces.");
    }

    if (!postalValidate(postalcode)) {
      valid=false;
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

    //submitForm with ajax when valid
    if (valid) {
      $.ajax({
                url: "https://docs.google.com/forms/d/e/1FAIpQLScMawBqg4oxvJVarWwRPjDpqtSu5MUdNq_dBgphyruz5e8z0g/formResponse",
                data: {"entry.843751608" : fname, "entry.786666914" : lname, "entry.113893232": address, "entry.475910473": city, "entry.1430871484": province, "entry.2000257846": postalcode},
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
                    }
                }
            });
    }
  })

})
