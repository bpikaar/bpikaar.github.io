/// <reference path="button.ts" />


/**
 * SnapButton
 */
class SnapButton extends Button {
    constructor(x: number, y: number) {
        super(x, y, "snapbutton")
    }
    
    public handleClick(event: MouseEvent) : void { 
       Settings.snapping = !Settings.snapping;
       
       this.htmlElement.style.backgroundImage = (Settings.snapping) ? "url(images/snapbutton_on.png)": "url(images/snapbutton_off.png)";
    }
}