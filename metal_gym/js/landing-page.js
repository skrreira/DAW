$(document).ready(function () {
    let opiniones = []; // Array para almacenar las opiniones
    let currentIndex = 0; // Índice actual de opiniones cargadas
    const opinionesPorCarga = 3; // Número de opiniones a cargar en cada click

    // Función para renderizar opiniones
    function renderOpiniones() {
        // Obtener el siguiente grupo de opiniones
        const siguientesOpiniones = opiniones.slice(currentIndex, currentIndex + opinionesPorCarga);
        siguientesOpiniones.forEach(function (opinion) {
            // Crear cadena de estrellas
            let estrellas = '';
            for (let i = 0; i < opinion.estrellas; i++) {
                estrellas += '⭐️';
            }

            // Crear el HTML de la tarjeta
            const opinionHTML = `
    <article class="col-md-4">
        <div class="card reseña-card shadow-sm">
            <div class="card-body">
                <div class="stars text-warning mb-2">${estrellas}</div>
                <h5 class="card-title fw-bold">${opinion.titulo}</h5>
                <p class="card-text">${opinion.comentario}</p>
                <footer id="autor_resena" class="d-flex align-items-center mt-4">
                    <img src="${opinion.avatar}" alt="${opinion.nombre}" class="rounded-circle me-2" width="32" height="32">
                    <div class="text-start">
                        <strong class="d-block">${opinion.nombre}</strong>
                        <small class="text-muted">${opinion.fecha}</small>
                    </div>
                </footer>
            </div>
        </div>
    </article>
`;
            // Agregar la reseña oculta y luego mostrarla suavemente
            $(opinionHTML).hide().appendTo("#opiniones-container").fadeIn(500);
        });

        // Actualizar el índice
        currentIndex += opinionesPorCarga;

        // Si ya se han cargado todas las opiniones, ocultar el botón
        if (currentIndex >= opiniones.length) {
            $("#btn-load-opinions").hide();
        }
    }

    // Cargar el archivo JSON con las opiniones
    $.getJSON("/metal_gym/assets/data/opiniones.json", function (data) {
        opiniones = data;
        // Inicialmente se cargan las primeras 3 opiniones
        renderOpiniones();
    });

    // Al hacer click en el botón, cargar 3 opiniones más
    $("#btn-load-opinions").on("click", function () {
        renderOpiniones();
    });
});
