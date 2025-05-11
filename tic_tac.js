document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resetBtn = document.getElementById('resetBtn');
    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellPlayed(clickedCell, clickedIndex) {
        gameState[clickedIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add('taken');
    }

    function handlePlayerChange() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    }

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            const a = gameState[winCondition[0]];
            const b = gameState[winCondition[1]];
            const c = gameState[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            status.textContent = `Player ${currentPlayer} has won!`;
            gameActive = false;
            return;
        }

        let roundDraw = !gameState.includes('');
        if (roundDraw) {
            status.textContent = "Game ended in a draw!";
            gameActive = false;
            return;
        }
    }

    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameState[clickedIndex] !== '' || !gameActive) {
            return;
        }

        handleCellPlayed(clickedCell, clickedIndex);
        handleResultValidation();

        if (gameActive) {
            handlePlayerChange();
        }
    }

    function handleRestartGame() {
        currentPlayer = 'X';
        gameActive = true;
        gameState = ['', '', '', '', '', '', '', '', ''];
        status.textContent = `Player ${currentPlayer}'s turn`;
        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('taken');
        });
    }

    board.addEventListener('click', handleCellClick);
    resetBtn.addEventListener('click', handleRestartGame);
});
