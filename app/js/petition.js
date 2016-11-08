$(document).ready(function() {
  $("#petitionform").submit(function() {
    var fname = $("input.darkgrey.form-control.fnm").val();
    var lname = $("input.darkgrey.form-control.lnm").val();
    var address = $("input.darkgrey.form-control.address").val();
    var city = $("input.darkgrey.form-control.city").val();
    var province = $("input.darkgrey.form-control.province").val();
    var postalcode = $("input.darkgrey.form-control.postal").val();

    var valid=true;
    if (stringValidate(fname)) {
      return;
    } else {
      valid=false;
      alert("The first name field is invalid! It must only have characters and spaces.");
    }

    if (stringValidate(lname)) {
      return;
    } else {
      valid=false;
      alert("The last name field is invalid! It must only have characters and spaces.");
    }

    if (stringAndNumberValidate(address)) {
      return;
    } else {
      valid=false;
      alert("The address field is invalid! It must only have characters, numbers and spaces.");
    }

    if (stringValidate(city)) {
      return;
    } else {
      valid=false;
      alert("The city field is invalid! It must only have characters and spaces.");
    }

    if (stringValidate(province)) {
      return;
    } else {
      valid=false;
      alert("The province field is invalid! It must only have characters and spaces.");
    }

    if (postalValidate(postalcode)) {
      return;
    } else {
      valid=false;
      alert("The postal code field is invalid! It must only have characters, numbers and spaces.");
    }

    //Validation Functions
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
      return regex.test(str) && (str.length == 6);
    }
    /*
    if (valid) {
      submitForm(fname, lname, address, city, province, postalcode);
    }
    */
  })

})
