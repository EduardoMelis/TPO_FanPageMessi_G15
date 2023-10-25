// clave que me da la pagina de clima
const API_KEY = "38f1784625352c2cdde68f4edcbfd7f1";

//PASO 2
//con feth envio una peticion con la latitud y longitud que se obtuvieron en el paso uno que ahora estan en "position" mas la API_KEY que es la llave de acceso
//con el .coords accedo a la latitude y longitude que me envia la API
//entonces lo paso a json y llamo a la funciondelclima() con los datos del json en "data"
const fetchData = position => {
    const { latitude, longitude } = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}&lang={sp}`)
        .then(respuesta => respuesta.json())
        .then(data => funciondelclima(data))

}

// PASO 3
// aqui se extraen los datos del data para llevarlos al html
const funciondelclima = data => {
    console.log(data);
    const infoclima = {
        location: data.name,
        descrip: data.weather[0].main,
        humedad: data.main.humidity + "%",
        temp: data.main.temp + " C°",
        date: getDate(),

    }
    //PASO 3.1
    //se itera cada clave de infoclima para llevar los elementos al html
    Object.keys(infoclima).forEach(key => {
        document.getElementById(key).textContent = infoclima[key];
    });
}
// PASO 4 
// se crea la funcion getDate para poder volcar la fecha em infoclima
const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
}



//PASO 1
// funcion para obtener la geoposicion de navegador 
// onLoad se carga desde el body de trayectoria.html
// se pasa como parametro la posicion a fetchData()
const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
}