
var humanContainer = new render.DisplayObjectContainer();

var head = new render.Bitmap();
var leftarm = new render.Bitmap();
var rightarm = new render.Bitmap();
var leftleg = new render.Bitmap();
var rightleg = new render.Bitmap();
var Hbody = new render.Bitmap();

head.source = "head.png";
leftarm.source = "leftarm.png";
rightarm.source = "rightarm.png";
leftleg.source = "leftleg.png";
rightleg.source = "rightleg.png";
Hbody.source = "body.png";

humanContainer.addChild(head)
humanContainer.addChild(leftarm)
humanContainer.addChild(rightarm)
humanContainer.addChild(leftleg)
humanContainer.addChild(rightleg)
humanContainer.addChild(Hbody)

var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["head.png", "leftarm.png", "rightarm.png", "leftleg.png", "rightleg.png", "body.png"]);



class HumanBody extends Body {


    vx: number = 5;
    V = Math.PI / 2;

    onTicker(duringTime: number) {
        body.vx = 5;
        this.x += this.vx * duringTime;
        this.y = 200;
        this.rotation += this.V * duringTime;
    }
}

var ticker = new Ticker();
var body = new HumanBody(humanContainer);
ticker.start([body]);


var eventCore = new events.EventCore();
eventCore.init();

var head2 = 0;
var head3 = false;
var leg2 = 0;
var leg3 = false;

var headHitTest = (localPoint: math.Point, displayObject: render.DisplayObject) => {

    if (localPoint.x <= Math.abs(displayObject.x * 6) && localPoint.y <= Math.abs(displayObject.y) && localPoint.x > 0 && localPoint.y > 0) {
        head2 += 1;
        head3 = true;

    }
    return head3;


}

var LegHitTest = (localPoint: math.Point, displayObject: render.DisplayObject) => {

    if (localPoint.x > 0 && localPoint.x <= Math.abs(displayObject.x * 2) && localPoint.y > 0 && localPoint.y < Math.abs(displayObject.y * 2)) {
        leg2 += 1;
        leg3 = true;
    }

    return leg3;

}

var headOnClick = () => {
    if (head2 == 1) {
        if (body.vx != 0) {
            body.vx *= -1;
            body.V *= -1;
        }
        if (body.vx == 0) {
            head2 = 0;
        }

    }

    if (head2 != 1) {
        body.vx = 5;
        body.V = Math.PI / 2;
        head2 = 0;
    }
    head3 = false;
}

var LegOnClick = () => {

    if (leg2 == 1) {

        body.vx = 0;
        body.V = 0;
        body.rotation = 0;
    }
    if (leg2 >= 1) {

        leg2 = 0;
    }
    leg3 = false;



}

eventCore.register(head, headHitTest, headOnClick);
eventCore.register(leftleg, LegHitTest, LegOnClick);
eventCore.register(rightleg, LegHitTest, LegOnClick);










