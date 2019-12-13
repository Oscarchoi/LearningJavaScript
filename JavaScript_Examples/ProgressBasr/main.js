$(document).ready(function(){
'use strict';
  paper.install(window);
  paper.setup(document.getElementById("mainCanvas"));

  //TODO
  var c = Shape.Circle(200,200,80);
  c.fillColor = 'black';

  var cc;
  for(var x=25; x<400; x+= 50){
    for(var y=25; y<400; y+= 50){
      cc = Shape.Circle(x,y,20);
      cc.fillColor = 'grey';
    }
  }  

  var tool = new Tool();
  tool.onMouseDown = function(event){
    var c3 = Shape.Circle(event.point.x, event.point.y, 20);
    c3.fillColor = 'green';
  }

  var text = new PointText(200,200);
  text.justification = 'center';
  text.fillColor = 'white';
  text.fontSize = 30;
  text.content = 'hello world';
  
  paper.view.draw();


console.log('main.js loaded');
});
