const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".btn");

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const valor = boton.innerHTML;

        if (valor === "C") {
            pantalla.innerHTML = "0";
        } else if (valor === "=") {
            try {
                pantalla.innerHTML = eval(pantalla.innerHTML);
            } catch (error) {
                pantalla.innerHTML = "Error";
            }
        } else {
            if (pantalla.innerHTML === "0") {
                pantalla.innerHTML = valor;
            } else {
                pantalla.innerHTML += valor;
            }
        }
    });
});