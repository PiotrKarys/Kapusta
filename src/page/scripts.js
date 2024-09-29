function addRandomCabbages() {
  const container = document.getElementById("cabbageContainer");
  const numberOfCabbages = 45;
  const containerRect = container.getBoundingClientRect();

  for (let i = 0; i < numberOfCabbages; i++) {
    const cabbage = document.createElement("img");
    cabbage.src = "/assets/icons/Vector.svg";
    cabbage.alt = "Kapusta";
    cabbage.className = "cabbage";

    const maxWidth = containerRect.width - 50;
    const maxHeight = containerRect.height - 50;

    cabbage.style.left = `${Math.random() * maxWidth}px`;
    cabbage.style.top = `${Math.random() * maxHeight}px`;

    rotateCabbage(cabbage);

    container.appendChild(cabbage);
  }
}

function rotateCabbage(cabbage) {
  const rotation = Math.random() * 360;
  cabbage.style.transform = `rotate(${rotation}deg)`;
}

function rotateAllCabbages() {
  const cabbages = document.querySelectorAll(".cabbage");
  cabbages.forEach(rotateCabbage);
}

function goToApiDocs() {
  window.location.href = "/api-docs";
}

function goToFrontend() {
  window.location.href =
    "https://go-it-group-project-react-node-gr4-front.vercel.app/";
}

window.onload = () => {
  addRandomCabbages();
  setInterval(rotateAllCabbages, 3000);
};

window.addEventListener("resize", () => {
  const container = document.getElementById("cabbageContainer");
  container.innerHTML = "";
  addRandomCabbages();
});
