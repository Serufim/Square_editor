class Square {
    constructor(data, centerPosition) {
        this.width = data.width ? data.width : this.getRandom("width");
        this.height = data.height ? data.height : this.getRandom("height");
        this.color = data.color ? data.color : this.getRandom("color");
        this.centerPosition = centerPosition;
        this.leftTopPosition = [centerPosition[0] - this.width / 2, centerPosition[1] - this.height / 2];
    }
}

class Editor {
    constructor() {
        this.squares = [];
        const canvas = document.getElementById("editor");
        canvas.addEventListener('click', e => this.createSquare(e));
        this.ctx = canvas.getContext('2d');
        this.drawTestArc()
    }

    createSquare(e) {
        //Забираем значения из форм
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
            ctx.fillRect(square.leftTopPosition[0], square.leftTopPosition[0], square.width, square.height);
        }
    }
}

const editor = new Editor();