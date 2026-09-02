// ==========================================
// GET ELEMENTS
// ==========================================

const display = document.getElementById("display");
const previous = document.getElementById("previous");


// APPEND VALUE


function appendValue(value) {

    if (display.value === "0") {
        display.value = value;
    }

    else {
        display.value += value;
    }
}


// ==========================================
// SCIENTIFIC FUNCTION
// ==========================================

function appendFunction(functionName) {

    if (display.value === "0") {

        display.value = functionName + "(";

    }

    else {

        display.value += functionName + "(";

    }
}


// ==========================================
// CLEAR
// ==========================================

function clearDisplay() {

    display.value = "0";

    previous.textContent = "";
}


// ==========================================
// DELETE
// ==========================================

function deleteLast() {

    if (
        display.value.length <= 1 ||
        display.value === "Error"
    ) {

        display.value = "0";

    }

    else {

        display.value =
            display.value.slice(0, -1);

    }
}


// ==========================================
// SQUARE
// ==========================================

function square() {

    if (display.value !== "0") {

        display.value += "^2";

    }
}



// DEGREE TO RADIAN


function toRadians(degree) {

    return degree * Math.PI / 180;

}


// CALCULATE


function calculate() {

    let expression = display.value;


    if (
        expression === "" ||
        expression === "0"
    ) {
        return;
    }


    try {

        
        // Save previous expression
        
        previous.textContent =
            expression + " =";


        
        // Convert PI
    
        expression =
            expression.replaceAll(
                "π",
                "Math.PI"
            );


        
        // Square Root
       

        expression =
            expression.replaceAll(
                "sqrt(",
                "Math.sqrt("
            );


        
        // SIN
        
        expression =
            expression.replaceAll(
                "sin(",
                "Math.sin(toRadians("
            );


        
        // COS
     

        expression =
            expression.replaceAll(
                "cos(",
                "Math.cos(toRadians("
            );


        // TAN
     

        expression =
            expression.replaceAll(
                "tan(",
                "Math.tan(toRadians("
            );


        // Replace brackets
        

        expression =
            expression
                .replaceAll("[", "(")
                .replaceAll("]", ")")
                .replaceAll("{", "(")
                .replaceAll("}", ")");

         // Power
        

        expression =
            expression.replaceAll(
                "^",
                "**"
            );


        // Percentage

        expression =
            expression.replace(
                /(\d+(?:\.\d+)?)%/g,
                "($1/100)"
            );


        // Calculate
    

        const result =
            Function(
                `"use strict"; return (${expression})`
            )();



        // Check result
        

        if (
            typeof result === "number" &&
            Number.isFinite(result)
        ) {

            display.value =
                Number(
                    result.toFixed(10)
                );

        }

        else {

            display.value = "Error";

        }

    }

    catch (error) {

        console.error(error);

        display.value = "Error";

    }
}


document.addEventListener(
    "keydown",
    function(event) {

        const key = event.key;


        // Numbers
        if (
            key >= "0" &&
            key <= "9"
        ) {

            appendValue(key);

        }


        // Operators
        else if (
            key === "+" ||
            key === "-" ||
            key === "*" ||
            key === "/" ||
            key === "%"
        ) {

            appendValue(key);

        }


        // Brackets
        else if (
            key === "(" ||
            key === ")" ||
            key === "[" ||
            key === "]" ||
            key === "{" ||
            key === "}"
        ) {

            appendValue(key);

        }


        // Decimal
        else if (key === ".") {

            appendValue(".");

        }


        // Enter
        else if (key === "Enter") {

            calculate();

        }


        // Backspace
        else if (key === "Backspace") {

            deleteLast();

        }


        // Escape
        else if (key === "Escape") {

            clearDisplay();

        }

    }
);