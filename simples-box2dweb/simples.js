var b2Vec2 = Box2D.Common.Math.b2Vec2;
var b2BodyDef = Box2D.Dynamics.b2BodyDef;
var b2Body = Box2D.Dynamics.b2Body;
var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
var b2Fixture = Box2D.Dynamics.b2Fixture;
var b2World = Box2D.Dynamics.b2World;
var b2MassData = Box2D.Collision.Shapes.b2MassData;
var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
var world;
var WORLD_WIDTH = 10;
var WORLD_HEIGHT = 10;
var CANVAS_WIDTH = document.width ? Math.min(Math.min(document.width-5, document.height-5),768) : 768;
var CANVAS_HEIGHT = CANVAS_WIDTH;
var CANVAS_WIDTH_SCALE = CANVAS_WIDTH/WORLD_WIDTH;
var CANVAS_HEIGHT_SCALE = CANVAS_HEIGHT/WORLD_HEIGHT;
var bola;
var boxDef;
var boxFixDef;
var pjs;
boxDef = new b2BodyDef();
//boxDef.linearDamping = 0;
//boxDef.angularDamping = 0.01;

boxFixDef = new b2FixtureDef();

boxFixDef.friction = 0.2;
boxFixDef.density = 0;

boxDef.type = b2Body.m_staticBody;
var caixa;
function createBox(centerX, centerY, halfWidth, halfHeight, restitution, type, density, stroke, fill) {
    boxDef.position.Set(centerX, centerY);
    
    if (type) {
        boxDef.type = type;
    } else {
        boxDef.type = b2Body.m_staticBody;
    }
    if (restitution) {
        boxFixDef.restitution = restitution;
    } else {
        boxFixDef.restitution = 0.2;
    }    
    var box = new b2PolygonShape();
    box.SetAsBox(halfWidth, halfHeight);
    var body = world.CreateBody(boxDef);    
    boxFixDef.shape = box;
    if (density) {
        boxFixDef.density = density;
    } else {
        boxFixDef.density = 0;
    }
    body.CreateFixture(boxFixDef);
    body.pjsDraw = function(pjs) {
        
        var p0= this.GetWorldPoint(this.GetFixtureList().GetShape().GetVertices()[0]);
        p0.Multiply(CANVAS_WIDTH_SCALE);
        var p1= this.GetWorldPoint(this.GetFixtureList().GetShape().GetVertices()[1]);
        p1.Multiply(CANVAS_WIDTH_SCALE);
        var p2= this.GetWorldPoint(this.GetFixtureList().GetShape().GetVertices()[2]);
        p2.Multiply(CANVAS_HEIGHT_SCALE);
        var p3= this.GetWorldPoint(this.GetFixtureList().GetShape().GetVertices()[3]);
        p3.Multiply(CANVAS_WIDTH_SCALE);
        pjs.pushStyle();            
            if (stroke) {
                pjs.stroke(pjs.unhex(stroke));
            }
            if (fill) {                
                pjs.fill(pjs.unhex(fill));
            }
            pjs.quad(p0.x, p0.y, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
        pjs.popStyle();
    }
    return body;
}
function init(asd) {
    pjs = asd;
    
    world = new b2World( new b2Vec2(0, 10), true);
    
    /*  
    var debugDraw = new b2DebugDraw();
    debugDraw.SetSprite(document.getElementById("boxdebug").getContext("2d"));    
    debugDraw.SetDrawScale(CANVAS_WIDTH_SCALE);
    debugDraw.SetFillAlpha(0.3);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
    world.SetDebugDraw(debugDraw);
    */
    
    // chao
    createBox(WORLD_WIDTH/2, WORLD_HEIGHT-0.1, WORLD_WIDTH/2, 0.1, 0);
    // teto
    createBox(WORLD_WIDTH/2, 0.1, WORLD_WIDTH/2, 0.1, 0);
    // esquerda
    createBox(0.1, WORLD_HEIGHT/2, 0.1, WORLD_HEIGHT/2-0.2,0);
    // direita
    createBox(WORLD_WIDTH-0.1, WORLD_HEIGHT/2, 0.1, WORLD_HEIGHT/2-0.2,0);
    
    for (var i = 0; i < 10; i++) {
        var altura = 0.25+Math.random()*1;
        var largura = 0.25+Math.random()*2.5;
        var a = 255<<24;
        var r = parseInt(Math.random()*256)<<16;
        var g = parseInt(Math.random()*256)<<8;
        var b = parseInt(Math.random()*256);
        var rf = parseInt(Math.random()*256)<<16;
        var gf = parseInt(Math.random()*256)<<8;
        var bf = parseInt(Math.random()*256);
        createBox(largura/2+Math.random()*(WORLD_WIDTH-largura),altura/2+Math.random()*(WORLD_HEIGHT-altura),largura/2,altura/2, 0.3, b2Body.b2_dynamicBody, altura*largura*5, pjs.hex(a|r|g|b), pjs.hex(a|rf|gf|bf));
    }
       
    var bolaDef = new b2BodyDef();
    bolaDef.type=b2Body.b2_dynamicBody;
    bolaDef.position.Set(WORLD_WIDTH/2, WORLD_HEIGHT/1.5);
    //bolaDef.linearDamping=0;
    //bolaDef.angularDamping=0.01;
    
    var bolaFixDef = new b2FixtureDef();
    bolaFixDef.restitution = 0.9;
    bolaFixDef.shape = new b2CircleShape(0.5); 
    bolaFixDef.friction = 0.1;
    bolaFixDef.density=0.5*0.5*Math.PI*10;
    //create some objects
         
    
    bola = world.CreateBody(bolaDef);
    bola.CreateFixture(bolaFixDef);
    
    bola.pjsDraw = function(pjs) {
        pjs.pushStyle();        
            pjs.smooth();
            pjs.shapeMode(pjs.CENTER);
            pjs.pushMatrix();
                var c = this.GetWorldCenter()
                pjs.translate(c.x*CANVAS_WIDTH_SCALE, c.y*CANVAS_HEIGHT_SCALE);
                pjs.rotate(this.GetAngle());
                var w = 2*this.GetFixtureList().GetShape().GetRadius()*CANVAS_WIDTH_SCALE;
                pjs.shape(pjs.getBolaSvg(), 0, 0, w, w);
            pjs.popMatrix();
        pjs.popStyle();        
    }
    //bola.ApplyImpulse(new b2Vec2(Math.random()*100,Math.random()*100), new b2Vec2(0,0));
}

function update(pjs) {
    //pjs.shape(pjs.bolaSvg,0,0,50,50);
    world.Step(1/30, 10, 10);
    /*if (!bola.IsAwake()) {
        bola.ApplyImpulse(new b2Vec2(Math.random()*100,Math.random()*100), new b2Vec2(0,0));
    }*/
    //world.DrawDebugData();
    world.ClearForces();
}

function aplicaImpulso(x, y) {
    var impulso = new b2Vec2(x, y);
    impulso.Subtract(bola.GetWorldCenter());
    impulso.Multiply(bola.GetFixtureList().GetDensity()*3);    
    bola.ApplyImpulse(impulso, bola.GetWorldCenter());
    console.log("impulso: " + impulso.x + "," + impulso.y);
}

