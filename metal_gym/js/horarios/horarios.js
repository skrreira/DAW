document.addEventListener('DOMContentLoaded', () => {
    // URL del archivo XML
    const xmlURL = '/metal_gym/assets/data/horarios.xml';

    // Usar fetch para obtener el XML
    fetch(xmlURL)
        .then(response => response.text())
        .then(xmlString => {
            // Parsear el XML
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, "application/xml");

            // Seleccionar todas las filas (<fila>) del XML
            const filas = xmlDoc.querySelectorAll('fila');

            // Seleccionar el <tbody> de la tabla de horarios
            const tableBody = document.querySelector('.tabla-horarios table tbody');

            // Limpiar el contenido existente (opcional)
            tableBody.innerHTML = '';

            // Recorrer cada fila y crear la fila de la tabla
            filas.forEach(fila => {
                const hora = fila.querySelector('hora').textContent;
                const lunes = fila.querySelector('lunes').textContent;
                const martes = fila.querySelector('martes').textContent;
                const miercoles = fila.querySelector('miercoles').textContent;
                const jueves = fila.querySelector('jueves').textContent;
                const viernes = fila.querySelector('viernes').textContent;
                const sabado = fila.querySelector('sabado').textContent;

                // Crear un elemento <tr>
                const tr = document.createElement('tr');

                // Función para crear una celda (td) con contenido y enlace si hay actividad
                const crearCelda = (contenido) => {
                    const td = document.createElement('td');
                    if (contenido.trim()) {
                        // Convertir el nombre de la actividad a minúsculas para la URL
                        const urlActividad = `/metal_gym/pages/actividades/${contenido.toLowerCase()}.html`;
                        td.innerHTML = `<a href="${urlActividad}">${contenido}</a>`;
                        // Agregar atributo data-actividad
                        td.setAttribute('data-actividad', contenido);
                    } else {
                        td.textContent = '';
                    }
                    return td;
                };

                // Primera celda: hora
                const tdHora = document.createElement('td');
                tdHora.textContent = hora;
                tr.appendChild(tdHora);

                // Resto de celdas para lunes a sábado
                tr.appendChild(crearCelda(lunes));
                tr.appendChild(crearCelda(martes));
                tr.appendChild(crearCelda(miercoles));
                tr.appendChild(crearCelda(jueves));
                tr.appendChild(crearCelda(viernes));
                tr.appendChild(crearCelda(sabado));

                // Agregar la fila al cuerpo de la tabla
                tableBody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Error cargando el XML de horarios:', error);
        });
});
