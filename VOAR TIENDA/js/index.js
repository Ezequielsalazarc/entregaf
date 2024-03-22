
document.addEventListener('DOMContentLoaded', function() {
    const contenedorJuegos = document.getElementById('contenedorJuegos');
    const listaCarrito = document.getElementById('listaCarrito');
    const totalCarritoElemento = document.getElementById('totalCarrito');
    let totalCarrito = parseFloat(totalCarritoElemento.textContent);

    function agregarAlCarrito(juego) {
        const elementoLista = document.createElement('li');
        elementoLista.textContent = juego.title;
        listaCarrito.appendChild(elementoLista);

        if (juego.precio) {
            totalCarrito += parseFloat(juego.precio);
            totalCarritoElemento.textContent = totalCarrito.toFixed(2);
        }
    }

    async function renderizarJuegos() {
        try {
            const url = 'https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=3d.mmorpg.fantasy.pvp&platform=pc';
            const opciones = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '44be1a9a09msh911140abb95b0a0p107ab0jsnf3e26d7550b6',
                    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
                }
            };

            const respuesta = await fetch(url, opciones);
            const datos = await respuesta.json();
            const primerosSeisJuegos = datos.slice(0, 6);

            
            primerosSeisJuegos.forEach(juego => {

                            
                            const tarjeta = document.createElement('div');
                            tarjeta.className = 'tarjeta';

                            const titulo = document.createElement('h2');
                            titulo.textContent = juego.title;

                            const imagen = document.createElement('img');
                            imagen.src = juego.thumbnail;

                            const descripcion = document.createElement('p');
                            descripcion.textContent = juego.short_description;

                            const precio = document.createElement('p');
                            precio.textContent = `Precio: $${juego.precio || 'Gratis'}`;

                            const botonComprar = document.createElement('button');
                            botonComprar.textContent = 'Comprar';
                            botonComprar.addEventListener('click', () => agregarAlCarrito(juego));

                            tarjeta.appendChild(titulo);
                            tarjeta.appendChild(imagen);
                            tarjeta.appendChild(descripcion);
                            tarjeta.appendChild(precio);
                            tarjeta.appendChild(botonComprar);

                            contenedorJuegos.appendChild(tarjeta);
            });


        } catch (error) {
            console.error(error);
        }
    }

    renderizarJuegos();
});

document.getElementById('ingresarform').addEventListener('submit', function(event) {
    event.preventDefault();

   
    const username = document.getElementById('usuarionombre').value;
    const password = document.getElementById('contraseñausuario').value;

    // condicional para ingresar
    if (username === 'usuario' && password === 'contraseña') {
        alert('Inicio de sesión exitoso');
    } else {
        alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    }
});