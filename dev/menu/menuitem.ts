/// <reference path="../core/gameobject.ts" />
/// <reference path="../core/dom/animation.ts" />
/// <reference path="../core/dom/domobject.ts" />

/**
 * MenuItem 
 */
class MenuItem extends DOMObject {
    
    private gameObject: GameObject;
    private HTMLtagName: string;
        
    constructor(x: number, y: number, HTMLtagName: string, animated?: boolean) {
        super(x, y, HTMLtagName, animated);
        
        this.x              = x;
        this.y              = y;
        this.HTMLtagName    = HTMLtagName;
        
        // format all menu item to a 54 x 54 scale
        this.scale = Math.min(1, Settings.sizeMenuItem/this.height, Settings.sizeMenuItem/this.width);
        
        this.htmlElement.addEventListener("mousedown", (e) => this.createElement(e));
        
        // draw to adjust scale
        this.draw();
    }
    
    private createElement(event: MouseEvent): void {
        
        let x = event.clientX - event.offsetX;
        let y = event.clientY - event.offsetY;
        
        this.gameObject = new DraggableDomObject(x, y, this.HTMLtagName, event.offsetX, event.offsetY, this.animated);
        
        //this.game.addElement(this.gameObject);
    }
}