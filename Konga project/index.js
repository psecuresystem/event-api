document.getElementsByClassName('hamburger')[0].addEventListener('click',()=>{
    if(document.querySelector('#ham').checked===false){
        document.getElementsByTagName('main')[0].style.display='none'
        document.getElementsByClassName('sect')[0].style.display='none'
        document.getElementsByClassName('div1')[0].style.display='none'
        document.getElementById('search').style.display='none'
        document.getElementsByClassName('dropdown')[0].style.display='flex'
    } else{
        document.getElementsByTagName('main')[0].style.display='block'
        document.getElementsByClassName('sect')[0].style.display='block'
        document.getElementsByClassName('div1')[0].style.display='flex'
        document.getElementById('search').style.display='flex'
        document.getElementsByClassName('dropdown')[0].style.display='none'
    }
})