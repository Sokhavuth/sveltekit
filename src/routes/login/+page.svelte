<!--src/routes/login/+page.svelte-->

<script>
    export let form
</script>

<section class='Login'>
    <div class='title'>ចុះ​ឈ្មោះ​ចូល​ទំព័រ​គ្រប់គ្រង</div>
 
    <form method='post' >
        <a>Email:</a><input type='email' value="guest@khmerweb.app" name='email' required />
        <a>ពាក្យ​សំងាត់ៈ</a><input type='password' value="password" name='password' required />
        <a></a><input type='submit' value='បញ្ជូន' />
        <a></a><div class='info'>{form?.message ?? ""}</div>
    </form>
</section>

<style>
.Login{
    width: 400px;
    margin: 100px auto;
    background: var(--background-dark);
} 
 
.Login .title{
    text-align: center;
    font: 18px/1.5 Koulen, Oswald;
    padding: 5px;
    border-bottom: 1px solid white;
    color: white;
}
 
.Login form{
    padding: 20px 20px;
    display: grid;
    grid-template-columns: 20% auto; 
    grid-gap: 5px;
    align-items: center;
}
 
.Login form a{
    text-align: right;
    color: white;
}
 
.Login form input{
    padding: 0 5px;
    font: var(--body-font);
}
 
.Login .info{
    text-align: center;
    
}
 
.Login form input[type=submit]{
    font: var(--body-font);
    padding-top: 0;
}
 
@media only screen and (max-width: 600px){
    .Login{
        width: 100%;
    } 
 
    .Login form{
        grid-template-columns: 100%; 
    }
 
    .Login form a{
        text-align: left;
    }
}
</style>