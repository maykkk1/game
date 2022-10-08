import { Colliders } from "./colliders.js";

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const collidersList = [];


const sprite = new Image()
sprite.src = '../imagens/movimetacao-personagem-principal/down.png'
const personagem = {
    sprite: sprite,
    position_x: 600,
    position_y: 280,
    height: 48,
    width: 48,
    spriteIndex: 0,
    spritePositions: [96, 0, 48],
    lastDirection: '',

    getHalfWidth() {
        return this.width/2
    }, 

    getHalfHeight() {
        return this.height/2
    },

    getCenterX() {
        return this.position_x + this.getHalfWidth()
    },

    getCenterY() {
        return this.position_y + this.getHalfHeight()
    },


    draw() {
        ctx.drawImage(
            this.sprite, 
            this.spritePositions[this.spriteIndex], 0,
            48, 48,
            this.position_x, this.position_y,
            this.width, this.height)
    },

    moveDown() {
        sprite.src = '../imagens/movimetacao-personagem-principal/down.png';
        this.spriteIndex += 1;
        if(this.spriteIndex > 2) this.spriteIndex = 0;
    },

    moveUp() {
        sprite.src = '../imagens/movimetacao-personagem-principal/up.png';
        this.spriteIndex += 1;
        if(this.spriteIndex > 2) this.spriteIndex = 0;
    },

    moveRight() {
        sprite.src = '../imagens/movimetacao-personagem-principal/right.png';
        this.spriteIndex += 1;
        if(this.spriteIndex > 2) this.spriteIndex = 0;
    },

    moveLeft() {
        sprite.src = '../imagens/movimetacao-personagem-principal/left.png';
        this.spriteIndex += 1;
        if(this.spriteIndex > 2) this.spriteIndex = 0;
    },

    colide(colliders) {
        colliders.forEach(collider =>{
            const catX = this.getCenterX() - collider.getCenterX()
            const catY = this.getCenterY() - collider.getCenterY()
            const sumHalfWidth = this.getHalfWidth() + collider.getHalfWidth()
            const sumHalfHeight = this.getHalfHeight() + collider.getHalfHeight()
            if(Math.abs(catX) < sumHalfWidth && Math.abs(catY) < sumHalfHeight) {
                var overlapX = sumHalfWidth - Math.abs(catX)
                var overlapY = sumHalfHeight - Math.abs(catY)

                if(overlapX >= overlapY) {
                    if(catY > 0) {
                        this.position_y += overlapY
                    } else {
                        this.position_y -= overlapY
                    }
                } else {
                    if(catX > 0) {
                        this.position_x += overlapX
                    } else {
                        this.position_x -= overlapX
                    }
                }
            }
        })
    }
}

const col1 = new Colliders(200, 300, 100, 100, 'rgba(255,0,0,.1)')
const col2 = new Colliders(500, 400, 100, 100, 'black')
const col3 = new Colliders(400, 50, 300, 100, 'black')
collidersList.push(col1, col2, col3)

const fundo = {
    draw() {
        ctx.fillStyle = '#7bb665';
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
}

const drawColliders = ()  => {
    collidersList.forEach(collider => {
        ctx.fillStyle = collider.color
        ctx.fillRect(collider.posX, collider.posY, collider.width, collider.height)
    })
}

const loop = () => {
    fundo.draw()
    personagem.draw()
    drawColliders()
    requestAnimationFrame(loop)
}

loop();

document.addEventListener('keypress', (event)=>{
    if(event.keyCode === 119) {
        personagem.position_y -= 10;
        personagem.colide(collidersList)
        if(personagem.position_y < 0) personagem.position_y = 0
        personagem.moveUp()
    } else if (event.keyCode === 115) {
        personagem.position_y += 10;
        personagem.colide(collidersList)
        if(personagem.position_y + personagem.height > canvas.height) personagem.position_y = canvas.height - personagem.height
        personagem.moveDown()
    } else if (event.keyCode === 100 && personagem.position_x != canvas.width - 40) {
        personagem.position_x += 10;
        personagem.colide(collidersList)
        personagem.moveRight()
    } else if (event.keyCode === 97 && personagem.position_x != 0) {
        personagem.position_x -= 10;
        personagem.colide(collidersList)
        personagem.moveLeft()
    }
})