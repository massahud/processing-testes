void setup() {
    size(200, 200);
    background(100);
    stroke(255);
    frameRate(1);    
    println("hello web!");
}

void draw() {
    update();
    background(#000000)
    
    background(255, 204, 0);
    ellipse(x, y, 25, 25);
}