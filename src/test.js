import test from 'ava';
import deepFreeze from 'deep-freeze';
import {tickTactoeReducer} from './reducers';
import {MARK_BOARD} from './reducers';
import {calculateWinner} from './index';

console.log(tickTactoeReducer);

const reducer = tickTactoeReducer;

test.beforeEach(t => {
    t.context.state = {
        current_squares: Array(9).fill(null),
        stepNumber: 0,
        history: [{squares: Array(9).fill(null)}],
        xIsNext: true
    };
});

test('default values test', t => {
    let action = {
        type: 'IWONDER',
        i: 0
    };

    let expectedResult = {
        current_squares: Array(9).fill(null),
        stepNumber: 0,
        history: [{squares: Array(9).fill(null)}],
        xIsNext: true
    };
    t.deepEqual(tickTactoeReducer(undefined, action), expectedResult);
});

test('X marks the treasure', t => {
    let action = {
        type: MARK_BOARD,
        i: 4
    };

    // test context NOT modified
    deepFreeze(t.context.state);

    let expectedResult = {
        current_squares: Array(9).fill(null),
        stepNumber: 1,
        history: [{squares: Array(9).fill(null)}, {squares: Array(9).fill(null)}],
        xIsNext: false
    };
    expectedResult.current_squares[action.i] = 'X';

    t.deepEqual(tickTactoeReducer(t.context.state, action), expectedResult);
});


test('O marks the treasure', t => {
    let action = {
        type: MARK_BOARD,
        i: 4
    };

    // test context NOT modified
    deepFreeze(t.context.state);

    let expectedResult = {
        current_squares: Array(9).fill(null),
        stepNumber: 1,
        history: [{squares: Array(9).fill(null)}, {squares: Array(9).fill(null)}],
        xIsNext: false
    };
    expectedResult.current_squares[action.i] = 'X';

    t.deepEqual(tickTactoeReducer(t.context.state, action), expectedResult);
});

test('No winner no cry', t => {
    let squares = Array(9).fill(null);
    let result = calculateWinner(squares);
    t.deepEqual(result, null);
    //t.is
});

test('Make the X great again', t => {
    let squares = Array(9).fill(null);
    squares[3] = squares[4] = squares[5] = 'X';
    let result = calculateWinner(squares);
    t.deepEqual(result, 'X');
});

// TODO test react components
