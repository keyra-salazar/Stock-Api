document.getElementById('formLibro').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Capturamos los datos de los inputs
    const libro = {
        _id: document.getElementById('id').value,
        titulo: document.getElementById('titulo').value,
        autor: document.getElementById('autor').value,
        isbn: document.getElementById('isbn').value,
        publicacion: document.getElementById('publicacion').value,
        precio: document.getElementById('precio').value
    };

    try {
        // Petición al controlador de Node.js
        const response = await fetch('/Libros', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(libro)
        });

        if (response.ok) {
            alert('¡Conexión Exitosa! El libro se guardó en MongoDB.');
            e.target.reset(); // Limpia el formulario
        } else {
            const error = await response.json();
            alert('Error: ' + error.message);
        }
    } catch (err) {
        console.error('Error de conexión:', err);
        alert('No se pudo conectar con el servidor.');
    }
});