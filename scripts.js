const artMode = document.querySelector('.art-mode');

window.addEventListener("load", () => {
    let loader = document.querySelector(".loader");

    loader.classList.add("loader--hidden");

    loader.addEventListener("transitionend", () => {
        loader.remove();
    });

    document.querySelector(".no-js").classList.remove('no-js');

    checkSkillsHeight();
    
});

function createSwiper(container, pagination, nextButton, prevButton) {
    return new Swiper(container, {
        slidesPerView: handleWidth(),
        spaceBetween: 30,
        pagination: {
        el: pagination,
        clickable: true,
        },
        navigation: {
        nextEl: nextButton,
        prevEl: prevButton,
        },
    });
}



function handleWidth() {
    let getWidth = window.innerWidth || document.documentElement.clientWidth;
    let slideShow = 3;

    if (getWidth < 1001) {
        slideShow = 2;
    }

    if (getWidth < 700) {
        slideShow = 1;
    }

    return slideShow;
}

// Array para armazenar as instâncias dos Swipers
let swipers = [];

// Inicializa todos os Swipers
function initSwipers() {
    // Encontre todas as instâncias do Swiper na página
    document.querySelectorAll('.mySwiper').forEach((container, index) => {
        const pagination = container.querySelector('.swiper-pagination');
        const nextButton = container.querySelector('.swiper-button-next');
        const prevButton = container.querySelector('.swiper-button-prev');
        
        // Cria uma nova instância do Swiper e armazena no array
        swipers[index] = createSwiper(container, pagination, nextButton, prevButton);
    });
}

// Função para recriar os Swipers
function updateSwipers() {
    // Destroi todas as instâncias do Swiper
    swipers.forEach(swiper => {
        if (swiper && typeof swiper.destroy === "function") {
            swiper.destroy(true, true);
        }
    });
    
    // Limpa o array de Swipers
    swipers = [];
    
    // Inicializa novamente os Swipers
    initSwipers();
}

// Inicializa os Swipers na primeira carga da página
initSwipers();

// Adiciona um listener para o evento resize
window.addEventListener('resize', function() {
    updateSwipers();
});
// Executa a função uma vez ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    updateSwipers();
});

let header = document.getElementById('header')

window.addEventListener('scroll', () => {
    navbarColor();
})

function navbarColor() {
    if(window.scrollY >= 10){
        header.style.background = '#191919';
        header.style.boxShadow = '0px 5px 9px 0px #0c0c0c';
    }else {
        header.style.background = 'transparent';
        header.style.boxShadow = '0px 0px 0px 0px transparent';
    }
}

const btnMobile = document.querySelector('.burguer');

var cont = false;
function toggleMenu() {
    const nav = document.querySelector('.navbar-geral');
    if((header.style.background === 'transparent' || window.scrollY >= 10) && !cont) {
        header.style.background = '#191919'
        header.style.boxShadow = '0px 5px 9px 0px #0c0c0c';
        console.log('Fechou');
    }else{
        header.style.background = 'transparent'
        header.style.boxShadow = '0px 0px 0px 0px transparent';
    }
    nav.classList.toggle('active');
    cont = !cont;
}

btnMobile.addEventListener('click', toggleMenu);

const _name = document.querySelector('.name');

function nameAnim() {
     _name.style.color = 'var(--color-main)'
}
_name.addEventListener('animationend', nameAnim); 


function initialObserver() {
    // FAZER APARECER QUANDO SCROLLAR
    const sections = document.querySelectorAll('.section-hidden');
    
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    }

    // Cria o Intersection Observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-show');
                entry.target.classList.remove('section-hidden');              
                hidden = true;
                observer.unobserve(entry.target);
            }
        });
    }, options);

    const observerProjectsArts = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-show-project');
                entry.target.classList.remove('section-hidden');              
                hidden = true;
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    // Cria o Intersection Observer
    const observerProjects = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-show-project');
                entry.target.classList.remove('section-hidden');              
                hidden = true;
                observer.unobserve(entry.target);
            }
        });
    });
   
    let projects = document.querySelectorAll('.swiper');
    let projectsArts = document.querySelectorAll('.projects-grid > div');

    projects.forEach( (element) => {
        observerProjects.observe(element);
    });

    projectsArts.forEach( (element) => {
        observerProjectsArts.observe(element);
    });
    
    // Observa cada seção
    sections.forEach( (element) => {
        observer.observe(element);
    });
}

initialObserver();

const options = {
    root: null,
    rootMargin: '0px',
    threshold:[0.1, 0.2]
}

const fixedDiv = document.querySelector('.manual-navigation');
const targetSection = document.querySelector('.projects-wrapper');

// Cria um Intersection Observer
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if(Math.round(entry.intersectionRatio * 100) >= 10 && window.innerHeight <= 850) {
                fixedDiv.style.visibility = 'visible';
                fixedDiv.style.transform = 'translateY(0)';
                fixedDiv.style.opacity = '1';
            }else if(Math.round(entry.intersectionRatio * 100) >= 20) {
                fixedDiv.style.visibility = 'visible';
                fixedDiv.style.transform = 'translateY(0)';
                fixedDiv.style.opacity = '1'; 
            }

            console.log('observando artes');
        } else {
            fixedDiv.style.visibility = 'hidden';
            fixedDiv.style.transform = 'translateY(100%)';
            fixedDiv.style.opacity = '0';

            console.log('não observando artes');
        }
    });
}, options);

// Observa a seção alvo
observer.observe(targetSection);


const radio1 = document.getElementById('radio1');

// Marcar o radio1 como checked quando a página carregar
radio1.checked = true;
// Altura da DIV

document.addEventListener('DOMContentLoaded', function () {
    function isInView(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = (window.innerHeight || document.documentElement.clientHeight);      
        const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
        return (vertInView);
      }

        const radios = document.querySelectorAll('input[name="radio-btn"]');
        radios.forEach(radio => {
            radio.addEventListener('change', function () {
            const parentDiv = document.querySelector('#projects');
            const artTitle = document.querySelector('.art-title');
            if (radio.id === 'radio1') {
                parentDiv.style.maxHeight = (document.querySelector('.first .projects-grid').offsetHeight + 92 + 177 + 32) + 'px'; // Altere o estilo conforme necessário
    
                if(!isInView(document.querySelector('.first .projects-grid')))
                artTitle.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else if (radio.id === 'radio2') {
                parentDiv.style.maxHeight = (document.querySelector('.second .projects-grid').offsetHeight + 92 + 177 + 32) + 'px';// Altere o estilo conforme necessário
                
                if(!isInView(document.querySelector('.second .projects-grid')))
                artTitle.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else if (radio.id === 'radio3') {
                parentDiv.style.maxHeight = (document.querySelector('.third .projects-grid').offsetHeight + 92 + 177 + 32) + 'px'; // Altere o estilo conforme necessário
                if(!isInView(document.querySelector('.third .projects-grid')))
                artTitle.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            });
        });
    });