export const {
    PORT = 3000,
    SALT_ROUNDS = 10, /* Nivel de complicacion de la codificacion de contraseña, Ej. Produccion=10, test=4 */
    SECRET_JWT_KEY='this-is-an-awesome-secret-key-segura-que-flipas-&43029835wlkejfklsg'
  } = process.env