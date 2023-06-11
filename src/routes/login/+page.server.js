// src/routes/login/+page.server.js
// npm install jsonwebtoken

import { redirect } from '@sveltejs/kit'
import bcrypt from 'bcryptjs'
import { SECRET_KEY } from '$env/static/private'
import jwt from 'jsonwebtoken'

export function load({ cookies }) {
    const token = cookies.get('token')
    
    try {
        var user = jwt.verify(token, SECRET_KEY)
    } catch(err) {
        console.log(err.message)
    }

    if(user) {
        throw redirect(303, '/admin/post')
    }
}

export const actions = {
    default: async ({ cookies, locals, request }) => {
        const data = await request.formData()
        const email = data.get("email")
        const password = data.get('password')

        if (!(email && password)) {
            throw new Error('ចូរ​​បំពេញ​ទំរង់​បែបបទ​អោយ​បាន​ពេញលេញ');
        }

	    const db = locals.db
        const user = await db.collection('users').findOne({ email: email }, { projection: { _id: 0 } })
        
        if(!user) {
            return { message: "Email ​​​​​​​​​​​​​​​​​​​​​​​​​មិនត្រឹម​ត្រូវ​ទេ" }
        }

        if(bcrypt.compareSync(password, user.password)) {
            const payload = { userId: user.id, userName: user.title }
            const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '12h' })
            cookies.set('token', token, { path: '/' })
            throw redirect(303, '/admin/post')
        } else {
            return { message: "ពាក្យ​សំងាត់​​​​​​​​​​​​​​​​​​​​​​​​​​មិនត្រឹម​ត្រូវ​ទេ" }
        }
        
    }
}