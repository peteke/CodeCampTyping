var randomText = 'Wrong do point avoid by fruit learn or in death. So passage however besides invited comfort elderly be me. Walls began of child civil am heard hoped my. Satisfied pretended mr on do determine by. Old post took and ask seen fact rich. Man entrance settling believed eat joy. Money as drift begin on to. Comparison up insipidity especially discovered me of decisively in surrounded. Points six way enough she its father. Folly sex downs tears ham green forty.';
var wordsInText = randomText.split(' ');
var numberOfWords = wordsInText.length;
var typedChars = [];
var startTime;
var gameRunning = false;

$(document).ready(function () {
    $("#start").click(function () {
        htmlWords = "<span id='X'>" + wordsInText.join("</span> <span id='X'>") + "</span>";
        htmlWords2 = tokenize(htmlWords);
        $("#targettext").html(htmlWords2);
        typedChars = [];
        $("#typing").val('');
        $("#wpm").val(0);
        $("#typing").focus();
        $("#typing").keyup(function (event) { handleKeypress(event.keyCode); });
        startTime = moment();
        startMonitoring();
        gameRunning = true;
    });
});

function tokenize(s) {
    var result = [];
    var lastIndex = 0;
    var spans = 1;
    for (var k = 0; k < s.length; k++)
    {
        if ((s.charAt(k) == "'" && s.charAt(k + 1) == 'X') || k == s.length - 1)
        {
            var start = s.substring(lastIndex, k);
            if (k == s.length - 1)
                start += ">"
            else
                start += "'" + spans++;
            result.push(start);
            lastIndex = k + 2;
        }
    }
    return result.join(''); 
}

function handleKeypress(keyCode) {
    // space or dot
    if (keyCode === 32 || keyCode === 46) {
        gameLoop();
    }
};

function gameLoop() {
    if (gameRunning) {
        wordCount = 0;
        wordsTyped = $("#typing").val().split(' ');
        var minutes;
            for (var k = 0; k < wordsTyped.length; k++) {
            if (wordsTyped[k] === wordsInText[k]) {
                wordCount++;
                $("#targettext #" + (k + 1)).removeClass("r");
                $("#targettext #" + (k + 1)).addClass("g");
            }
            else if (wordsTyped[k] !== wordsInText[k] && k <= wordsTyped.length) {
                $("#targettext #" + (k + 1)).removeClass("g");
                $("#targettext #" + (k + 1)).addClass("r");
            }
        }
        minutes = moment().diff(startTime) / 1000 / 60;
        if (wordsTyped.length > numberOfWords) {
            gameRunning = false;
            alert('Game complete! Result: ' + parseInt(minutes * 60) + 's.')
        } 
        wpm = wordCount / minutes;
        $("#wpm").val(parseInt(wpm) + " (Correct words: " + wordCount + "/" + wordsTyped.length + ", Time: " + parseInt(minutes * 60) + "s)");
    }
}

function startMonitoring() {
    gameLoop();
    setTimeout('startMonitoring()', 500);
}