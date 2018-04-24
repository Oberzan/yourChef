$(()=> {
  $("#login form").submit(event => {
    event.preventDefault();
    let email = $('#email').val();
    let password = $('#password').val();
    $.ajax({
      type: "POST",
      url: event.action,
      data: {
        email: email,
        password: password
      },
      success: data => {
        window.location = "/";
      },
      error: err => {
        console.log(err);
        // $("#loginform").addClass("has-error");
        // $("#errorMessage").show();
      }
    });
  });
})