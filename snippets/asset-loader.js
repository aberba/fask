function Sprite(urls, speed, box)
{
    var that = this, running = false, interval = 0, loaded = false;

    that.urls = urls;
    that.speed = speed;
    that.images = new Array();
    that.box = box || { x: 0.0, y: 0.0, w: 64, h: 64 };

     var len = that.urls.length;

    for(var i = 0; i < len; ++i)
    {
        that.images[i] = new Image();
        that.images[i].src = that.urls[i];
        that.images[i].id = i;
        that.images[i].onload = function(){ if(parseInt(this.id) === len) { loaded = true; } };
    }
    that.current = 0;

    var Draw = function(ctx)
    {
        if(loaded)
        {
            var curr = that.images[that.current];
            ctx.drawImage(curr, 0.0, 0.0, curr.width, curr.height, that.box.x, that.box.y, that.box.w, that.box.h);
        }  
    };

    that.Run = function(ctx)
    {
        if(!running)
        {
            running = true;
            interval = setInterval(function(){
                Draw(ctx);
                if(that.current < that.urls.length) 
                { 
                    that.current++; 
                } 
                else 
                {
                    that.current = 0;  
                }
            }, that.speed);
        }
    };

    that.Clear = function()
    {
        if(running)
        {
            running = false;
            clearInterval(interval);
        }
    };
}

// Exemple

var test = new Sprite(["image1.png", "image2.png", "image3.png"], 250);
test.Run(myContext);