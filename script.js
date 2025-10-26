document.addEventListener('DOMContentLoaded', () => {
    
    // ####################################################################
    // FUNCIONALITAT DE NAVEGACIÓ MÒBIL
    // ####################################################################
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    // Funció per tancar o obrir el menú
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });

    // Tancar el menú després de seleccionar un enllaç
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
            }
        });
    });

    // ####################################################################
    // MILLORA 2: NAVEGACIÓ AMB DESPLAÇAMENT SUAU (SMOOTH SCROLLING)
    // ####################################################################
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // ####################################################################
    // MILLORA 3: MENÚ DE NAVEGACIÓ DINÀMIC (ACTIVE LINK)
    // ####################################################################
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav a');

    function changeNav() {
        let index = sections.length;

        while(--index && window.scrollY + 50 < sections[index].offsetTop) {}
        
        navLinks.forEach((link) => link.classList.remove('active'));
        // S'afegeix una comprovació per evitar errors si no es troba el link
        const activeLink = document.querySelector(`.main-nav a[href="#${sections[index].id}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // Executar la funció en carregar i en desplaçar-se
    changeNav();
    window.addEventListener('scroll', changeNav);

    // ####################################################################
    // MILLORA 4: GUARDAR IDIOMA SELECCIONAT (localStorage)
    // ####################################################################
    const langSwitcher = document.getElementById('lang-switcher');
    
    function updateLanguage(newLang) {
        document.querySelectorAll('[data-lang]').forEach(el => {
            if (el.getAttribute('data-lang') === newLang) {
                el.removeAttribute('hidden');
                // Restablir display per si estava a 'none'
                if (el.style.display === 'none') {
                    el.style.display = '';
                }
            } else {
                el.setAttribute('hidden', 'true');
            }
        });

        const titleEl = document.querySelector(`title[data-lang="${newLang}"]`);
        if (titleEl) {
            document.title = titleEl.textContent;
        }
        
        document.documentElement.lang = newLang;
        // Guardar la selecció de l'usuari
        localStorage.setItem('preferredLanguage', newLang);
        // Actualitzar el valor del selector
        langSwitcher.value = newLang;
    }

    // Obtenir l'idioma guardat o utilitzar 'ca' per defecte
    const savedLang = localStorage.getItem('preferredLanguage') || 'ca';
    updateLanguage(savedLang);

    langSwitcher.addEventListener('change', (event) => {
        updateLanguage(event.target.value);
    });

    // ####################################################################
    // MILLORA 1: FORMULARI DE CONTACTE INTERACTIU (AJAX)
    // ####################################################################
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevenir la recàrrega de la pàgina

        // Simular l'enviament de dades (aquí aniria una crida a un servidor real)
        const formData = new FormData(this);
        console.log('Dades del formulari enviades:');
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        // Mostrar un missatge de confirmació
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        
        submitButton.innerHTML = '<span data-lang="ca">Enviant...</span><span data-lang="es" hidden>Enviando...</span><span data-lang="en" hidden>Sending...</span>';
        submitButton.disabled = true;

        setTimeout(() => {
            // Netejar el formulari
            this.reset(); 
            
            // Restaurar el botó i mostrar missatge final
            submitButton.innerHTML = '<span data-lang="ca">Enviament Correcte! ✅</span><span data-lang="es" hidden>¡Enviado Correctamente! ✅</span><span data-lang="en" hidden>Sent Successfully! ✅</span>';

            // Després d'uns segons, restaurar el text original del botó
            setTimeout(() => {
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
                // S'ha d'actualitzar l'idioma per si ha canviat
                updateLanguage(localStorage.getItem('preferredLanguage') || 'ca');
            }, 3000);

        }, 1500); // Simular un retard de xarxa
    });
});
