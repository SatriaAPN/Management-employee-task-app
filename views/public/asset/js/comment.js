// function replysec() {
//     let container = document.querySelectorAll('.render-reply')[id];
//     container.classList.toggle('hidden')
// }

let reply = document.querySelectorAll('.reply');

reply.forEach(repl => {
    repl.addEventListener('click',function(){
        let repEl = repl.parentElement.querySelector(".render-reply");
        repEl.classList.toggle("hidden")
    })
})

