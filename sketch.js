let laPazTime = 0; 
let mexicoCityTime = 0; 
let barcelonaTime = 0;


let timeInput;
let updateButton;
let timeDifference = 0;

function setup() {
    createCanvas(800, 450);  

    timeInput = createInput(getCurrentTime(), 'time');
    timeInput.position(290, 0);
    timeInput.class('custom-input'); 

    updateButton = createButton('Actualizar');
    updateButton.position(timeInput.x + timeInput.width + 45, timeInput.y);
    updateButton.mousePressed(updateClocks);
    updateButton.class('custom-button'); 
}

function draw() {
    background(220);

    laPazTime = new Date(new Date().toLocaleString("en-US", {timeZone: "America/Mazatlan"})); 
    laPazTime.setHours(laPazTime.getHours() + timeDifference);
    mexicoCityTime = new Date(new Date().toLocaleString("en-US", {timeZone: "America/Mexico_City"})); 
    mexicoCityTime.setHours(mexicoCityTime.getHours() + timeDifference);
    barcelonaTime = new Date(new Date().toLocaleString("en-US", {timeZone: "Europe/Madrid"}));
    barcelonaTime.setHours(barcelonaTime.getHours() + timeDifference);

    drawClockWithPointSlope(width * 0.20, height / 2, laPazTime); 
    drawClockWithDDA(width * 0.50, height / 2, mexicoCityTime); 
    drawClockWithBresenham(width * 0.80, height / 2, barcelonaTime); 

}
  
function drawClockWithPointSlope(xc, yc,city) {
    let r = 100;
  
    let hr = city.getHours() % 12;
    let min = city.getMinutes();
    let sec = city.getSeconds();
    
  

    let secAngle = map(sec, 0, 60, 0, TWO_PI) - HALF_PI;
    let minAngle = map(min, 0, 60, 0, TWO_PI) - HALF_PI;
    let hrAngle = map(hr + min / 60, 0, 12, 0, TWO_PI) - HALF_PI;
  

    drawLine(xc, yc, xc + cos(secAngle) * r * 0.8, yc + sin(secAngle) * r * 0.8, color(255, 0, 0)); 
    drawLine(xc, yc, xc + cos(minAngle) * r * 0.6, yc + sin(minAngle) * r * 0.6, color(0, 0, 0)); 
    drawLine(xc, yc, xc + cos(hrAngle) * r * 0.4, yc + sin(hrAngle) * r * 0.4, color(0, 0, 0)); 
  
    let x = 0;
    let y = r;
    let p = 1 - r;
  
    drawCirclePoints(xc, yc, x, y);
  
    while (x < y) {
      x++;
      if (p < 0) {
        p += 2 * x + 1;
      } else {
        y--;
        p += 2 * (x - y) + 1;
      }
      drawCirclePoints(xc, yc, x, y);
    }

    text(`${city.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`, xc - 30, yc + 130);
    text("La Paz", xc - 20, yc + 150);
}
  
function drawClockWithDDA(xc, yc,city) {
    let r = 100;

    let hr = city.getHours() % 12;
    let min = city.getMinutes();
    let sec = city.getSeconds();
    

  
    let secAngle = map(sec, 0, 60, 0, TWO_PI) - HALF_PI;
    let minAngle = map(min, 0, 60, 0, TWO_PI) - HALF_PI;
    let hrAngle = map(hr + min / 60, 0, 12, 0, TWO_PI) - HALF_PI;
  

    drawLineDDA(xc, yc, xc + cos(secAngle) * r * 0.8, yc + sin(secAngle) * r * 0.8, color(255, 0, 0)); 
    drawLineDDA(xc, yc, xc + cos(minAngle) * r * 0.6, yc + sin(minAngle) * r * 0.6, color(0, 0, 0)); 
    drawLineDDA(xc, yc, xc + cos(hrAngle) * r * 0.4, yc + sin(hrAngle) * r * 0.4, color(0, 0, 0)); 
  

    let x = 0;
    let y = r;
    let p = 1 - r;
  
    drawCirclePoints(xc, yc, x, y);
  
    while (x < y) {
      x++;
      if (p < 0) {
        p += 2 * x + 1;
      } else {
        y--;
        p += 2 * (x - y) + 1;
      }
      drawCirclePoints(xc, yc, x, y);
    }
    text(`${city.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`, xc - 30, yc + 130);
    text("Ciudad de México", xc - 40, yc + 150);
}

function drawClockWithBresenham(xc, yc,city) {
    let r = 100;

    let hr = city.getHours() % 12;
    let min = city.getMinutes();
    let sec = city.getSeconds();
  

    let secAngle = map(sec, 0, 60, 0, TWO_PI) - HALF_PI;
    let minAngle = map(min, 0, 60, 0, TWO_PI) - HALF_PI;
    let hrAngle = map(hr + min / 60, 0, 12, 0, TWO_PI) - HALF_PI;
  

    drawLineBresenham(xc, yc, xc + cos(secAngle) * r * 0.8, yc + sin(secAngle) * r * 0.8,color(255, 0, 0)); 
    drawLineBresenham(xc, yc, xc + cos(minAngle) * r * 0.6, yc + sin(minAngle) * r * 0.6,color(0, 0, 0)); 
    drawLineBresenham(xc, yc, xc + cos(hrAngle) * r * 0.4, yc + sin(hrAngle) * r * 0.4,color(0, 0, 0)); 
  

    let x = 0;
    let y = r;
    let p = 1 - r;
  
    drawCirclePoints(xc, yc, x, y);
  
    while (x < y) {
      x++;
      if (p < 0) {
        p += 2 * x + 1;
      } else {
        y--;
        p += 2 * (x - y) + 1;
      }
      drawCirclePoints(xc, yc, x, y);
    }
    text(`${city.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`, xc - 30, yc + 130);
    text("Barcelona", xc - 25, yc + 150);
}
  
function drawLineBresenham(x0, y0, x1, y1,lineColor) {
    stroke(lineColor);
    let dx = x1 - x0;
    let dy = y1 - y0;

    let p;
    let x, y;

    let inverted = false;
    if (Math.abs(dy) > Math.abs(dx)) {
        [x0, y0] = [y0, x0];
        [x1, y1] = [y1, x1];
        [dx, dy] = [dy, dx];
        inverted = true;
    }
    if (x0 > x1) {
        [x0, x1] = [x1, x0];
        [y0, y1] = [y1, y0];
    }

    dx = Math.abs(dx);
    dy = Math.abs(dy);

    let p0 = 2 * dy - dx;

    if (dy < dx) {
        p = p0;
        y = y0;

        for (x = x0; x <= x1; x++) {
            if (inverted) {
                point(y, x); 
            } else {
                point(x, y); 
            }

            if (p < 0) {
                p += 2 * dy;
            } else {
                p += 2 * dy - 2 * dx;
                y += (y0 < y1 ? 1 : -1);
            }
        }
    } else {
        p = p0;
        x = x0;

        for (y = y0; y <= y1; y++) {
            if (inverted) {
                point(y, x); 
            } else {
                point(x, y); 
            }

            if (p < 0) {
                p += 2 * dx;
            } else {
                p += 2 * dx - 2 * dy;
                x += (x0 < x1 ? 1 : -1);
            }
        }
    }
}
      
function drawLine(x1, y1, x2, y2, lineColor) {
    stroke(lineColor);


    let dx = x2 - x1;
    let dy = y2 - y1;


    let absDx = abs(dx);
    let absDy = abs(dy);


    let steps = max(absDx, absDy);


    let xIncrement = dx / steps;
    let yIncrement = dy / steps;


    for (let i = 0; i <= steps; i++) {
        point(round(x1), round(y1)); 
        x1 += xIncrement; 
        y1 += yIncrement; 
    }
}

function drawLineDDA(x1, y1, x2, y2, lineColor) {
    stroke(lineColor);
    let dx = x2 - x1;
    let dy = y2 - y1;
  
    let steps;
    let xIncrement, yIncrement;
  
    if (abs(dx) > abs(dy)) {
      steps = abs(dx);
    } else {
      steps = abs(dy);
    }
  
    xIncrement = dx / steps;
    yIncrement = dy / steps;
  
    let x = x1;
    let y = y1;
  
    for (let i = 0; i < steps; i++) {
      point(round(x), round(y)); 
      x += xIncrement;
      y += yIncrement;
    }
}

function drawCirclePoints(xc, yc, x, y) {
    point(xc + x, yc + y);
    point(xc - x, yc + y);
    point(xc + x, yc - y);
    point(xc - x, yc - y);
    point(xc + y, yc + x);
    point(xc - y, yc + x);
    point(xc + y, yc - x);
    point(xc - y, yc - x);
}

function updateClocks() {

    laPazTime.setHours(laPazTime.getHours() - timeDifference);

    let newTime = timeInput.value();


    let [newHour, newMinute] = newTime.split(':');


    let inputTime = new Date();
    inputTime.setHours(parseInt(newHour));
    inputTime.setMinutes(parseInt(newMinute));


    timeDifference = inputTime.getHours() - laPazTime.getHours();

    console.log(timeDifference)
    console.log(laPazTime.getHours())
}

function getCurrentTime() {

    let currentHour = hour();
    let currentMinute = minute();

    let hourStr = nf(currentHour, 2); 
    let minuteStr = nf(currentMinute, 2); 

    return `${hourStr}:${minuteStr}`;
}

