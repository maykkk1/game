const sprite = document.getElementById('sprite')

document.addEventListener('keypress', (evento) => {
    if(evento.keyCode === 119) {
        let position = sprite.offsetTop - 25
        sprite.style.top = `${position}px`;
        console.log(position)
    }
})
