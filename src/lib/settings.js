//settings.js

function getSetting(){
    let settings = {}
    
    settings.siteTitle = "SvelteKit"
    settings.pageTitle = ''
    settings.description = ''
    settings.dLogo = ''
    settings.dItemLimit = 10
    settings.indexPostLimit = 20
    settings.categoryPostLimit = 20

    return settings
}

export default getSetting