document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
})

function iniciarApp(){
    navegacionFija();
    crearGaleria();
    scrollNav();
}
function navegacionFija(){
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function(){
        if(sobreFestival.getBoundingClientRect().bottom <0 ){
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        } else{
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    });
}
function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e){
            e.preventDefault();
            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({behavior: "smooth"});
        });

    });
}

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');

   for(let i =1; i<= 12; i++){
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
    <source srcset="build/img/thumb/${i}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria">
    `;
    imagen.onclick = function(){
        mostrarImagen(i);
    }
    galeria.appendChild(imagen);
   }
}

function mostrarImagen (i){
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
    <source srcset="build/img/grande/${i}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/grande/${i}.jpg" alt="imagen galeria">
    `;

    //Crea el overlay con la imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }

    //Boton para cerrar el modal
    const cerarModal = document.createElement('P');
    cerarModal.textContent = 'X';
    cerarModal.classList.add('btn-cerrar');
    cerarModal.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    overlay.appendChild(cerarModal);


    //lo añade al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');

}