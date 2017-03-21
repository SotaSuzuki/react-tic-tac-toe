// Extra TODOs
// ---------------------------------------------
// - Display the move locations in the format "(1, 3)" instead of "6".
// - Bold the currently-selected item in the move list.
// - Rewrite Board to use two loops to make the squares instead of hardcoding them.
// - Add a toggle button that lets you sort the moves in either ascending or descending order.
// - When someone wins, highlight the three squares that caused the win.

var React = require('react');
var Board = require('./Board');

var Game = React.createClass({
    getInitialState: function() {
        return {
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ],
            stepNumber: 0,
            xIsNext: true
        };
    },

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) ? false : true // 偶数番手なら false 、そうでなければ true
        });
    },

    handleClick(i) {
        // 1. 勝敗が決まった後、やり直しができないモード
        // let history = this.state.history;

        // 2. やり直しができるモード
        let history = this.state.history.slice(0, this.state.stepNumber + 1);

        let current = history[history.length - 1];
        let squares = current.squares.slice();

        // 既に勝者が決まっている場合、またはマスが埋まっている場合に return させる
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            // history を追加する
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    },

    render: function() {
        let history = this.state.history;
        let current = history[this.state.stepNumber];
        let winner = calculateWinner(current.squares);
        let status;

        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        // 引数の step は item
        //        move は index
        //
        // const moves = history.map(function(step, move) {
        // NOTE: 上記のように書いた場合 this が上手く動作しないため下記のように記述。ES6 勉強しよう・・・。
        // history.map(() => {}) この形、難しい。
        const moves = history.map((step, move) => {
            // 初期状態では 'Game Start' が表示される
            let desc = move ?
                'Move #' + move :
                'Game Start';
            return (
                <li key={move}>
                    <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
                </li>
            );
        });

        return (
            <div className="layout-container">
                <Board
                  squares={current.squares}
                  onClick={(i) => this.handleClick(i)} />
                <div className="game-info">
                    <div className="status">{status}</div>
                    <ol className="moves">{moves}</ol>
                </div>
            </div>
        );
    }
});

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        let [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            console.log(a, b, c); //TODO: あとで消す
            return squares[a];
        }
    }
    return null;
}

module.exports = Game;
