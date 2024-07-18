import express from 'express' // crear la dependencia
import { PORT, SECRET_JWT_KEY } from '../Auth-NodeJS/config.js' // Puerto de la variable de entorno
import { UserRepository } from '../Auth-NodeJS/user-repository.js'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

const app = express() // creamos la aplicacion, en este caso nuestro servidor

app.set('view engine', 'ejs') // sistema de plantilla que vamos a usar

app.use(express.json()) // usaremos middleware, mira el body antes de las peticiones para comprobar el tipo de dato y lo transforma
app.use(cookieParser()) // para modificar las cookies, queremos meter el token de sesion en ella para mayor seguridad

app.use((req, res, next) => {                   // middleware para comprobar todas las peticiones antes del siguiente paso,
    const token = req.cookies.access_token      // en este caso para evitar la comprobacion del token en cada get/post...                             // y asi no repetimos el mismo codigo en las acciones
    req.session = { user: null }
    try {
        const data = jwt.verify(token, SECRET_JWT_KEY)
        req.session.user = data
    } catch {
        /* req.session.user = null // no haria falta
        console.log("no hace falta este paso") */
    }
    next() // sigue a la siguiente ruta o middleware
})

// creamos todos nuestros endpoints
app.get('/', (req, res) => {
    const { user } = req.session
    res.render('index', user)
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await UserRepository.login({ username, password })
        const token = jwt.sign({ id: user._id, username: user.username }, SECRET_JWT_KEY, { expiresIn: '1h' })
        /* const refreshToken = jwt.sign({ id: user._id, username: user.username }, SECRET_JWT_KEY, { expiresIn: '1d' }) */
        res
            .cookie('access_token', token, {
                httpOnly: true, // la cookie solo se puede acceder en el servidor
                secure: process.env.NODE_ENV === 'production', // la cookie solo se puede acceder en https
                sameSite: 'strict', // la cookie solo se puede acceder en el mismo dominio
                maxAge: 1000 * 60 * 60 // la cookie tiene tiempo de validez de 1h
            })
            .send({ user, token })
    } catch (error) {
        res.status(401).send(error.message)
    }
})

app.post('/register', async (req, res) => {
    const { username, password } = req.body
    console.log(req.body)
    try {
        const id = await UserRepository.create({ username, password }) // async await para la codificación de contraseña
        res.send({ id })
    } catch (error) {                          // No es buena idea mandar el error del repositorio porque da mucha información 
        res.status(400).send(error.message)    // y es un caramelito para ataques, asi que usaremos middleware para controlarlo, 
    }                                          // es una validacion antes de las peticiones
})

app.post('/logout', (req, res) => {
    res
        .clearCookie('access_token')
        .json({ message: 'Logout sucessful' })
})

app.get('/protected', (req, res) => {
    const { user } = req.session
    if (!user) return res.status(403).send('Access not authorized, no user')
    res.render('protected', user)
})

app.listen(PORT, () => {
    console.log(`Esto funciona en el puerto ${PORT}`)
})
