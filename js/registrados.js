const { createApp } = Vue
createApp({
    data() {
        return {

            url: "http://127.0.0.1:5000/",
            error: false,
            cargando: true,

            nombre: "",
            mail: "",
            clave: "",
        }

    },
    methods: {

        eliminar(mail) {
            console.log(mail)
            const url = this.url + "borrar/" + mail;
            console.log(url);
            var options = {
                method: "DELETE",
            }
            if (confirm("¿Estás seguro de que quieres eliminar:  " + this.mail + " ?")) {
                fetch(url, options)

                    .then(res => {
                        if (res.ok) {
                            alert("Eliminado correctamente: " + this.nombre + "\n" + this.mail)
                            location.reload();
                            return res.json()
                        }

                    })
                    .catch(error => {
                        alert(error.message);
                    });
            }
        },
        grabar() {
            const url = this.url + "registro";
            let registrado = {
                mail: this.mail,
                nombre: this.nombre,
                clave: this.clave
            }
            var options = {
                body: JSON.stringify(registrado),
                method: "POST",
                headers: { "Content-Type": "application/json" },
                redirect: "follow"
            }
            fetch(url, options)
                .then(function () {
                    alert("registro grabado")
                    window.location.href = "./suscripcion.html"
                })
                .catch(error => {
                    alert(error.message);
                });


        },
        consultar(mail) {

            const url = this.url + "registrado/" + mail;
            console.log(url);
            var options = {
                method: "GET",
            }
            if (confirm("¿Estás seguro de que quieres consultar:  " + this.mail + " ?")) {
                fetch(url, options)
                    //.then(response => response.json())
                    .then(response => {
                        if (response.ok) {
                            return response.json()
                        } else {
                            //Si la respuesta es un error, lanzamos una excepción para ser "catcheada" más adelante en el catch.
                            throw new Error('Error al obtener los datos del producto.')
                        }
                    })
                    .then(data => {
                        this.nombre = data[0].nombre;
                        this.clave = data[0].clave;
                        console.log(data[0]);
                        console.log(this.nombre)
                    })


                    .catch(error => {
                        console.log(error);
                        alert(this.mail + ' No registrado.');
                    });
            }
        },
        modificar(mail) {
            const url = this.url + "update/" + mail;
            let actualizar = {
                mail: this.mail,
                nombre: this.nombre,
                clave: this.clave
            }
            var options = {
                body: JSON.stringify(actualizar),
                method: "PUT",
                headers: { "Content-Type": "application/json" },

            }
            fetch(url, options)
                .then(res => {
                    if (res.ok) {
                        alert("Se actualizo correctamente: " + this.nombre + "\n" + this.mail)
                        location.reload();
                    }
                })
                .catch(error => {
                    alert(error.message);
                });
        }
        // created() { //metodo de vue que se lanza cada vez que ingresamos al suscripcion .html
        //     this.fetchData(this.url)
    }   // },
}).mount("#app")