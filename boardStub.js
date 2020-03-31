const board =
[
    [
        { id: [0, 0], symbol: '*' },
        { id: [1, 0], symbol: '*' },
        { id: [2, 0], symbol: ' ' },
        { id: [3, 0], symbol: ' ' }
    ], [
        { id: [0, 1], symbol: '$' },
        { id: [1, 1], symbol: '*' },
        { id: [2, 1], symbol: '/' },
        { id: [3, 1], symbol: '*' }
    ], [
        { id: [0, 2], symbol: '*' },
        { id: [1, 2], symbol: '-' },
        { id: [2, 2], symbol: '*' },
        { id: [3, 2], symbol: ' ' }
    ], [
        { id: [0, 3], symbol: ':' },
        { id: [1, 3], symbol: '*' },
        { id: [2, 3], symbol: '*' },
        { id: [3, 3], symbol: '|' }
    ]
];



module.exports = board;