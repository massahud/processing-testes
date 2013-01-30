import processing.webgl.*;
PImage imgFill;
PShape bolaSvg;


void setup() {  
  
    size(CANVAS_WIDTH, CANVAS_HEIGHT);
    background(100);
    stroke(255);
    frameRate(30);    
    bolaSvg = loadShape("bola.svg");    
    init(this);
}

PShape getBolaSvg() {
    return bolaSvg;
}

void draw() {    
    update();
    //background(#000000)
    
    background(#000000);
    
    stroke(#ff0000);
    fill(#00ff00);
    //image(imgFill, 0, 0);
    for (var body = world.GetBodyList(); body; body = body.GetNext()) {
        if (body.pjsDraw) {
            body.pjsDraw(this);            
        }
    }
    if (mousePressed == true) {
        line(bola.GetPosition().x*CANVAS_WIDTH_SCALE, bola.GetPosition().y*CANVAS_HEIGHT_SCALE, mouseX, mouseY);
    }
}

void mouseReleased() {
  aplicaImpulso(mouseX/CANVAS_WIDTH_SCALE, mouseY/CANVAS_HEIGHT_SCALE);
}
