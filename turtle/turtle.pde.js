float initial = 0.1;

float increment = 5;
float tamanho = initial;
float angulo_inicial = 0.1;
float angulo = 1;
float angulo_increment = 0;
int iteractions = 300;
int WIDTH = 320;
int HEIGHT = 320;
long t;
long rate = 100;
boolean animar = true;

void setup() {
    size(WIDTH,HEIGHT);
    frameRate(30);
    background(#000000);
    stroke(#FFFFFF); 
    t = millis();
    init(this);
}

void draw() {    
    long t2 = millis();
    if (animar) {
        if (t2 - t > rate) {
            t = t2;
            //increment += ;;
            
            if (angulo_increment !== 0) {
                angulo_inicial += 0.001;
            } else {
                angulo_inicial += 0.005;
            }
            
             if (angulo_inicial > 2*PI) {
                angulo_inicial = angulo_inicial - 2*PI;
            }
            document.getElementById("ang").value=angulo_inicial;
        }
    }
    resetMatrix();
    background(#000000);    
    translate(WIDTH/2, HEIGHT/2);
    tamanho = initial;
    rotate(angulo_inicial);
    angulo = angulo_inicial;
    for (int i = 0; i < iteractions; i++) {        
        line(0,0,tamanho,0);
        translate(tamanho,0);
        rotate(angulo);
        tamanho += increment;
        angulo += angulo_increment;
        if (angulo > 2*PI) {
            angulo = angulo - 2*PI;
        }
    }    
}


float getInc() {
    return increment;
}

float getIncA() {
    return angulo_increment;
}

float getAng() {
    return angulo_inicial;
}

void setIncA(float inca) {
    angulo_increment = inca;
}

void setInc(float inc) {
    increment = inc;
}


void setAng(float ang) {
    angulo_inicial = ang;
}

void setAnimar(boolean b) {
    animar = b;
}

boolean isAnimar() {
    return animar;
}