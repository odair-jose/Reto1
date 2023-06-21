$(document).ready(function () {
  $("#Id").focus();
});

var endpoint = "http://localhost:8080/api/user";

function newUser() {
  let user = {
    name: $("#Name").val(),
    email: $("#Email").val(),
    password: $("#Password").val(),
  };

  if (validar()) {
    $.ajax({
      type: "POST",
      contentType: "application/json",
      dataType: "JSON",
      data: JSON.stringify(user),

      url: endpoint + "/new",

      success: function (response) {
        console.log(response);
        $("#mensajes").html(
          '<div class="alert alert-success" role="alert"> Usuario registrado con exito! Ya puedes <a href="index.html">Iniciar Sesion</a></div>'
        );
        $("#mensajes").show(300);
        limpiar();
      },

      error: function (jqXHR, textStatus, errorThrown) {
        $("#mensajes").html(
          '<div class="alert alert-danger" role="alert"> Lo sentimos ha ocurrido un error!</div>'
        );
        $("#mensajes").show(300);
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
  let name = $("#Name").val();
  let email = $("#Email").val();
  let pass1 = $("#Password").val();
  let pass2 = $("#Password2").val();
  let errores = "";
  $("#mensajes").html("");

  //valida que los campos no sean vacios
  if (validaesVacio(name)) {
    errores ="Por favor ingresa tu nombre!'";
    alert(errores);
    $("#Name").focus();
    return false;
  } else if (validaesVacio(email)) {
    errores ="Por favor ingresa tu email!'";
    alert(errores);
    
    $("#Email").focus();
    return false;
  } else if (!ValidateEmail(email)) {
    errores ="Por favor ingresa un correo electronico valido!'";
    alert(errores);
    $("#Email").focus();
    return false;
  } else if (validaesVacio(pass1)) {
    errores ="Por favor ingresa tu contraseña!'";
    alert(errores);
    $("#Password").focus();
    return false;
  } else if (validaesVacio(pass2)) {
    errores =
      '<div class="alert alert-danger" role="alert"> Por favor confirma tu contraseña!</div>';
    $("#mensajes").html(errores);
    $("#mensajes").show(500);
    $("#Password2").focus();
    return false;
  } else if (pass1 != pass2) {
    errores =
      '<div class="alert alert-danger" role="alert"> Las contraseñas no coinciden!</div>';
    $("#mensajes").html(errores);
    $("#mensajes").show(500);

    return false;
  } else {
    $("#mensajes").html("");
    $("#mensajes").hide(500);
    return true;
  }

  return true;
}

function alertaUser() {
  let texto =
    'Usuario creado con exito, ya puedes <a href="index.html" class="alert-link">Iniciar Sesion.</a>';
  $("#alertaUser").html(texto);
  $("#alertaUser").show();
}

function limpiar() {
  $("#Name").val(""),
    $("#Email").val(""),
    $("#Password").val(""),
    $("#Password2").val("");

}
