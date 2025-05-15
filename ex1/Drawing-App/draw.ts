const canvas = document.getElementById('drawingCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')as CanvasRenderingContext2D || null;
const shapeSelector = document.getElementById('shapeSelector') as HTMLSelectElement || null;
const fillColor = document.getElementById('fillColor') as HTMLInputElement || null;

let isDrawing  = false;
let startX = 0;
let startY = 0;
let snapshot : ImageData;

function takeSnapshot():void{
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
  }
  
  function restoreSnapshot():void {
    ctx.putImageData(snapshot, 0, 0);
  }
  canvas.addEventListener('mousedown', (e:MouseEvent) :void => {
    startX = e.offsetX;
    startY = e.offsetY;
    isDrawing = true;
    takeSnapshot();
  });
  
  canvas.addEventListener('mousemove', (e:MouseEvent) :void => {
    if (!isDrawing) return;
    restoreSnapshot();
    const shape = shapeSelector.value;
    drawShape(startX, startY, e.offsetX, e.offsetY, shape);
  });
  
  canvas.addEventListener('mouseup', (e:MouseEvent) :void => {
    if (!isDrawing) return;
    isDrawing = false;
    const shape = shapeSelector.value;
    drawShape(startX, startY, e.offsetX, e.offsetY, shape);
  });
  function drawShape(x1:number, y1:number, x2:number, y2:number, shape:string) {
    ctx.beginPath();
    ctx.fillStyle = fillColor.value;
    if (shape === 'line') {
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
    } else if (shape === 'rectangle') {
      ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
      
    } else if (shape === 'circle') {
      const radius = Math.sqrt((x2 - x1)**2 + (y2 - y1)**2);
      ctx.arc(x1, y1, radius, 0, 2 * Math.PI);
      ctx.fill();          
    }
    ctx.stroke();
  }
  