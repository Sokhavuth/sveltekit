// src/routes/admin/post/delete/[id]/server.js

import { SECRET_KEY } from '$env/static/private'
import jwt from 'jsonwebtoken'
import { redirect, error } from '@sveltejs/kit'

export async function GET({ cookies, locals, params }){
    const token = cookies.get('token')
    const db = locals.db

    try {
        var user = jwt.verify(token, SECRET_KEY)
    } catch(err) {
        console.log(err.message)
        throw redirect(307, '/login')
    }

    if(user.userRole !== "Guest"){
        const post = await db.collection('posts').findOne({ id: params.id }, { projection: { _id: 0 } })
        if((user.userId === post.author)||(user.userRole === "Admin")){
            await db.collection("posts").deleteOne({id: params.id})
        }
    }

    throw redirect(307, '/admin/post')
}