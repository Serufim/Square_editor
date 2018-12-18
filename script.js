class Square {
    //Класс квадратв у него свойства ширина высота центр и левая верхняя точка, а еще цвет
    constructor(data, leftTopPosition) {
        this.width = data.width;
        this.color = data.color;
        this.centerPosition = [leftTopPosition[0] - this.width / 2, leftTopPosition[1] - this.width / 2];
        this.leftTopPosition = leftTopPosition;
        this.selected = false
    }

    selectSquare() {
        this.selected = true
    }
}

class Editor {
    //Клас самого редактора
    constructor() {
        this.squares = []; //массив квадратов
        this.canvas = document.getElementById("editor"); //канвас
        this.canvas.addEventListener('click', e => this.handleClick(e));
        document.querySelector("#pushButton").addEventListener('click', e => this.pushSquare())
        this.ctx = this.canvas.getContext('2d');
    }

    pushSquare() {
        //Толкаем квадрат вверх
        const {squares} = this;
        squares.forEach(item => {
            if (item.selected) {
                if (item.leftTopPosition[1] - item.width / 2 > 0) {
                    item.leftTopPosition[1] = item.leftTopPosition[1] - 10;
                    item.centerPosition[1] = item.centerPosition[1] - 10;
                }
            }
        });
        this.drawSquares()
        // pushedSquare.leftTopPosition[1]-=10;
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
        for (let i = squares.length - 1; i >= 0; i--) {
            if ((squares[i].centerPosition[0] < cords[0] && squares[i].centerPosition[1] < cords[1]) && (squares[i].centerPosition[0] + squares[i].width > cords[0] && squares[i].centerPosition[1] + squares[i].width > cords[1])) {
                squares.forEach(item => item.selected = false);
                squares[i].selectSquare();
                this.drawSquares();
                return true
            }
        }
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
        const cords = this.getCursorPosition(e);
        if (this.squares && this.checkSquares(cords)) {
            //Если мы непопали в квадрат, то создаем новый
        } else {
            this.createSquare(e)
        }
    }

    createSquare(e) {
        //Создаем квадрат
        let width = Math.floor(Math.random() * (40 - 10 + 1)) + 10;
        let color = this.getRandomColor();

        //Рисуем квадрат
        const cords = this.getCursorPosition(e);
        const newSquare = new Square({
            width: width,
            color: color
        }, cords);
        this.squares.push(newSquare);
        this.squares.forEach(item => item.selected = false);
        this.drawSquares();
    }


    drawSquares() {
        //Рисуем все квадраты из массива на канвасе
        const {ctx, canvas} = this;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let square of this.squares) {
            ctx.fillStyle = square.color;
            ctx.fillRect(square.centerPosition[0], square.centerPosition[1], square.width, square.width);
            if (square.selected) {
                ctx.strokeStyle = "#000000";
                ctx.strokeRect(square.centerPosition[0] - 1, square.centerPosition[1] - 1, square.width, square.width);
            }
        }
    }
}

const editor = new Editor();