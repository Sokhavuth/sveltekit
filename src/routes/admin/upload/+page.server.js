// src/routes/admin/upload/+page.server.js

import { writeFile } from 'fs/promises'
import { fail } from '@sveltejs/kit'

export const actions = {
    default: async ({ request, route, url }) => {
        const data = await request.formData()
        const file = data.get('file')

        if(file.name === "undefined"){
            return fail(400, { missing: true })
        }

        const fileName = `${crypto.randomUUID()}-${file.name}`
        await writeFile(`./static/upload/${fileName}`, new Uint8Array(await file.arrayBuffer()))

        return { fileName: `upload/${fileName}` }
    }
}