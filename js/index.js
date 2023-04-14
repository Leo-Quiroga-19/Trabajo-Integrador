// Cotizaciones del Dolar
window.addEventListener("load", function () {
  var settings = {
    url: "https://www.dolarsi.com/api/api.php?type=valoresprincipales",
    method: "GET",
    timeout: 0,
  };

  var contador = 0;

  $.ajax(settings).done(function (response) {
    jQuery.each(response, function (i, item) {
      if (contador < 2) {
        console.log(item.casa.nombre);
        $("#cotizaciones").append(
          `<strong class="cotizacion">${item.casa.nombre}</strong>:  Compra: ${item.casa.compra} $   |  Venta ${item.casa.venta} $ </br>`
        );
        contador++;
      } else {
        return false;
      }
    });
  });
});

// Formulario Wizard

$(document).ready(function () {
  class Formulario {
    nombre;
    apellido;
    email;
    ciudad;
    provincia;
    nacimiento;
    factura;
    proyecto;
    presupuesto;
  }

  var f = new Formulario();

  (() => {
    "use strict";

    var bloque1 = $("#primerVista");
    var bloque2 = $("#segundaVista");

    const forms = $(".needs-validation");

    Array.from(forms).forEach((form) => {
      form.addEventListener(
        "submit",
        (event) => {
          if (form.checkValidity() == false) {
            event.stopPropagation();
            event.preventDefault();
            form.classList.add("was-validated");
          } else {
            form.classList.add("was-validated");
            event.stopPropagation();
            event.preventDefault();

            switch (form.id) {
              case "primerVista":
                bloque1.addClass("d-none");
                bloque2.removeClass("d-none");
                break;
              case "segundaVista":
                LlenarClaseFormulario();
                break;
              case "formContacto":
                break;
            }
          }
        },
        false
      );
    });
  })();

  function LlenarClaseFormulario() {
    f.nombre = $("#nombre").val();
    f.apellido = $("#apellido").val();
    f.email = $("#email").val();
    f.ciudad = $("#ciudad").val();
    f.provincia = $("#provincia").val();
    f.nacimiento = $("#nacimiento").val();
    f.proyecto = $("#proyecto option:selected").val();
    f.presupuesto = $("#presupuesto option:selected").val();
    f.factura = $("#factura").val();

    $("#nombreConfirmar").val(f.nombre);
    $("#apellidoConfirmar").val(f.apellido);
    $("#ciudadConfirmar").val(f.ciudad);
    $("#provinciaConfirmar").val(f.provincia);
    $("#emailConfirmar").val(f.email);
    $("#nacimientoConfirmar").val(f.nacimiento);
    $("#proyectoConfirmar").val(f.proyecto);
    $("#presupuestoConfirmar").val(f.presupuesto);
    $("#facturaConfirmar").val(f.factura);

    $("#segundaVista").addClass("d-none");
    $("#confirmar").removeClass("d-none");
  }

  $("#btnSegundaVistaAtras").click(function () {
    $("#primerVista").removeClass("d-none");
    $("#segundaVista").addClass("d-none");
  });

  $("#btnVolverConfirma").click(function () {
    $("#primerVista").removeClass("d-none");
    $("#confirmar").addClass("d-none");
  });

  $("#btnConfirmarDatos").click(function () {
    $("#contenedorJson").removeClass("d-none");
    $("#json").html(JSON.stringify(f, null, 4));
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const $boton = document.querySelector("#btnExportarPDF");
  $boton.addEventListener("click", () => {
    const $elementoParaConvertir = document.querySelector("#confirmar");
    html2pdf()
      .set({
        margin: 1,
        filename: "documento.pdf",
        image: {
          type: "png",
          quality: 0.98,
        },
        html2canvas: {
          scale: 1,
          letterRendering: true,
          scrollY: 0,
        },
        jsPDF: {
          unit: "in",
          format: "a3",
          orientation: "portrait",
        },
      })
      .from($elementoParaConvertir)
      .save()
      .catch((err) => console.log(err));
  });
});

//Formulario de contacto

(() => {
  "use strict";
  const contacForm = document.querySelectorAll(".needs-validation");
  Array.from(contacForm).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
