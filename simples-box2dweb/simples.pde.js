import processing.webgl.*;
PImage imgFill;
PShape bolaSvg;
PImage splash;
boolean showSplash = true;
int margin;
long startTime;
PShape blocos[] = new PShape[3];
void setup() {  
  
    size(CANVAS_WIDTH, CANVAS_HEIGHT);
    background(100);
    stroke(255);
    frameRate(30);    
    bolaSvg = loadShape("bola.svg");    
    splash = loadShape("bola.svg");
    margin = CANVAS_WIDTH/20;
    smooth();
    shapeMode(CENTER);
    shape(splash, CANVAS_WIDTH/2, CANVAS_HEIGHT/2, CANVAS_WIDTH/2-2*margin,CANVAS_HEIGHT/2-2*margin);
    for (int i = 0; i < blocos.length; i++) {
        blocos[i] = loadShape("blocos/"+i+".svg");
    }
    startTime =  millis();
    init(this);
    
    
}

PShape[] getBlocos() {
    return blocos;
}

PShape getBolaSvg() {
    return bolaSvg;
}

void draw() {
    
    update();
    //background(#000000)
    
    background(#cccccc);
    
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
    if (showSplash) {        
        shapeMode(CENTER);
        shape(splash, CANVAS_WIDTH/2, CANVAS_HEIGHT/2, CANVAS_WIDTH-2*margin,CANVAS_HEIGHT-2*margin);
        if (millis()-startTime > 1000) {
            showSplash = false;
        }
    }
}

void mouseReleased() {
  aplicaImpulso(mouseX/CANVAS_WIDTH_SCALE, mouseY/CANVAS_HEIGHT_SCALE);
}
