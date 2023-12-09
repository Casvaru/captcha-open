// @ts-check

/**
 * Genera un texto aleatorio de 6 letras mayúsculas, minúsculas o números para el captcha.
 * @returns {string} El texto generado para el captcha.
 */
const generateCaptcha = () => {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let captchaText = ''
    for (let i = 0; i < 6; i++) {
        captchaText += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return captchaText
}
/**
 * Función principal para mostrar el captcha.
 * @returns {Promise<boolean>} Una promesa que resuelve a un booleano que indica si se resolvió correctamente el captcha.
 */
export const simpleCaptcha = () => {
    capsuleCaptcha()
}

/**
 * Crea un overlay oscuro para el captcha.
 * @param {Function} updateChallenge - Una función para actualizar el desafío del captcha.
 * @returns {Promise<boolean>} Una promesa que resuelve a un booleano indicando si se resolvió correctamente el captcha.
 */
const createDarkOverlay = (updateChallenge) => {
return new Promise((resolve)=>{
    /**
    * @type {boolean}
    */
    let result

    const darkOverlay = document.createElement("div")
    darkOverlay.style.position = "fixed"
    darkOverlay.style.top = "0"
    darkOverlay.style.left = "0"
    darkOverlay.style.width = "100%"
    darkOverlay.style.height = "100%"
    darkOverlay.style.cursor = "pointer"
    darkOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)" // Fondo oscuro semi-transparente
    darkOverlay.style.zIndex = "98" // Por debajo del containerCaptcha
    document.body.appendChild(darkOverlay)

    const createContainerCaptcha = document.createElement("div")
    createContainerCaptcha.style.position = "fixed"
    createContainerCaptcha.className = "soyElCaptcha"
    createContainerCaptcha.style.zIndex = "99"
    createContainerCaptcha.style.background = "white"
    createContainerCaptcha.style.top = "50%"
    createContainerCaptcha.style.left = "50%"
    createContainerCaptcha.style.transform = "translate(-50%, -50%)"
    createContainerCaptcha.style.borderRadius = "25px"
    createContainerCaptcha.style.display = "flex"
    createContainerCaptcha.style.gap = "10px"
    createContainerCaptcha.style.textAlign = "center"
    createContainerCaptcha.style.flexDirection = "column"
    createContainerCaptcha.style.padding = "25px"
    document.body.appendChild(createContainerCaptcha)

    const spanChallenge = document.createElement("span")
    spanChallenge.style.userSelect = "none"
    spanChallenge.className = generateCaptcha()
    spanChallenge.textContent = updateChallenge()
    createContainerCaptcha.appendChild(spanChallenge)

    const createInput = document.createElement("input")
    createInput.style.padding = "10px 10px"
    createInput.style.border = "1px solid gray"
    createInput.style.borderRadius = "15px"
    createInput.placeholder = "Ingresa el texto."
    createContainerCaptcha.appendChild(createInput)

    const createSubmit = document.createElement("button")
    createSubmit.textContent = "Validar"
    createSubmit.style.padding = "8px 10px"
    createSubmit.style.background = "#3393ff"
    createSubmit.style.color = "#fff"
    createSubmit.style.border = "none"
    createSubmit.style.borderRadius = "10px"
    createSubmit.style.cursor = "pointer"
    createContainerCaptcha.appendChild(createSubmit)

    createSubmit.addEventListener("click",() => {
        const userAnswer = createInput.value
        if( userAnswer === spanChallenge.textContent){
            const parentDarkOverlay = darkOverlay.parentNode
            const parentContainerCaptcha = createContainerCaptcha.parentNode

            parentDarkOverlay.removeChild(darkOverlay)
            parentContainerCaptcha.removeChild(createContainerCaptcha)

            result = true
            resolve(result)
        }else{
            spanChallenge.textContent = updateChallenge()
        }
    })
    darkOverlay.addEventListener("click", () => {
        const parentDarkOverlay = darkOverlay.parentNode
        const parentContainerCaptcha = createContainerCaptcha.parentNode

        parentDarkOverlay.removeChild(darkOverlay)
        parentContainerCaptcha.removeChild(createContainerCaptcha)

        spanChallenge.textContent = updateChallenge()
        resolve(false)
    })

    return darkOverlay
    })
}

/**
 * Función que encapsula el captcha.
 * @returns {Promise<boolean>} Una promesa que resuelve a un booleano indicando si se resolvió correctamente el captcha.
 */
const capsuleCaptcha = async () => {
    return new Promise((resolve)=>{
        const createCapsuleCaptcha = document.createElement("div")
        createCapsuleCaptcha.style.height = "40px"
        createCapsuleCaptcha.style.width = "130px"
        createCapsuleCaptcha.style.borderRadius = "25px"
        createCapsuleCaptcha.style.background = "black"
        createCapsuleCaptcha.style.cursor = "pointer"
        createCapsuleCaptcha.style.display = "flex"
        createCapsuleCaptcha.style.justifyContent = "center"
        createCapsuleCaptcha.style.alignItems = "center"
        createCapsuleCaptcha.style.fontSize = ".8rem"
        createCapsuleCaptcha.className = generateCaptcha()
        
        const textCapsule = document.createElement("span")
        textCapsule.textContent = "No soy un robot"
        textCapsule.style.color = "white"
        createCapsuleCaptcha.appendChild(textCapsule)

        document.body.appendChild(createCapsuleCaptcha)
    
        createCapsuleCaptcha.addEventListener("click", async () => {
            const result = await createDarkOverlay(generateCaptcha)
            resolve(result)
            if(result){
                createCapsuleCaptcha.style.background = "green"
            }else{
                createCapsuleCaptcha.style.background = "red"
            }
        })

        document.body.appendChild(createCapsuleCaptcha)
    
        return createCapsuleCaptcha
    })
}

// Uso de la función simpleCaptcha
(async () => {
    const captchaResult = await simpleCaptcha()
})()
