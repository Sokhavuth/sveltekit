// src/routes/admin/post/+page.server.js

import { SECRET_KEY } from '$env/static/private'
import jwt from 'jsonwebtoken'
import { redirect, error } from '@sveltejs/kit'

export async function load({ cookies, locals, params }) {
    const token = cookies.get('token')
    const settings = locals.settings
    settings.pageTitle = 'ទំព័រ​កែប្រែ​ការផ្សាយ'
    settings.type = 'post'
    const db = locals.db

    try {
        var user = jwt.verify(token, SECRET_KEY)
    } catch(err) {
        console.log(err.message)
        throw redirect(307, '/login')
    }

    const count = await db.collection('posts').countDocuments()
    const amount = settings.dItemLimit
    const items = await db.collection("posts").find({}, {projection: {_id: 0}}).sort({date:-1,_id:-1}).limit(amount).toArray()
    const item = await db.collection("posts").findOne({id: params.id}, {projection: {_id: 0}})

    return { settings, count, items, item }
}

export const actions = {
    default: async ({request, locals, cookies, params}) => {
        const token = cookies.get('token')

        try {
            var user = jwt.verify(token, SECRET_KEY)
        } catch(err) {
            console.log(err.message)
            throw redirect(307, '/login')
        }

        const db = locals.db
        const data = await request.formData()
        let categories = data.get("categories")

        let title = data.get('title')
        let thumb = data.get('thumb')
        let datetime = data.get('datetime')

        if(!(title && categories && thumb && datetime)){
            throw error(404, 'ត្រូវ​បំពេញ​ទំរង់​បែបបទ​អោយ​បាន​ពេញលេញ')
        }

        if(categories.includes(',')){
            let str = categories.replace(/\s+/g, "")
            categories = str.split(',')
        }else{
            categories = [categories]
        }

        const myquery = {id: params.id}
        let newvalue = {$set: {
            title: data.get('title'),
            content: data.get('content'),
            categories: categories,
            thumb: data.get('thumb'),
            datetime: data.get('datetime'),
            videos: data.get('videos')
        }}

        if(user.userRole !== "Guest"){
            await db.collection("posts").updateOne(myquery,newvalue)
        }

    }
}