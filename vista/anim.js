
document.addEventListener("DOMContentLoaded", () => {
  const optionBar = document.querySelector(".option-bar")
  const option = document.querySelectorAll(".option")

  option.forEach((op, i) => {
    setTimeout(() => {
      op.style.transform = "translateY(0px)"
    }, (i + 4) * 200);
  });
  setTimeout(() => {
    optionBar.style.transform = "translateY(0px)"
  }, 0);




})
const moreButton = document.getElementById("more-button")
