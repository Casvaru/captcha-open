
// Generador de números según sus 2 props, por defecto están en 10, devuelve 2 números randoms y otro adicional que se usa para el operador.
function generateRandomNumber (maxNumberA:any = 10 , maxNumberB:any = 10) {
  const randomNumberA = Math.floor(Math.random() * maxNumberA) + 1
  const randomNumberB = Math.floor(Math.random() * maxNumberB) + 1
  const randomOperator = Math.floor(Math.random() * 4) + 1
  
  return [randomNumberA, randomNumberB, randomOperator];
}
function generateRandomHashClass (length:number = 5) {
  let randomHashID = ""
  const diccionary = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const diccionaryLength = diccionary.length

  let counter = 0

  while (counter < length) {
    randomHashID += diccionary.charAt(Math.floor(Math.random() * diccionaryLength));
    counter += 1;
  }
  return randomHashID
}
export function simpleCaptcha () {

  const [randomNumberA, randomNumberB, randomOperator] = generateRandomNumber(10,10)
  const [randomHashID] = generateRandomHashClass()
  
  // Definimos como clave y valor un operator donde está enlazado con randomOperator que dependiendo del número aleatorio elegido este va a tomar un operador matemático.
  const operators:any = {
    "1": "+",
    "2": "-",
    "3": "*",
    "4": "/"
  }
  const operatorsString:any = {
    "1": "+",
    "2": "-",
    "3": "x",
    "4": "/"
  }
  
  const operatorType = operators[randomOperator]
  const operatorsTypeString = operatorsString[randomOperator]

  let resultRandomNumbers = `${randomNumberA} ${operatorType} ${randomNumberB}`

  const containerDiv = document.createElement("div")
  // Le asignamos una ID al div
  containerDiv.id = "captchaopen"
  // Le agregamos estilo
  containerDiv.style.width = "250px"
  containerDiv.style.height = "auto"
  containerDiv.style.padding = "10px"
  containerDiv.style.borderRadius = "15px"
  containerDiv.style.background = "#eeeeee"
  containerDiv.style.border = "1px solid #909090"
  // Lo mandamos llamar
  document.body.appendChild(containerDiv)

  // Creamos un div como contenedor del span y el input
  const containerSpanAndInput = document.createElement("div")
  containerSpanAndInput.style.display = "flex"
  containerSpanAndInput.style.alignItems = "center"
  containerSpanAndInput.style.justifyContent = "center"
  containerSpanAndInput.style.flexDirection = "row"
  containerDiv.appendChild(containerSpanAndInput)

  const randomNumberAText = document.createElement("span")
  randomNumberAText.id = `${randomHashID}`
  randomNumberAText.style.flex = "1"
  randomNumberAText.style.textAlign = "center"
  containerSpanAndInput.appendChild(randomNumberAText)
  randomNumberAText.textContent = `${randomNumberA} ${operatorsTypeString} ${randomNumberB}`

  // Creamos el input que envía el formulario
  const createInput = document.createElement("input")
  // Le damos estilos al input
  createInput.style.padding = "10px 10px"
  createInput.style.border = "none"
  createInput.style.borderRadius = "15px"
  
  createInput.placeholder = "Escribe el resultado."
  containerSpanAndInput.appendChild(createInput)

  const createContainerButtons = document.createElement("div")
  createContainerButtons.style.marginTop = "5px"
  createContainerButtons.style.display = "flex"
  createContainerButtons.style.justifyContent = "center"
  createContainerButtons.style.gap = "10px"
  containerDiv.appendChild(createContainerButtons)

  // Creamos el button de enviar con sus estilos
  const createButtonSubmit = document.createElement("button")
  createButtonSubmit.textContent = "Verificar"
  createButtonSubmit.style.padding = "5px 10px"
  createButtonSubmit.style.background = "#3393ff"
  createButtonSubmit.style.color = "#fff"
  createButtonSubmit.style.border = "none"
  createButtonSubmit.style.borderRadius = "10px"
  createButtonSubmit.style.cursor = "pointer"
  createButtonSubmit.addEventListener("mouseenter", function() {
    createButtonSubmit.style.background = "#4fa3ff";
  });
  createButtonSubmit.addEventListener("mouseleave", function() {
    createButtonSubmit.style.background = "#3393ff";
  });
  createContainerButtons.appendChild(createButtonSubmit)

  // Creamos el button de resetear la pregunta
  const createButtonReset = document.createElement("button")
  createButtonReset.textContent = "Reiniciar"
  createButtonReset.style.padding = "5px 10px"
  createButtonReset.style.background = "#b2b2b2"
  createButtonReset.style.border = "1px solid #6b6b6b"
  createButtonReset.style.borderRadius = "10px"
  createButtonReset.style.cursor = "pointer"
  createContainerButtons.appendChild(createButtonReset)

  const updateCaptcha = () => {
    const [newRandomNumberA, newRandomNumberB, newRandomOperator] = generateRandomNumber(10, 10);
    const newOperatorType = operators[newRandomOperator];
    const newOperatorsTypeString = operatorsString[newRandomOperator];

    randomNumberAText.textContent = `${newRandomNumberA} ${newOperatorsTypeString} ${newRandomNumberB}`
    resultRandomNumbers = `${newRandomNumberA} ${newOperatorType} ${newRandomNumberB}`
    createInput.value = ""
    createInput.style.border = "1px solid black"
  }

  createButtonReset.addEventListener("click", updateCaptcha)

  createButtonSubmit.addEventListener("click", () => {
    const userAnswer:any = createInput.value;
    const correctAnswer = eval(resultRandomNumbers); // Evalúa la operación
    
    if (parseInt(userAnswer) === correctAnswer) {
      createInput.style.border = "2px solid green";
      return true
    }
     else {
      createInput.style.border = "2px solid red";
      updateCaptcha()
      return false
    }
  });
  
}

simpleCaptcha()

