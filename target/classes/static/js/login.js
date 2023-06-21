$(document).ready(function () {
  $("#email").focus();
});

var endpoint = "http://localhost:8080/api/user/";

function login() {
  let email = $("#email").val();
  let password = $("#password").val();

  if (validar()) {
    $.ajax({
      url: endpoint + email + "/" + password,
      type: "GET",
      dataType: "json",

      success: function (response) {
        resultado(response);
      },

      error: function (jqXHR, textStatus, errorThrown) {
        $("#mensajes").html(
          '<div class="alert alert-danger" role="alert"> Lo sentimos, Algo fallo</div>'
        );
        $("#mensajes").show(500);
        console.log("No Se guardo correctamente");
      },
    });
  }
}

function ValidateEmail(valor) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return valor.match(mailformat);
}

function validaesVacio(dato) {
  return !dato.trim().length;
}

function validar() {
  //obtiene valores
  let email = $("#email").val();
  let pass1 = $("#password").val();
  let errores = "";
  $("#mensajes").html("");

  //valida que los campos no sean vacios
  if (validaesVacio(email)) {
    errores =
      '<div class="alert alert-danger" role="alert"> Por favor ingresa tu correo electronico!</div>';
    $("#mensajes").html(errores);
    $("#mensajes").show(500);
    $("#email").focus();
    return false;
  } else if (!ValidateEmail(email)) {
    errores =
      '<div class="alert alert-danger" role="alert"> Por favor ingresa un correo electronico valido!</div>';
    $("#mensajes").html(errores);
    $("#mensajes").show(500);
    $("#email").focus();
    return false;
  } else if (validaesVacio(pass1)) {
    errores =
      '<div class="alert alert-danger" role="alert"> Por favor ingresa tu contraseña!</div>';
    $("#mensajes").html(errores);
    $("#mensajes").show(500);
    $("#password").focus();
    return false;
  } else {
    $("#mensajes").html("");
    $("#mensajes").hide(500);
    return true;
  }

  return true;
}

function resultado(response) {
  let id = response.id;

  if (id == null) {
    console.log("Usuario no existe");
    $("#mensajes").html(
      '<div class="alert alert-danger" role="alert"> Usuario no existe! Por favor <a href="register.html">Registrate</a></div>'
    );
    $("#mensajes").show(300);
  } else {
    console.log(response);

    window.location = "bienvenido.html";
    limpiar();
  }
}
