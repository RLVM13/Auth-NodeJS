Creamos el proyecto, en lugar de "npm init -y" usando "pnpm init" que hace lo mismo y mas rapido para el packaje.json

Instalamos express "npm install express" (node_modules) y para no cometer errores "npm install standard -D" (En dependencias) para linkar nuestro codigo incluso formatearlo

En packaje.json se le quita el simbolo ^ en la version de express para que utilice siempre la misma version y añadimos una
herramienta que nos va a avisar de lo que escribimos mal el codigo y lo arreglará (lo ultimo que hemos instalado)
    "eslintConfig": {
        "extends":"standard"
    }

pero tambien indicamos que el proyecto es de tipo modulo "type":"module" en el packaje.json para poder importar express y además incluimos en scripts "dev": "node --watch index.js", para que se quede activado el servidor con "npm run dev" en la terminal

Usamos "npm install db-local" para usar una bbdd local

para usar eslint "npm run list" que avisa de los errores de codigo, podemos usar /* eslint-disable-next-line no-unused-vars */ para saltar el error de variable no definida

Usamos "npm install bcrypt" para codificar en un hash nuestra contraseña

Usamos "npm install ejs" para usar plantillas

Usamos "npm install jsonwebtoken" para guardar la sesion del usuario

Usamos "npm install cookie-parser" otro middleware para poder modificar las cookies




COMANDOS UTILES
---------------
npm init / npm i --> iniciar proyecto NodeJs de cero y crea los archivos json
- npm install --> reinstalar todo node_modules sólo leyendo dependencias de package.json
- node xxxxxx.js
- npm ci -> instala todo lo que está en package.json por si hay versiones antiguas sobreescribe las dependencias originales
- npm install express --> instalar paquete express
- npm install nodemon -D -> mismo comando con abreviatura
- npm install nodemon --save-dev   --> Nodemon como dependencia de desarrollo, hay que añadir en el "package.json" 
    dentro de scripts "dev": "nodemon index.js"
    dentro de "scripts" añadimos la linea "start": "node index.js" para que realice las peticiones
- npm install pug -> instalar pug para el uso de templates y views
- npm i jest -D -> instalar jest para test en Dependencias
- npm i supertest -D -> instalar el paquete supertest para test en Dependencias
- npm test -> lanzar el servidor de test, da errores si se cruza con un console.log, y poner en json 
    donde se indica "test" cambiarlo y poner "jest" con eso funciona
- npm run generate-docs y generar la documentacion crea una carpeta "jsondocs"

- nodemon index.js --> lanzar el servidor con nodemon para que refresque fichero
- node index.js  --> lanzar servidor/fichero backend

- crtl+c --> parar servidor

.gitignore creando este archivo, al subir a git evita subir las carpetas de dependencias, hay que coger de algun proyecto, 
el de Vite por defecto no ignora el .env 

instalamos en global o dependencias y hay que añadir el jsdoc.json con texto concreto
En packaje.json modificamos el "generate-docs": "jsdoc -c ./jsdoc.json"


React
-----
npm create vite@latest -> Crea el proyecto de cero, hace preguntas sobre que usar, hemos elegido React y Javascript

Subir proyecto React a Github
-----------------------------
Crear el repositorio en Github sin readme porque el proyecto ya lo tiene
- Inicializar el repositorio con git init
- Subimos datos con git add . hacemos commit como siempre y seguimos las instrucciones
- git branch etc.

Para los ejercicios
-------------------
git pull -> Actualizar el repositorio, pero antes en el repositorio hay que permitir el acceso desde la web
git add . -> Añadir todos los ficheros al repositorio
git commit -m "mensaje" -> Guardar los ficheros en el repositorio
git push -> Subir los ficheros al repositorio

git checkout -b "rama" -> Para crear una rama nueva
git checkout "rama" -> Cambiar a la rama correspondiente

1.- Subir cambios desde la rama en la que estas trabajando como siempre add, commit y push
2.- Ir al navegador y hacer el merge y pull resquest al repositorio correspondiente. !!!!OJO CON NO HACERLO EN MAIN, HACERLO EN DEVELOP¡¡¡
3.- En Visual, de tu rama de desarrollo, salir a la rama develop y realizar el pull para actualizar cambios del resto de la gente
    git checkout develop
    git pull
4.- Se actualiza la rama develop, pero no está actualizada la rama donde estas trabajando por lo que se necesita moverte a la rama de trabajo
    y hacer merge de develop a la rama de desarrollo para tener todo al dia.
    git checkout EndPoinsApis
    git merge develop

* Si haces cambios en una rama que no es la tuya, puedes volver atras 
    git restore .

Para los ejercicios con npm
---------------------------
npm i -> dentro del repositorio para instalar el npm (gestor de dependencias de NodeJs)
npm i morgan -D -> para instalar morgan en la parte de dependencias Dev para vigilar las rutas
npm run start -> Servidor siempre corriendo
npm run test -> ejecutar los test
npm run dev -> ejecutar el servidor con nodemon es lo mismo que "nodemon index.js" con servidor

Crear nueva funcionalidad en la API SQL:
----------------------------------------
Generar query SQL de ejemplo y probarla en PGAdmin4
guardar la query de ejemplo en queries.sql (documentación)
Tras probar que funcione, añadir la query en el objeto queries.js con una clave nueva. Ej: editEntry()
Crear en entries.model.js ja función JS para editar una entry por título. Ej: editEntry(title)
Probar que el método anterior funciona --> Llamar a la función
Crear el controlador para la función editEntry en entries.controller.js y llamar al método para editar del modelo
Crear la ruta PUT asociada al controlador editEntry() en entries.routes.js

Carpetas componentes
--------------------
npx crcf src/components/MiMain/Card -f --nocss -j

query SQL -> query.js -> entry.models -> entries.controller -> habilitar entries.rutes

Mongoose: config/db_mongo.js -> models/products.model.js -> products.controles.js ->

Middlewares: auth_api_keys.js -> index.js(global) -> routes(ruta concreta como eliminar o crear)

Orden correcto:
    1.- Conexion DB---------------------------config
    2.- Sentencias SQL------------------------queries
    3.- Peticiones BBDD-----------------------models
    4.- Gestion peticiones f(x) req, res------controlador
    5.- URL peticiones------------------------rutes
