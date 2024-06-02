import { $, $$ } from "./utils/dom.js";
// data
const moneyInfo = [
  {
    nombre: "10 céntimos",
    img: "./assets/img/10cent.png",
    class: "moneda",
    value: 0.1,
  },
  {
    nombre: "20 céntimos",
    img: "./assets/img/20cent.png",
    class: "moneda",
    value: 0.2,
  },
  {
    nombre: "50 céntimos",
    img: "./assets/img/50cent.png",
    class: "moneda",
    value: 0.5,
  },
  {
    nombre: "1 sol",
    img: "./assets/img/1sol.png",
    class: "moneda",
    value: 1,
  },
  {
    nombre: "2 soles",
    img: "./assets/img/2soles.png",
    class: "moneda",
    value: 2,
  },
  {
    nombre: "5 soles",
    img: "./assets/img/5soles.png",
    class: "moneda",
    value: 5,
  },
  {
    nombre: "10 soles",
    img: "./assets/img/10soles.png",
    class: "billete",
    value: 10,
  },
  {
    nombre: "20 soles",
    img: "./assets/img/20soles.png",
    class: "billete",
    value: 20,
  },
  {
    nombre: "50 soles",
    img: "./assets/img/50soles.png",
    class: "billete",
    value: 50,
  },
  {
    nombre: "100 soles",
    img: "./assets/img/100soles.png",
    class: "billete",
    value: 100,
  },
  {
    nombre: "200 soles",
    img: "./assets/img/200soles.png",
    class: "billete",
    value: 200,
  },
];
//dom
const coinContainer = $("#coinsContainer");
const billContainer = $("#billsContainer");
const totalIndicator = $(".totalMoney-container #total-indicator");
const btnReload = $("#btn-reload");
let totalMoney = new Decimal(0);

moneyInfo.forEach((money) => {
  let colContainer = document.createElement("div");
  colContainer.className = "col";

  let moneyCard = document.createElement("div");
  moneyCard.className = `card border-secondary mb-3 ${money.class} h-100 mx-auto`;
  moneyCard.style.maxWidth = "18rem";

  let cardHeader = document.createElement("div");
  cardHeader.className =
    "card-header bg-transparent border-secondary text-center text-uppercase";
  cardHeader.innerHTML = `<span id="moneyDenominations">${money.nombre}</span>`;

  let cardBody = document.createElement("div");
  cardBody.className =
    "card-body text-success d-flex justify-content-around flex-column";
  cardBody.innerHTML = `
    <p class="card-text text-center">
      <img src="${money.img}" class="img-fluid" alt="${money.nombre}" data-value="${money.value}" />
    </p>
    <h5 class="card-title align-self-center" id="counter-indicator">
      0
    </h5>
  `;

  let cardFooter = document.createElement("div");
  cardFooter.className =
    "card-footer bg-transparent border-warning d-flex justify-content-center";
  cardFooter.innerHTML = `
    <div class="btn-group" role="group" aria-label="Basic mixed styles example">
      <button type="button" class="btn btn-danger fw-bold fs-5" id="btn-subtract">
        -1
      </button>
      <button type="button" class="btn btn-success fw-bold fs-5" id="btn-add"> 
        +1
      </button>
    </div>
  `;

  moneyCard.appendChild(cardHeader);
  moneyCard.appendChild(cardBody);
  moneyCard.appendChild(cardFooter);

  colContainer.appendChild(moneyCard);
  if (money.class === "moneda") {
    coinContainer.appendChild(colContainer);
  } else {
    billContainer.appendChild(colContainer);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  totalIndicator.innerText = new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(totalMoney);

  const btnsAdd = $$("#contador-board section .card .card-footer #btn-add");
  const btnsSubtract = $$(
    "#contador-board section .card .card-footer #btn-subtract"
  );
  const coinSound = $("#coin-sound");
  const billSound = $("#bill-sound");

  btnsAdd.forEach((btnAdd) => {
    btnAdd.addEventListener("click", () => {
      const counterContainer = $(
        ".card-body #counter-indicator",
        btnAdd.closest(".card")
      );
      const currentCount = parseInt(counterContainer.innerText, 10) || 0;
      counterContainer.innerText = currentCount + 1;

      const valueMoney = $(".card-body img", btnAdd.closest(".card"));
      let montoDemonomination = new Decimal(
        valueMoney.getAttribute("data-value")
      );

      totalMoney = totalMoney.plus(montoDemonomination);
      totalIndicator.innerText = new Intl.NumberFormat("es-PE", {
        style: "currency",
        currency: "PEN",
      }).format(totalMoney);

      if (btnAdd.closest(".moneda")) {
        coinSound.currentTime = 0;
        coinSound.play();
      } else {
        billSound.currentTime = 0;
        billSound.play();
      }
    });
  });

  btnsSubtract.forEach((btnSubtract) => {
    btnSubtract.addEventListener("click", () => {
      const counterContainer = $(
        ".card-body #counter-indicator",
        btnSubtract.closest(".card")
      );
      const currentCount = parseInt(counterContainer.innerText, 10) || 0;
      if (currentCount > 0) {
        counterContainer.innerText = currentCount - 1;

        const valueMoney = $(".card-body img", btnSubtract.closest(".card"));
        let montoDemonomination = new Decimal(
          valueMoney.getAttribute("data-value")
        );

        totalMoney = totalMoney.minus(montoDemonomination);
        totalIndicator.innerText = new Intl.NumberFormat("es-PE", {
          style: "currency",
          currency: "PEN",
        }).format(totalMoney);
      }
    });
  });

  btnReload.addEventListener("click", () => {
    const counterContainer = $$(".card-body #counter-indicator");
    counterContainer.forEach((counter) => {
      counter.innerText = "0";
    });
    totalMoney = new Decimal(0);
    totalIndicator.innerText = new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
    }).format(totalMoney);
  });
});
