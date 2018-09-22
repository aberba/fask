window.onload = function() {

    var game = new iSuck();

    game.env.w = 500;
    game.env.h = 400;

    game.loadImageAssets([]);

    game.Core.render(3);

    var box = game.Square({
       _shape: "square",
       _id: 2,
       pos: {
           x: 50,
           y: 50
       },
       w: 15,
       h: 15,
       fillColor: "purple"
    });
    game.items.push(box);


    var ball = game.Circle({
        _id: 3,
        _shape: "circle",
        pos: {
            x: 15,
            y: 276
        },

        radius: 10,

        fillColor: "blue"
    });
    game.items.push(ball);

    // declare variables
    var contexts  = game.ctxs,
        numItems,
        context1  = contexts[0],
        context2  = contexts[1],
        context3  = contexts[2],
        factorX   = 2,
        factorY   = 2,
        item;

    game.update = function() {       
          
        if (game.paused) {  //when game is paused
            alert("PAUSED");
            return false;
        }

        numItems = game.items.length;
        
        context2.fillStyle = "#ffffff";
        context2.clearRect(0, 0, game.env.w, game.env.h); // clear context two
        context2.fillRect(0, 0, game.env.w, game.env.h); // clear context two
        //context2.drawImage(game.imageAssets["ball"], 50, 100, 50, 50);

        for (var i =0; i < numItems; i++) {
            
            item = game.items[i];

            /*
               Every update in game loop goes here
             */

             //collision detacton
                for (var a = 0; a < numItems; a++) {
                    if (game.items[a]._id == item._id) continue;

                    if ( item.collidesWith(game.items[a]) ) console.log( item._id +" collides  with " + game.items[a]._id);
                }


            if (item._shape == "square") {

                //collision detacton
                for (var a = 0; a < numItems; a++) {
                    if (game.items[a]._id == item._id) continue;

                    if ( item.collidesWith(game.items[a]) ) console.log( item._id +" collides  with " + game.items[a]._id);
                }


                if ( (item.pos.x + item.w) > game.env.w ) {
                    factorX *= -1;
                } else if (item.pos.x < 0) {
                    factorX *= -1;
                }

                if ( (item.pos.y + item.w) > game.env.h ) {
                    factorY *= -1;
                } else if (item.pos.y < 0) {
                    factorY *= -1;
                }

                item.pos.x += factorX;
                item.pos.y += factorY;

                item.draw = function() {

                    context2.fillStyle = item.fillColor;
                    context2.fillRect(item.pos.x, item.pos.y, item.w, item.w);
                }
                item.draw(); //squares
            } else if (item._shape == "circlee") {

                if (game.Controls.pressedKeyCode == 39) {
                    item.v *=   1;
                } else if (game.Core.pressedKeyCode == 37) {
                    item.v *=  -1;
                } 
                game.Controls.pressedKey = null;

                //border scollision
                if ( (item.pos.x + item.radius) > game.env.w ) {
                    item.vx *= -1;
                } else if (item.pos.x < 0) {
                    item.vx *= -1;
                }

                if ( (item.pos.y + item.radius) > game.env.h ) {
                    item.vy *= -1;
                } else if (item.pos.y < 0) {
                    item.vy *= -1;
                }

                item.pos.x += item.vx;
                item.pos.y += item.vy;

                item.draw = function() {
                    
                    context2.fillStyle = item.fillColor;
                    context2.arc(item.pos.x, item.pos.y, item.radius, item.startAngle, item.endAngle, false);
                    context2.closePath();
                    context2.fill();
                }
                item.draw();  //circles

            } // edn fo switch statement

            game.items[i] = item;
        }
        window.requestAnimationFrame(game.update);
    }

    game.onControls = function(keyCode) {

        switch(keyCode) {
            case 32:
                game.pauseORResume();

                if (!game.paused) {
                    game.update();
                }
                break;

            default:
                break;
        } 
    }
    
    game.update();                               
}

//game custom functions

function Game() {
    this.loaded          = true; //remember to change for asset loading
    this.started         = false;
    this.paused          = false;
    this.resumed         = false;
    this.quited          = false;
    this.numImageAssets  = 0;
    this.numLoadedImages = 0;  

    this.views        = [];
    this.characters   = [];
    this.env          = {
        port: 5000
    }

    this.view             = {
        w: 600,
        h: 400
    };

    /************************************************************
                 ASSETS
    ************************************************************/
    this.sounds   = {};
    this.graphics = {};
    this.videos   = {};   
}

window.requestAnimationFrame =  window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                           window.oRequestAnimationFrame || window.msrequestAnimationFrame  ||
                                           window.webkitRequestAnimationFrame;





