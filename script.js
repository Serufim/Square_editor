class Square {
    //Класс квадратв у него свойства ширина высота центр и левая верхняя точка, а еще цвет
    constructor(data, leftTopPosition) {
        this.width = data.width;
        this.color = data.color;
        this.centerPosition = [leftTopPosition[0] - this.width / 2, leftTopPosition[1] - this.width / 2];
        this.leftTopPosition = leftTopPosition;
    }
}

class Editor {
    //Клас самого редактора
    constructor() {
        this.squares = []; //массив квадратов
        this.canvas = document.getElementById("editor"); //канвас
        this.canvas.addEventListener('click', e => this.handleClick(e));
        this.ctx = this.canvas.getContext('2d');
    }

    getRandomColor() {
        //Случайный цвет
        var color = "";
        for (var i = 0; i < 3; i++) {
            var sub = Math.floor(Math.random() * 256).toString(16);
            color += (sub.length == 1 ? "0" + sub : sub);
        }
        return "#" + color;
    }

    checkSquares(cords) {
        //Проверка попадания в квадрат
        const {squares} = this;
        if (squares.length){
            for (let i = squares.length-1; i >-1; i--) {
                if ((squares[i].centerPosition[0] < cords[0] && squares[i].centerPosition[1] < cords[1]) && (squares[i].centerPosition[0] + squares[i].width > cords[0] && squares[i].centerPosition[1] + squares[i].width > cords[1])) {
                    return i
                }
            }
        }
        return false
    }

    getCursorPosition(event) {
        //Определяем координаты клика
        const {canvas} = this;
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        return [x, y];
    }

    handleClick(e) {
        //Проверяем принадлежность квадратикам
        const color = document.getElementById("myColor").value;
        const {squares} = this;
        const cords = this.getCursorPosition(e);
        const squareIndex = this.checkSquares(cords);
        if (squares && squareIndex!==false) {
            //Если мы непопали в квадрат, то создаем новый
            squares[squareIndex].color = color;
        } else {
            this.createSquare(e)
        }
        console.log(squares.length)
        this.drawSquares();
    }

    createSquare(e) {
        //Создаем квадрат
        let width = Math.floor(Math.random() * (50 - 20 + 1)) + 20;
        let color = this.getRandomColor();

        //Рисуем квадрат
        const cords = this.getCursorPosition(e);
        const newSquare = new Square({
            width: width,
            color: color
        }, cords);
        this.squares.push(newSquare);
    }

    drawSquares() {
        //Рисуем все квадраты из массива на канвасе
        const {ctx, canvas} = this;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let square of this.squares) {
            ctx.fillStyle = square.color;
            ctx.fillRect(square.centerPosition[0], square.centerPosition[1], square.width, square.width);
        }
    }
}

const editor = new Editor();