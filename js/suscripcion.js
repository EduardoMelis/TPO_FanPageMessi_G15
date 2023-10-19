const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirmation = document.getElementById("password-confirmation");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();
});

function checkInputs() {
  const usernameValue = username.value;
  const emailValue = email.value;
  const passwordValue = password.value;
  const passwordConfirmationValue = passwordConfirmation.value;

  if (usernameValue === "") {
    setErrorFor(username, "Complete el campo del nombre.");
  } else {
    setSuccessFor(username);
  }

  if (emailValue === "") {
    setErrorFor(email, "Completel campo del email");
  } else if (!checkEmail(emailValue)) {
    setErrorFor(email, "Email invalido");
  } else {
    setSuccessFor(email);
  }

  if (passwordValue === "") {
    setErrorFor(password, "Ingrese el campo para su contraseña");
  } else if (passwordValue.length < 7) {
    setErrorFor(password, "Debe contener al menos 7 caracteres");
  } else {
    setSuccessFor(password);
  }

  if (passwordConfirmationValue === "") {
    setErrorFor(passwordConfirmation, "Valide su contraseña");
  } else if (passwordConfirmationValue !== passwordValue) {
    setErrorFor(passwordConfirmation, "Las contraseñas NO son iguales");
  } else {
    setSuccessFor(passwordConfirmation);
  }

  const formControls = form.querySelectorAll(".form-control");

  const formIsValid = [...formControls].every((formControl) => {
    return formControl.className === "form-control success";
  });

  if (formIsValid) {
    console.log("Formulario completo!");
  }
}
  // asigna mensaje de errro
function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  small.innerText = message;

  formControl.className = "form-control error";
}
  //asigna datos correctos  
function setSuccessFor(input) {
  const formControl = input.parentElement;
  
  formControl.className = "form-control success";
}
//funcion para validar la foma del email
function checkEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}


//-----------------------borrar?-----------------------------------------------------------------------------

//Animacion de cuadrados
const ulSquares = document.querySelector("ul.squares")


for (let i = 0; i < 15; i++) { 
  const li = document.createElement("li")

  const random = (min, max) => Math.random() * (max - min) + min 
  const size = Math.floor(random(10, 120))
  const position = random(1, 99)
  const delay = random(5, 0.1)
  const duration = random(24, 12)

  li.style.width = `${size}px`
  li.style.height = `${size}px`

  li.style.bottom = `-${size}px`

  li.style.left = `${position}%`//alterando sus posicion

  li.style.animationDelay = `${delay}s`//definiendo un delay 
  li.style.animationDuration = `${duration}s`//definiendo duracion 
  li.style.animationTimingFunction = `cubic-bezier(${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()})`
  
  ulSquares.appendChild(li)
}
