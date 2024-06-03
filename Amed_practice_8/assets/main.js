const $ = (selector, context = document) => context.querySelector(selector);

const onclickItem = $("#onclick");
// Elementos para el doble clik
const ondblclickItem = $("#ondblclick");
const ondblclickItemStyles = window.getComputedStyle(ondblclickItem);
let FontSizeItem = parseFloat(
  ondblclickItemStyles.getPropertyValue("font-size")
);

const onmousedownItem = $("#onmousedown");
const onmouseenterItem = $("#onmouseenter");
const onmouseleaveItem = $("#onmouseleave");
const onmousemoveItem = $("#onmousemove");
const onmouseoverItem = $("#onmouseover");
const onmouseoutItem = $("#onmouseout");
const oncontextmenuItem = $("#oncontextmenu");
/* eventos del mouse */
onclickItem.addEventListener("click", () => {
  alert("Usted hizo click sobre el item 'onclick'");
});

ondblclickItem.addEventListener("dblclick", () => {
  FontSizeItem += 16;
  ondblclickItem.style.fontSize = `${FontSizeItem}px`;
});

onmousedownItem.addEventListener("mousedown", () => {
  onmousedownItem.classList.add("text-warning");
});

onmouseenterItem.addEventListener("mouseenter", () => {
  onmouseenterItem.classList.add("list-group-item-info");
});
onmouseenterItem.addEventListener("mouseleave", () => {
  onmouseenterItem.classList.remove("list-group-item-info");
});

onmouseleaveItem.addEventListener("mouseleave", () => {
  onmouseleaveItem.classList.remove("list-group-item-warning");
});
onmouseleaveItem.addEventListener("mouseenter", () => {
  onmouseleaveItem.classList.add("list-group-item-warning");
});

onmousemoveItem.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;
  $("#position", onmousemoveItem).innerText = `Position ➡️ X: ${x}, Y: ${y}`;
});

onmouseoverItem.addEventListener("mouseover", () => {
  onmouseoverItem.style.textDecoration = "underline";
});
onmouseoverItem.addEventListener("mouseout", () => {
  onmouseoverItem.style.textDecoration = "none";
});

onmouseoutItem.addEventListener("mouseout", () => {
  onmouseoutItem.classList.remove("text-decoration-underline");
});

oncontextmenuItem.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  alert("Usted hizo click izquierdo en el elemento 'oncontextmenu'");
});

$(".list-group").addEventListener("mouseleave", () => {
  ondblclickItem.style.fontSize = "initial";
  onmouseoutItem.classList.add("text-decoration-underline");
  onmouseleaveItem.classList.add("list-group-item-warning");
  $("#position", onmousemoveItem).innerText = "";
});
