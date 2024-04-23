const [rMin, rMax] = [1., 3.];

const graphTop = 0;
const graphBottom = 10;
const graphLeft = 0;
const graphRight = 10;
const centerX = (graphRight + graphLeft) / 2
const centerY = (graphTop + graphBottom) / 2
const cellCount = 10
const cellSize = (graphRight - graphLeft) / cellCount
const lineWidth = 0.04;
const padding = 0.2;

const canvas = document.getElementById("graph-canvas");
canvas.addEventListener("click", sendPoint);
let old_r = null;
const context = canvas.getContext("2d");
context.scale(25, 25);
updateGraph();

function sendPoint(event) {
    let x = -6 + event.layerX / 25;
    x = x.toFixed(6);
    let y = 6 - event.layerY / 25;
    y = y.toFixed(6);
    shoot([{"name": "x", "value": x}, {"name": "y", "value": y}, {"name": "r", "value": old_r}]);
}

function addPoint(x, y, inArea) {
    if (inArea) {
        context.fillStyle = "rgba(0, 0, 139, 0.8)";
    } else {
        context.fillStyle = "rgba(139, 0, 0, 0.8)"
    }
    context.beginPath();
    context.arc(centerX + x, centerY - y, 0.1, 0, Math.PI * 2);
    context.fill();
}

function drawPoints() {
    const shotRows = document.querySelectorAll('#table-results tbody tr')
    shotRows.forEach(row => {
        const cells = row.querySelectorAll('td');
        console.log(parseFloat(cells[2].innerText));
        if (cells.length !== 5 && parseFloat(cells[2].innerText) !== old_r) return;
        addPoint(parseFloat(cells[0].innerText), parseFloat(cells[1].innerText), cells[4].innerText === "true");
    })
}

function updateGraph(r) {
    if (r === undefined) {
        if (document.querySelectorAll('option[selected="selected"]').length === 0) {
            r = 1.0;
        } else {
            r = parseFloat(document.querySelectorAll('option[selected="selected"]')[0].innerHTML);
        }
    } else if (r === "") {
        r = old_r;
    } else {
        r = parseFloat(r);
    }
    old_r = r;
    context.clearRect(graphLeft, graphTop, graphRight, graphBottom);
    if (r <= rMax && r >= rMin) {

        drawFigures(r);
        drawAxis();
        drawPoints();
        drawRLabels(r);
    }
}

function drawFigures(r) {
    drawCircle(r);
    context.fillRect(centerX - r / 2, centerY - r, r / 2, r);
    drawTriangle(r);
}

function drawCircle(r) {
    context.fillStyle = "rgba(138, 43, 226, 0.65)";
    context.beginPath();
    context.arc(centerX, centerY, r / 2, 0, Math.PI * 2);
    context.fill();
    context.clearRect(centerX, centerY, -r, -r);
    context.clearRect(centerX, centerY, -r, r);
    context.clearRect(centerX, centerY, r, -r);
}

function drawTriangle(r) {
    context.fillStyle = "rgba(138, 43, 226, 0.65)";
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.lineTo(centerX + r, centerY);
    context.lineTo(centerX, centerY - r);
    context.fill();
}

function drawAxis() {
    drawXAxis();
    drawYAxis();
}

function drawXAxis() {
    context.fillStyle = "rgba(0, 0, 0, 1)";
    context.lineWidth = lineWidth;
    context.beginPath();
    context.moveTo(graphLeft, centerY);
    context.lineTo(graphRight, centerY);
    context.stroke();
    for (let i = 0; i <= cellCount; i++) {
        context.beginPath();
        context.moveTo(i * cellSize, centerY - padding);
        context.lineTo(i * cellSize, centerY + padding);
        context.stroke();
    }
}

function drawYAxis() {
    context.fillStyle = "rgba(0, 0, 0, 1)";
    context.beginPath();
    context.moveTo(centerX, graphTop);
    context.lineTo(centerX, graphBottom);
    context.stroke();
    for (let i = 0; i <= cellCount; i++) {
        context.beginPath();
        context.moveTo(centerX - padding, i * cellSize);
        context.lineTo(centerX + padding, i * cellSize);
        context.stroke();
    }
}

function drawRLabels(r) {
    // x
    context.fillStyle = "rgba(0, 0, 0, 1)"
    context.font = "0.6px Arial"
    context.fillText("-R", centerX - r - 0.25, centerY + 0.7);
    context.fillText("R", centerX + r - 0.15, centerY + 0.7);

    // y
    context.fillText("R", centerX + 0.25, centerY - r + 0.15);
    context.fillText("-R", centerX + 0.25, centerY + r + 0.15);
}