import { Colliders } from "./colliders.js";

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
var bgMusic = new Audio('../sounds/RPG Maker VX Music (BGM) - The Town Music.mp3')
bgMusic.play()
const collidersList = [];


const sprite = new Image()
sprite.src = '../imagens/movimetacao-personagem-principal/down.png'
const personagem = {
    sprite: sprite,
    position_x: 300,
    position_y: 280,
    height: 38,
    width: 38,
    spriteIndex: 0,
    spritePositions: [96, 0, 48],

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

const col1 = new Colliders(29, 0, 88, 130)
const col2 = new Colliders(128, 95, 15, 35)
const col3 = new Colliders(29, 190, 120, 8)
const col4 = new Colliders(187, 190, 89, 8)
const col5 = new Colliders(29, 190, 8, 118)
const col6 = new Colliders(269, 190, 8, 118)
const col7 = new Colliders(29, 290, 245, 25)
const col8 = new Colliders(226, 155, 50, 30)
const col9 = new Colliders(405, 0, 222, 130)
const col10 = new Colliders(405, 32, 90, 130)
const col11 = new Colliders(595, 130, 200, 65)
const col12 = new Colliders(625, 190, 100, 95)
const col13 = new Colliders(0, 320, 245, 200)
const col14 = new Colliders(0, 400, 180, 200)
const col15 = new Colliders(340, 350, 155, 135)
const col16 = new Colliders(405, 380, 90, 135)
const col17 = new Colliders(435, 320, 405, 103)
const col18 = new Colliders(465, 285, 405, 103)
const col19 = new Colliders(490, 350, 130, 103)
const col20 = new Colliders(530, 520, 55, 35)
const col21 = new Colliders(565, 560, 50, 35)
const col22 = new Colliders(585, 590, 60, 10)
const col23 = new Colliders(745, 393, 50, 90)
collidersList.push(col1, col2, col3, col4, col5, col6,
    col7, col8, col9, col10, col11, col12, col13, col14,
    col15, col16, col17, col18, col19, col20, col21, col22,
    col23
    )

const fundo = {
    draw() {
        const bg = new Image();
        bg.src = "../imagens/mapas/mapa1.jpg"
        ctx.drawImage(bg, 0, 0, 800, 568, 0, 0, canvas.width, canvas.height)
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
    } else if (event.keyCode === 100) {
        personagem.position_x += 10;
        personagem.colide(collidersList)
        if(personagem.position_x + personagem.width > canvas.width) personagem.position_x = canvas.width - personagem.width
        personagem.moveRight()
    } else if (event.keyCode === 97) {
        personagem.position_x -= 10;
        personagem.colide(collidersList)
        if(personagem.position_x < 0) personagem.position_x = 0
        personagem.moveLeft()
    }
})