// src/routes/admin/post/+page.server.js

import { SECRET_KEY } from '$env/static/private'
import jwt from 'jsonwebtoken'
import { redirect, error } from '@sveltejs/kit'

export function load({ cookies, locals }) {
    const token = cookies.get('token')
    const settings = locals.settings
    settings.pageTitle = 'ទំព័រ​ការផ្សាយ'
    const db = locals.db

    try {
        var user = jwt.verify(token, SECRET_KEY)
    } catch(err) {
        console.log(err.message)
        throw redirect(307, '/login')
    }

    const count = db.collection('posts').countDocuments()

    return { settings, count }
}

export const actions = {
    default: async ({request, locals, cookies}) => {
        const token = cookies.get('token')
        const db = locals.db
        const data = await request.formData()

        const id = Date.now() + Math.round(Math.random() * 1E9).toString()
        const title = data.get('title')
        const content = data.get('content')
        let categories = data.get('categories')

        if(categories.includes(',')){
            let str = categories.replace(/\s+/g, "")
            categories = str.split(',')
        }else{
            categories = [categories]
        }

        const thumb = data.get('thumb')
        const datetime = data.get('datetime')
        const videos = data.get('videos')
        
        if(!(title && categories && thumb && datetime)){
            throw error(404, 'ត្រូវ​បំពេញ​ទំរង់​បែបបទ​អោយ​បាន​ពេញលេញ')
        }

        const post = {id, title, content, categories, thumb, datetime, videos}

        try {
            var user = jwt.verify(token, SECRET_KEY)
        } catch(err) {
            console.log(err.message)
            throw redirect(307, '/login')
        }

        if(user.userRole !== "Guest"){
            await db.collection('posts').insertOne(post)
        }
    }
}