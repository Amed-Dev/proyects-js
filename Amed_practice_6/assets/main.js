// data
const pacientesData = [
  {
    codigo: "P001",
    nombre: "Juan Perez",
    fechaNacimiento: "1990-05-20",
    genero: "M",
    evaluaciones: [
      {
        nroEvaluacion: 1,
        estatura: 1.75,
        peso: 70,
        cuello: 40,
        pecho: 90,
        cadera: 100,
        cintura: 85,
      },
      {
        nroEvaluacion: 2,
        estatura: 1.75,
        peso: 68,
        cuello: 39,
        pecho: 89,
        cadera: 99,
        cintura: 84,
      },
    ],
  },
  {
    codigo: "P002",
    nombre: "Ana Garcia",
    fechaNacimiento: "1985-03-15",
    genero: "F",
    evaluaciones: [
      {
        nroEvaluacion: 1,
        estatura: 1.6,
        peso: 60,
        cuello: 38,
        pecho: 85,
        cadera: 95,
        cintura: 80,
      },
    ],
  },
];

[
  {
    codigo: "001",
    nombre: "Juan Perez",
    fechaNacimiento: "1990-05-20",
    genero: "M",
    evaluaciones: [
      {
        nroEvaluacion: 1,
        estatura: 1.75,
        peso: 70,
        cuello: 40,
        pecho: 90,
        cadera: 100,
        cintura: 85,
      },
      {
        nroEvaluacion: 2,
        estatura: 1.75,
        peso: 68,
        cuello: 39,
        pecho: 89,
        cadera: 99,
        cintura: 84,
      },
    ],
  },
  {
    codigo: "002",
    nombre: "Ana Garcia",
    fechaNacimiento: "1985-03-15",
    genero: "F",
    evaluaciones: [
      {
        nroEvaluacion: 1,
        estatura: 1.6,
        peso: 60,
        cuello: 38,
        pecho: 85,
        cadera: 95,
        cintura: 80,
      },
    ],
  },
];
const nutricionistasData = [
  {
    codigo: "N001",
    nombre: "Michel Brown",
    fechaNacimiento: "1993-06-02",
    genero: "Masculino",
    noColegiatura: "1234",
    especialidades: ["Nutrición Deportiva"],
    añoInicioActividades: 2015,
  },
  {
    codigo: "N002",
    nombre: "Ana García",
    fechaNacimiento: "1985-03-15",
    genero: "Femenino",
    noColegiatura: "5678",
    especialidades: ["Nutrición Infantil", "Nutrición Materna"],
    añoInicioActividades: 2005,
  },
  {
    codigo: "N003",
    nombre: "Juan Pérez",
    fechaNacimiento: "1975-09-12",
    genero: "Masculino",
    noColegiatura: "9012",
    especialidades: ["Nutrición Clínica", "Nutrición Geriátrica"],
    añoInicioActividades: 1995,
  },
  {
    codigo: "N004",
    nombre: "María Rodríguez",
    fechaNacimiento: "1990-02-28",
    genero: "Femenino",
    noColegiatura: "3456",
    especialidades: ["Nutrición Deportiva", "Nutrición Especial"],
    añoInicioActividades: 2010,
  },
  {
    codigo: "N005",
    nombre: "Luis Martínez",
    fechaNacimiento: "1980-11-22",
    genero: "Masculino",
    noColegiatura: "7890",
    especialidades: ["Nutrición Clínica", "Nutrición Especial"],
    añoInicioActividades: 2000,
  },
];

class Person {
  constructor(code, name, birthDate, gender) {
    this.code = code;
    this.name = name;
    this.birthDate = birthDate;
    this.gender = gender;
  }
  calculateAge() {
    let today = new Date();
    let Birth_Date = new Date(this.birthDate);
    let age = today.getFullYear() - Birth_Date.getFullYear();

    if (
      today.getDate() < Birth_Date.getDate() + 1 ||
      today.getMonth() < Birth_Date.getMonth()
    ) {
      age--;
    }
    return `${age} años`;
  }
}

class Nutritionist extends Person {
  constructor(
    code,
    name,
    birthDate,
    gender,
    tuitionNo,
    specialities,
    yearStartActivities
  ) {
    super(code, name, birthDate, gender);
    this.tuitionNo = tuitionNo;
    this.specialities = specialities;
    this.yearStartActivities = yearStartActivities;
  }

  calculateExperience() {
    let today = new Date();
    let year_start_activities = this.yearStartActivities;
    let yearsOfExperience = today.getFullYear() - year_start_activities;
    return `${yearsOfExperience} años de experiencia`;
  }
}

class Patient extends Person {
  constructor(code, name, birthDate, gender) {
    super(code, name, birthDate, gender);
    this.evaluations = [];
  }
  addEvaluations(evaluation) {
    this.evaluations.push(evaluation);
  }
  calculateNumberEvaluations() {
    let evaluationsNo = this.evaluations.length;
    return `${evaluationsNo} evaluaciones`;
  }
}

class Evaluation {
  constructor(evaluationNo, height, weight, neck, chest, waist, hip) {
    this.evaluationNo = evaluationNo;
    this.height = height;
    this.weight = weight;
    this.neck = neck;
    this.chest = chest;
    this.waist = waist;
    this.hip = hip;
  }
  calculateBMI() {
    return (this.weight / (this.height * this.height)).toFixed(2);
  }

  interpretBMI() {
    const bmi = this.calculateBMI();
    if (bmi < 18.5) return "Bajo peso";
    if (bmi >= 18.5 && bmi <= 24.9) return "Saludable";
    if (bmi >= 25 && bmi <= 29.9) return "Sobrepeso";
    return "Obesidad";
  }

  calculateICC() {
    return (this.waist / this.hip).toFixed(2);
  }

  interpretICC() {
    const icc = this.calculateICC();
    if (icc < 0.8) return "Riesgo bajo";
    if (icc >= 0.8 && icc <= 0.85) return "Riesgo moderado";
    return "Riesgo alto";
  }
}

// dom
const $ = (selector, context = document) => context.querySelector(selector);

let modalEvaluations = $("#evaluationsModal");

const noPacientes = $("#noPacientes");
const noNutricionistas = $("#noNutricionistas");

document.addEventListener("DOMContentLoaded", (event) => {
  const buttons = document.querySelectorAll(
    ".tab-content .tab-pane button[data-target]"
  );

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-target");
      const tabTrigger = new bootstrap.Tab(
        document.querySelector(`[data-bs-target="${target}"]`)
      );
      tabTrigger.show();
    });
  });
});

const Pacientes = pacientesData.map((data) => {
  const paciente = new Patient(
    data.codigo,
    data.nombre,
    data.fechaNacimiento,
    data.genero
  );
  data.evaluaciones.forEach((e) => {
    const evaluacion = new Evaluation(
      e.nroEvaluacion,
      e.estatura,
      e.peso,
      e.cuello,
      e.pecho,
      e.cintura,
      e.cadera
    );
    paciente.addEvaluations(evaluacion);
  });
  return paciente;
});
// pacientes
Pacientes.forEach((paciente, i) => {
  let row = document.createElement("tr");
  row.className = "align-middle";
  let codeCell = document.createElement("td");
  codeCell.scope = "row";
  codeCell.innerText = paciente.code;
  row.appendChild(codeCell);

  let nameCell = document.createElement("td");
  nameCell.innerText = paciente.name;
  row.appendChild(nameCell);

  let genderCell = document.createElement("td");
  genderCell.innerText = paciente.gender;
  row.appendChild(genderCell);

  let birthDateCell = document.createElement("td");
  birthDateCell.innerText = paciente.birthDate;
  row.appendChild(birthDateCell);

  let ageCell = document.createElement("td");
  let edad = paciente.calculateAge();
  ageCell.innerText = edad;
  row.appendChild(ageCell);

  let evaluationsNoCell = document.createElement("td");
  evaluationsNoCell.className = "d-flex";
  let btnEvaluations = document.createElement("button");
  btnEvaluations.type = "button";
  btnEvaluations.className = "btn btn-dark flex-1";
  btnEvaluations.dataset.bsToggle = "modal";
  btnEvaluations.dataset.bsTarget = "#evaluationsModal";
  btnEvaluations.id = i;
  btnEvaluations.innerText = paciente.calculateNumberEvaluations();
  evaluationsNoCell.appendChild(btnEvaluations);
  row.appendChild(evaluationsNoCell);

  $("#tb-pacientes").appendChild(row);
});

const Nutricionistas = nutricionistasData.map((data) => {
  const nutricionista = new Nutritionist(
    data.codigo,
    data.nombre,
    data.fechaNacimiento,
    data.genero,
    data.noColegiatura,
    data.especialidades,
    data.añoInicioActividades
  );
  return nutricionista;
});
// nutricionistas
Nutricionistas.forEach((nutricionista) => {
  let row = document.createElement("tr");

  let codeCell = document.createElement("td");
  codeCell.scope = "row";
  codeCell.innerText = nutricionista.code;
  row.appendChild(codeCell);

  let nameCell = document.createElement("td");
  nameCell.innerText = nutricionista.name;
  row.appendChild(nameCell);

  let noColegiaturaCell = document.createElement("td");
  noColegiaturaCell.innerText = nutricionista.tuitionNo;
  row.appendChild(noColegiaturaCell);

  let especialidadesCell = document.createElement("td");
  especialidadesCell.innerText = nutricionista.specialities;
  row.appendChild(especialidadesCell);

  let experienciaCell = document.createElement("td");
  let añosExperiencia = nutricionista.calculateExperience();
  experienciaCell.innerText = añosExperiencia;
  row.appendChild(experienciaCell);

  $("#tb-nutricionistas").appendChild(row);
});

noPacientes.innerText = Pacientes.length;
noNutricionistas.innerText = Nutricionistas.length;

modalEvaluations.addEventListener("hide.bs.modal", (event) => {
  const $ = (selector, context = modalEvaluations) =>
    context.querySelector(selector);
  $(".modal-title #patientName").innerHTML = "";
});

modalEvaluations.addEventListener("shown.bs.modal", (e) => {
  const $ = (selector, context = modalEvaluations) =>
    context.querySelector(selector);
  let button = e.relatedTarget;

  let id = parseInt(button.getAttribute("id"));

  let patientName = $(".modal-title #patientName");
  let tbEvaluations = $("#tb-evaluations");
  //limpiar info anterior
  patientName.innerHTML = "";
  tbEvaluations.innerHTML = "";

  let paciente = Pacientes[id];
  if (paciente) {
    patientName.innerText = paciente.name;

    paciente.evaluations.forEach((evaluation) => {
      let row = document.createElement("tr");

      let evalautionsNoCell = document.createElement("td");
      evalautionsNoCell.innerText = evaluation.evaluationNo;
      row.appendChild(evalautionsNoCell);

      let heightCell = document.createElement("td");
      heightCell.innerText = evaluation.height + " m";
      row.appendChild(heightCell);

      let weightCell = document.createElement("td");
      weightCell.innerText = evaluation.weight + " kg";
      row.appendChild(weightCell);

      let neckCell = document.createElement("td");
      neckCell.innerText = evaluation.neck + " cm";
      row.appendChild(neckCell);

      let chestCell = document.createElement("td");
      chestCell.innerText = evaluation.chest + " cm";
      row.appendChild(chestCell);

      let waistCell = document.createElement("td");
      waistCell.innerText = evaluation.waist + " cm";
      row.appendChild(waistCell);

      let hipCell = document.createElement("td");
      hipCell.innerText = evaluation.hip + " cm";
      row.appendChild(hipCell);

      tbEvaluations.appendChild(row);
    });
  } else {
    console.error("Error al cargar datos del paciente ");
  }
});
