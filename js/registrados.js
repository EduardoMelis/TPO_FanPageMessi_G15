const { createApp } = Vue
createApp({
    data() {
        return {
            registrado: [],
            url: "https://messi2040.pythonanywhere.com/",
            error: false,
            cargando: true,

            nombre: "",
            mail: "",
            clave: "",
        }

    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.registrado = data;
                    this.cargando = false
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        eliminar(id) {
            console.log(id)
            const url = this.url + "borrar/" + id;
            console.log(url);
            var options = {
                method: "DELETE",
            }
            if (confirm('¿Estás seguro de que quieres eliminar este registro?')) {
                fetch(url, options)
                    //.then(res => res.json())//ver si no me conviene res.json()
                    .then(res => {
                        if (res.ok) {
                            alert("Eliminado correctamente")
                            //location.reload();
                            return res.json();
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
            console.log(registrado)
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
        consultar(id) {
            console.log(id)
            const url = this.url + "registrado/" + id;
            console.log(url);
            var options = {
                method: "GET",
            }
            if (confirm('¿Estás seguro de que quieres consultar este registro?')) {
                fetch(url, options)
                    //.then(res => res.json())//ver si no me conviene res.json()
                    .then(res => {
                        if (res.ok) {
                            alert(" correctamente")
                            //location.reload();
                            return res.json();
                        }

                    })
                    .catch(error => {
                        alert(error.message);
                    });
            }
        }
        // created() { //metodo de vue que se lanza cada vez que ingresamos al suscripcion .html
        //     this.fetchData(this.url)
    }   // },
}).mount("#app")