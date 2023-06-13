// src/routes/admin/+layout.server.

import { SECRET_KEY } from '$env/static/private'
import jwt from 'jsonwebtoken'
import { redirect } from '@sveltejs/kit'

export function load({ cookies }){
    const token = cookies.get('token')

    try {
        var user = jwt.verify(token, SECRET_KEY)
    } catch(err) {
        console.log(err.message)
        throw redirect(307, '/login')
    }

    return { userName: user.userName }
}