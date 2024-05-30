const $ = (selector, context = document) => context.querySelector(selector);
const checkForeign = $("#checkForeign");
const studentNationalList = $("#tb-nacional tbody");
const studentInternationalList = $("#tb-internacional tbody");
const toastContainer = $("#toast-container");
const SuccessToast = $("#SuccessToast");

const students = [
  { nombre: "Juan Pérez", edad: 22, curso: "Desarrollo Web" },
  { nombre: "María Gómez", edad: 19, curso: "Diseño UI/UX" },
  { nombre: "Sofía Rodríguez", edad: 20, curso: "Desarrollo Móvil" },
  {
    nombre: "Akiko Tanaka",
    edad: 24,
    curso: "Desarrollo Frontend",
    paisOrigen: "Japón",
  },
  {
    nombre: "Liam Dupont",
    edad: 21,
    curso: "Desarrollo Backend",
    paisOrigen: "Francia",
  },
  {
    nombre: "Aisha Malik",
    edad: 23,
    curso: "Desarrollo de Juegos",
    paisOrigen: "Pakistán",
  },
];

class Student {
  constructor(nombre, edad, curso) {
    this.nombre = nombre;
    this.edad = edad;
    this.curso = curso;
  }
  showInfo() {
    return `Nombre: ${this.nombre}, Edad: ${this.edad}, Curso: ${this.curso}`;
  }
}

class InternationalStudent extends Student {
  constructor(nombre, edad, curso, paisOrigen) {
    super(nombre, edad, curso);
    this.paisOrigen = paisOrigen;
  }
}

function showStudentsList(students) {
  let internationalStudentNumber = 1;
  let nationalStudentNumber = 1;

  students.forEach((student) => {
    const row = document.createElement("tr");
    const rowInternational = document.createElement("tr");

    const numberCell = document.createElement("td");
    numberCell.scope = "row";
    numberCell.textContent = nationalStudentNumber++;
    row.appendChild(numberCell);

    const nameCell = document.createElement("td");
    nameCell.textContent = student.nombre;
    row.appendChild(nameCell);

    const ageCell = document.createElement("td");
    ageCell.textContent = `${student.edad} años`;
    row.appendChild(ageCell);

    const courseCell = document.createElement("td");
    courseCell.textContent = student.curso;
    row.appendChild(courseCell);

    if ("paisOrigen" in student) {
      numberCell.innerHTML = internationalStudentNumber++;
      rowInternational.appendChild(numberCell);

      rowInternational.appendChild(nameCell);
      rowInternational.appendChild(ageCell);
      rowInternational.appendChild(courseCell);

      const paisOrigenCell = document.createElement("td");
      paisOrigenCell.textContent = student.paisOrigen;
      rowInternational.appendChild(paisOrigenCell);
    }
    studentNationalList.appendChild(row);
    studentInternationalList.appendChild(rowInternational);
  });
}

function addStudent(student) {
  if ("paisOrigen" in student) {
    students.push(student);
  } else {
    students.unshift(student);
  }
}

function checkFormInputs() {
  const studentForm = $(".needs-validation");

  studentForm.addEventListener(
    "submit",
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (studentForm.checkValidity()) {
        console.log(studentForm.checkValidity());
        const nombre = $("#nombre").value;
        const edad = $("#edad").value;
        const curso = $("#curso").value;
        const paisOrigen =
          $("#pais-origen") === null ? false : $("#pais-origen").value;

        let student;
        if (paisOrigen) {
          student = new InternationalStudent(nombre, edad, curso, paisOrigen);
        } else {
          student = new Student(nombre, edad, curso);
        }

        addStudent(student);

        $(
          "#SuccessToast .toast-body"
        ).innerText = `${nombre} ha sido añadido exitosamente`;
        const toastBootstrap =
          bootstrap.Toast.getOrCreateInstance(SuccessToast);
        toastBootstrap.show();

        studentNationalList.innerHTML = "";
        studentInternationalList.innerHTML = "";
        showStudentsList(students);
        studentForm.reset();
        $("#input-PaisOrigen").innerHTML = "";
        studentForm.classList.remove("was-validated");
      } else {
        studentForm.classList.add("was-validated");
      }
    },
    false
  );
}

checkFormInputs();
checkForeign.addEventListener("change", (e) => {
  if (e.target.checked) {
    let inputPaisOrigen = document.createElement("input");
    inputPaisOrigen.type = "text";
    inputPaisOrigen.className = "form-control";
    inputPaisOrigen.id = "pais-origen";
    inputPaisOrigen.placeholder = "Ingrese su país de origen";
    inputPaisOrigen.required = true;

    let labelPaisOrigen = document.createElement("label");
    labelPaisOrigen.setAttribute("for", "pais-origen");
    labelPaisOrigen.className = "form-label";
    labelPaisOrigen.innerText = "País de origen";
    $("#input-PaisOrigen").appendChild(labelPaisOrigen);
    $("#input-PaisOrigen").appendChild(inputPaisOrigen);
  } else {
    $("#input-PaisOrigen").innerHTML = "";
  }
});

window.addEventListener("load", function () {
  showStudentsList(students);
});
