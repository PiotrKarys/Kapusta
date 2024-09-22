import axios from "axios";

async function fetchVisitorCount() {
  try {
    const response = await axios.get("/");
    document.getElementById("counter").textContent = response.data.visitorCount;
  } catch (error) {
    console.error("Błąd przy pobieraniu liczby odwiedzin:", error);
  }
}

window.onload = fetchVisitorCount;
