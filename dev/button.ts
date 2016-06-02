/// <reference path="domobject.ts" />


/**
 * Button
 */
class Button extends DOMObject {
        
    constructor(x:number, y:number) {
       super(x,y,"snapbutton");
       this.htmlElement.addEventListener("click", (e) => this.toggleSnap(e));
    }

    public toggleSnap(event: MouseEvent) : void { 
       Settings.snapping = !Settings.snapping;
       
       this.htmlElement.style.backgroundImage = (Settings.snapping) ? "url(images/snapbutton_on.png)": "url(images/snapbutton_off.png)";
    }
}