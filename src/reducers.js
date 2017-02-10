export const MARK_BOARD = Symbol('MARK_BOARD');
export const BACK_TO_THE_FUTURE = Symbol('BACK_TO_THE_FUTURE');


const markSquare = (list, index, xIsNext) => {
    return [...list.slice(0, index), xIsNext ? 'X' : 'O', ...list.slice(index + 1)];
};
// TODO middleware and https://github.com/evgenyrodionov/redux-logger
// TODO check https://github.com/fbsamples/f8app/tree/master/js

const markBoard = (state, i) => {
    let history = [...state.history.slice(), {squares: state.current_squares.slice()}];
    let current_squares = markSquare(state.current_squares, i, state.xIsNext);
    let stepNumber = state.stepNumber + 1;
    let xIsNext = !(stepNumber % 2);


    return {...state, current_squares, stepNumber, history, xIsNext};
    /*ES5 return Object.assign({}, state, {
        current_squares,
        stepNumber,
        history,
        xIsNext
    });*/
};

const btf = (state, step) => {
    let stepNumber = step;
    let current_squares = [...state.history[stepNumber].squares.slice()];
    let xIsNext = !(stepNumber % 2);
    let history = [...state.history.slice(0, step)];

    return {...state, current_squares, stepNumber, history, xIsNext};
    /* ES5 return Object.assign({}, state, {
        current_squares,
        stepNumber,
        history,
        xIsNext
    });*/
};


// TODO combineStore
export const tickTactoeReducer = (state, action) => {
    if (typeof state === 'undefined') {
        return {
            current_squares: Array(9).fill(null),
            stepNumber: 0,
            history: [{squares: Array(9).fill(null)}],
            xIsNext: true
        };
    }

    switch (action.type) {
        case MARK_BOARD: {
            return markBoard(state, action.i);
        }
        case BACK_TO_THE_FUTURE: {
            return btf(state, action.step);
        }
        default:
            return state;
    }
};

/* node.js not allowing export
exports.tickTactoeReducer = tickTactoeReducer;
exports.BACK_TO_THE_FUTURE = BACK_TO_THE_FUTURE;
exports.MARK_BOARD = MARK_BOARD;*/
