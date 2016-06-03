class GameObject {
    constructor(x, y, name) {
        this._x = x;
        this._y = y;
        this.name = name;
        this._scale = 1;
    }
    get x() { return this._x; }
    set x(value) { this._x = value; }
    get y() { return this._y; }
    set y(value) { this._y = value; }
    get width() { return this._width; }
    set width(v) { this._width = v; }
    get height() { return this._height; }
    set height(v) { this._height = v; }
    get scale() { return this._scale; }
    set scale(value) { this._scale = value; }
    update() {
    }
    draw() {
    }
}
class Animation {
    constructor(htmlElement, frameWidth, frameHeight, animationSpeed, maxFrames) {
        this.frameWidth = 0;
        this.frameHeight = 0;
        this.animationSpeed = 0;
        this.currentFrame = 0;
        this.maxFrames = 0;
        this.timer = 0;
        this.htmlElement = htmlElement;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.animationSpeed = animationSpeed;
        this.maxFrames = maxFrames;
    }
    update() {
        this.timer++;
        if (this.timer % this.animationSpeed == 0)
            this.currentFrame++;
        if (this.currentFrame > this.maxFrames - 1)
            this.currentFrame = 0;
    }
    draw() {
        this.htmlElement.style.backgroundPosition = (this.currentFrame * -this.frameWidth) + "px 0px";
    }
}
class DOMObject extends GameObject {
    constructor(x, y, HTMLtagName, animated) {
        super(x, y, HTMLtagName);
        this._animated = animated;
        this.htmlElement = document.createElement(HTMLtagName);
        document.body.appendChild(this.htmlElement);
        this.width = this.htmlElement.offsetWidth;
        this.height = this.htmlElement.offsetHeight;
        if (this._animated) {
            Game.instance.addElement(this);
            this.animation = new Animation(this.htmlElement, 28, 32, 15, 4);
        }
        else {
            this.draw();
        }
    }
    get animated() {
        return this._animated;
    }
    update() {
        if (this.animation)
            this.animation.update();
    }
    draw() {
        this.htmlElement.style.transform = "translate(" + this.x + "px, " + this.y + "px) scale(" + this.scale + ")";
        if (this.animation)
            this.animation.draw();
    }
}
class MenuItem extends DOMObject {
    constructor(x, y, HTMLtagName, animated) {
        super(x, y, HTMLtagName, animated);
        this.x = x;
        this.y = y;
        this.HTMLtagName = HTMLtagName;
        this.scale = Math.min(1, Settings.sizeMenuItem / this.height, Settings.sizeMenuItem / this.width);
        this.htmlElement.addEventListener("mousedown", (e) => this.createElement(e));
        this.draw();
    }
    createElement(event) {
        let x = event.clientX - event.offsetX;
        let y = event.clientY - event.offsetY;
        this.gameObject = new DraggableDomObject(x, y, this.HTMLtagName, event.offsetX, event.offsetY, this.animated);
    }
}
class Button extends DOMObject {
    constructor(x, y, HTMLtagName) {
        super(x, y, HTMLtagName);
        this.htmlElement.addEventListener("click", (e) => this.handleClick(e));
    }
    handleClick(event) {
    }
}
class Menu extends DOMObject {
    constructor(menuSpacing) {
        super(0, 0, "menu");
        this.menuOffset = 50;
        this.menuOptions = ["tent", "market", "market2", "tree", "fountain", "hay", "stump", "sign", "barrel1", "barrel2", "plant", "cross", "firepole", "logs", "heavyfence", "fence"];
        this.animatedMenuOptions = ["bird"];
        this.menuItems = new Array();
        let itemSize = Settings.sizeMenuItem + menuSpacing;
        let itemNumber;
        for (let i = 0; i < this.menuOptions.length; i++) {
            this.menuItems.push(new MenuItem(i * itemSize + this.menuOffset, 10, this.menuOptions[i]));
            itemNumber = i;
        }
        itemNumber++;
        for (let i = 0; i < this.animatedMenuOptions.length; i++) {
            this.menuItems.push(new MenuItem(itemNumber * itemSize + this.menuOffset, 10, this.animatedMenuOptions[i], true));
        }
        let snapButton = new SnapButton(this.menuOptions.length * itemSize + this.menuOffset + 50, 16);
        let exporButton = new ExportButton(snapButton.x + snapButton.width + 50, 16);
    }
}
class Game {
    constructor() {
        Game.instance = this;
        this.gameObjects = new Array();
        this.objectsToExport = new Array();
        this.startGame();
        requestAnimationFrame(() => this.update());
    }
    startGame() {
        new Menu(10);
        new DOMObject(700, 300, "castle");
    }
    update() {
        for (let o of this.gameObjects) {
            o.update();
        }
        this.draw();
    }
    draw() {
        for (let o of this.gameObjects) {
            o.draw();
        }
        requestAnimationFrame(() => this.update());
    }
    addElement(gameObject) {
        this.gameObjects.push(gameObject);
    }
    addObjectToExport(gameObject) {
        this.objectsToExport.push(gameObject);
    }
    exportToJSON() {
        let outputString;
        outputString = JSON.stringify(this.objectsToExport, ['name', 'x', 'y'], '\t');
        console.log(outputString);
    }
}
window.addEventListener("load", function () {
    new Game();
});
class Settings {
}
Settings.snapping = true;
Settings.gridSize = 32;
Settings.sizeMenuItem = 54;
class ExportButton extends Button {
    constructor(x, y) {
        super(x, y, "exportbutton");
    }
    handleClick(event) {
        Game.instance.exportToJSON();
    }
}
class SnapButton extends Button {
    constructor(x, y) {
        super(x, y, "snapbutton");
    }
    handleClick(event) {
        Settings.snapping = !Settings.snapping;
        this.htmlElement.style.backgroundImage = (Settings.snapping) ? "url(images/snapbutton_on.png)" : "url(images/snapbutton_off.png)";
    }
}
class CanvasObject extends GameObject {
    constructor(x, y, imageName) {
        super(x, y, "name");
        var canvas = document.getElementsByTagName("canvas")[0];
        this.context = canvas.getContext('2d');
        this.image = new Image();
        this.image.src = imageName;
    }
    draw() {
        this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
class DraggableDomObject extends DOMObject {
    constructor(x, y, HTMLtagName, offsetX, offsetY, animated) {
        super(x, y, HTMLtagName, animated);
        this.offSetX = 0;
        this.offSetY = 0;
        Game.instance.addObjectToExport(this);
        this.htmlElement.addEventListener("mousedown", (e) => this.drag(e));
        this.htmlElement.addEventListener("mouseup", (e) => this.drop(e));
        this.mouseMoveBind = (e) => this.updatePosition(e);
        this.offSetX = offsetX;
        this.offSetY = offsetY;
        window.addEventListener("mousemove", this.mouseMoveBind);
    }
    drag(event) {
        event.preventDefault();
        if (event.altKey) {
            let go = new DraggableDomObject(this.x, this.y, this.htmlElement.tagName, event.offsetX, event.offsetY, this.animated);
        }
        else {
            this.offSetX = event.offsetX;
            this.offSetY = event.offsetY;
            window.addEventListener("mousemove", this.mouseMoveBind);
        }
    }
    updatePosition(event) {
        this.x = event.clientX - this.offSetX;
        this.y = event.clientY - this.offSetY;
        this.draw();
    }
    drop(event) {
        if (Settings.snapping) {
            this.x = Math.round(this.x / Settings.gridSize) * Settings.gridSize;
            this.y = Math.round(this.y / Settings.gridSize) * Settings.gridSize;
            this.draw();
        }
        window.removeEventListener("mousemove", this.mouseMoveBind);
    }
}
//# sourceMappingURL=main.js.map