$(()=> {
  $("#register form").submit(event => {
    event.preventDefault();
    let name = $('#name').val();
    let email = $('#email').val();
    let password = $('#password').val();
    // var password2 = $(this).find('input[name="confirm-password"]').val();
    $.ajax({
      type: "POST",
      url: event.action,
      data: {
        name: name,
        email: email,
        password: password
      },
      success: data => {
        window.location = "login";
      },
      error: err => {
        console.log(err);
        // $("#loginform").addClass("has-error");
        // $("#errorMessage").show();
      }
    });
  });
})