/// <reference path="GameObject.ts"/>

class CanvasObject extends GameObject {

    private context: CanvasRenderingContext2D;
    protected image: HTMLImageElement;

    /**
     * Basic object to draw a canvas object. HTML has to have a canvas tag!
     */
    constructor(x: number, y: number, imageName: string) {
        super(x, y)
        
        
        var canvas      = document.getElementsByTagName("canvas")[0];
        this.context    = canvas.getContext('2d');

        this.image      = new Image();   // Create new img element
        this.image.src  = imageName; // Set source path
    }

    /**
     * Draw a canvas object on specific X and Y 
     */
    public draw(): void {
        this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}