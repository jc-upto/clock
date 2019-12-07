
let Clock = function(canvas) {
    this.canvas = canvas;
    this.radius = this.canvas.width / 2;

    this.style = {
        background : "#008080",
        minutesDelimitersWidth : 3,
        hoursDelimitersWidth : 5,
        fontSize : "35px",
        fontFamily : "arial",
        minutesHandWidth : 10,
        minutesHandLength : this.radius * 0.6,
        hoursHandWidth : 10,
        hoursHandLength : this.radius * 0.4,
        secondsHandWidth : 3,
        secondsHandLength : this.radius * 0.68,
        handsLineCap : "round",
        minutesLinesColor : "#333",
        hoursLinesColor : "#008080",
        handsColor : "#008080",
    };

};

// Starts the timer.
Clock.prototype.start = function drawCurrentTime() {
    setTimeout(function drawAll() {
        this.draw();
        setTimeout(drawAll.bind(this), 1000);
    }.bind(this), 1000);
};


// Draw inside the canvas.
Clock.prototype.draw = function() {

    let context = this.canvas.getContext("2d");
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.style.backgroundColor = this.background;
    context.lineCap = this.style.handsLineCap;

    context.save();

    // Redraw the canvas.
    context.translate(this.radius, this.radius);

    // Having 0 at the top.
    context.rotate(-Math.PI/2);

    this._drawMinutesLines(context);
    this._drawHoursLinesAndNumbers(context);
    this._drawCurrentTime(context);

    context.lineWidth = 20;
    context.beginPath();
    context.arc(0, 0, 0.1, 0, Math.PI);
    context.stroke();

    context.restore();

};


// Draw the hours lines and numbers on canvas.
Clock.prototype._drawHoursLinesAndNumbers = function(context) {
    context.lineWidth = this.style.hoursDelimitersWidth;
    context.strokeStyle = this.style.hoursLinesColor;
    context.save();
    context.beginPath();

    for(let i = 0; i < 12; i++) {
        // Rotate matrix to follow x and y coordinates and draw again on the same place.
        context.rotate(Math.PI / 6);
        context.moveTo(220, 0);
        context.lineTo(240, 0);
        context.stroke();
    }
    context.restore();

    // Drawing hours as text.
    context.save();
    context.font = this.style.fontSize + " " + this.style.fontFamily;
    context.textAlign = "center";
    context.rotate(Math.PI / 2);
    context.beginPath();

    for(let i = 1; i < 13; i++){
        context.rotate(i * Math.PI / 6);
        context.translate(0, - this.radius * 0.75);
        context.rotate(-i * Math.PI / 6);
        context.fillText(i.toString(), 0, Math.round(parseInt(this.style.fontSize) / 2));
        context.rotate(i * Math.PI / 6);
        context.translate(0, this.radius * 0.75);
        context.rotate(-i * Math.PI / 6);
    }

    context.restore();

};


// Draws minutes lines on canvas.
Clock.prototype._drawMinutesLines = function(context) {
    context.lineWidth = this.style.minutesDelimitersWidth;
    context.strokeStyle = this.style.minutesLinesColor;
    context.save();
    for(let i = 0; i < 60; i++){
        context.beginPath();
        context.moveTo(230,0);
        context.lineTo(240,0);
        context.stroke();
        context.rotate(Math.PI/30);
    }
    context.restore();
};


// Draw the current provided time.
Clock.prototype._drawCurrentTime = function(context){
    let now = new Date();
    context.save();
    context.beginPath();
    context.strokeStyle = this.style.handsColor;
    // Restore initial rotated position before drawing arrows.
    context.rotate(Math.PI / 2);
    // Calculate positions to apply.
    let second = ( now.getSeconds() * Math.PI / 30 );
    let minutes = ( now.getMinutes() * Math.PI / 30 ) + ( second * Math.PI / ( 30 * 60 ) );
    let hour = ( (now.getHours() % 12) * Math.PI / 6 ) + ( minutes * Math.PI / ( 6 * 60 ) );

    // Hours.
    context.lineWidth = this.style.hoursHandWidth;
    context.moveTo(0,0);
    context.rotate(hour);
    context.lineTo(0, -this.style.hoursHandLength);
    context.stroke();
    context.rotate(-hour);

    // Minutes.
    context.lineWidth = this.style.minutesHandWidth;
    context.moveTo(0,0);
    context.rotate(minutes);
    context.lineTo(0, -this.style.minutesHandLength);
    context.stroke();
    context.rotate(-minutes);

    // Seconds.
    context.lineWidth = this.style.secondsHandWidth;
    context.moveTo(0,0);
    context.rotate(second);
    context.lineTo(0, -this.style.secondsHandLength);
    context.stroke();
    context.rotate(-second);

    context.restore();
};