import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {tickTactoeReducer} from "./reducers";
import {MARK_BOARD} from './reducers';
import {BACK_TO_THE_FUTURE} from './reducers';

if(typeof window !== 'undefined') {
    require('./index.css');
}

const store = createStore(tickTactoeReducer);

function Square(props) {
    return (
        <button className="square" onClick={() => props.onClick()}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>;
    }

    render() {

        return (
            <div>
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
}

class Game extends React.Component {
    handleClick(i) {
        // TODO move all logic to state
        if (calculateWinner(this.props.st.current_squares) || this.props.st.current_squares[i]) {
            return;
        }
        store.dispatch({
            type: this.props.mb,
            i: i
        });
    }

    jumpTo(step) {
        store.dispatch({
            type: this.props.btf,
            step: step
        });
    }


    render() {
        const history = this.props.st.history;
        const current = this.props.st.current_squares;
        const winner = calculateWinner(current);
        const moves = history.map((step, move) => {
            const desc = move ?
                'Move #' + move :
                'Game start';
            return (
                <li key={move}>
                    <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.props.st.xIsNext ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

export const calculateWinner = (squares) => {
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
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
};
// ========================================


const render = () => {
    if(typeof window !== 'undefined') {
        ReactDOM.render(
            <Game st={store.getState()} mb={MARK_BOARD} btf={BACK_TO_THE_FUTURE}/>,
            document.getElementById('container')
        );
    }
};


store.subscribe(render);
render();

/*

 Display the move locations in the format "(1, 3)" instead of "6".
 Bold the currently-selected item in the move list.
 Rewrite Board to use two loops to make the squares instead of hardcoding them.
 Add a toggle button that lets you sort the moves in either ascending or descending order.
 When someone wins, highlight the three squares that caused the win.

 //    "build" : "webpack -p",
 //    "dev": "webpack -d --watch",
 "webpack": "^2.2.1"

 */

