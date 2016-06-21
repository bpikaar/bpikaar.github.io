
/// <reference path="domobject.ts" />

/**
 * DraggableObject
 */
class DraggableDomObject extends DOMObject{
    
    private mouseMoveBind: any;
    private offSetX: number = 0;
    private offSetY: number = 0;
    
    constructor(x: number, y: number, HTMLtagName: string, offsetX: number, offsetY: number, animated?: boolean) {
        super(x, y, HTMLtagName, animated);
        this.htmlElement.classList.add('selectable');
        Game.instance.addObjectToExport(this);

        this.htmlElement.addEventListener("mousedown", (e) => this.drag(e));
        this.htmlElement.addEventListener("mouseup"  , (e) => this.drop(e));

        this.mouseMoveBind = (e: any) => this.updatePosition(e);

        this.offSetX = offsetX;
        this.offSetY = offsetY;

        window.addEventListener("mousemove", this.mouseMoveBind);
    }

    public drag(event: MouseEvent) : void { 
        event.preventDefault();

        document.body.appendChild(this.htmlElement);
        // als de alt key is ingedrukt, dan maken we hier een nieuw gameobject aan, net zoals de menubutton doet
        if(event.altKey) {
            let go = new DraggableDomObject(this.x, this.y, this.htmlElement.tagName, event.offsetX, event.offsetY, this.animated);
        } else {
            this.offSetX = event.offsetX;
            this.offSetY = event.offsetY;
            
            window.addEventListener("mousemove", this.mouseMoveBind);
        }
    }
    
    private updatePosition(event: MouseEvent): void {
            this.x = event.clientX - this.offSetX;
            this.y = event.clientY - this.offSetY;
            
            // No need to add the object to the collection in game, it will update itself. 
            this.draw();
    }
    
    public drop(event: MouseEvent) : void {
        // SNAP TO GRID VAN 54 * 54
        if(Settings.snapping){
            this.x = Math.round(this.x/Settings.gridSize) * Settings.gridSize;
            this.y = Math.round(this.y/Settings.gridSize) * Settings.gridSize;
            
            Game.instance.sortObjectsInDom();

            this.draw();
        }
        
        window.removeEventListener("mousemove", this.mouseMoveBind);
    }
}