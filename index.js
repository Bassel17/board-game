const boardGenerator = new BoardGenerator();
const Board = boardGenerator.generateGameBoard();
const boardRenderer = new BoardRenderer(Board,document);
const renderedBoard = boardRenderer.renderStructure();
console.log(renderedBoard);
const root = document.getElementById("root");
root.appendChild(renderedBoard);