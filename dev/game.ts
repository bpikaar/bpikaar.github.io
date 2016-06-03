/// <reference path="core/gameobject.ts" />
/// <reference path="menu/menu.ts" />

class Game {
    private gameObjects: Array<GameObject>;
    private objectsToExport: Array<GameObject>;
    
    public static instance: Game;
    
    constructor() {
        Game.instance = this;
        
        this.gameObjects        = new Array<GameObject>();
        this.objectsToExport    = new Array<GameObject>();
        
        this.startGame();

        // Start game loop
        requestAnimationFrame(() => this.update());
    }

    private startGame(): void {
        new Menu(10);
        
        new DOMObject(700, 300, "castle");
    }

    private update(): void {
        for(let o of this.gameObjects) {
            o.update();
        }
        
        this.draw();
    }

    private draw(): void {
        for(let o of this.gameObjects) {
            o.draw();
        }
        // Continue game loop
        requestAnimationFrame(() => this.update());
    }
    
    public addElement(gameObject: GameObject) : void {
        this.gameObjects.push(gameObject);
    }
    
    public addObjectToExport(gameObject: GameObject) : void {
        this.objectsToExport.push(gameObject);
    }
    
    public exportToJSON() : void {
        let outputString: string;
        
        outputString = JSON.stringify(this.objectsToExport, ['name', 'x', 'y'], '\t');
        
        console.log(outputString);
    }
}