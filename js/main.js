var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameObject = (function () {
    function GameObject(x, y, name) {
        this._x = x;
        this._y = y;
        this.name = name;
        this._scale = 1;
    }
    Object.defineProperty(GameObject.prototype, "x", {
        get: function () { return this._x; },
        set: function (value) { this._x = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "y", {
        get: function () { return this._y; },
        set: function (value) { this._y = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "width", {
        get: function () { return this._width; },
        set: function (v) { this._width = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "height", {
        get: function () { return this._height; },
        set: function (v) { this._height = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "scale", {
        get: function () { return this._scale; },
        set: function (value) { this._scale = value; },
        enumerable: true,
        configurable: true
    });
    GameObject.prototype.update = function () {
    };
    GameObject.prototype.draw = function () {
    };
    return GameObject;
}());
var Animation = (function () {
    function Animation(htmlElement, frameWidth, frameHeight, animationSpeed, maxFrames) {
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
    Animation.prototype.update = function () {
        this.timer++;
        if (this.timer % this.animationSpeed == 0)
            this.currentFrame++;
        if (this.currentFrame > this.maxFrames - 1)
            this.currentFrame = 0;
    };
    Animation.prototype.draw = function () {
        this.htmlElement.style.backgroundPosition = (this.currentFrame * -this.frameWidth) + "px 0px";
    };
    return Animation;
}());
var DOMObject = (function (_super) {
    __extends(DOMObject, _super);
    function DOMObject(x, y, HTMLtagName, animated) {
        _super.call(this, x, y, HTMLtagName);
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
    Object.defineProperty(DOMObject.prototype, "animated", {
        get: function () {
            return this._animated;
        },
        enumerable: true,
        configurable: true
    });
    DOMObject.prototype.update = function () {
        if (this.animation)
            this.animation.update();
    };
    DOMObject.prototype.draw = function () {
        this.htmlElement.style.transform = "translate(" + this.x + "px, " + this.y + "px) scale(" + this.scale + ")";
        if (this.animation)
            this.animation.draw();
    };
    return DOMObject;
}(GameObject));
var MenuItem = (function (_super) {
    __extends(MenuItem, _super);
    function MenuItem(x, y, HTMLtagName, animated) {
        var _this = this;
        _super.call(this, x, y, HTMLtagName, animated);
        this.x = x;
        this.y = y;
        this.HTMLtagName = HTMLtagName;
        this.scale = Math.min(1, Settings.sizeMenuItem / this.height, Settings.sizeMenuItem / this.width);
        this.htmlElement.addEventListener("mousedown", function (e) { return _this.createElement(e); });
        this.draw();
    }
    MenuItem.prototype.createElement = function (event) {
        var x = event.clientX - event.offsetX;
        var y = event.clientY - event.offsetY;
        this.gameObject = new DraggableDomObject(x, y, this.HTMLtagName, event.offsetX, event.offsetY, this.animated);
    };
    return MenuItem;
}(DOMObject));
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(x, y, HTMLtagName) {
        var _this = this;
        _super.call(this, x, y, HTMLtagName);
        this.htmlElement.addEventListener("click", function (e) { return _this.handleClick(e); });
    }
    Button.prototype.handleClick = function (event) {
    };
    return Button;
}(DOMObject));
var Menu = (function (_super) {
    __extends(Menu, _super);
    function Menu(menuSpacing) {
        _super.call(this, 0, 0, "menu");
        this.menuOffset = 50;
        this.menuOptions = ["tent", "market", "market2", "tree", "fountain", "hay", "stump", "sign", "barrel1", "barrel2", "plant", "cross", "firepole", "logs", "heavyfence", "fence"];
        this.animatedMenuOptions = ["bird"];
        this.menuItems = new Array();
        var itemSize = Settings.sizeMenuItem + menuSpacing;
        var itemNumber;
        for (var i = 0; i < this.menuOptions.length; i++) {
            this.menuItems.push(new MenuItem(i * itemSize + this.menuOffset, 10, this.menuOptions[i]));
            itemNumber = i;
        }
        itemNumber++;
        for (var i = 0; i < this.animatedMenuOptions.length; i++) {
            this.menuItems.push(new MenuItem(itemNumber * itemSize + this.menuOffset, 10, this.animatedMenuOptions[i], true));
        }
        var snapButton = new SnapButton(this.menuOptions.length * itemSize + this.menuOffset + 50, 16);
        var exporButton = new ExportButton(snapButton.x + snapButton.width + 50, 16);
    }
    return Menu;
}(DOMObject));
var Game = (function () {
    function Game() {
        var _this = this;
        Game.instance = this;
        this.gameObjects = new Array();
        this.objectsToExport = new Array();
        this.startGame();
        requestAnimationFrame(function () { return _this.update(); });
    }
    Game.prototype.startGame = function () {
        new Menu(10);
        new DOMObject(700, 300, "castle");
    };
    Game.prototype.update = function () {
        for (var _i = 0, _a = this.gameObjects; _i < _a.length; _i++) {
            var o = _a[_i];
            o.update();
        }
        this.draw();
    };
    Game.prototype.draw = function () {
        var _this = this;
        for (var _i = 0, _a = this.gameObjects; _i < _a.length; _i++) {
            var o = _a[_i];
            o.draw();
        }
        requestAnimationFrame(function () { return _this.update(); });
    };
    Game.prototype.addElement = function (gameObject) {
        this.gameObjects.push(gameObject);
    };
    Game.prototype.addObjectToExport = function (gameObject) {
        this.objectsToExport.push(gameObject);
    };
    Game.prototype.exportToJSON = function () {
        var outputString;
        outputString = JSON.stringify(this.objectsToExport, ['name', 'x', 'y'], '\t');
        console.log(outputString);
    };
    Game.prototype.sortObjectsInDom = function () {
        this.objectsToExport.sort(function (a, b) {
            return (a.y + a.height > b.y + b.height) ? 1 : ((b.y + b.height > a.y + a.height) ? -1 : 0);
        });
        this.objectsToExport.forEach(function (elem) { return document.body.appendChild(elem.htmlElement); });
    };
    return Game;
}());
window.addEventListener("load", function () {
    new Game();
});
var Settings = (function () {
    function Settings() {
    }
    Settings.snapping = true;
    Settings.gridSize = 32;
    Settings.sizeMenuItem = 54;
    return Settings;
}());
var ExportButton = (function (_super) {
    __extends(ExportButton, _super);
    function ExportButton(x, y) {
        _super.call(this, x, y, "exportbutton");
    }
    ExportButton.prototype.handleClick = function (event) {
        Game.instance.exportToJSON();
    };
    return ExportButton;
}(Button));
var SnapButton = (function (_super) {
    __extends(SnapButton, _super);
    function SnapButton(x, y) {
        _super.call(this, x, y, "snapbutton");
    }
    SnapButton.prototype.handleClick = function (event) {
        Settings.snapping = !Settings.snapping;
        this.htmlElement.style.backgroundImage = (Settings.snapping) ? "url(images/snapbutton_on.png)" : "url(images/snapbutton_off.png)";
    };
    return SnapButton;
}(Button));
var CanvasObject = (function (_super) {
    __extends(CanvasObject, _super);
    function CanvasObject(x, y, imageName) {
        _super.call(this, x, y, "name");
        var canvas = document.getElementsByTagName("canvas")[0];
        this.context = canvas.getContext('2d');
        this.image = new Image();
        this.image.src = imageName;
    }
    CanvasObject.prototype.draw = function () {
        this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
    };
    return CanvasObject;
}(GameObject));
var DraggableDomObject = (function (_super) {
    __extends(DraggableDomObject, _super);
    function DraggableDomObject(x, y, HTMLtagName, offsetX, offsetY, animated) {
        var _this = this;
        _super.call(this, x, y, HTMLtagName, animated);
        this.offSetX = 0;
        this.offSetY = 0;
        Game.instance.addObjectToExport(this);
        this.htmlElement.addEventListener("mousedown", function (e) { return _this.drag(e); });
        this.htmlElement.addEventListener("mouseup", function (e) { return _this.drop(e); });
        this.mouseMoveBind = function (e) { return _this.updatePosition(e); };
        this.offSetX = offsetX;
        this.offSetY = offsetY;
        window.addEventListener("mousemove", this.mouseMoveBind);
    }
    DraggableDomObject.prototype.drag = function (event) {
        event.preventDefault();
        document.body.appendChild(this.htmlElement);
        if (event.altKey) {
            var go = new DraggableDomObject(this.x, this.y, this.htmlElement.tagName, event.offsetX, event.offsetY, this.animated);
        }
        else {
            this.offSetX = event.offsetX;
            this.offSetY = event.offsetY;
            window.addEventListener("mousemove", this.mouseMoveBind);
        }
    };
    DraggableDomObject.prototype.updatePosition = function (event) {
        this.x = event.clientX - this.offSetX;
        this.y = event.clientY - this.offSetY;
        this.draw();
    };
    DraggableDomObject.prototype.drop = function (event) {
        if (Settings.snapping) {
            this.x = Math.round(this.x / Settings.gridSize) * Settings.gridSize;
            this.y = Math.round(this.y / Settings.gridSize) * Settings.gridSize;
            Game.instance.sortObjectsInDom();
            this.draw();
        }
        window.removeEventListener("mousemove", this.mouseMoveBind);
    };
    return DraggableDomObject;
}(DOMObject));
//# sourceMappingURL=main.js.map