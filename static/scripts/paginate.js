//public/scripts/admin/paginate.js

let page = 0

function paginate(){
    $('.load-more img').attr('src', '/images/loading.gif')
    page += 1
    
    $.post(`/paginate`,{page:page},function(data, status){
        appendItem(data.items, data)
    })
}

function appendItem(items, data){
    let html = ''
    
    if(items){
        for(const item of items){
            html += `<div class="theme">`
            html += `<img class="screen" src="/images/mac-screen.png" />`
            html += `<a class="thumb" href="/post/${item.key}">`
            html += `<img  src="${item.thumb}" />`
            html += `</a>`
            html += `<a class="title" href="/post/${item.key}">${item.title}</a>`
            html += `</div>`
        }
    }
    
    let message = ''
    if(data.count - data.page*data.indexPostLimit === 1){
        message = `1 more template`
    }else if(data.count - data.page*data.indexPostLimit <= 0){
        message = `no more template`
    }else{
        message = `${data.count - data.page*data.indexPostLimit} more templates`
    }

    $('.post-list').append(html)
    $('.load-more p').html(message)
    
    $('.load-more img').attr('src', '/images/load-more.png')
}