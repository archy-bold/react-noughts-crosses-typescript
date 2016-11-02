import * as React from "react";

export interface SquareProps { value: string, onClick: (() => void) }

export function Square(props: SquareProps) {
    return (
        <button className="square" onClick={() => props.onClick()}>
            {props.value}
        </button>
    );
}
