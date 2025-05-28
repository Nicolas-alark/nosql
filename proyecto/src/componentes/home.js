export default async function mostrarHome() {
  const app = document.getElementById("app");
  app.innerHTML = `<h2>Personajes de Juego de Tronos</h2><div id="lista" style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: space-between; padding: 10px;"></div>`;

  const lista = document.getElementById("lista");

  try {
    // Cambiamos a la nueva API que incluye imágenes
    const res = await fetch("https://thronesapi.com/api/v2/Characters");
    const data = await res.json();

    data.forEach((personaje) => {
      const item = document.createElement("div");
      item.style = "width: 150px; margin-bottom: 15px;";

      item.innerHTML = `
        <p style="margin: 5px 0; font-weight: bold;">${personaje.fullName || "Nombre desconocido"}</p>
        <img src="${personaje.imageUrl}" 
             style="width: 100px; height: 100px; object-fit: cover; border: 1px solid #d4af37;"
             alt="${personaje.fullName}"
             onerror="this.src='https://via.placeholder.com/100?text=No+Image'">
        <p style="margin: 3px 0; font-size: 0.8em;">${personaje.title || "Sin título"}</p>
      `;

      lista.appendChild(item);
    });
  } catch (error) {
    app.innerHTML = `<p style="color: red;">Error al cargar los personajes: ${error.message}</p>`;
  }
}