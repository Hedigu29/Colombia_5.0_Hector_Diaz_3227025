document.addEventListener("DOMContentLoaded", () => {

    const navLinks = document.querySelectorAll(".nav-link");
    const tabContents = document.querySelectorAll(".tab-content");

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            

            navLinks.forEach(l => l.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            link.classList.add("active");
            const targetTab = link.getAttribute("data-tab");
            document.getElementById(targetTab).classList.add("active");
        });
    });

    let currentLang = "es";
    const langToggleBtn = document.getElementById("lang-toggle");
    const translatableElements = document.querySelectorAll("[data-es]");
    const langBlocks = document.querySelectorAll(".lang-block");

    langToggleBtn.addEventListener("click", () => {
        currentLang = currentLang === "es" ? "en" : "es";
        langToggleBtn.querySelector(".lang-text").textContent = currentLang === "es" ? "EN" : "ES";

        translatableElements.forEach(el => {
            el.textContent = el.getAttribute(`data-${currentLang}`);
        });

        langBlocks.forEach(block => {
            if (block.getAttribute("data-lang") === currentLang) {
                block.classList.add("active-lang-block");
            } else {
                block.classList.remove("active-lang-block");
            }
        });

        renderGlossary(currentLang);
    });

    const glossaryData = [
        { en: "Emerging Technologies", es: "Tecnologías emergentes", defEs: "Innovaciones tecnológicas disruptivas en proceso de desarrollo e integración industrial.", defEn: "Disruptive technological innovations currently in development and industrial integration." },
        { en: "Artificial Intelligence (AI)", es: "Inteligencia Artificial (IA)", defEs: "Simulación de procesos cognitivos humanos por parte de sistemas computacionales autónomos.", defEn: "Simulation of human cognitive processes by autonomous computer systems." },
        { en: "Scalability", es: "Escalabilidad", defEs: "Capacidad de un sistema de software para adaptarse dinámicamente al aumento de la carga de trabajo.", defEn: "The ability of a software system to dynamically adapt to an increasing workload." },
        { en: "Process Automation", es: "Automatización de procesos", defEs: "Uso de tecnología y algoritmos para ejecutar tareas repetitivas sin intervención humana directa.", defEn: "The use of technology and algorithms to execute repetitive tasks without direct human intervention." },
        { en: "Added Value", es: "Valor agregado", defEs: "Característica extra o mejora de un producto que eleva significativamente su valor comercial.", defEn: "An extra feature or enhancement of a product that significantly raises its market value." },
        { en: "Libraries", es: "Librerías", defEs: "Colecciones de archivos de código preescrito que los programadores reutilizan para optimizar desarrollos.", defEn: "Collections of pre-written code files that developers reuse to optimize development." },
        { en: "UI Design", es: "Diseño de interfaces", defEs: "Creación y maquetación de la arquitectura visual e interactiva de una aplicación de software.", defEn: "Creation and layout of the visual and interactive architecture of a software application." },
        { en: "Player Modeling", es: "Modelado de jugadores", defEs: "Representación analítica y algorítmica del comportamiento y patrones de usuarios en videojuegos.", defEn: "Analytical and algorithmic representation of user behavior and patterns within video games." },
        { en: "Patches", es: "Parches", defEs: "Actualizaciones de software modulares diseñadas para corregir errores o implementar mejoras puntuales.", defEn: "Modular software updates designed to correct bugs or implement specific enhancements." },
        { en: "AI Agent", es: "Agente de IA", defEs: "Entidad lógica capaz de percibir su entorno y ejecutar acciones autónomas para cumplir objetivos.", defEn: "A logical entity capable of perceiving its environment and executing autonomous actions to fulfill goals." },
        { en: "Repository", es: "Repositorio", defEs: "Espacio de almacenamiento digital centralizado administrado por sistemas de control de versiones.", defEn: "Centralized digital storage space managed by version control systems." },
        { en: "Workspaces", es: "Espacios de trabajo", defEs: "Agrupación lógica de archivos, herramientas y configuraciones dentro de un entorno de desarrollo.", defEn: "Logical grouping of files, tools, and configurations within a development environment." },
        { en: "Long-Term Memory", es: "Memoria de largo término", defEs: "Capacidad de persistencia de datos en sistemas de IA para almacenar patrones a lo largo del tiempo.", defEn: "Data persistence capability in AI systems to store patterns over extended periods." },
        { en: "Short-Term Memory", es: "Memoria de corto término", defEs: "Almacenamiento volátil y de acceso rápido utilizado para procesar datos en la sesión activa.", defEn: "Volatile, fast-access storage used to process data within the active session." },
        { en: "Development Environment", es: "Entorno de desarrollo", defEs: "Conjunto integrado de herramientas de software (IDE, compiladores) donde se escribe código.", defEn: "Integrated suite of software tools (IDE, compilers) where code is explicitly written." },
        { en: "Corrupted Layers", es: "Capas dañadas", defEs: "Secciones de código o recursos gráficos que han perdido su integridad estructural o binaria.", defEn: "Sections of code or graphical assets that have lost their structural or binary integrity." },
        { en: "Unit Testing", es: "Pruebas de unidad", defEs: "Método de desarrollo donde se prueban de forma aislada componentes individuales de código.", defEn: "Development method where individual software components are tested in isolation." },
        { en: "Robust Documentation", es: "Documentación robusta", defEs: "Manuales técnicos exhaustivos y detallados que describen la arquitectura interna de un sistema.", defEn: "Exhaustive and detailed technical manuals describing the internal architecture of a system." },
        { en: "Specifications (Specs)", es: "Especificaciones", defEs: "Documento de requisitos precisos y limitaciones técnicas que debe cumplir un software.", defEn: "Document of precise requirements and technical constraints that a software must meet." },
        { en: "Variables", es: "Variables", defEs: "Estructuras de almacenamiento simbólico para valores de datos sujetos a modificaciones durante la ejecución.", defEn: "Symbolic storage structures for data values subject to changes during execution." },
        { en: "Backend", es: "Backend", defEs: "Capa de acceso a datos y lógica de servidor oculta al usuario final de una aplicación.", defEn: "The data access and server-side logic layer hidden from the end user of an application." },
        { en: "Quality Assurance (QA)", es: "Aseguramiento de calidad", defEs: "Proceso sistemático de evaluación orientada a comprobar que el software cumple los estándares fijados.", defEn: "Systematic evaluation process oriented to verify that software meets fixed quality standards." },
        { en: "Deployment", es: "Despliegue", defEs: "Fase del ciclo de vida donde la aplicación se transfiere de desarrollo a producción para su uso público.", defEn: "Lifecycle phase where the application is transferred from development to production for public use." },
        { en: "Typography", es: "Tipografía", defEs: "Estudio, elección y diseño del estilo, tamaño y disposición de las fuentes de texto en la pantalla.", defEn: "The study, choice, and design of style, size, and layout of text fonts on screen." },
        { en: "Spacing", es: "Espaciado", defEs: "Control intencional de los márgenes y áreas vacías entre los componentes visuales de una interfaz.", defEn: "Intentional control of margins and empty areas between the visual components of an interface." },
        { en: "Hierarchy", es: "Jerarquía", defEs: "Organización visual de la información para guiar el ojo del usuario según el nivel de importancia.", defEn: "Visual organization of information to guide the user's eye based on importance levels." },
        { en: "Containers", es: "Contenedores", defEs: "Elementos de maquetación estructural que encapsulan y delimitan bloques de contenido.", defEn: "Structural layout elements that encapsulate and delimit content blocks." },
        { en: "Components", es: "Componentes", defEs: "Bloques modulares de diseño y código reutilizables a lo largo de un sistema de diseño.", defEn: "Modular design and code blocks reusable throughout a design system." },
        { en: "Iconography", es: "Iconografía", defEs: "Conjunto de símbolos gráficos unificados que facilitan la navegación intuitiva del usuario.", defEn: "Unified set of graphical symbols that facilitate intuitive user navigation." },
        { en: "Vector Elements", es: "Elementos vectoriales", defEs: "Gráficos geométricos basados en fórmulas capaces de escalarse infinitamente sin pixelarse.", defEn: "Geometric, formula-based graphics capable of infinite scaling without pixelation." }
    ];

    const glossaryBody = document.getElementById("glossary-body");

    function renderGlossary(lang) {
        if(!glossaryBody) return;
        glossaryBody.innerHTML = "";
        glossaryData.forEach(item => {
            const row = document.createElement("tr");
            
            const termCell = document.createElement("td");
            termCell.className = "term-highlight";
            termCell.textContent = item.en;

            const transCell = document.createElement("td");
            transCell.textContent = item.es;

            const defCell = document.createElement("td");
            defCell.textContent = lang === "es" ? item.defEs : item.defEn;

            row.appendChild(termCell);
            row.appendChild(transCell);
            row.appendChild(defCell);
            glossaryBody.appendChild(row);
        });
    }

    renderGlossary(currentLang);
});