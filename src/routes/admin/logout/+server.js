// src/routes/admin/logout/+server.js

import { SECRET_KEY } from '$env/static/private'
import jwt from 'jsonwebtoken'
import { redirect } from '@sveltejs/kit'

export function GET({cookies}){
    const token = cookies.get('token')

    try {
        var user = jwt.verify(token, SECRET_KEY)
    } catch(err) {
        console.log(err.message)
        throw redirect(307, '/login')
    }

    if(user){
        cookies.delete('token', {path: '/'})
    }

    throw redirect(303, '/login')
}