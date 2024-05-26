// DOM
const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => context.querySelectorAll(selector);

let final_score = 0;
let questionsAnswered = 0;
// cargar los datos del json y mostrarlos en interfaz
async function showTrivia() {
  try {
    const urlData = "./preguntas.json";
    const response = await fetch(urlData);
    if (response.ok) {
      const data = await response.json();
      showQuestions(data);
    }
  } catch (error) {
    console.error(`No hemos podido cargar los datos - ${error}`);
  }
}
showTrivia();

// generar las preguntas y sus opciones
function showQuestions(data) {
  const generateOption = (numero, opcion, value, correcta, score) => `
    <li class="list-group-item list-group-item-action questions">
      <label class="form-check-label w-100 d-flex gap-1" for="radio${value}${numero}">
        <input class="form-check-input me-1" type="radio" name="listGroupRadio${numero}" value="${value}" id="radio${value}${numero}">
        <span class="w-100">${opcion}</span>
        <span class="msg"></span>
      </label>
    </li>
  `;

  let scorePoints = 20 / data.length;
  let contentQuestions = data.map(q => `
    <ul class="list-group my-3" data-question-number="${q.numero}" data-correct-answer="${q.correcta}" data-score="${scorePoints}">
      <li class="list-group-item list-group-item-secondary" aria-disabled="true">${q.titulo}</li>
      <li class="list-group-item list-group-item-light" aria-disabled="true">${q.numero}. ${q.pregunta}</li>
      ${generateOption(q.numero, q.opcion1, 1, q.correcta, scorePoints)}
      ${generateOption(q.numero, q.opcion2, 2, q.correcta, scorePoints)}
      ${generateOption(q.numero, q.opcion3, 3, q.correcta, scorePoints)}
      ${generateOption(q.numero, q.opcion4, 4, q.correcta, scorePoints)}
    </ul>
  `).join("");

  $("#trivia_container").innerHTML = contentQuestions;
  addEventListeners();
}
// escuchar los eventos de los inputs
function addEventListeners() {
  $$('input[type="radio"]').forEach(input => {
    input.addEventListener('change', (event) => {
      const { target } = event;
      const questionNumber = parseInt(target.name.replace('listGroupRadio', ''), 10);
      const correctAnswer = parseInt(target.closest('ul').dataset.correctAnswer, 10);
      const score = parseFloat(target.closest('ul').dataset.score);
      checkAnswer(target, correctAnswer, score, questionNumber);
    });
  });
}
// actualizar la barra de progreso
function updateProgressBar() {
  const progressBar = $('#progress-bar');
  const totalQuestions = document.querySelectorAll('.list-group[data-question-number]').length;
  const progress = (questionsAnswered / totalQuestions) * 100;
  progressBar.style.width = `${progress}%`;
  progressBar.setAttribute('aria-valuenow', progress);
  progressBar.innerText = `${Math.round(progress)}%`;
}
// vericar la respuesta del usuario
function checkAnswer(inputElement, correctAnswer, score, questionNumber) {
  const question = inputElement.closest('ul');
  const items = question.querySelectorAll('.questions');

  //verificar si la respuesta ha sido respondida correctamente
  const wasCorrect = question.dataset.correct === "true";

  // Limpiar los estilos de todas las opciones de la pregunta actúal
  items.forEach(item => {
    item.classList.remove("list-group-item-success", "list-group-item-danger");
    const msgElement = item.querySelector(".msg");
    if (msgElement) {
      msgElement.innerHTML = "";
    }
  });

  const selectedOption = inputElement;
  if (parseInt(selectedOption.value) === correctAnswer) {
    question.querySelector(`label[for="${selectedOption.id}"]`).parentElement.classList.add("list-group-item-success");
    question.querySelector(`label[for="${selectedOption.id}"] .msg`).innerHTML = "¡Correcto!";
    if (!wasCorrect) {
      final_score += score;
      questionsAnswered++;
      question.dataset.correct = "true";
    }
  } else {
    question.querySelector(`label[for="${selectedOption.id}"]`).parentElement.classList.add("list-group-item-danger");
    question.querySelector(`label[for="${selectedOption.id}"] .msg`).innerHTML = "¡Incorrecto!";
    if (wasCorrect) {
      final_score -= score;
      questionsAnswered--;
      question.dataset.correct = "false";
    }
  }
  updateProgressBar();
  console.log(final_score);
}


function checkAnswer(inputElement, correctAnswer, score, questionNumber) {
  const question = inputElement.closest("ul");
  const items = question.querySelectorAll(".questions");

  // Verificar si la pregunta ha sido respondida antes
  const isAlreadyAnswered = answeredQuestions.has(questionNumber);

  // Limpiar los estilos de todas las opciones en la pregunta actual
  items.forEach((item) => {
    item.classList.remove("list-group-item-success", "list-group-item-danger");
    const msgElement = item.querySelector(".msg");
    if (msgElement) {
      msgElement.innerHTML = "";
    }
  });

  const selectedOption = inputElement;
  if (parseInt(selectedOption.value) === correctAnswer) {
    question
      .querySelector(`label[for="${selectedOption.id}"]`)
      .parentElement.classList.add("list-group-item-success");
    question.querySelector(`label[for="${selectedOption.id}"] .msg`).innerHTML =
      "¡Correcto!";
    if (!isAlreadyAnswered) {
      final_score += score;
      questionsAnswered++;
      answeredQuestions.add(questionNumber);
    } else if (question.dataset.correct !== "true") {
      final_score += score;
    }
    question.dataset.correct = "true";
  } else {
    question
      .querySelector(`label[for="${selectedOption.id}"]`)
      .parentElement.classList.add("list-group-item-danger");
    question.querySelector(`label[for="${selectedOption.id}"] .msg`).innerHTML =
      "¡Incorrecto!";
    if (isAlreadyAnswered && question.dataset.correct === "true") {
      final_score -= score;
      question.dataset.correct = "false";
    }
  }

  updateProgressBar();
  checkAllQuestionsAnswered();
  console.log(final_score);
}

//BACKUP

`
<p><strong>Pregunta ${questionNumber}:</strong></p>
<p>${question.querySelector(".list-group-item-light").innerText}</p>
<p>Tu respuesta: ${
  selectedOption
    ? selectedOption.nextSibling.textContent.trim()
    : "No respondida"
}</p>
<p class="${isCorrect ? "text-success" : "text-danger"}">${
isCorrect ? "¡Correcto!" : "Incorrecto"
}</p>
`


function checkAllQuestionsAnswered() {
  const totalQuestions = $$(".questionsField[data-question-number]").length;
  if (questionsAnswered === totalQuestions) {
    progressBar.classList.remove("bg-warning");
    progressBar.classList.add("bg-success");
  }
}

function evaluateFinalScore() {
  const correctStatistic = $(".correct-container .card-title");
  const incorrectStatistic = $(".incorrect-container .card-title");
  const notAnsweredStatistic = $(".not-answered-container .card-title");
  let finalScore = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  let notAnsweredCount = 0;
  const questions = $$(".questionsField[data-question-number]");
  console.log(questions);
  questions.forEach((question) => {
    const correctAnswer = parseInt(question.dataset.correctAnswer, 10);
    const score = parseFloat(question.dataset.score);
    const selectedOption = $('input[type="radio"]:checked', question);

    if (selectedOption) {
      if (parseInt(selectedOption.value) === correctAnswer) {
        finalScore += score;
        correctCount += 1;
      } else {
        incorrectCount += 1;
      }
    } else {
      notAnsweredCount += 1;
    }
  });
  correctStatistic.innerHTML = correctCount;
  incorrectStatistic.innerHTML = incorrectCount;
  notAnsweredStatistic.innerHTML = notAnsweredCount;
  $("#score").innerHTML = finalScore;
}

//barra de precisión
function updateAcuraccyBar() {
  const acuraccyBar = $("#acuraccy-bar");
  const totalQuestions = $$(".questionsField[data-question-number]").length;
  const progress = (questionsAnswered / totalQuestions) * 100;
  const progressLabel = $(".acuraccy-value");

  acuraccyBar.style.width = `${progress}%`;
  acuraccyBar.setAttribute("aria-valuenow", progress);
  progressLabel.innerHTML = `${progress}%`;

  const containerWidth = $("#acuraccy").offsetWidth;
  const labelWidth = progressLabel.offsetWidth;
  const labelPosition = (progress / 100) * containerWidth - labelWidth / 2;
  //sincronizar barra de precision con el label del porcentaje
  if (labelPosition < 0) {
    progressLabel.style.left = "0";
    progressLabel.style.transform = "translateX(0)";
  } else if (labelPosition + labelWidth > containerWidth) {
    progressLabel.style.left = `${containerWidth - labelWidth}px`;
    progressLabel.style.transform = "translateX(0)";
  } else {
    progressLabel.style.left = `${labelPosition}px`;
    progressLabel.style.transform = "translateX(-50% - 18px)";
  }
}
// resumen del cuestionario
function generateSummaryOption(numero, opcion, value, correcta, selectedValue) {
  const isSelected = value === selectedValue;
  const isCorrect = value === correcta;
  const itemClass = isSelected
    ? isCorrect
      ? "list-group-item-success"
      : "list-group-item-danger"
    : "";

  return `
    <li class="list-group-item list-group-item-action questionsSumary ${itemClass}">
      <label class="form-check-label w-100 d-flex gap-1" for="radio${value}${numero}">
        <input class="form-check-input me-1" type="radio" name="listGroupRadio${numero}" value="${value}" id="radio${value}${numero}" disabled ${
    isSelected ? "checked" : ""
  }>
        <span class="w-100">${opcion}</span>
        <span class="msg">${
          isSelected ? (isCorrect ? "¡Correcto!" : "¡Incorrecto!") : ""
        }</span>
      </label>
    </li>
  `;
}

function showSummary() {
  // Barra de precisión
  const updateAcuraccyBar = () => {
    const acuraccyBar = $("#acuraccy-bar");
    const totalQuestions = $$(".list-group[data-question-number]").length;
    const progress = (questionsAnswered / totalQuestions) * 100;
    const progressLabel = $(".acuraccy-value");

    acuraccyBar.style.width = `${progress}%`;
    acuraccyBar.setAttribute("aria-valuenow", progress);
    progressLabel.innerHTML = `${progress.toFixed(0)}%`;

    const containerWidth = $("#acuraccy").offsetWidth;
    const labelWidth = progressLabel.offsetWidth;
    const labelPosition = (progress / 100) * containerWidth - labelWidth / 2;

    if (labelPosition < 0) {
      progressLabel.style.left = "0";
      progressLabel.style.transform = "translateX(0)";
    } else if (labelPosition + labelWidth > containerWidth) {
      progressLabel.style.left = `${containerWidth - labelWidth}px`;
      progressLabel.style.transform = "translateX(0)";
    } else {
      progressLabel.style.left = `${labelPosition}px`;
      progressLabel.style.transform = "translateX(-50%)";
    }
  };

  updateAcuraccyBar();

  const trivia = $("#trivia-board");
  const summaryContainer = $("#sumary_container");
  let contentSumary = "";
  $("#sumaryContainer").classList.remove("d-none");
  $("#sumaryContainer").classList.add("d-block");
  trivia.style.display = "none";

  $$(".questionsField[data-question-number]").forEach((question) => {
    const questionNumber = question.dataset.questionNumber;
    const correctAnswer = parseInt(question.dataset.correctAnswer, 10);
    const selectedOption = $('input[type="radio"]:checked', question);
    const selectedValue = selectedOption
      ? parseInt(selectedOption.value, 10)
      : null;
    const questionTitle = question.querySelector(
      ".list-group-item-light"
    ).innerText;

    contentSumary += `
      <ul class="list-group my-3 questionsSumary" data-question-number="${questionNumber}">
        <li class="list-group-item list-group-item-secondary" aria-disabled="true">${
          question.querySelector(".list-group-item-secondary").innerText
        }</li>
        <li class="list-group-item list-group-item-light" aria-disabled="true">${questionTitle}</li>
        ${generateSummaryOption(
          questionNumber,
          question.querySelector('[for="radio1' + questionNumber + '"] span')
            .innerText,
          1,
          correctAnswer,
          selectedValue
        )}
        ${generateSummaryOption(
          questionNumber,
          question.querySelector('[for="radio2' + questionNumber + '"] span')
            .innerText,
          2,
          correctAnswer,
          selectedValue
        )}
        ${generateSummaryOption(
          questionNumber,
          question.querySelector('[for="radio3' + questionNumber + '"] span')
            .innerText,
          3,
          correctAnswer,
          selectedValue
        )}
        ${generateSummaryOption(
          questionNumber,
          question.querySelector('[for="radio4' + questionNumber + '"] span')
            .innerText,
          4,
          correctAnswer,
          selectedValue
        )}
      </ul>
    `;
  });

  summaryContainer.innerHTML = contentSumary;
}


// original form
function showSummary() {
  const trivia = $("#trivia-board");
  const summaryContainer = $("#sumary_container");
  let contetSumary = "";
  $("#sumaryContainer").classList.remove("d-none");
  $("#sumaryContainer").classList.add("d-block");
  trivia.style.display = "none";

  $$(".list-group").forEach((question) => {
    const questionNumber = question.dataset.questionNumber;
    const correctAnswer = parseInt(question.dataset.correctAnswer, 10);
    const selectedOption = $('input[type="radio"]:checked', question);
    const isCorrect =
      selectedOption && parseInt(selectedOption.value) === correctAnswer;
    contetSumary += 
    `
      <p><strong>Pregunta ${questionNumber}:</strong></p>
      <p>${question.querySelector(".list-group-item-light").innerText}</p>
      <p>Tu respuesta: ${
        selectedOption
          ? selectedOption.nextSibling.textContent.trim()
          : "No respondida"
      }</p>
      <p class="${isCorrect ? "text-success" : "text-danger"}">${
      isCorrect ? "¡Correcto!" : "Incorrecto"
    }</p>
    `;
  });
  summaryContainer.innerHTML = contetSumary;
}
