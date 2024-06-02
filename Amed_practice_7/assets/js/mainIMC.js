//DOM
import { $ } from "./utils/dom.js";

let btnCalc = $(".container_form #btn-calc");

// calcular el imc
const getIMC = (peso, estatura, genero) => {
  const imc = Math.round(peso / (estatura * estatura));
  let categoria = "";

  if (genero === 1) {
    if (imc < 16.5) {
      categoria = "Bajo peso";
    } else if (imc <= 23.9) {
      categoria = "Saludable";
    } else if (imc <= 29.9) {
      categoria = "Sobrepeso";
    } else {
      categoria = "Obesidad";
    }
  } else {
    if (imc < 18.5) {
      categoria = "Bajo peso";
    } else if (imc <= 24.9) {
      categoria = "Saludable";
    } else if (imc <= 29.9) {
      categoria = "Sobrepeso";
    } else {
      categoria = "Obesidad";
    }
  }

  return {
    imc: imc,
    categoria: categoria,
  };
};

btnCalc.addEventListener("click", (e) => {
  // e.preventDefault();
  const form = $(".needs-validation");

  // Añadir el evento submit al formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Validar el formulario
    if (form.checkValidity()) {
      // seleccionar elementos del DOM
      let peso = parseFloat($(".container_form #peso").value);
      let estatura = parseFloat($(".container_form #estatura").value);
      let genero = parseInt($(".container_form #genero").value, 10);

      const resultado = getIMC(peso, estatura, genero);

      $("#resultIMC").innerHTML = resultado.imc;
      $("#categoriaIMC").innerHTML = resultado.categoria;

      const containerResult = $("#containerResult");
      let indicatorLabel = $("#indicator-value");
      containerResult.classList.remove(
        "border-success",
        "border-warning",
        "border-danger"
      );
      indicatorLabel.innerHTML = "";
      let indicatorValue =
        resultado.categoria === "Saludable"
          ? "🟢"
          : resultado.categoria === "Sobrepeso"
          ? "🟠"
          : "🔴";

      let classBorderStyle =
        resultado.categoria === "Saludable"
          ? "border-success"
          : resultado.categoria === "Sobrepeso"
          ? "border-warning"
          : "border-danger";
      $("#gratitude").innerHTML = "Gracias por usar la calculadora de IMC ❤️";
      indicatorLabel.innerHTML = indicatorValue;
      containerResult.classList.add(classBorderStyle);
    }
    form.classList.add("was-validated");
  });
});
