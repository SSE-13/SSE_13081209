/**
 * 基类，负责处理x,y,rotation 等属性
 */ 
class DisplayObject {

    x = 0;

    y = 0;

    rotation = 0;

    draw(context: CanvasRenderingContext2D) {
        context.save();
        context.rotate(this.rotation);
        context.translate(this.x, this.y);
        this.render(context);

        context.restore();
    }

    render(context: CanvasRenderingContext2D) {

    }

}

class Bitmap extends DisplayObject {


    source;

    render(context: CanvasRenderingContext2D) {

        var image = imagePool[this.source];
        if (image) {
            context.drawImage(image, 0, 0);
        }
        else {
            context.font = "20px Arial";
            context.fillStyle = '#000000';
            context.fillText('错误的URL', 0, 20);
        }
    }

}

class Rect extends DisplayObject {

    width = 100

    height = 100;

    color = '#FF0000';

    render(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.fillRect(0, 0, this.width, this.height);
    }
}

class TextField extends DisplayObject {

    render(context: CanvasRenderingContext2D) {
        context.font = "20px Arial";
        context.fillStyle = '#000000';
        context.fillText('233', 335, 250);
    }
}

function drawQueue(queue) {
    for (var i = 0; i < renderQueue.length; i++) {
        var displayObject: DisplayObject = renderQueue[i];
        displayObject.draw(context);
    }
}

var imagePool = {};

function loadResource(imageList, callback) {
    var count = 0;
    imageList.forEach(function(imageUrl) {
        var image = new Image();
        image.src = imageUrl;
        image.onload = onLoadComplete;
        image.onerror = onLoadError;

        function onLoadComplete() {
            imagePool[imageUrl] = image;
            count++;
            if (count == imageList.length) {
                callback();
            }
        }
        
        function onLoadError(){
            alert('资源加载失败:' + imageUrl);
        }
    })
}


var canvas: HTMLCanvasElement = document.getElementById("game") as HTMLCanvasElement;
var context = canvas.getContext("2d");


var rect = new Rect();
rect.width = 200;
rect.height = 60;
rect.x = 260
rect.y = 210
rect.color = '#3e61f7'


var rect2 = new Rect();
rect2.width = 300;
rect2.height = 50;
rect2.x = 100;
rect2.y = 100;
rect2.rotation = Math.PI * 7 / 8;
rect2.color = '#00FFFF'

var text = new TextField();
text.x = 10;

var bitmap = new Bitmap();
bitmap.source = 'A.jpg'; 


var bitmap1 = new Bitmap();
bitmap1.source = 'B.png';
bitmap1.y = 30 ;

var bitmap2 = new Bitmap();
bitmap2.source = 'C.png';
bitmap2.x = 270;
bitmap2.y = 80 ;

var bitmap3 = new Bitmap();
bitmap3.source = 'D.png';
bitmap3.x = 360 ;
bitmap3.y = 80 ;

var bitmap4 = new Bitmap();
bitmap4.source = 'E.png';
bitmap4.x = 285 ;
bitmap4.y = 285 ;

//渲染队列
var renderQueue = [bitmap,bitmap1,bitmap2, bitmap3,bitmap4, rect,rect2,text];
//资源加载列表
var imageList = ['A.jpg','B.png','C.png','D.png','E.png'];

//先加载资源，加载成功之后执行渲染队列
loadResource(imageList, function() {
    drawQueue(renderQueue);
})


