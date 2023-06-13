// src/routes/admin/logout/+server.js

import { redirect } from '@sveltejs/kit'

export function GET({cookies}){
    cookies.delete('token', {path: '/'})
    throw redirect(303, '/login')
}