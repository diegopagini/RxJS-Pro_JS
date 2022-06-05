/** @format */
import { merge } from 'rxjs';
import { scan, startWith, takeWhile, tap } from 'rxjs/operators';

import { computerMove$, simulateComputerTurn } from './computerMove';
import { userMove$ } from './userMove';

//pure function to find out empty cells
export const getEmptyCells = (board) => {
	const emptyCells = [];
	//detect empty cells
	for (let x = 0; x < board.length; x++) {
		for (let y = 0; y < board[0].length; y++) {
			if (board[y][x] == 0) {
				emptyCells.push({ x, y });
			}
		}
	}
	return emptyCells;
};

//pure function to find out which player have won (if any)
const findOutWinner = (board) => {
	//check rows and cols
	for (let i = 0; i < 3; i++) {
		if (
			board[i][0] &&
			board[i][0] == board[i][1] &&
			board[i][1] == board[i][2]
		) {
			return board[i][0];
		} else if (
			board[0][i] &&
			board[0][i] == board[1][i] &&
			board[1][i] == board[2][i]
		) {
			return board[0][i];
		}
	}
	//check diagonals
	if (
		(board[0][0] && board[0][0] == board[1][1] && board[1][1] == board[2][2]) ||
		(board[2][0] && board[2][0] == board[1][1] && board[1][1] == board[0][2])
	) {
		return board[1][1];
	}

	return null;
};

//update state
const updateGameState = (gameState, move) => {
	if (!move) return gameState;
	let updatedBoard = [...gameState.board];
	updatedBoard[move.y][move.x] = gameState.nextPlayer;
	const haveEmptyCells =
		getEmptyCells(updatedBoard).length === 0 ? false : true;
	let finished = !haveEmptyCells;
	const winner = findOutWinner(updatedBoard);
	if (winner) finished = true;

	return {
		board: updatedBoard,
		nextPlayer: gameState.nextPlayer === 1 ? 2 : 1,
		finished,
		winner,
	};
};

//initial game state
const initialGame = {
	board: Array(3)
		.fill()
		.map(() => Array(3).fill(0)),
	nextPlayer: 1,
	finished: false,
	winner: null,
};

//main observable with the game logic. Right now only emiting the board
export const game$ = merge(userMove$, computerMove$).pipe(
	startWith(),
	scan(updateGameState, initialGame),
	tap((state) => {
		if (state.nextPlayer === 2 && !state.finished)
			simulateComputerTurn(getEmptyCells(state.board));
	}),
	takeWhile(({ finished }) => finished == false, true)
);
