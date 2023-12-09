# captcha-open

Captcha open-Source, es un proyecto propio y de la comunidad para la implementación web y evitar la intrución de bots o web scraping, este proyecto tiene como visión poder implementar mucha variedad de captchas, desde texto, imágenes, puzzles e IA.
[https://www.npmjs.com/package/captcha-open](https://www.npmjs.com/package/captcha-open)
[https://www.instagram.com/casvaru/](Casvaru)

#### Instalación.
```
  npm install captcha-open
```

#### Próximas funciones.
 - [x] Captcha por texto aleatorio
 - [ ] Captcha por imágenes
 - [ ] Captcha por puzzles
 - [ ] Captcha por IA

#### Uso.

``` js
  // Crear una función para manejar la respuesta del captcha
const handleCaptchaResponse = async () => {
    try {
        // Obtener el resultado del captcha
        const captchaResult = await simpleCaptcha();

        // Dependiendo de la respuesta del captcha, imprimir un mensaje en la consola
        if (captchaResult) {
            console.log('Captcha resuelto correctamente');
        } else {
            console.log('Captcha no resuelto correctamente');
        }
    } catch (error) {
        console.error('Error al procesar el captcha:', error);
    }
};

// Llamar a la función para manejar la respuesta del captcha
handleCaptchaResponse();
```
