const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')


const sprite = new Image()
sprite.src = './sprite.png'

const personagem = {
    sprite: sprite,
    position_x: 600,
    position_y: 280,
    size: [40, 40],

    draw() {
        ctx.drawImage(
            sprite, 
            0, 0,
            280, 274,
            personagem.position_x, personagem.position_y,
            personagem.size[0], personagem.size[1])
    }
}

const fundo = {
    draw() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
}

const loop = () => {
    fundo.draw()
    personagem.draw()
    requestAnimationFrame(loop)
}

loop();

document.addEventListener('keypress', (event)=>{
    if(event.keyCode === 119 && personagem.position_y != 0) {
        personagem.position_y -= 40;
    } else if (event.keyCode === 115 && personagem.position_y != canvas.height - 40) {
        personagem.position_y += 40;
    } else if (event.keyCode === 100 && personagem.position_x != canvas.width - 40) {
        console.log(personagem.position_x)
        personagem.position_x += 40;
    } else if (event.keyCode === 97 && personagem.position_x != 0) {
        personagem.position_x -= 40;
    }
})