import db from "$lib/database/db.js"
//import rootUser from "$lib/database/createRootUser.js"
//rootUser(db)

export async function handle({ event, resolve }) {
    const token = await event.cookies.get('token')
    event.locals.db = db
    return await resolve(event)
}
