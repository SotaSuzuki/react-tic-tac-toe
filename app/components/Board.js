var React = require('react');
var Square = require('./Square');

var Board = React.createClass({
    // NOTE: 注意ポイント
    // (1) 普通の function 構文では index 値が渡せず、上手くいかなかった。（無限ループに陥った）なので、不思議構文を採用している。要調査。

    renderSquare: function(i) {
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
        // (2) ここでは onClick にアロー演算子を使用する。さもなければ無限ループしてしまう。
        // 2017/03/21 追記: 引数と関係がありそう・・・
    },

    render: function() {
        return (
            <div className="game-board">
                <div className="row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
});

module.exports = Board;
