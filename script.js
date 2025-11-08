document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize EmailJS
    (function(){
        emailjs.init({ publicKey: "9wwuOm1IyCs5oWu1d" });
    })();

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
    // MILLORA 1: FORMULARI DE CONTACTE AMB EMAILJS
    // ####################################################################
    const contactForm = document.getElementById('contact-form');
    const feedbackBox = document.getElementById('form-feedback');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevenir la recàrrega de la pàgina

        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        
        // Actualitzar text del botó a "Enviant..."
        submitButton.innerHTML = '<span data-lang="ca">Enviant...</span><span data-lang="es" hidden>Enviando...</span><span data-lang="en" hidden>Sending...</span>';
        updateLanguage(localStorage.getItem('preferredLanguage') || 'ca');
        submitButton.disabled = true;
        feedbackBox.style.display = 'none'; // Amagar missatges previs

        const serviceID = 'service_3t8v7ve';
        const templateID = 'template_fbuw15o';

        const templateParams = {
            name: this.name.value,
            NOM_EMPRESA: this.name.value,
            EMAIL_CONTACTE: this.email.value,
            message: this.message.value
        };

        // Enviar el contingut del formulari per email
        emailjs.send(serviceID, templateID, templateParams)
            .then(() => {
                // En cas d'èxit
                this.reset(); // Netejar el formulari
                
                // Preparar i mostrar missatge d'èxit
                feedbackBox.innerHTML = `
                    <span data-lang="ca">Missatge enviat correctament. Ens posarem en contacte amb tu en menys de 24 hores.</span>
                    <span data-lang="es" hidden>Mensaje enviado correctamente. Nos pondremos en contacto contigo en menos de 24 horas.</span>
                    <span data-lang="en" hidden>Message sent successfully. We will contact you within 24 hours.</span>
                `;
                feedbackBox.style.backgroundColor = '#d4edda';
                feedbackBox.style.color = '#155724';
                feedbackBox.style.display = 'block';
                updateLanguage(localStorage.getItem('preferredLanguage') || 'ca');

                // Canviar el text del botó a un estat d'èxit
                submitButton.innerHTML = '<span data-lang="ca">Enviament Correcte! ✅</span><span data-lang="es" hidden>¡Enviado Correctamente! ✅</span><span data-lang="en" hidden>Sent Successfully! ✅</span>';
                updateLanguage(localStorage.getItem('preferredLanguage') || 'ca');

                // Després d'uns segons, restaurar el botó i amagar el missatge
                setTimeout(() => {
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                    feedbackBox.style.display = 'none';
                    updateLanguage(localStorage.getItem('preferredLanguage') || 'ca');
                }, 4000);

            }, (err) => {
                // En cas d'error
                feedbackBox.innerHTML = `
                    <span data-lang="ca">Hi ha hagut un error en enviar el missatge. Si us plau, torna a intentar-ho.</span>
                    <span data-lang="es" hidden>Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.</span>
                    <span data-lang="en" hidden>There was an error sending the message. Please try again.</span>
                `;
                feedbackBox.style.backgroundColor = '#f8d7da';
                feedbackBox.style.color = '#721c24';
                feedbackBox.style.display = 'block';
                updateLanguage(localStorage.getItem('preferredLanguage') || 'ca');

                // Canviar el text del botó a un estat d'error
                submitButton.innerHTML = '<span data-lang="ca">Error en l\'enviament ❌</span><span data-lang="es" hidden>Error en el envío ❌</span><span data-lang="en" hidden>Sending Error ❌</span>';
                updateLanguage(localStorage.getItem('preferredLanguage') || 'ca');

                // Després d'uns segons, restaurar el botó i amagar el missatge
                setTimeout(() => {
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                    feedbackBox.style.display = 'none';
                    updateLanguage(localStorage.getItem('preferredLanguage') || 'ca');
                }, 5000);
            });
    });
});