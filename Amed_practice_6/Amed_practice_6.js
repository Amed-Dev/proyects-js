/*   EXERCISE: 1 */
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

const person1 = new Person("01", "Amed Pereda", "2005-09-23", "Masculino");
console.log(person1.calculateAge());

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
    return `${this.name} tiene ${yearsOfExperience} años de experiencia`;
  }
}

const nutritionist = new Nutritionist(
  "N01",
  "Michel Brown",
  "1993-06-02",
  "Masculino",
  "1234",
  ["Nutrición Deportiva"],
  2015
);
const nutritionist2 = new Nutritionist(
  "N02",
  "Juan Pérez",
  "1990-05-02",
  "Masculino",
  "2468",
  ["Nutrición Deportiva", "Nutrición Clínica"],
  2013
);

console.log(nutritionist.calculateAge());
console.log(nutritionist.calculateExperience());

console.log(nutritionist2.calculateAge());
console.log(nutritionist2.calculateExperience());

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
    return `El paciente ${this.name} se ha realizado hasta ahora ${evaluationsNo} evaluaciones`;
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

/* EXERCISE 3: */
const JSONdata = [
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
// agregar los datos del json como instancias de las clases Paciente y evaluaciones
const pacientes = JSONdata.map((data) => {
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

console.log(pacientes);

// imprimir info de las instancias
pacientes.forEach((paciente) => {
  console.log(`Paciente: ${paciente.name}, Edad: ${paciente.calculateAge()}`);
  console.log(
    `Número de evaluaciones: ${paciente.calculateNumberEvaluations()}`
  );

  paciente.evaluations.forEach((evaluacion) => {
    console.log(
      `Evaluación ${
        evaluacion.evaluationNo
      }: IMC = ${evaluacion.calculateBMI()} (${evaluacion.interpretBMI()}), ICC = ${evaluacion.calculateICC()} (${evaluacion.interpretICC()})`
    );
  });
});
