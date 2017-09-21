var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//define context variable for canvas
var c = canvas.getContext('2d');

/*
c.beginPath();
c.moveTo(0, 0);
c.lineTo(1600, 1600);
c.stroke();
*/

var i = 0;
for (i = 0; i < 300; i += 1) {
    var x = Math.floor(Math.random() * canvas.width);
    var y = Math.floor(Math.random() * canvas.height);
    c.beginPath();
    c.arc(x, y, Math.floor(Math.random() * 10), 0, Math.PI * 2, false);
    c.stroke();
}

//TBD: fix .png icons to remove whitespace
//TBD: fix divs header/canvas/footer locations
//TBD: fix div z-indexing