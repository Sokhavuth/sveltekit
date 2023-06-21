// src/routes/admin/post/paginate/+server.js

import { SECRET_KEY } from '$env/static/private'
import jwt from 'jsonwebtoken'
import { redirect } from '@sveltejs/kit'
import { json } from '@sveltejs/kit'

export async function POST({request,locals, cookies}){
    const token = cookies.get('token')

        try {
            var user = jwt.verify(token, SECRET_KEY)
        } catch(err) {
            console.log(err.message)
            throw redirect(307, '/login')
        }

        const {page} = await request.json()
        const db = locals.db
        const settings = locals.settings
        const amount = settings.dItemLimit
        
        const items = await db.collection("categories").find().sort({datetime:-1,_id:-1}).skip(amount*page).limit(amount).toArray()

    return json({items})
}