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

/* Función para encriptar: recorremos la matriz con for, declaramos la variable i y la inicializamos en 0, le decimos que mientras i sea menor 
a la longitud de la matriz al 0 inicial le sumamos 1. Evaluamos si el texto a encriptar contiene alguna de las letras
de la matriz en posisción[i][0] y de ser así pedimos que la reemplace por lo que hay en [i][1]*/
function encode(text) {
  for (let i = 0; i < encoderMatrix.length; i++) {
    if (text.includes(encoderMatrix[i][0])) {
      text = text.replaceAll(encoderMatrix[i][0], encoderMatrix[i][1]);
    }
  }
  return text;
}

//Capturar evento click botón encriptar y hacer el encriptado
encodeBtn.addEventListener("click", () => {
  showTextarea();
  //validamos que el texto sea en minúscula y no contenga números ni caracteres especiales
  let validRegex = /[^a-z\s]/;
  if (validRegex.test(encoderText.value)) {
    alert("Estas escribiendo mal negri");
    cleanTextarea();
    showTextarea();
    //si el texto es válido se realiza la encriptación
  } else if (encoderText.value != "") {
    let finalText = encode(encoderText.value);
    decodedText.value = finalText;
    //console.log(finalText);
    cleanTextarea();
  }
});

/*Función desencriptar usando el método .replace() con el flag /g para buscar un patrón más de una vez y no detenerse en la primera coincidencia*/
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

//Capturar evento click botón desencriptar y hacer el desencriptado
decodeBtn.addEventListener("click", () => {
  showTextarea();
  //validamos que el texto sea en minúscula y no contenga números ni caracteres especiales
  let validRegex = /[^a-z\s]/;
  if (validRegex.test(encoderText.value)) {
    alert("Estas escribiendo mal negri");
    cleanTextarea();
    showTextarea();
    //si el texto es válido se realiza la desencriptación
  } else if (encoderText.value != "") {
    let recodedText = decode(encoderText.value);
    decodedText.value = recodedText;
    cleanTextarea();
  }
});
