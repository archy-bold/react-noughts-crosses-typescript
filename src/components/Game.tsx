import * as React from "react";

import { Board, EMPTY, FILLED_X, FILLED_O } from "./Board";

export interface BoardSquares { squares: number[] }
export interface GameProps {}
export interface GameState { history: BoardSquares[], xPlayedLast: boolean }

export class Game extends React.Component<GameProps, GameState> {
    constructor() {
        super();
        var squares: number[] = new Array<number>(9);
        for (var i:number = 0; i < 9; ++i) {
            squares[i] = EMPTY;
        }
        this.state = {
            history: [{squares: squares}],
            xPlayedLast: false
        };
    }

    valueToString(value: number) {
        return value == FILLED_X ? 'X' : (value == FILLED_O ? 'O' : '');
    }

    handleClick(i: number) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        // Handle no moves on this square
        if (this.calculateWinner(squares) || squares[i] != EMPTY) {
            return;
        }

        squares[i] = this.state.xPlayedLast ? FILLED_O : FILLED_X;

        this.setState({
            history: history.concat([{squares: squares}]),
            xPlayedLast: !this.state.xPlayedLast
        });
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = this.calculateWinner(current.squares);

        let status: string;
        if (winner) {
            status = 'Winner: ' + this.valueToString(winner);
        }
        else{
            status = 'Next player: ' + (this.state.xPlayedLast ? 'O' : 'X');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onClick={(i: number) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }

    calculateWinner(squares: number[]): number {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (var i:number = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }
}
