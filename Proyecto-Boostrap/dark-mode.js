document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const darkModeButton = document.getElementById("toggleDarkMode");

    // Detectar si el usuario prefiere el modo oscuro del sistema
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const savedMode = localStorage.getItem("darkMode");

    // Aplicar el modo oscuro si el usuario lo tiene activado en el sistema o lo guardó antes
    if (savedMode === "enabled" || (!savedMode && prefersDarkMode)) {
        body.classList.add("dark-mode");
    }

    // Alternar modo oscuro al hacer clic en el botón
    if (darkModeButton) {
        darkModeButton.addEventListener("click", function () {
            body.classList.toggle("dark-mode");

            // Guardar estado en LocalStorage
            if (body.classList.contains("dark-mode")) {
                localStorage.setItem("darkMode", "enabled");
            } else {
                localStorage.setItem("darkMode", "disabled");
            }
        });
    }
});