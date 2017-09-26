//TBD: fix on-hover effects
//TBD: remove whitespace on vector logos


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

/*
var i = 0;
for (i = 0; i < 300; i += 1) {
    var x = Math.floor(Math.random() * canvas.width);
    var y = Math.floor(Math.random() * canvas.height);
    c.beginPath();
    c.arc(x, y, Math.floor(Math.random() * 10), 0, Math.PI * 2, false);
    c.stroke();
}
*/

//TBD: make this object oriented
function Tree(x, y, lwidth){
    this.x = x;
    this.y = y;
    this.lwidth = lwidth;
    
    this.grow = function () {

        c.beginPath();
        c.moveTo(x, y);
        c.lineTo(x, y);
        c.stroke();
        c.lineWidth = lwidth;
        c.lineCap = 'round';
        c.lineJoin = 'round';

        x -= (Math.random() - .5);
        y -= Math.random();
        lwidth -= Math.random() / 10;
        
    }
}

var tree1 = new Tree(canvas.width * (1 / 5), canvas.height, 50);
var tree2 = new Tree(canvas.width * (4 / 5), canvas.height, 50);

function animate() {
    requestAnimationFrame(animate);
    tree1.grow();
    tree2.grow(); 
}
animate();
