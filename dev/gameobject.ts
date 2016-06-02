/**
 * GameObject
 */
class GameObject {
    //Fields
    private _x      : number;
    private _y      : number;
    private _width  : number;
    private _height : number;
    private _scale  : number;
    
    //Properties
    public get x(): number          { return this._x;       }
    public set x(value: number)     { this._x = value;      }

    public get y(): number          { return this._y;       }
    public set y(value: number)     { this._y = value;      }

    public get width() : number     { return this._width;   }
    public set width(v : number)    { this._width = v;      }
    
    public get height() : number    { return this._height;  }
    public set height(v : number)   { this._height = v;     }

    public get scale(): number      { return this._scale;   }
    public set scale(value: number) { this._scale = value;  }
    /**
     * Basic game object
     * @param <x> x position
     * @param <y> y position
     */
    constructor(x: number, y: number) {
        this._x     = x;
        this._y     = y;
        this._scale = 1;
    }
    
    /**
     * Update function to override by child
     */
    public update() : void {
        
    }
    
    /**
     * Draw function to override by child
     */
    public draw() : void {
        
    }
}