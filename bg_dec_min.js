function setup(){createCanvas(windowWidth,windowHeight),xVal=random(windowWidth),yVal=random(windowHeight),ppp=new particleSys,strokeWeight(1),background(4,14,21),smooth()}function uVec(){this.x=0,this.y=0,this.r=255,this.g=255,this.b=255}function particleObj(){this.position=new uVec,this.position.x=random(windowWidth),this.position.y=random(windowHeight),this.velocity=new uVec}function particleSys(){this.particles=[];for(var i=0;n_prtls>i;i++)this.particles[i]=new particleObj,random(100)<5?random(100)>50?(this.particles[i].r=0,this.particles[i].g=136,this.particles[i].b=255):(this.particles[i].r=255,this.particles[i].g=198,this.particles[i].b=0):(this.particles[i].r=255,this.particles[i].g=255,this.particles[i].b=255)}function draw(){noStroke(),fill(4,14,21,15),rect(0,0,windowWidth,windowHeight),ppp.update(),ppp.render()}function mouseMoved(){xVal=mouseX,yVal=mouseY}function touchMoved(){xVal=mouseX,yVal=mouseY}function mousePressed(){background("#040e15"),mDown=!0}function mouseReleased(){mDown=!1}function windowResized(){background("#040e15"),resizeCanvas(windowWidth,windowHeight),ppp.reset()}function onHoverEnter(){}function onHoverExit(){}var n_prtls=750,xVal=0,yVal=0,mDown=!1,ppp=null;uVec.prototype.add=function(i){this.x+=i.x,this.y+=i.y},particleObj.prototype.update=function(){this.velocity.x=10*(noise(1e3*xVal+this.position.y/100)-.5),this.velocity.y=45*(noise(1e3*yVal+this.position.x/100)-.5),this.position.add(this.velocity),this.position.x<0&&(this.position.x+=windowWidth),this.position.x>windowWidth&&(this.position.x-=windowWidth),this.position.y<0&&(this.position.y+=windowHeight),this.position.y>windowHeight&&(this.position.y-=windowHeight)},particleObj.prototype.render=function(){mDown?(fill(this.r,this.g,this.b),ellipse(this.position.x,this.position.y,2,2)):(stroke(this.r,this.g,this.b),line(this.position.x,this.position.y,this.position.x-this.velocity.x,this.position.y-this.velocity.y))},particleSys.prototype.update=function(){for(var i=0;n_prtls>i;i++)this.particles[i].update()},particleSys.prototype.render=function(){for(var i=0;n_prtls>i;i++)this.particles[i].render()},particleSys.prototype.reset=function(){for(var i=0;n_prtls>i;i++)this.particles[i].position.x=random(windowWidth),this.particles[i].position.y=random(windowHeight)};