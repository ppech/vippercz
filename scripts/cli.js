var functions = {
    getHelp: function () { location.href = '/help'; },
    getChildItem: function () { location.href = '/sitemap'; },
    clearHost: function () { location.href = '/' }
};
var commands = {
    'help': functions.getHelp,
    'Get-Help': functions.getHelp,
    'dir': functions.getChildItem,
    'Get-ChildItem': functions.getChildItem,
    'cls': functions.clearHost,
    'Clear-Host': functions.clearHost
};

function tryRunCommand(commandName) {
    var f = commands[commandName];
    if (f) {
        setTimeout(f, 100);
        return true;
    }
    return false;
}

var suggestions = null;
var suggestionIndex = -1;

function getSuggestion(suggestion, commandName) {
    if (suggestions == null) {
        suggestions = [];
        for (var key in commands) {
            if (key.toLowerCase().startsWith(commandName.toLowerCase())) {
                suggestions.push(key);
            }
        }
    }

    if (suggestions.length > 0) {
        suggestionIndex++;
        if (suggestionIndex == suggestions.length)
            suggestionIndex = 0;
        suggestion.textContent = suggestions[suggestionIndex].substr(commandName.length);

    }
}

function commitSuggestion(input, suggestion) {
    if (suggestionIndex > -1) {
        input.textContent = suggestions[suggestionIndex];
        suggestion.textContent = '';
    }
    clearSuggestions(suggestion);
}
function clearSuggestions(suggestion) {
    if (suggestions) {
        suggestions = null;
        suggestionIndex = -1;
        suggestion.textContent = '';
        return true;
    }
    return false;
}

$(document).ready(function () {

    var input = document.getElementById('commandInput');
    var suggestion = document.getElementById('commandSuggestion');

    document.body.addEventListener("keypress", function (event) {
        if (document.activeElement == null || document.activeElement == document.body) {
            var x = event.charCode || event.keyCode;
            if (x >= 64 && x <= 90 || x >= 97 && x <= 122 || x >= 48 && x <= 57 || x == 45) { // A-Za-z0-9-
                input.textContent += String.fromCharCode(x);
                clearSuggestions(suggestion);
            }
            else if (x == 32) { // space
                input.textContent += " ";
                clearSuggestions(suggestion);
            }
        }
    });

    document.body.addEventListener("keydown", function (event) {
        if (document.activeElement == null || document.activeElement == document.body) {
            var x = event.charCode || event.keyCode;
            if (x == 8) { // backspace
                event.preventDefault();
                if (!clearSuggestions(suggestion)) {
                    if (input.textContent.length > 0) {
                        input.textContent = input.textContent.substr(0, input.textContent.length - 1);
                    }
                }
            }
            else if (x == 13) { // enter
                event.preventDefault();
                commitSuggestion(input, suggestion);
                tryRunCommand(input.textContent);
            }
            else if (x == 9) { // tab
                event.preventDefault();
                getSuggestion(suggestion, input.textContent);
            }
        }
    });
});
