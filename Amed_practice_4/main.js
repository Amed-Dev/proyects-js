// DOM
const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => context.querySelectorAll(selector);

// Variables globales

let final_score = 0;
let questionsAnswered = 0;
let answeredQuestions = new Set();
let responseTimes = {};

// Cargar los datos del JSON y mostrarlos en la interfaz
async function showTrivia() {
  try {
    const urlData = "./preguntas.json";
    const response = await fetch(urlData);
    if (response.ok) {
      const data = await response.json();
      showTopic(data);
    }
  } catch (error) {
    console.error(`No hemos podido cargar los datos - ${error}`);
  }
}
showTrivia();
// board de preguntas y temas
function showTopic(data) {
  let contentTopics = "";
  data.forEach((topic, i) => {
    contentTopics += `
      <div class="card" style="width: 18rem;">
        <img src="${topic.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${topic.tema}</h5>
          <p class="card-text">${topic.descripcion}</p>
          <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Iniciar</a>
        </div>
      </div>

      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">${topic.tema}</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Usted tendra tiempo necesario para resolver este cuestionario de ${topic.tema}, una vez responda las preguntas envíe sus respuestas
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" class="btn btn-primary" id="btn-start" data-quizz-number="${i}">Iniciar</button>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  $("#trivia-board").innerHTML = contentTopics;

  $("#btn-start").addEventListener("click", () => {
    let i = $("#btn-start").getAttribute("data-quizz-number");
    let startTime = Date.now();
    closeModal();
    showQuestions(data, startTime, i);
    updateProgressBar();
  });
}
//cerrar modal
function closeModal() {
  var modal = document.getElementById("staticBackdrop");
  var modalInstance = bootstrap.Modal.getInstance(modal);
  modalInstance.hide();
}
// actualizar el scroll al top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
// Generar las preguntas y sus opciones
function showQuestions(data, startTime, i) {
  scrollToTop();
  const generateOption = (numero, opcion, value, correcta, score) => `
    <li class="list-group-item list-group-item-action questions">
      <label class="form-check-label w-100 d-flex gap-1" for="radio${value}${numero}">
        <input class="form-check-input me-1" type="radio" name="listGroupRadio${numero}" value="${value}" id="radio${value}${numero}">
        <span class="w-100">${opcion}</span>
        <span class="msg d-none"></span>
      </label>
    </li>
  `;

  let tema = data[i].tema;
  let questionsTrivia = data[i].preguntas.length;
  let contentBoard = "";

  let scorePoints = 20 / questionsTrivia;
  contentBoard += `
      <h3 class="text-center mt-2">Trivia - ${tema}</h3>
      <div class="progress_container sticky-top p-2 bg-dark">
        <div
          class="progress circular"
          role="progressbar"
          aria-label="Success example"
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
          style="background: rgba(255, 193, 7, 0.25)">
          <div class="progress-bar bg-warning" id="progress-bar"></div>
        </div>
        <div id="msg-number-questions" class="text-end fw-bold"></div>
      </div>
      <div id="trivia_container">
        <!-- contenido generado con js -->
  `;

  let contentQuestions = "";
  data.forEach((tema) => {
    tema.preguntas.forEach((q) => {
      contentQuestions += `
      <ul class="list-group my-3 questionsField" data-question-number="${
        q.numero
      }" data-correct-answer="${q.correcta}" data-score="${scorePoints}">
        <li class="list-group-item list-group-item-secondary" aria-disabled="true">${
          q.titulo
        }</li>
        <li class="list-group-item list-group-item-light" aria-disabled="true">${
          q.numero
        }. ${q.pregunta}</li>
        ${generateOption(q.numero, q.opciones[0], 1, q.correcta, scorePoints)}
        ${generateOption(q.numero, q.opciones[1], 2, q.correcta, scorePoints)}
        ${generateOption(q.numero, q.opciones[2], 3, q.correcta, scorePoints)}
        ${generateOption(q.numero, q.opciones[3], 4, q.correcta, scorePoints)}
      </ul>
  `;
    });
  });

  contentBoard += `
        ${contentQuestions}
      </div>
      <div class="d-flex justify-content-end">
        <button
          type="button"
          id="submit-btn"
          class="btn btn-lg btn-success px-4">
          Enviar
        </button>
      </div>
  `;
  $("#trivia-board").innerHTML = contentBoard;
  addEventListeners(startTime);
}

// Escuchar los eventos de los inputs
function addEventListeners(startTime) {
  $$('input[type="radio"]').forEach((input) => {
    input.addEventListener("change", (event) => {
      const { target } = event;
      const questionNumber = parseInt(
        target.name.replace("listGroupRadio", ""),
        10
      );
      const correctAnswer = parseInt(
        target.closest("ul").dataset.correctAnswer,
        10
      );
      const score = parseFloat(target.closest("ul").dataset.score);
      checkAnswer(target, correctAnswer, score, questionNumber, startTime);
    });
  });

  $("#submit-btn").addEventListener("click", () => {
    updateAcuraccyBar();
    evaluateFinalScore();
    showSummary();
  });
}

// Actualizar la barra de progreso
function updateProgressBar() {
  const progressBar = $("#progress-bar");
  const totalQuestions = $$(".questionsField[data-question-number]").length;
  const progress = (questionsAnswered / totalQuestions) * 100;
  progressBar.style.width = `${progress}%`;
  progressBar.setAttribute("aria-valuenow", progress);
  $(
    "#msg-number-questions"
  ).innerText = `${questionsAnswered} de ${totalQuestions} preguntas respondidas`;
}

// Verificar la respuesta del usuario
function checkAnswer(
  inputElement,
  correctAnswer,
  score,
  questionNumber,
  startTime
) {
  const question = inputElement.closest("ul");
  const items = question.querySelectorAll(".questions");

  // Verificar si la pregunta ha sido respondida antes
  const isAlreadyAnswered = answeredQuestions.has(questionNumber);

  // Limpiar los estilos de todas las opciones en la pregunta actual
  items.forEach((item) => {
    item.classList.remove("list-group-item-primary");
    const msgElement = item.querySelector(".msg");
    if (msgElement) {
      msgElement.innerHTML = "";
    }
  });

  const selectedOption = inputElement;

  if (inputElement.checked) {
    inputElement.closest("li").classList.add("list-group-item-primary");
  }

  if (parseInt(selectedOption.value) === correctAnswer) {
    $(`label[for="${selectedOption.id}"] .msg`, question).innerHTML =
      "¡Correcto!";
    if (!isAlreadyAnswered) {
      final_score += score;
      questionsAnswered++;
      question.dataset.correct = "true";
      answeredQuestions.add(questionNumber);
      responseTimes[questionNumber] = Date.now() - startTime;
    }
    question.dataset.correct = "true";
  } else {
    $(`label[for="${selectedOption.id}"] .msg`, question).innerHTML =
      "¡Incorrecto!";
    if (!isAlreadyAnswered) {
      questionsAnswered++;
      answeredQuestions.add(questionNumber);
      responseTimes[questionNumber] = Date.now() - startTime;
    }
  }
  updateProgressBar();
  checkAllQuestionsAnswered();
}

function checkAllQuestionsAnswered() {
  const progressBar = $("#progress-bar");
  const totalQuestions = $$(".list-group[data-question-number]").length;
  if (questionsAnswered === totalQuestions) {
    progressBar.classList.remove("bg-warning");
    progressBar.classList.add("bg-success");
  }
}

/* resumen del cuestionario */
function evaluateFinalScore() {
  const correctStatistic = $(".correct-container .card-title");
  const incorrectStatistic = $(".incorrect-container .card-title");
  const notAnsweredStatistic = $(".not-answered-container .card-title");
  const avgTime = $(".avg-time-container .card-title");
  let finalScore = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  let notAnsweredCount = 0;

  $$(".list-group").forEach((question) => {
    const correctAnswer = parseInt(question.dataset.correctAnswer, 10);
    const score = parseFloat(question.dataset.score);
    const selectedOption = $('input[type="radio"]:checked', question);

    if (selectedOption && parseInt(selectedOption.value) === correctAnswer) {
      finalScore += score;
      correctCount += 1;
    } else if (
      selectedOption &&
      parseInt(selectedOption.value) !== correctAnswer
    ) {
      incorrectCount += 1;
    } else if (!selectedOption) {
      notAnsweredCount += 1;
    }
  });
  correctStatistic.innerHTML = correctCount;
  incorrectStatistic.innerHTML = incorrectCount;
  notAnsweredStatistic.innerHTML = notAnsweredCount;
  avgTime.innerHTML = `${Math.round(calculateAverageResponseTime())}s`;
  $("#score").innerHTML = finalScore;
}

//barra de precisión
function updateAcuraccyBar() {
  const acuraccyBar = $("#acuraccy-bar");
  const totalQuestions = $$(".questionsField[data-question-number]").length;
  const correctAnswered = $$(".questionsField[data-correct='true']").length;
  const progress = (correctAnswered / totalQuestions) * 100;
  const acuraccyLabel = $(".acuraccy-label");
  const progressLabel = $(".acuraccy-value");

  acuraccyBar.style.width = `${progress}%`;
  acuraccyBar.setAttribute("aria-valuenow", progress);
  acuraccyLabel.innerHTML = `${progress}%`;

  const containerWidth = $("#acuraccy").offsetWidth;
  const labelWidth = progressLabel.offsetWidth;
  const labelPosition = (progress / 100) * containerWidth - labelWidth / 2;
  //sincronizar barra de precision con el label del porcentaje
  if (labelPosition < 0) {
    progressLabel.style.left = "0";
  } else {
    progressLabel.style.left = `calc(${progress}% - 18px)`;
  }
}

// avg time
function calculateAverageResponseTime() {
  const times = Object.values(responseTimes);
  if (times.length === 0) return 0;

  const totalResponseTime = times.reduce((total, time) => total + time, 0);
  const averageResponseTime = totalResponseTime / times.length;

  return averageResponseTime / 1000;
}

// resumen de preguntas
function generateSummaryOption(numero, opcion, value, correcta, selectedValue) {
  const isSelected = value === selectedValue;
  const isCorrect = value === correcta;
  const itemClass = isSelected
    ? isCorrect
      ? "list-group-item-success"
      : "list-group-item-danger"
    : "";
  const correctAnswer = isCorrect ? "list-group-item-success" : "";

  return `
    <li class="list-group-item questionsSumary ${itemClass} ${correctAnswer}">
      <label class="form-check-label w-100 d-flex gap-1" for="radio${value}${numero}">
        <input class="form-check-input me-1" type="radio" name="listGroupRadio${numero}" value="${value}" id="radio-s-${value}${numero}" disabled ${
    isSelected ? "checked" : ""
  }>
        <span class="w-100">${opcion}</span>
        <span class="msg ${
          isSelected
            ? isCorrect
              ? "is-selected is-correct"
              : "is-selected is-incorrect"
            : ""
        } ${!isSelected && isCorrect ? "correct-answer" : ""}">${
    isSelected ? (isCorrect ? "¡Correcto!" : "¡Incorrecto!") : ""
  }</span>
      </label>
    </li>
  `;
}
function showSummary() {
  scrollToTop();
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
    const questionTitle = $(".list-group-item-light", question).innerText;

    contentSumary += `
      <ul class="list-group my-3 questionsSumary" data-question-number="${questionNumber}">
        <li class="list-group-item list-group-item-secondary" aria-disabled="true">${
          $(".list-group-item-secondary", question).innerText
        }</li>
        <li class="list-group-item list-group-item-light" aria-disabled="true">${questionTitle}</li>
        ${generateSummaryOption(
          questionNumber,
          $('[for="radio1' + questionNumber + '"] span', question).innerText,
          1,
          correctAnswer,
          selectedValue
        )}
        ${generateSummaryOption(
          questionNumber,
          $('[for="radio2' + questionNumber + '"] span', question).innerText,
          2,
          correctAnswer,
          selectedValue
        )}
        ${generateSummaryOption(
          questionNumber,
          $('[for="radio3' + questionNumber + '"] span', question).innerText,
          3,
          correctAnswer,
          selectedValue
        )}
        ${generateSummaryOption(
          questionNumber,
          $('[for="radio4' + questionNumber + '"] span', question).innerText,
          4,
          correctAnswer,
          selectedValue
        )}
      </ul>
    `;
  });

  summaryContainer.innerHTML = contentSumary;

  document.addEventListener(
    "click",
    (event) => {
      if (event.target.closest(".questionsSumary")) {
        event.preventDefault();
      }
    },
    true
  );
}
