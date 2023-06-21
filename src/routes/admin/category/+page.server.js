// src/routes/admin/category/+page.server.js

import { SECRET_KEY } from '$env/static/private'
import jwt from 'jsonwebtoken'
import { redirect, error } from '@sveltejs/kit'

export async function load({ locals }){
    const settings = locals.settings
    settings.pageTitle = 'ទំព័រ​ជំពូក'
    settings.type = 'category'
    settings.pageNumber = 0
    const db = locals.db

    const count = await db.collection('categories').countDocuments()
    const amount = settings.dItemLimit
    const items = await db.collection("categories").find({}, {projection: {_id: 0}}).sort({date:-1,_id:-1}).limit(amount).toArray()

    return { settings, count, items }
}

export const actions = {
    default: async ({request, locals, cookies}) => {
        const token = cookies.get('token')

        try {
            var user = jwt.verify(token, SECRET_KEY)
        } catch(err) {
            console.log(err.message)
            throw redirect(307, '/login')
        }

        const db = locals.db
        const data = await request.formData()

        const id = Date.now() + Math.round(Math.random() * 1E9).toString()
        const title = data.get('title')
        const thumb = data.get('thumb')
        const datetime = data.get('datetime')
        
        if(!(title && thumb && datetime)){
            throw error(404, 'ត្រូវ​បំពេញ​ទំរង់​បែបបទ​អោយ​បាន​ពេញលេញ')
        }

        const category = {id, title, thumb, datetime}

        if(user.userRole === "Admin"){
            await db.collection('categories').insertOne(category)
        }
    }
}