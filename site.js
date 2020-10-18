class TextInput extends React.Component {
    render = () => {
        var id = "A" + Date.now();
        var validationRule = '';
        var inputName = '';
        var inputType = '';
        if (this.props.inputName != undefined) {
            inputName = this.props.inputName;
        }// end if
        if (this.props.id != undefined) {
            id = this.props.id;
        }// end if
        if (this.props.rule != undefined) {
            validationRule = this.props.rule;
        }// end if
        if (this.props.type != undefined) {
            inputType = this.props.type;
        }// end if
        return React.createElement("div", {
            id: id,
            className: "txt-input",
            onClick: function () { return txtInputFocus(id); },
        }, React.createElement("input", {
            type: inputType,
            onFocus: function () { return txtInputFocus(id); },
            onBlur: function () { return txtInputFocusLoss(inputName); },
            onInput: function () { return validateInput(inputName, validationRule); }
        }), React.createElement("button", null, inputName));
    }// end render
}// end TextInput

//logic that hovers placeHolder text above input text box for text-input class
function txtInputFocus(inputDiv) {
    inputDiv = "#" + inputDiv.toString();
    var placeHolder = $(inputDiv).children("button");
    $(inputDiv).children("input").focus();
    if (placeHolder.css('top') != '0px') {
        return;
    }
    placeHolder.css({ 'fontSize': '75%' });
    placeHolder.css({ 'top': -placeHolder.height() + 'px' });
}// end txtInputFocus

//logic that hovers placeHolder text to normal for text-input class
function txtInputFocusLoss(input) {
    var placeHolder;
    $(".txt-input").map(function (index, element) {
        if (jQuery(element).children("button").html().toString() == input.toString()) {
            if (jQuery(element).children("input").val().length != 0) {
                return;
            }// end if 
            placeHolder = jQuery(element).children("button");
            placeHolder.css({ 'top': 0 + 'px' });
            placeHolder.css({ 'fontSize': 'initial' });
        }// end if
    });// end .map
}// end txtInputFocus

//logic that validates text input for textinput class
function validateInput(button, validationRule = '') {
    var placeHolder = -1;
    var inputElement;
    var inputDiv;
    var defaultColor = 'black';
    var typingColor = 'white';
    var successColor = 'greenyellow';
    var failColor = 'red';
    if (validationRule == "none") {
        placeHolder.css({ 'color': defaultColor });
        inputDiv.style.borderColor = defaultColor;
        return true;
    }
    $(".txt-input").map(function (index, element) {
        if (jQuery(element).children("button").html().toString() == button.toString()) {
            placeHolder = jQuery(element).children("button");
            inputDiv = $(".txt-input").get(index);
            inputElement = jQuery(element).children("input");
        }// end if
    });// end .map
    if (placeHolder == -1) {
        alert("failed");
        return false;
    }// end if
    else {
        if (inputElement.val().length == 0) {
            placeHolder.css({ 'color': defaultColor });
            inputElement.css({ 'color': defaultColor });
            inputDiv.style.borderColor = defaultColor;
            return false;
        }// end if 
        else {
            inputElement.css({ 'color': typingColor });
            inputDiv.style.borderColor = typingColor;
        }// end else
        if (validationRule == 'email') {

            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (regex.test(inputElement.val().toString())) {
                placeHolder.css({ 'color': successColor });
                inputDiv.style.borderColor = successColor;
                return true;
            }// end if
            else {
                placeHolder.css({ 'color': failColor });
                inputDiv.style.borderColor = failColor;
            }// end else
        }// end if
        if (validationRule == "") {
            placeHolder.css({ 'color': successColor });
            inputDiv.style.borderColor = successColor;
            return true;
        }// end if
    }// end else
    return false;
}// end validateInput 

//Logic that sets up webpage
function homeSetUp() {
    var inputs = [React.createElement(TextInput, { inputName: 'username', id: 'username', rule: 'none' }), React.createElement(TextInput, { inputName: 'password', id: 'password', rule: 'none', type: 'password' })]
    ReactDOM.render(React.createElement('div', null, inputs), document.getElementById("inputPlaceholder"));
    $("#loginBtn").css({ 'marginLeft': 'calc(50% - ' + ($("#loginBtn").width()) / 2 + 'px)' });
}// end homeSetUp
//Logic to login properly
function login() {
    var actionURL = "/Home/LoginAttempt";
    var inputUserName = $("#username").children("input").val();
    var inputPassword = $("#password").children("input").val();
    $.get(actionURL, { username: inputUserName, password: inputPassword}, function (data, status) {
        if (data == 'Invalid') {
            $("#errorMessage").css({ 'color': 'red' });
        }// end if
        else {
            $("#errorMessage").css({ 'color': 'transparent' });
            $(".form-title").html("Login Successful!");
            var count = 0;
            var pastChars = 0;
            var count2;
            var seperatedData = ["","","",""];
            var placeHolder = "";
            for (count2 = 0; count2 < 4; count2++) {
                for (count = pastChars; count < data.length; count++) {
                    if (data[count] == "!") {
                        pastChars++;
                        break;
                    }// end if
                    placeHolder += data[count];
                    pastChars++;
                }// end for
                seperatedData[count2] = placeHolder;
                placeHolder = "";
            }// end for loop
            var message = "Welcome back " + seperatedData[0] + " " + seperatedData[1] + ", your user name is " + seperatedData[2];
            ReactDOM.render(React.createElement('div', { id: 'loginMessage' }, message), document.getElementById("inputPlaceholder"));
            $("#loginBtn").html("Logout");
            document.getElementById("loginBtn").onclick = function () { location.reload()}; 
        }// end else
    });
}// end login
