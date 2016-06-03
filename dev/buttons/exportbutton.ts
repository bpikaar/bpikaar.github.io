/// <reference path="button.ts" />


/**
 * ExportButton
 */
class ExportButton extends Button {
    constructor(x: number, y: number) {
        super(x, y, "exportbutton");
    }
    
    protected handleClick(event: MouseEvent) : void {
        Game.instance.exportToJSON();
    }
}