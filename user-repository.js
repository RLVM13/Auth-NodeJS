import DBlocal from 'db-local' //bbdd
import crypto from 'node:crypto' // generar id automaticamente
import bcrypt from 'bcrypt' // codifficar contraseña
import { SALT_ROUNDS } from '../Auth-NodeJS/config.js'

const { Schema } = new DBlocal({ path: './db' })

/* const Session = Schema('Session', {       // Para saber que el usuario sigue logueado cuando navega a otras paginas
  _id: { type: String, required: true },
  user: { type: String, required: true },
  expires: { type: Date, required: true }
}) */

const User = Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
})

export class UserRepository {
  static async create({ username, password }) {
    Validation.username(username)
    Validation.password(password)

    // asegurarse que el username no existe
    const user = User.findOne({ username })
    if (user) throw new Error('username already exists')

    const id = crypto.randomUUID() // generar id automaticamente
    /* const hashedPassword = bcript.hashSync(password, SALT_ROUNDS) // codificación de la contraseña, hashSync bloquea el thread principal */
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS) // codificación de la contraseña

    User.create({
      _id: id,
      username,
      password: hashedPassword
    }).save()
    return id
  }

  static async login({ username, password }) {
    Validation.username(username)
    Validation.password(password)

    const user = User.findOne({ username }) // buscar si el usuario existe
    if (!user) throw new Error('username does not exists')
    const isValid = await bcrypt.compareSync(password, user.password) // comparamos las contraseñas pasada y haseada en la bbdd pero no lo desencripta
    if (!isValid) throw new Error('password is invalid')

    const { password: _, ...publicUser } = user // forma elegante de quitarle propiedades a un objeto
    return publicUser
  }
}

class Validation {
  static username(username) { // validaciones de username (opcional usar dependencia zod)
    if (typeof username !== 'string') throw new Error('username must be a string')
    if (username.length < 3) throw new Error('username must be at least 3 character long')
  }

  static password(password) {
    if (typeof password !== 'string') throw new Error('password must be a string')
    if (password.length < 6) throw new Error('password must be at least 6 character long')
  }
}