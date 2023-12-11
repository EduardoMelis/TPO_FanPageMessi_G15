// const abrirventanalogin = document.getElementById("boton-login");
// const abrirventanaloginModal = document.getElementById("boton-login-modal");
// const cerrarventana = document.getElementById("boton-cerrar");

// abrirventanalogin.addEventListener("click", () => {
//     abrirventanaloginModal.click();
// este evento esta esperando que se le de click a cerrar el modal para recargar la pagina
// })

const botonAceptar = document.getElementById('button-accept');

botonAceptar.addEventListener('click',() => {
    var username = document.getElementById('floatingInput').value;
    var password = document.getElementById('floatingPassword').value;

    // Verifica los credenciales
    if (username === 'admin' && password === 'admin') {
        alert('Bienvenido, Administrador!');
      // Redirecciona a la página de administrador
        window.location.href = '../templates/admin.html';
    } else if (username === 'user' && password === 'user') {
        alert('Bienvenido, Usuario!');
      // Redirecciona a la página de usuario (Ver si podemos lograr que sea personalizado)
        window.location.href = 'templates/usuario.html';
    } else {
        alert('Datos incorrectos. Por favor, inténtalo nuevamente.');
    }
})