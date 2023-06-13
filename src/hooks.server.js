import db from "$lib/database/db.js"
import settings from '$lib/settings.js'
//import rootUser from "$lib/database/createRootUser.js"
//rootUser(db)

export async function handle({ event, resolve }) {
    event.locals.db = db
    event.locals.settings = settings()
    return await resolve(event)
}
