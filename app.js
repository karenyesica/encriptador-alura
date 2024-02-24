const encoderText = document.getElementById("encoderText");
const encodeBtn = document.getElementById("encodeBtn");
const decodeBtn = document.getElementById("decodeBtn");
const decodedText = document.getElementById("decodedText");
const copyBtn = document.getElementById("copyBtn");
const decoderInicial = document.getElementById("decoderInicial");
const decoderAnswer = document.getElementById("decoderAnswer");

//Función para mostrar textarea que corresponda (con imagen o con texto desencriptado)
const showTextarea = () => {
  if (encoderText.value === "") {
    decoderInicial.style.display = "flex";
    decoderAnswer.style.display = "none";
  } else {
    decoderInicial.style.display = "none";
    decoderAnswer.style.display = "flex";
  }
};

//Función para limpiar textarea
const cleanTextarea = () => {
  encoderText.value = "";
};

//Matriz de encriptado
const encoderMatrix = [
  ["e", "enter"],
  ["i", "imes"],
  ["a", "ai"],
  ["o", "ober"],
  ["u", "ufat"],
];

//Función para encriptar
function encode(text) {
  //recorremos la matriz con for, declaramos la variable i y la inicializamos en 0, le decimos que mientras i sea menor a la longitud de la matriz al 0 inicial le sumamos 1.
  for (let i = 0; i < encoderMatrix.length; i++) {
    //Evaluamos si el texto a encriptar contiene alguna de las letras de la matriz en posisción[i][0] (e, i a, o, u)
    if (text.includes(encoderMatrix[i][0])) {
      //si las contiene pedimos que la reemplace por lo que hay en [i][1]
      text = text.replaceAll(encoderMatrix[i][0], encoderMatrix[i][1]);
    }
  }
  return text;
}

//Capturar evento click del botón encriptar y hacer el encriptado
encodeBtn.addEventListener("click", () => {
  //mostramos la imagen e instrucciones inicales
  showTextarea();
  //validamos que el texto sea en minúscula y no contenga números ni caracteres especiales, permitimos espacios con \s
  let validRegex = /[^a-z\s]/;
  if (validRegex.test(encoderText.value)) {
    //alert("Estas escribiendo mal el texto");
    //personalizamos el alert con la biblioteca SweetAlert2
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El texto ingresado solo puede contener letras minúsculas y sin acentos ",
      buttonsStyling: false,
      width: 450,
    });
    //limpiamos el textarea luego del error y mostramos la imagen e instrucciones iniciales
    cleanTextarea();
    showTextarea();
    //ya validado el texto se realiza la encriptación con la función encode() y mostramos la respuesta en el textarea correspondiente
  } else if (encoderText.value != "") {
    let finalText = encode(encoderText.value);
    decodedText.value = finalText;
    //console.log(finalText);
    //limpiamos el textarea donde ingresamos el texto
    cleanTextarea();
  }
});

//Función desencriptar usando el método .replace() con el flag /g para buscar un patrón más de una vez y no detenerse en la primera coincidencia
function decode() {
  let inicialText = encoderText.value;
  let finalText = decodedText.value;

  finalText = inicialText
    .replace(/ai/g, "a")
    .replace(/enter/g, "e")
    .replace(/imes/g, "i")
    .replace(/ober/g, "o")
    .replace(/ufat/g, "u");
  //console.log(`Valor desencriptado: ${finalText}`);
  return finalText;
}

//Capturar evento click del botón desencriptar y hacer el desencriptado
decodeBtn.addEventListener("click", () => {
  //mostramos la imagen e instrucciones inicales
  showTextarea();
  //validamos que el texto sea en minúscula y no contenga números ni caracteres especiales, permitimos espacios con \s
  let validRegex = /[^a-z\s]/;
  if (validRegex.test(encoderText.value)) {
    //alert("Estas escribiendo mal el texto");
    //personalizamos el alert con la biblioteca SweetAlert2
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El texto ingresado solo puede contener letras minúsculas y sin acentos ",
      buttonsStyling: false,
      width: 450,
    });
    //limpiamos el textarea luego del error y mostramos la imagen e instrucciones iniciales
    cleanTextarea();
    showTextarea();
    //ya validado el texto se realiza la desencriptación con la función decode() y mostramos la respuesta en el textarea correspondiente
  } else if (encoderText.value != "") {
    let recodedText = decode(encoderText.value);
    decodedText.value = recodedText;
    //limpiamos el textarea donde ingresamos el texto
    cleanTextarea();
  }
});

//Función botón copiar
const copy = () => {
  //seleccionamos el campo de texto
  decodedText.select();
  decodedText.setSelectionRange(0, 99999); //para mobile
  //copiado del texto
  navigator.clipboard.writeText(decodedText.value);
  alert("Copied the text: " + decodedText.value);
};

//Capturar el evento click para copiar el texto del resultado
copyBtn.addEventListener("click", () => {
  copy();
});
