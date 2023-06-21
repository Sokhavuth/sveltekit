// src/routes/admin/category/edit/[id]/+page.server.js

import { SECRET_KEY } from '$env/static/private'
import jwt from 'jsonwebtoken'
import { redirect, error } from '@sveltejs/kit'

export async function load({ cookies, locals, params }) {
    const token = cookies.get('token')
    const settings = locals.settings
    settings.pageTitle = 'ទំព័រ​កែប្រែ​ជំពូក'
    settings.type = 'category'
    settings.pageNumber = 0
    const db = locals.db

    try {
        var user = jwt.verify(token, SECRET_KEY)
    } catch(err) {
        console.log(err.message)
        throw redirect(307, '/login')
    }

    const count = await db.collection('categories').countDocuments()
    const amount = settings.dItemLimit
    const items = await db.collection("categories").find({}, {projection: {_id: 0}}).sort({date:-1,_id:-1}).limit(amount).toArray()
    const item = await db.collection("categories").findOne({id: params.id}, {projection: {_id: 0}})

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

        let title = data.get('title')
        let thumb = data.get('thumb')
        let datetime = data.get('datetime')

        if(!(title && thumb && datetime)){
            throw error(404, 'ត្រូវ​បំពេញ​ទំរង់​បែបបទ​អោយ​បាន​ពេញលេញ')
        }

        const myquery = {id: params.id}
        let newvalue = {$set: {
            title,
            thumb,
            datetime,
        }}

        if(user.userRole === "Admin"){
            await db.collection("categories").updateOne(myquery,newvalue)
        }

    }
}