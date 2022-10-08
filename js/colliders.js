export class Colliders {
    constructor(posX, posY, width, height) {
        this.posX = posX,
        this.posY = posY,
        this.width = width,
        this.height = height,
        this.color = 'transparent'
    }

    getHalfWidth() {
        return this.width/2
    }

    getHalfHeight() {
        return this.height/2
    }

    getCenterX() {
        return this.posX + this.getHalfWidth()
    }

    getCenterY() {
        return this.posY + this.getHalfHeight()
    }
}