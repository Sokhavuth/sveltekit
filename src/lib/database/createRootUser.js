// src/lib/database/createRootUser.js

import bcrypt from 'bcryptjs'

export default async (db)=>{
    const id = Date.now() + Math.round(Math.random() * 1E9).toString()
    const hashPassword = bcrypt.hashSync("********", 10)

    let user = {
        id: id, 
        title: "Vibol",
        password: hashPassword,
        email: "vibol@khmerweb.app",
        role: "Author",
        thumb: "",
        info: "",
        video: "",
        date: ""
    }

    await db.collection("users").insertOne(user)
}