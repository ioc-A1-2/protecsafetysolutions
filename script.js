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
    // FUNCIONALITAT DE CANVI D'IDIOMA (Placeholder amb data-attributes)
    // ####################################################################
    const langSwitcher = document.getElementById('lang-switcher');
    
    // Funció per actualitzar la visibilitat del contingut
    function updateLanguage(newLang) {
        // Ocultar tots els elements amb data-lang
        document.querySelectorAll('[data-lang]').forEach(el => {
            el.style.display = 'none';
        });

        // Mostrar elements amb l'idioma seleccionat (newLang)
        document.querySelectorAll(`[data-lang="${newLang}"]`).forEach(el => {
            // Utilitzem 'hidden' per als títols que no s'han de veure, però per als altres elements
            // l'estil per defecte de l'etiqueta (block, inline, etc.) és més adequat.
            if (el.hasAttribute('hidden')) {
                el.removeAttribute('hidden');
            }
            // En cas que l'estil CSS l'hagi forçat a 'display: none', el restablim
            el.style.display = '';
        });
        
        // Assegurar que el títol de la pàgina s'actualitza
        const titleElements = document.querySelectorAll('title');
        titleElements.forEach(titleEl => {
            if (titleEl.getAttribute('data-lang') === newLang) {
                document.title = titleEl.textContent;
                titleEl.removeAttribute('hidden');
            } else {
                titleEl.setAttribute('hidden', '');
            }
        });

        // Actualitzar l'atribut lang de l'etiqueta <html>
        document.documentElement.lang = newLang;
    }

    // Carregar l'idioma per defecte (Català) en la primera càrrega
    updateLanguage('ca');

    // Listener per al canvi de selector
    langSwitcher.addEventListener('change', (event) => {
        const selectedLang = event.target.value;
        updateLanguage(selectedLang);
    });
});