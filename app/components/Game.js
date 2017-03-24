import React, { Component } from 'react';
import Board from './Board';

class Game extends Component {
    constructor() {
        super();
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ],
            stepNumber: 0,
            xIsNext: true
        };
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) ? false : true // 偶数番手なら false 、そうでなければ true
        });
    }

    handleClick(i) {
        // 1. 勝敗が決まった後、やり直しができないモード
        // let history = this.state.history;

        // 2. やり直しができるモード
        let history = this.state.history.slice(0, this.state.stepNumber + 1);

        let current = history[history.length - 1];
        let squares = current.squares.slice();

        // 既に勝者が決まっている場合、またはマスが埋まっている場合は何も起きない（即 return )
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
    }

    render () {
        let history = this.state.history;
        let current = history[this.state.stepNumber];
        let winner = calculateWinner(current.squares);
        let status;

        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        // 引数の step は 配列の item
        //        move は 配列の index

        // () => hoge ... この形は無名関数を作っていることがわかった
        const moves = history.map((step, move) => {
            // 初期状態では 'Game Start' を表示させる
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
}

function calculateWinner(squares) {
    // 横一列、縦一列、斜め一列をマトリックスで表している
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
            // 同じ文字列（Xか0）が並べば、並んだ文字列を返す
            // 返ったものが勝者
            return squares[a];
        }
    }
    return null;
}

export default Game;
