<!--src/routes/admin/post/+page.svelte-->

<script>
    import { onMount } from 'svelte'
    import { items } from '$lib/store.js'
    export let data
    
    $items.pageTitle = data.settings.pageTitle
    let ClassicEditor

    onMount(async ()=> {
        const module = await import('ckeditor5-custom-build/build/ckeditor')
        ClassicEditor = module.default
        ClassicEditor.create( document.querySelector('#editor'), {
          toolbar: ['fontfamily', 'fontsize', 'fontcolor', 'bold', 'italic', 
          'bulletedList', 'indent', 'outdent', 'numberedList', 'link', 'blockQuote', 
          'code', 'table', 'codeblock', 'imageinsert', 'mediaembed', 'undo', 'redo' ],
          fontFamily: {
            options: [
              'ឧត្តមាន​ជ័យ, OdorMeanChey', 'អក្សរដៃ, HandWriting',
              'គូលេន, Koulen', 'ក្រូច​ឆ្នារ, Limonf3',
              'បាយ័ន, Bayon', 'ក្រសាំង, Rooster',
              'មូល, Moul',
    				  'Arial, Helvetica, sans-serif',
 				      'Courier New, Courier, monospace',
 				      'Georgia, serif',
 				      'Lucida Sans Unicode, Lucida Grande, sans-serif',
 				      'Tahoma, Geneva, sans-serif',
 				      'Times New Roman, Times, serif',
 				      'Trebuchet MS, Helvetica, sans-serif',
				      'Verdana, Geneva, sans-serif',
            ],
            supportAllValues: true
          },
          
          fontSize: {
            options: [
                9,
                11,
                13,
                'default',
                17,
                19,
                21
            ],
            supportAllValues: true
          },
        })
        .then( editor => {
            console.log(editor)
        } )
        .catch( error => {
            console.error( error )
        } )
    })

    let selected

    function addCategory(){
        const category = selected
        selected = "ជ្រើសរើស​ជំពូក"
        let element = document.querySelector('.categories')
        let categories = element.value
        
        if(categories === ''){
            categories += category
        }else{
            categories += (`, ${category}`)
        }
    
        element.value = categories
    }

    let episode = 0
    let videos = []

    const insertVideo = () => {
        let form = document.forms[0]
        var selectElement = form.querySelector('input[name="video"]')
        let json = selectElement.value
    
        if((json !== '')&&(json !== '[]')){
            json = JSON.parse(json)
            episode = json.length
        }else{
            episode = 0
        }
    
        let formClass = document.querySelector('.form')
        selectElement = formClass.querySelector('select[name="type"]')
        const type = selectElement.value
        selectElement = formClass.querySelector('input[name="videoid"]')
        const id = selectElement.value
        selectElement = formClass.querySelector('select[name="status"]')
        const status = selectElement.value

        const video = {
            type: type,
            id: id,
            status: status,
            uuid: Date.now().toString(36) + Math.random().toString(36).substring(2)
        }
    
        let success = false
    
        for(let v in video){
            if(video[v] === ''){
                alert(`ចូរ​បំពេញ​ទំរង់​បែបបទ​នៅ​ត្រង់​កន្លែង "${v}"`)
                success = false
                break
            }else{
                success = true
            }
        }

        if(success){
            selectElement = form.querySelector('input[name="video"]')
            let json = selectElement.value

            if((json === '')){
                json = JSON.stringify([video])
                selectElement.value = json
            }else{
                json = JSON.parse(json)
                json.unshift(video)
                json = JSON.stringify(json)
                selectElement.value = json
            }

            videos = JSON.parse(json)
            
        }
    }

    function submitform(){
        let form = document.forms[0]
        let  selectElement = form.querySelector('input[name="video"]')
        let is_video = selectElement.value

        if((is_video !== '') && (is_video !== '[]')){
            is_video = JSON.parse(is_video)
            let videos = []
            let part = {}

            for(let video of is_video){
                let inputs = document.querySelectorAll(`.${video.uuid}`)
                part.type = inputs[0].value
                part.id = inputs[1].value
                part.status = inputs[2].value
                part.uuid = video.uuid
                videos.push({...part})
            }
        
            selectElement.value = JSON.stringify(videos)
        }
    
        form.submit()
    }

    function delVideo(index){
        let form = document.forms[0]
        let  selectElement = form.querySelector('input[name="video"]')
        let json = selectElement.value
        videos = JSON.parse(json)
        videos.splice(index, 1)
        videos = videos
        selectElement.value = JSON.stringify(videos)
    }
</script>

<form method='post' on:submit|preventDefault={submitform}>
    <input type='text' name='title' placeholder="ចំណងជើង" required />
    <textarea name='content' id='editor'></textarea>
    <input type='text' name='categories' class='categories' placeholder="បណ្តា​ជំពូក" required />
    <div class='wrapper'>
        <select name='category' bind:value={selected} on:change={addCategory} >
            <option disabled selected>ជ្រើសរើស​ជំពូក</option>
            <option>ព័ត៌មាន</option>
            <option>ភាពយន្ត</option>
        </select>
        <input type='text' name='thumb' required placeholder="តំណរ​ភ្ជាប់​រូប​តំណាង" />
        <input type='datetime-local' step='1' value='' name='datetime' required />
        <input type='submit' value='ចុះ​ផ្សាយ' />
    </div>
    <input name='video' value='' type='hidden' />
</form>

<div class='form'>
    <select name='type'>
        <option>YouTube</option>
        <option>YouTubePlaylist</option>
        <option>Facebook</option>
        <option>OK</option>
        <option>Dailymotion</option>
        <option>Vimeo</option>
    </select>
    <input name='videoid' type='text' placeholder="អត្តសញ្ញាណវីដេអូ" required />
    <select name='status'>
        <option>ចប់​</option>
        <option>មិន​ទាន់ចប់</option>
        <option>~ ចប់</option>
    </select>
    <input on:click={insertVideo} type="button" value="បញ្ចូល​វីដេអូ" />
</div>

<div class='viddata'>
    {#each videos as video, i (video.uuid)}
        <input type='text' value='{video.type}' required class='{video.uuid}' />
        <input type='text' value='{video.id}' required class='{video.uuid}' />
        <input type='text' value='{video.status}' required class='{video.uuid}' />
        <input type='button' value='{videos.length-i}' title='លុប' 
        on:click={()=>delVideo(i)} required class='{video.uuid}' />
    {/each}
</div>

<style>
    #editor {
        width: 100%;
    }

    :global(.ck-editor__editable) {
        min-height: 250px;
        width: 100%;
        color: black;
    }

    form input, form select, .form input, .form select, .viddata input {
        width: 100%;
        padding: 5px 10px;
        font: var(--body-font);
    }

    form .wrapper, .form, .viddata {
        display: grid;
        grid-template-columns: 20% auto 30% 15%;
    }

    .viddata input {
        text-align: center;
    }

</style>