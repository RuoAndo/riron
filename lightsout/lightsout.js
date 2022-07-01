var blink_bak = [];

function LightsOut(id,columns,rows,cellsize){
    this.id = id;
    if(columns == undefined) columns = 5;
    if(rows == undefined) rows = 5;
    if(cellsize == undefined) cellsize = 50;
    this.size = cellsize;
    this.border = cellsize / 10;
    this.columns = columns;
    this.rows = rows;
    this.frame = document.getElementById(id);
    this.clickcount = [];
    this.lit = [];
    for(var y=0;y<this.rows;y++){
	this.clickcount[y] = [];
	this.lit[y] = [];
	for(var x=0;x<this.columns;x++){
	    this.clickcount[y][x] = 0;
	    this.lit[y][x] = 0;
	    var div = document.createElement('div');
	    div.id = this.id + String(y) + String(x);
	    div.style.width = this.size;;
	    div.style.height = this.size;
	    div.style.border = 'solid';
	    div.style.borderWidth = this.border;;
	    div.style.cssFloat = 'left'; // FF
	    div.style.styleFloat = 'left'; // IE
	    div.onmousedown = function(event){ click(event); };
	    div.lightsout = this;
	    this.frame.appendChild(div);
	}
	var br = document.createElement('br');
	br.clear = 'all';
	this.frame.appendChild(br);
    }
    this.display();
}

LightsOut.prototype.toggle = function(x,y){
    if(x >= 0 && x < this.columns && y >= 0 && y < this.rows){
	this.lit[y][x] = (this.lit[y][x]+1) % 2;
    }
}

function click(ev){
    var x,y,e, tmp;
    if(ev) e = ev.target;
    if(! e) e = event.srcElement; // IE
    var lightsout = e.lightsout;

    e.id.match(/(.)(.)$/);
    x = Number(RegExp.$2);
    y = Number(RegExp.$1);

    lightsout.toggle(x,y);
    lightsout.toggle(x+1,y);
    lightsout.toggle(x,y+1);
    lightsout.toggle(x-1,y);
    lightsout.toggle(x,y-1);

    lightsout.clickcount[y][x] = (lightsout.clickcount[y][x]+1) % 2;
    
    lightsout.display();
}

LightsOut.prototype.display = function(){

	var blink = []

    for(var y=0;y<this.rows;y++){
	for(var x=0;x<this.columns;x++){
	    var e = document.getElementById(this.id+String(y)+String(x));
	    e.style.backgroundColor = (this.lit[y][x] == 1 ? 'blue' : 'yellow');
	    e.style.borderColor = (this.clickcount[y][x] == 1 ? '#ffccff' : '#ffffdd');
	}
    }
    
    
    for(var y=0;y<this.rows;y++){
	for(var x=0;x<this.columns;x++){
    	blink_bak.push(this.lit[y][x])
    }
    }   
    blink_bak.push("|\n")
    
    var getData = document.getElementById('getData');
    getData.innerHTML = blink_bak;
    
}