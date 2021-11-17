import UsersModel from '../models/users'
import dbConnect from '../utils/dbConnect'
import { crypto } from '../utils/password'

const get = async (req, res) => {
    await dbConnect()
    const users = await UsersModel.find()
    res.status(200).json({success: true, users})
}

const post = async (req, res) => {
     // pegar os dados que vem no req
     const {
        name,
        email,
        password,
    } = req.body

    // conectar no banco 
    await dbConnect()

    // criptografar a senha
    const passwordCrypto = await crypto(password)

    // salvar os dados
    const user = new UsersModel({
        name,
        email,
        password: passwordCrypto,
    })

    user.save()
    
    // responder sucesso
    res.status(201).json({ success: true })

}

export {
    get,
    post,
}