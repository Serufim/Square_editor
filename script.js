class Square {
    constructor(data, leftTopPosition) {
        this.width = data.width;
        this.color = data.color;
        this.centerPosition = [leftTopPosition[0]-this.width/2,leftTopPosition[1]-this.width/2];
        this.leftTopPosition = leftTopPosition;
        this.selected = true
    }
    selectSquare(){
        this.selected = true
    }
}

class Editor {
    constructor() {
        this.squares = [];
        this.canvas = document.getElementById("editor");
        this.canvas.addEventListener('click', e => this.createSquare(e));
        this.ctx = this.canvas.getContext('2d');
        this.drawTestArc()
    }
    getRandomColor()
    {
        var color = "";
        for(var i = 0; i < 3; i++) {
            var sub = Math.floor(Math.random() * 256).toString(16);
            color += (sub.length == 1 ? "0" + sub : sub);
        }
        return "#" + color;
    }
    getCursorPosition(event) {
        const {canvas} = this;
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        return [x,y];
    }
    createSquare(e) {
        //Забираем значения из форм
        let width = document.getElementById("square-width").value;
        let color = document.getElementById("square-color").value;
        if (!width){
            width = Math.floor(Math.random() * (40 - 10 + 1)) + 10;
            color = this.getRandomColor();
        }
        //Рисуем квадрат
        const cords = this.getCursorPosition(e);
        const newSquare = new Square({
            width: width,
            color: color
        }, cords);
        console.log(color);
        this.squares.push(newSquare);
        this.drawSquares();
    }

    drawTestArc() {
        const {ctx} = this;
        ctx.beginPath();
        ctx.arc(100, 75, 50, 0, 2 * Math.PI);
        ctx.stroke();
    }

    drawSquares() {
        const {ctx} = this;
        for (let square of this.squares) {
            ctx.fillStyle=square.color;
            ctx.fillRect(square.centerPosition[0],square.centerPosition[1], square.width, square.width);
            if(square.selected){
                ctx.strokeStyle = "#000000";
                ctx.strokeRect(square.centerPosition[0]-1,square.centerPosition[1]-1, square.width, square.width);
            }
        }
    }
}

const editor = new Editor();