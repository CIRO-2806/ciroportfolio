document.addEventListener("DOMContentLoaded", () => {
    const mainInfo = document.querySelector(".main-info");
    const mainInfoText = document.querySelector(".main-info-h2")
    
    
    setTimeout(() => {
    mainInfo.style.transform = "translateY(0px)";
  }, 50);
  setTimeout(() => {
    mainInfoText.style.transform = "translateY(0px)";
    mainInfoText.style.opacity = "1";
  }, 100);
  setTimeout(() => {
    mainInfoText.style.transform = "translateY(0px)";
  }, 100);

})
const moreButton = document.getElementById("more-button")
    
moreButton.addEventListener("click", toggleBoxes);

function toggleBoxes() {
  const moreSection = document.querySelector(".more");
  const boxes = document.querySelectorAll(".more-box");

  moreSection.style.display = "flex";
  moreSection.style.zIndex = "999";

  setTimeout(() => {
    moreSection.style.opacity = "1";
  }, 50);

  boxes.forEach((box, index) => {
    setTimeout(() => {
      box.style.transform = "translateY(0)";
    }, index * 100);
  });
}