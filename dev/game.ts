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
        for (let o of this.gameObjects) {
            o.update();
        }

        this.draw();
    }

    private draw(): void {
        for (let o of this.gameObjects) {
            o.draw();
        }
        // Continue game loop
        requestAnimationFrame(() => this.update());
    }

    public addElement(gameObject: GameObject): void {
        this.gameObjects.push(gameObject);
    }

    public addObjectToExport(gameObject: GameObject): void {
        this.objectsToExport.push(gameObject);
    }

    public exportToJSON(): void {
        let outputString: string;

        outputString = JSON.stringify(this.objectsToExport, ['name', 'x', 'y'], '\t');

        console.log(outputString);
    }

    /**
     * Sort all objects to export and again place in DOM tree
     */
    public sortObjectsInDom(): void {
        // this part will sort the array based on y-value of the objects
        this.objectsToExport.sort(
            function (a: DOMObject, b: DOMObject) {
                return (a.y + a.height > b.y + b.height) ? 1 : ((b.y + b.height > a.y + a.height) ? -1 : 0);
            }
        );
        // after sorting all objects will be placed again in the DOM-tree
        this.objectsToExport.forEach(elem => document.body.appendChild((<DOMObject>elem).htmlElement));
    }
}