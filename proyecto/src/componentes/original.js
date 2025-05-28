export default async function mostrarOriginal() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <style>
      .got-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
      }
      .got-header {
        text-align: center;
        margin-bottom: 30px;
      }
      .got-title {
        color: #d4af37;
        font-size: 2.5rem;
        margin-bottom: 10px;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
      }
      .got-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 25px;
      }
      .got-card {
        background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 10px 20px rgba(0,0,0,0.3);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .got-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 15px 30px rgba(0,0,0,0.4);
      }
      .got-image {
        width: 100%;
        height: 300px;
        object-fit: cover;
        border-bottom: 2px solid #d4af37;
      }
      .got-content {
        padding: 15px;
      }
      .got-name {
        color: #d4af37;
        margin: 0 0 10px 0;
        font-size: 1.3rem;
      }
      .got-info {
        color: #ddd;
        margin: 5px 0;
        font-size: 0.9rem;
      }
      .got-family {
        display: inline-block;
        background: #d4af37;
        color: #1a1a1a;
        padding: 3px 8px;
        border-radius: 4px;
        font-weight: bold;
        font-size: 0.8rem;
        margin-top: 5px;
      }
      .got-loading {
        text-align: center;
        color: #d4af37;
        font-size: 1.2rem;
        grid-column: 1/-1;
      }
      .got-error {
        text-align: center;
        color: #ff6b6b;
        font-size: 1.2rem;
        grid-column: 1/-1;
      }
    </style>

    <div class="got-container">
      <div class="got-header">
        <h1 class="got-title">Personajes de Juego de Tronos</h1>
      </div>
      <div id="lista" class="got-grid">
        <div class="got-loading">Cargando personajes...</div>
      </div>
    </div>
  `;

  const lista = document.getElementById("lista");

  try {
    const response = await fetch('https://thronesapi.com/api/v2/Characters');
    const personajes = await response.json();

    lista.innerHTML = '';

    personajes.forEach(personaje => {
      const card = document.createElement('div');
      card.className = 'got-card';
      
      card.innerHTML = `
        <img src="${personaje.imageUrl}" 
             alt="${personaje.fullName}" 
             class="got-image"
             onerror="this.src='https://via.placeholder.com/300x450?text=Imagen+no+disponible'">
        <div class="got-content">
          <h3 class="got-name">${personaje.fullName}</h3>
          <p class="got-info"><strong>Título:</strong> ${personaje.title || 'Desconocido'}</p>
          <p class="got-info"><strong>Familia:</strong> ${personaje.family || 'Desconocida'}</p>
          ${personaje.family ? `<span class="got-family">Casa ${personaje.family}</span>` : ''}
        </div>
      `;
      
      lista.appendChild(card);
    });

  } catch (error) {
    lista.innerHTML = `
      <div class="got-error">
        Error al cargar los personajes: ${error.message}
        <br><br>
        <button onclick="mostrarPersonajesGoT()" 
                style="padding: 10px 20px; 
                       background: #d4af37; 
                       color: #1a1a1a; 
                       border: none; 
                       border-radius: 4px; 
                       cursor: pointer;">
          Reintentar
        </button>
      </div>
    `;
  }
}