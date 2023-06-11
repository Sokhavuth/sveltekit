// src/lib/database/createRootUser.js

import bcrypt from 'bcryptjs'

export default async (db)=>{
    const id = Date.now() + Math.round(Math.random() * 1E9).toString()
    const hashPassword = bcrypt.hashSync("password", 10)

    let user = {
        id: id, 
        title: "Guest",
        password: hashPassword,
        email: "guest@khmerweb.app",
        role: "Guest",
        thumb: "",
        info: "",
        video: "",
        date: ""
    }

    await db.collection("users").insertOne(user)
}