document.addEventListener('DOMContentLoaded', () => {
    const width = 10;
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.querySelector('#score');
    const startButton = document.querySelector('#start-button');
    let timerId;
    let score = 0;
    const colours =[
        'deepskyblue',
        'blue',
        'orange',
        'red',
        'green',
        'purple',
        'yellow'
    ]

    // Tetromino pieces
    const iTetromino = [
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1]
    ]

    const jTetromino = [
        [0, width, width+1, width+2],
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2, width*2+1]
        
    ]

    const lTetromino = [
        [width, width+1, width+2, 2],
        [1, width+1, width*2+1, width*2+2],
        [width*2, width, width+1, width+2],
        [1, width+1, width*2+1, 0]
    ]

    const zTetromino = [
        [0, 1, width+1, width+2],
        [2, width+1, width*2+1, width+2],
        [width, width+1, width*2+1, width*2+2],
        [1, width, width+1, width*2]
    ]

    const sTetromino = [
        [1, 2, width, width+1],
        [1, width+1, width+2, width*2+2],
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width*2+1]
    ]

    const tTetromino = [
        [1, width, width+1, width+2],
        [1, width+1, width+2, width*2+1],
        [width, width+1, width+2, width*2+1],
        [1, width, width+1, width*2+1]
    ]

    const oTetromino = [
        [1, 2, width+1, width+2],
        [1, 2, width+1, width+2],
        [1, 2, width+1, width+2],
        [1, 2, width+1, width+2]
    ]

    const tetrominos = [iTetromino, jTetromino, lTetromino, zTetromino, sTetromino, tTetromino, oTetromino];

    let currentPos = 3;
    let currentRot = 0;
    let nextRandom = Math.floor(Math.random()*tetrominos.length);

    // choose a random tetronimo
    let random = Math.floor(Math.random()*tetrominos.length);
    let current = tetrominos[random][currentRot];

    // draw a tetromino
    function draw() {
        current.forEach( index => {
            squares[currentPos + index].classList.add('tetromino');
            squares[currentPos + index].style.backgroundColor = colours[random];
        })
    }

    function undraw() {
        current.forEach(index => {
            squares[currentPos + index].classList.remove('tetromino');
            squares[currentPos + index].style.backgroundColor = "";
        })
    }

    // assign functions to keyCodes
    function control(e) {
        if(e.key === "ArrowLeft") {
            moveLeft();
        } else if (e.key === "ArrowRight") {
            moveRight();
        } else if (e.key === "ArrowUp") {
            rotate();
        } else if (e.key === "ArrowDown") {
            moveDown();
        } else if (e.key === " ") {

        }
    }
    document.addEventListener('keyup', control);

    function moveDown() {
        freeze();
        undraw();
        currentPos += width;
        draw();
    }

    function freeze() {
        if (current.some(index => squares[currentPos + index + width].classList.contains("block"))) {
            current.forEach(index => squares[currentPos + index].classList.add("block"));
            // create a new tetromino
            random = nextRandom;
            nextRandom = Math.floor(Math.random()*tetrominos.length);
            currentRot = 0;
            currentPos = 3;
            current = tetrominos[random][currentRot];
            draw();
            displayNext();
            addScore();
            gameOver();
        }
    }

    // move left, unless blocked
    function moveLeft() {
        undraw()
        const isAtLeftEdge = current.some(index => (currentPos + index)%width === 0);

        if (!isAtLeftEdge) {
            currentPos--;
        }
        // undo left movement if it is occupied by a block
        if (current.some(index => squares[currentPos + index].classList.contains("block"))) {
            currentPos++;
        }
        draw();
    }

    // move right, unless blocked
    function moveRight() {
        undraw()
        const isAtRightEdge = current.some(index => (currentPos + index)%width === width-1);

        if (!isAtRightEdge) {
            currentPos++;
        }
        // undo right movement if it is occupied by a block
        if (current.some(index => squares[currentPos + index].classList.contains("block"))) {
            currentPos--;
        }
        draw();
    }

    function rotate() {
        undraw();
        currentRot = (currentRot+1)%current.length;
        current = tetrominos[random][currentRot];
        draw();
    }

    // TODO: counter-clockwise rotate and slamming tetromino

    // show next tetromino on the display
    const displaySquares = document.querySelectorAll(".mini-grid div");
    const displayWidth = 4;
    let displayIndex = 0;

    // Tetromino initial positions
    const nextTetrominos = [
        [displayWidth, displayWidth+1, displayWidth+2, displayWidth+3], // itetromino
        [0, displayWidth, displayWidth+1, displayWidth+2],   // jtetromino
        [displayWidth, displayWidth+1, displayWidth+2, 2],  // ltetromino
        [0, 1, displayWidth+1, displayWidth+2],  // ztetromino
        [1, 2, displayWidth, displayWidth+1],  // stetromino
        [1, displayWidth, displayWidth+1, displayWidth+2],  // tTetromino
        [1, 2, displayWidth+1, displayWidth+2]   // otetromino
    ]

    // display next tetromino function
    function displayNext() {
        displaySquares.forEach(square => {
            square.classList.remove("tetromino");
            square.style.backgroundColor = "";
        })
        nextTetrominos[nextRandom].forEach( index => {
            displaySquares[displayIndex + index].classList.add("tetromino");
            displaySquares[displayIndex + index].style.backgroundColor = colours[nextRandom];
        });
    }

    // button functionality
    startButton.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        } else {
            draw()
            timerId = setInterval(moveDown, 1000);
            nextRandom = Math.floor(Math.random()*tetrominos.length)
            displayNext();
        }
    })

    // add score
    function addScore() {
        for (let i=0; i < 199; i+=width) {
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];

            if (row.every(index => squares[index].classList.contains("block"))) {
                score += 10;
                scoreDisplay.innerHTML = score;
                row.forEach(index => {
                    squares[index].classList.remove("block");
                    squares[index].classList.remove("tetromino");
                    squares[index].style.backgroundColor = "";
                })
                const squaresRemoved = squares.splice(i, width);
                squares = squaresRemoved.concat(squares);
                squares.forEach(cell => grid.appendChild(cell));
            }
        }
    }

    // game over
    function gameOver () {
        if (current.some(index => squares[currentPos + index].classList.contains("block"))) {
            scoreDisplay.innerHTML = "end";
            clearInterval(timerId);
        }
    }

})