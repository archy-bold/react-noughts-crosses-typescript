import * as React from "react";

import { Square } from "./Square.tsx";

export interface BoardProps {}
export interface BoardState { squares: number[], xPlayedLast: boolean }

const EMPTY: number = 0;
const FILLED_X: number = 1;
const FILLED_O: number = 2;

export class Board extends React.Component<BoardProps, BoardState> {
    constructor() {
        super();
        var squares:number[] = new Array<number>(9);
        for (var i:number = 0; i < 9; ++i) {
            squares[i] = 0;
        }
        this.state = {
            squares: squares,
            xPlayedLast: false
        };
    }

    valueToString(value: number) {
        return value == FILLED_X ? 'X' : (value == FILLED_O ? 'O' : '');
    }

    handleClick(i: number) {
        const squares = this.state.squares.slice();

        // Handle no moves on this square
        if (this.calculateWinner(squares) || squares[i] != EMPTY) {
            return;
        }

        squares[i] = this.state.xPlayedLast ? FILLED_O : FILLED_X;

        this.setState({
            squares: squares,
            xPlayedLast: !this.state.xPlayedLast
        });
    }

    renderSquare(i: number) {
        return <Square value={this.valueToString(this.state.squares[i])} onClick={() => this.handleClick(i)} />;
    }

    render() {
        const winner = this.calculateWinner(this.state.squares);
        let status: string;
        if (winner) {
            status = 'Winner: ' + this.valueToString(winner);
        }
        else{
            status = 'Next player: ' + (this.state.xPlayedLast ? 'O' : 'X');
        }
        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
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
