// Datos de las preguntas
const questionsData = {
  questions: [
    {
      question: "¿Cuál fue nuestra primera salida en la U?",
      options: ["El Parque de la vida", "El cine", "Bogotana de Pizza", "Mi perro"],
      correct: 3,
    },
    {
      question: "¿Cual es mi parte favorita de tu rostro?",
      options: [
        "Ojos",
        "Boca",
        "Cachetes",
        "Nariz",
      ],
      correct: 0,
    },
    {
      question: "¿Cuál es mi comida favorita que tú preparas?",
      options: ["Huevos", "Chocolate", "Atun", "Ensalada"],
      correct: 0,
    },
    {
      question: "¿Que te regale la primera navidad cuando no eramos novios pero ya lo ibamos a ser el 29?",
      options: ["Un peluche", "Una vestido", "Una Carta", "Una pijama"],
      correct: 1,
    },
    {
      question: "¿Dónde fue nuestro primer beso desde que estudiamos en la U?",
      options: ["En el carro", "En tu casa", "En mi casa", "En la U"],
      correct: 2,
    },
    {
      question: "¿Cuantas ciudades hemos visitado juntos? ( No cuenta armenia )",
      options: ["5", "4", "3", "5"],
      correct: 0,
    },
  ],
};

let currentQuestion = 0;
let score = 0;

function showScreen(screenName) {
  document.querySelector(".menu-screen").classList.remove("active");
  document.querySelector(".game-screen").classList.remove("active");
  document.querySelector(".result-screen").classList.remove("active");
  document.querySelector(".pregame-screen").classList.remove("active");
  document.querySelector(`.${screenName}-screen`).classList.add("active");
}

function startGame() {
  currentQuestion = 0;
  score = 0;
  showQuestion();
  showScreen("game");
}

function startPreGame() {
    showScreen("pregame");
}

function clickDifficulty(difficulty) {
    let message = "";
    switch (difficulty) {
        case 'easy':
            document.querySelector("#easy-btn").disabled = true;
            document.querySelector("#easy-btn").style.backgroundColor = "gray";
            message = "¡Que triste que pongas facil, no me conoces?!";
            break;
        case 'medium':
            document.querySelector("#medium-btn").disabled = true;
            document.querySelector("#medium-btn").style.backgroundColor = "gray";
            message = "No seas tibia, seguro me conoces mas que yo a mi...";
            break;
        case 'hard':
            document.querySelector("#hard-btn").disabled = true;
            document.querySelector("#hard-btn").style.backgroundColor = "gray";
            message = "Te veo muy confiada...";
            break;
        default:
            break;
    }

    document.querySelector("#dif-message").textContent = message;

    if (document.querySelector("#easy-btn").disabled &&
        document.querySelector("#medium-btn").disabled &&
        document.querySelector("#hard-btn").disabled) {
        allButtonsClicked();
    }
}

function allButtonsClicked() {
    document.querySelector("#preplay-btn").style.display = 'block';
}

function showQuestion() {
  const question = questionsData.questions[currentQuestion];
  document.querySelector(".progress").textContent = `Pregunta ${
    currentQuestion + 1
  }/${questionsData.questions.length}`;
  document.querySelector(".question").textContent = question.question;

  const optionsHTML = question.options
    .map(
      (option, index) => `
        <button class="option" onclick="checkAnswer(${index})">
            ${option}
        </button>
    `
    )
    .join("");

  document.querySelector(".options").innerHTML = optionsHTML;
}

function checkAnswer(selectedOption) {
  const question = questionsData.questions[currentQuestion];

  if (selectedOption === question.correct) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < questionsData.questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  showScreen("result");
  const scorePercentage = (score / questionsData.questions.length) * 100;
  document.querySelector(
    ".score"
  ).textContent = `Puntaje: ${score}/${questionsData.questions.length} (${scorePercentage}%)`;

  let message = "";
  if (scorePercentage === 100) {
    message = "¡Eres el amor de mi vida! ¡Me conoces perfectamente! 💝";
  } else if (scorePercentage >= 80) {
    message = "¡Wow! ¡me conoces muy bien! 💕";
  } else if (scorePercentage >= 60) {
    message = "Nada mal, podria ser mejor la vd...";
  } else {
    message =
      "no me hable....yo lo volveria a hacer y tomo otro pantallazo";
  }

  document.querySelector(".message").textContent = message;
}

function restartGame() {
  startGame();
}

function showMenu() {
  showScreen("menu");
}
