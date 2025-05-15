var canvas = document.getElementById('drawingCanvas');
var ctx = canvas.getContext('2d') || null;
var shapeSelector = document.getElementById('shapeSelector') || null;
var fillColor = document.getElementById('fillColor') || null;
var isDrawing = false;
var startX = 0;
var startY = 0;
var snapshot;
function takeSnapshot() {
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}
function restoreSnapshot() {
    ctx.putImageData(snapshot, 0, 0);
}
canvas.addEventListener('mousedown', function (e) {
    startX = e.offsetX;
    startY = e.offsetY;
    isDrawing = true;
    takeSnapshot();
});
canvas.addEventListener('mousemove', function (e) {
    if (!isDrawing)
        return;
    restoreSnapshot();
    var shape = shapeSelector.value;
    drawShape(startX, startY, e.offsetX, e.offsetY, shape);
});
canvas.addEventListener('mouseup', function (e) {
    if (!isDrawing)
        return;
    isDrawing = false;
    var shape = shapeSelector.value;
    drawShape(startX, startY, e.offsetX, e.offsetY, shape);
});
function drawShape(x1, y1, x2, y2, shape) {
    ctx.beginPath();
    ctx.fillStyle = fillColor.value;
    if (shape === 'line') {
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
    }
    else if (shape === 'rectangle') {
        ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
    }
    else if (shape === 'circle') {
        var radius = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
        ctx.arc(x1, y1, radius, 0, 2 * Math.PI);
        ctx.fill();
    }
    ctx.stroke();
}
