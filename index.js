angular
.module('gamesApp', [])
.controller('gamesController', function ($scope) {
    $scope.title = 'Wesley Games';
    $scope.playing = false;
    $scope.currentUrl = '';
    // |-----------testing and development---------------|
    //  Pre-alpha - Alpha - Beta - Release Candidate (RC)
    // |-----------------------------release-----------------------------|
    //  Release to Manufactoring (RTM) - General Availability (GA) - GOLD
    $scope.games = [
        { title: 'Genius (RC)', description: 'Test', icon: 'genius.png', url: 'games/genius/index.html' },
        { title: 'Ping-Pong (RC)', description: 'Test', icon: 'ping-pong.png', url: 'games/ping-pong/index.html' },
        { title: 'Minesweeper (RC)', description: 'Test', icon: 'minefield.png', url: 'games/minefield/index.html' },
        { title: 'Infinity Run (RC)', description: 'Test', icon: 'infinity-run.png', url: 'games/infinity-run/index.html' },
        { title: 'Plataform (RC)', description: 'Test', icon: 'platform-test.png', url: 'games/plataform-test/index.html' },
        // { title: 'Deck (Beta)', description: 'Test', icon: 'default.png', url: 'baralho-test/index.html' },
        // { title: 'Race (Pre-alpha)', description: 'Test', icon: 'default.png', url: 'corrida-test/index.html' },
        // { title: 'Planet (Pre-alpha)', description: 'Test', icon: 'default.png', url: 'planet-test/index.html' },
    ];
    $scope.changeUrl = function (url) {
        $scope.playing = true;
        $scope.currentUrl = url;
    }
    $scope.exit = function () {
        $scope.playing = false;
    }
})
.directive('matrixRain', function () {
    return {
        link: function link(scope, element) {
            el = element[0];
            el.width = window.screen.width;
            el.height = window.screen.height;
            var yPositions = Array(300).join(0).split('');
            var context = el.getContext("2d");
            var Matrix = function () {
                context.fillStyle = 'rgba(255,255,255,.05)';
                context.fillRect(0, 0, el.width, el.height);
                context.fillStyle = "#aaa";
                yPositions.map(function (y, index) {
                    text = String.fromCharCode(1e2 + Math.random() * 33);
                    x = (index * 10) + 10;
                    context.fillText(text, x, y);
                    (y > 100 + Math.random() * 1e4) ? yPositions[index] = 0 : yPositions[index] = y + 10;
                });
            };
            setInterval(Matrix, 30);
        }
    }
});