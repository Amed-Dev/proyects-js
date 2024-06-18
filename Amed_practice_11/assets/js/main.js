// dom
const $ = (selector, context = document) => context.querySelector(selector);

const tooltip = $(".tooltiptext");
let iconButton = $(".tooltip i");
$("#shortener-ulr-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const longURL = $("#long-url").value;
  $("#loader").innerHTML =
    '<span aria-busy="true">Generating your link...</span>';
  const url = "https://url-shortener42.p.rapidapi.com/shorten/";
  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": "ccabfd4f1dmshc3d025c2cdc38ebp1c9234jsna7da4e0afbde",
      "x-rapidapi-host": "url-shortener42.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: longURL,
      validity_duration: 5,
    }),
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    $("#loader").innerHTML = "";
    showShortURL(result);
  } catch (error) {
    console.error(error);
  }
});

function showShortURL(data) {
  const shortURL = $("#short-url");
  if (data) {
    shortURL.value = data.url;
  } else {
    shortURL.value = "No se pudo acortar la URL";
    shortURL.setAttribute("aria-invalid", "true");
  }
  $(".result").classList.add("show");
}

$("#btn-copy").addEventListener("click", () => {
  const shortURL = $("#short-url").value;

  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(shortURL)
      .then(() => {
        tooltip.textContent = "Copiado!";
        iconButton.classList.remove("fa-copy");
        iconButton.classList.add("fa-check");
        setTimeout(() => {
          iconButton.classList.remove("fa-check");
          iconButton.classList.add("fa-copy");
        }, 2500);
      })
      .catch((error) => {
        tooltip.textContent = "Error al copiar";
        console.error("Error al copiar texto:", error);
      });
  }
});
