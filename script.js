let Pressed = [false,false,false,false,false, false, false, false, false, ]; //left, up, right, down, space, a, w, s, d,
let NumbersPressed = [false, false, false, false, false, false, false, false, false, false];
let NumbersClick = [false, false, false, false, false, false, false, false, false, false];
const KeysAvailable = ['ArrowLeft','ArrowUp','ArrowRight','ArrowDown',' ', 'a', 'w', 's', 'd'];
let Level = 0;
let LevelObjects = []; //0: Ground, 1: Ladder, 2: barrel, 3: endpoint, 4: Caves 5: Compsognathus 6: crate 7: heart 8: LightningBolt 9:Star 10:snail 11: Amber 12: Mosasaur 13: Water 14: Ammo
let PlayerSprite = new CreateSprites(240,110, 15, 15, 1, 0, 0, 0, 0, 0, 0, 'Player1', 3, 1, 1);
let Frames = 0;
let LevelDetails = [];

//Create AntiPhase, add 'remove' and cooresponding method to creator function

let GameArea = {
    start: function(){
        let Canvas = document.getElementById('GameArea');
        window.devicePixelRatio = 2;
        let ctx = Canvas.getContext('2d');
        let Background =  new CreateSprites(Canvas.width/2,Canvas.height/2, Canvas.width, Canvas.height, 1, 0, 0, 0, 0, 0, 0, 'Title', 3, 1, 1);
        Frames = 0;
        let count = 0;
        let placed = false;
        let selected = 0;
        setInterval(function () {
            Keys.update();
            if(Level === 0){
                if(count===0){
                    GameArea.clear();
                    Background.image.src = 'Pictures/Title.jpg';
                    Background.draw();
                    ctx.fillStyle = 'red';
                    ctx.font = '10px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText('Start Campaign', Canvas.width/3, Canvas.height/2);
                    ctx.fillText('Level Select', 2*Canvas.width/3, Canvas.height/2);
                    if(Mouse.click) {
                        if ((Math.abs(Mouse.x - Canvas.width / 3) < 50) && (Math.abs(Mouse.y - Canvas.height / 2)) < 30) {
                            count = 1;
                        }else if((Math.abs(Mouse.x - 2*Canvas.width / 3) < 50) && (Math.abs(Mouse.y - Canvas.height / 2)) < 30){
                            count = 4;
                        }
                    }
                }else if(count===1){
                    GameArea.clear();
                    ctx.fillStyle = 'black';
                    ctx.fillRect(0,0,Canvas.width,Canvas.height);
                    ctx.fillStyle = 'red';
                    ctx.font = '10px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText('You are a mercenary, on the island of Jurassic World.', Canvas.width/2, 20);
                    ctx.fillText('Collect the amber for scientists waiting on the Mainland', Canvas.width/2, 40);
                    ctx.fillText('YOU CANNOT RETURN EMPTY HANDED', Canvas.width/2, 60);
                    ctx.fillText('There will be competing mercenaries that drop weapons on you', Canvas.width/2, 80);
                    ctx.fillText('Watch out for the supply drops.', Canvas.width/2, 100);
                    ctx.fillText('Although they drop supplies, the boxes explode on contact.', Canvas.width/2, 120);
                    ctx.fillText('Good Luck', Canvas.width/2, 140);
                    if(placed ===false){
                        placed = true;
                        setTimeout(function(){
                            count = 2;
                            placed = false;
                        }, 6000);
                    }
                }else if(count===2){
                    GameArea.clear();
                    DrawMap();
                    if(!placed) {
                        placed = true;
                        setTimeout(function () {
                            count = 3;
                            placed = false;
                        }, 3000);
                    }
                }else if(count===3) {
                    if (placed === false) {
                        placed = true;
                        let AnimateLoop = 0;
                        let animate = setInterval(function () {
                            GameArea.clear();
                            GameArea.background();
                            AnimateLoop = AnimateLoop + 1;
                            if(MapAndFade(AnimateLoop, LevelDetails[0].name, LevelDetails[0].flash, 0)){
                                if(MoveHelicopter(AnimateLoop-8000, 240, 110, 0.6*LevelObjects[3][0].width, 0.6*LevelObjects[3][0].height)){
                                    Spawners();
                                    Level = 1;
                                    count = 0;
                                    PlayerSprite.health = 3;
                                    PlayerSprite.score = 0;
                                    PlayerSprite.collected = 0;
                                    PlayerSprite.VelocityX = 0;
                                    PlayerSprite.VelocityY = 0;
                                    placed = false;
                                    clearInterval(animate);
                                }
                            }
                        }, 1);
                    }
                }else if(count===4){
                    if(!placed){
                        selected = 0;
                        let code = '';
                        let result = '';
                        placed = true;
                        let wait = setInterval(function(){
                            GameArea.clear();
                            GameArea.background();
                            DrawMap();
                            ctx.fillStyle = 'black';
                            ctx.font = '10px Arial';
                            ctx.textAlign = 'center';
                            if(selected===0) {
                                ctx.fillText('Please Select A Level', Canvas.width / 2, 10);
                            }else{
                                ctx.fillText('Please Enter Level '+selected+' code.', Canvas.width / 2, 10);
                                ctx.fillText('Code: '+code, 100+Canvas.width / 2, 30);
                                ctx.fillText('Enter', 100+Canvas.width / 2, 50);
                            }
                            ctx.fillText(result, Canvas.width / 2+100, 70);
                            ctx.fillText('Back', 30, Canvas.height-10);
                            if(Mouse.click){
                                if((Math.abs(Mouse.x - 132) < 30) && (Math.abs(Mouse.y - 48)<30)){
                                    selected = 1;
                                    code = '';
                                    result = '';
                                }else if(((Math.abs(Mouse.x - 190)<30) && (Math.abs(Mouse.y - 60))<30)){
                                    selected = 2;
                                    code = '';
                                    result = '';
                                }else if((Math.abs(Mouse.x - 150) < 30) && (Math.abs(Mouse.y - 100)<30)){
                                    selected = 3;
                                    code = '';
                                    result = '';
                                }else if((Math.abs(Mouse.x - 30) < 50) && (Math.abs(Mouse.y - (Canvas.height-10))<50)){
                                    count = 0;
                                    placed = false;
                                    clearInterval(wait);
                                }else if((Math.abs(Mouse.x - Canvas.width/2-100) < 10) && (Math.abs(Mouse.y - 50)<10)){
                                    if(LevelDetails[selected-1].code===code){
                                        result = 'correct';
                                        placed = false;
                                        count = 5;
                                        clearInterval(wait);
                                    }else {
                                        result = 'incorrect';
                                    }
                                }
                            }
                            for(let i =0; i<NumbersClick.length; i++){
                                if(NumbersClick[i]&&code.length<5){
                                    code = String(code)+i;
                                }
                            }
                            if(code.length>0&&Keys.deleteClick){
                                code = code.substring(0, code.length-1);
                            }
                        },1);
                    }
                }else if(count===5){
                    if(!placed){
                        placed = true;
                        PlayerSprite.VelocityX = 0;
                        PlayerSprite.VelocityY = 0;
                        PlayerSprite.health = 0;
                        PlayerSprite.collected = 0;
                        PlayerSprite.image.src = 'Pictures/Player1.jpg';
                        Level = selected;
                        let AnimateLoop = 0;
                        let animate4 = setInterval(function () {
                            GameArea.clear();
                            GameArea.background();
                            AnimateLoop = AnimateLoop + 1;
                            if(MapAndFade(AnimateLoop, LevelDetails[Level-1].name, LevelDetails[Level-1].flash, selected-1)) {
                                if (MoveHelicopter(AnimateLoop-8000, 240, 110, 0.6 * LevelObjects[3][0].width, LevelObjects[0][LevelObjects[0].length-1].y-20)) {
                                    Spawners();
                                    PlayerSprite.health = 3;
                                    count = 0;
                                    placed = false;
                                    clearInterval(animate4);
                                }
                            }
                        }, 1);
                    }
                }
            }else {
                if (!CheckEnd()) {
                    if((Level===3)&&(PlayerSprite.y<=30)&&(!LevelObjects[12][0].rise)){
                        if(!placed) {
                            placed = true;
                            let introloop = 0;
                            let intro = setInterval(function () {
                                GameArea.clear();
                                GameArea.background();
                                DrawAll();
                                PlayerSprite.draw();
                                introloop = introloop + 1;
                                let shake1 = Math.cos(Math.PI / 180 * Math.floor(Math.random() * 361));
                                let shake2 = Math.cos(Math.PI / 180 * Math.floor(Math.random() * 361));
                                if (introloop % 5 === 0) {
                                    for (let i = 0; i < LevelObjects.length; i++) {
                                        for (let j = 0; j < LevelObjects[i].length; j++) {
                                            LevelObjects[i][j].x = LevelObjects[i][j].x + shake1;
                                            LevelObjects[i][j].y = LevelObjects[i][j].y + shake2;
                                        }
                                    }
                                    PlayerSprite.y = PlayerSprite.y + shake1;
                                    PlayerSprite.x = PlayerSprite.x + shake2;
                                    DrawAll();
                                    PlayerSprite.draw();
                                    for (let i = 0; i < LevelObjects.length; i++) {
                                        for (let j = 0; j < LevelObjects[i].length; j++) {
                                            LevelObjects[i][j].x = LevelObjects[i][j].x - shake1;
                                            LevelObjects[i][j].y = LevelObjects[i][j].y - shake2;
                                        }
                                    }
                                    PlayerSprite.y = PlayerSprite.y - shake1;
                                    PlayerSprite.x = PlayerSprite.x - shake2;
                                }
                                if (introloop === 1000) {
                                    LevelObjects[12][0].VelocityY = -2;
                                }
                                if (introloop === 500) {
                                    LevelObjects[13][0].VelocityY = -2;
                                }
                                if (LevelObjects[12][0].VelocityY >= 0) {
                                    LevelObjects[12][0].VelocityY = 0;
                                } else {
                                    LevelObjects[12][0].VelocityY = LevelObjects[12][0].VelocityY + 0.03;
                                }
                                if (LevelObjects[13][0].VelocityY >= 0) {
                                    LevelObjects[13][0].VelocityY = 0;
                                } else {
                                    LevelObjects[13][0].VelocityY = LevelObjects[13][0].VelocityY + 0.03;
                                }
                                LevelObjects[12][0].update();
                                LevelObjects[13][0].update();
                                LevelObjects[12][0].draw();
                                LevelObjects[13][0].draw();
                                if(introloop>1500){
                                    LevelObjects[12][0].rise = true;
                                    LevelObjects[12][0].initialT = Frames;
                                    placed = false;
                                    clearInterval(intro);
                                }
                            }, 1);
                        }
                    }else{
                        GameArea.clear();
                        GameArea.background();
                        GameArea.sprites();
                        GameArea.health();
                        Frames = Frames + 1;
                        count = 0;
                    }
                } else {
                    if (count <= 40) {
                        ctx.globalAlpha = 0.1;
                        ctx.fillStyle = 'black';
                        ctx.fillRect(0, 0, Canvas.width, Canvas.height);
                        count = count + 1;
                    } else {
                        if(!placed) {
                            GameArea.clear();
                            ctx.globalAlpha = 1;
                            ctx.fillStyle = 'black';
                            ctx.fillRect(0, 0, Canvas.width, Canvas.height);
                            ctx.font = '30px Arial';
                            ctx.fillStyle = 'red';
                            ctx.textAlign = 'center';
                            if(PlayerSprite.health<=0){
                                ctx.fillText('Game Over', Canvas.width / 2, 50);
                            }else{
                                ctx.fillText('Level Complete', Canvas.width / 2, 50);
                                ctx.font = '10px Arial';
                                ctx.fillText('Continue', 0.75*Canvas.width, 110);
                                LevelDetails[Level-1].completed = true;
                                ctx.fillText('Score: '+PlayerSprite.score, Canvas.width/2, 90);
                                if(LevelDetails[Level-1].highScore<PlayerSprite.score){
                                    ctx.fillText('New High Score', Canvas.width/2, 70);
                                }
                            }
                            ctx.font = '10px Arial';
                            ctx.fillText('Retry', Canvas.width / 2, 110);
                            ctx.fillText('Main Menu', Canvas.width / 4, 110);
                            ctx.fillText('Code: '+LevelDetails[Level-1].code, Canvas.width / 2, 140);
                            while (LevelObjects.length > 0) {
                                LevelObjects.splice(0, 1);
                            }
                            while (PlayerSprite.effects.length > 0) {
                                PlayerSprite.effects.splice(0, 1);
                            }
                            if ((Mouse.click)) {
                                if((Math.abs(Mouse.x - Canvas.width / 2) < 50) && (Math.abs(Mouse.y - 110) < 30)){
                                    placed = true;
                                    if((LevelDetails[Level-1].highScore<PlayerSprite.score)&&(PlayerSprite.health>0)){
                                        LevelDetails[Level-1].highScore = PlayerSprite.score;
                                    }
                                    PlayerSprite.VelocityX = 0;
                                    PlayerSprite.VelocityY = 0;
                                    PlayerSprite.health = 0;
                                    Frames = 0;
                                    PlayerSprite.collected = 0;
                                    PlayerSprite.image.src = 'Pictures/Player1.jpg';
                                    let AnimateLoop = 0;
                                    let animate2 = setInterval(function () {
                                        GameArea.clear();
                                        GameArea.background();
                                        AnimateLoop = AnimateLoop + 1;
                                        if(MapAndFade(AnimateLoop, LevelDetails[Level-1].name, LevelDetails[Level-1].flash, Level-1)) {
                                            if (MoveHelicopter(AnimateLoop-8000, 240, 110, 0.6 * LevelObjects[3][0].width, LevelObjects[0][LevelObjects[0].length-1].y-20)) {
                                                Spawners();
                                                PlayerSprite.health = 3;
                                                PlayerSprite.score = 0;
                                                count = 0;
                                                placed = false;
                                                clearInterval(animate2);
                                            }
                                        }
                                    }, 1);
                                }else if((Math.abs(Mouse.x - Canvas.width*0.75) < 50) && (Math.abs(Mouse.y - 110) < 30)){
                                    placed = true;
                                    PlayerSprite.VelocityX = 0;
                                    PlayerSprite.VelocityY = 0;
                                    Frames = 0;
                                    if((LevelDetails[Level-1].highScore<PlayerSprite.score)&&(PlayerSprite.health>0)){
                                        LevelDetails[Level-1].highScore = PlayerSprite.score;
                                    }
                                    PlayerSprite.health = 0;
                                    PlayerSprite.image.src = 'Pictures/Player1.jpg';
                                    Level = Level +1;
                                    let AnimateLoop = 0;
                                    let animate3 = setInterval(function () {
                                        AnimateLoop = AnimateLoop + 1;
                                        GameArea.clear();
                                        GameArea.background();
                                        if(!(Level===4)) {
                                            if (MapAndFade(AnimateLoop, LevelDetails[Level - 1].name, LevelDetails[Level - 1].flash, Level - 1)) {
                                                if (MoveHelicopter(AnimateLoop - 8000, 240, 110, 0.6 * LevelObjects[3][0].width, LevelObjects[0][LevelObjects[0].length - 1].y - 20)) {
                                                    if (!(Level === 3)) {
                                                        Spawners();
                                                    }
                                                    PlayerSprite.score = 0;
                                                    PlayerSprite.health = 3;
                                                    PlayerSprite.collected = 0;
                                                    count = 0;
                                                    placed = false;
                                                    clearInterval(animate3);
                                                }
                                            }
                                        }else{
                                            ctx.fillStyle = 'Black';
                                            ctx.fillRect(0,0,Canvas.width, Canvas.height);
                                            ctx.fillStyle = 'red';
                                            ctx.font = '30px Arial';
                                            ctx.fillText('CONGRATS!', Canvas.width/2, 30);
                                            ctx.font = '15px Arial';
                                            ctx.fillText('You Escaped the Island with all the Amber!', Canvas.width/2, 60);
                                            ctx.font = '10px Arial';
                                            ctx.fillText('Level 1 Code:'+LevelDetails[0].code, Canvas.width/2, 90);
                                            ctx.fillText('Level 2 Code:'+LevelDetails[1].code, Canvas.width/2, 100);
                                            ctx.fillText('Level 3 Code:'+LevelDetails[2].code, Canvas.width/2, 110);
                                            ctx.fillText('Back To Main Menu', Canvas.width/2, 130);
                                            if(Mouse.click&&(Math.abs(Mouse.x - Canvas.width*0.5) < 50) && (Math.abs(Mouse.y - 130) < 30)){
                                                count = 0;
                                                placed = false;
                                                Level = 0;
                                                PlayerSprite.VelocityX = 0;
                                                PlayerSprite.score = 0;
                                                PlayerSprite.VelocityY = 0;
                                                Frames = 0;
                                                PlayerSprite.image.src = 'Pictures/Player1.jpg';
                                                clearInterval(animate3);
                                            }
                                        }
                                    }, 1);
                                }else if((Math.abs(Mouse.x - Canvas.width / 4) < 50) && (Math.abs(Mouse.y - 110) < 30)){
                                    if((LevelDetails[Level-1].highScore<PlayerSprite.score)&&(PlayerSprite.health>0)){
                                        LevelDetails[Level-1].highScore = PlayerSprite.score;
                                    }
                                    Level = 0;
                                    PlayerSprite.VelocityX = 0;
                                    PlayerSprite.VelocityY = 0;
                                    PlayerSprite.score = 0;
                                    Frames = 0;
                                    PlayerSprite.image.src = 'Pictures/Player1.jpg';
                                    placed = false;
                                    count = 0;
                                }
                            }
                        }
                    }
                }
            }
        }, 1);
    },
    clear: function(){
        let Canvas = document.getElementById('GameArea');
        let ctx = Canvas.getContext('2d');
        ctx.clearRect(0,0,Canvas.width, Canvas.height);
    },
    background: function(){
        let Canvas = document.getElementById('GameArea');
        let ctx = Canvas.getContext('2d');
        ctx.fillStyle = '#90e2d6';
        ctx.fillRect(0,0,Canvas.width, Canvas.height);
    },
    health: function(){
        let Canvas = document.getElementById('GameArea');
        let ctx = Canvas.getContext('2d');
        if((CheckHitBoxes(PlayerSprite.HitUp, 5, false)||CheckHitBoxes(PlayerSprite.HitRight, 5, false)||CheckHitBoxes(PlayerSprite.HitDown, 5, false)||CheckHitBoxes(PlayerSprite.HitLeft, 5, false))||(CheckHitBoxes(PlayerSprite.HitUp, 2, false)||CheckHitBoxes(PlayerSprite.HitRight, 2, false)||CheckHitBoxes(PlayerSprite.HitDown, 2, false)||CheckHitBoxes(PlayerSprite.HitLeft, 2, false))){
            PlayerLoseHealth(1);
        }
        if(LevelObjects[0].length>0) {
            if (PlayerSprite.y > LevelObjects[0][0] + PlayerSprite.height * PlayerSprite.scaled) {
                PlayerSprite.health = 0;
            }
        }
        ctx.fillStyle = 'black';
        ctx.fillRect(Canvas.width-110,0,110,15);
        ctx.font = '10px Arial';
        ctx.textAlign = 'left';
        ctx.fillStyle = 'white';
        ctx.fillText(String('Health: '+PlayerSprite.health), Canvas.width-50, 10);
        ctx.fillText(String('Score: '+PlayerSprite.score), Canvas.width-100, 10);

    },
    sprites: function(){
        let Canvas = document.getElementById('GameArea');
        //let ctx = Canvas.getContext('2d');
        if(!CheckEnd()) {
            if(LevelDetails[Level-1].scroll) {
                let ScrollSpeed = 0.3;
                if (LevelDetails[Level - 1].scrollType==='Limit') {
                    if ((PlayerSprite.y <= 30) && (LevelObjects[0][LevelObjects[0].length - 1].y <= 30)) {
                        for (let i = 0; i < LevelObjects.length; i++) {
                            for (let j = 0; j < LevelObjects[i].length; j++) {
                                LevelObjects[i][j].y = LevelObjects[i][j].y + ScrollSpeed;
                            }
                        }
                        PlayerSprite.y = PlayerSprite.y + ScrollSpeed;
                    } else if ((PlayerSprite.y >= Canvas.height - 20) && (LevelObjects[0][0].y >= Canvas.height - 20)) {
                        for (let i = 0; i < LevelObjects.length; i++) {
                            for (let j = 0; j < LevelObjects[i].length; j++) {
                                LevelObjects[i][j].y = LevelObjects[i][j].y - ScrollSpeed;
                            }
                        }
                        PlayerSprite.y = PlayerSprite.y - ScrollSpeed;
                    }
                } else if (LevelDetails[Level - 1].scrollType === 'continue') {
                    if(Level===3&&LevelObjects[12][0].rise&&(LevelObjects[0][LevelObjects[0].length - 1].y <= 30)) {
                        if(PlayerSprite.y <= 30){
                            ScrollSpeed = 0.3;
                        }else{
                            ScrollSpeed = 0.05;
                        }
                        for (let i = 0; i < LevelObjects.length; i++) {
                            for (let j = 0; j < LevelObjects[i].length; j++) {
                                LevelObjects[i][j].y = LevelObjects[i][j].y + ScrollSpeed;
                            }
                        }
                        PlayerSprite.y = PlayerSprite.y + ScrollSpeed;
                        LevelObjects[12][0].y = LevelObjects[12][0].y - ScrollSpeed;
                        LevelObjects[13][0].y = LevelObjects[13][0].y - ScrollSpeed;
                    }
                }
            }
            DrawAll();
            for (let i = 0; i < 12; i++) {
                UpdateClones(i);
                if(CheckEnd()){
                    break;
                }
            }
            if(Level===3){
                if(LevelObjects[12][0].rise) {
                    UpdateClones(12);
                    UpdateClones(13);
                }
            }
            UpdatePlayer();
        }
        //draw character
    }
}

let Keys = {
    left: false,
    up: false,
    right: false,
    down: false,
    space: false,
    delete: false,
    deleteClick: false,
    a: false,
    w: false,
    s: false,
    d: false,
    update: function(){
        this.left = Pressed[0];
        this.up = Pressed[1];
        this.right = Pressed[2];
        this.down = Pressed[3];
        this.space = Pressed[4];
        this.a = Pressed[5];
        this.w = Pressed[6];
        this.s = Pressed[7];
        this.d = Pressed[8];
    },
    keystrokes: function(){
        document.addEventListener('keydown', function(e){
            if(KeysAvailable.indexOf(String(e.key))>=0) {
                Pressed.splice(KeysAvailable.indexOf(String(e.key)), 1, true);
            }
        });
        document.addEventListener('keyup', function(e){
            if(KeysAvailable.indexOf(String(e.key))>=0) {
                Pressed.splice(KeysAvailable.indexOf(String(e.key)), 1, false);
            }
        });
        document.addEventListener('keydown', function(e){
            if(String(e.key)==='Backspace') {
                Keys.delete = true;
            }
        });
        document.addEventListener('keyup', function(e){
            if(String(e.key)==='Backspace') {
                if(Keys.delete){
                    Keys.deleteClick = true;
                    setTimeout(function(){
                        Keys.deleteClick = false;
                    },3);
                }
                Keys.delete = false;
            }
        });
    },
    numbers: function(){
        document.addEventListener('keydown', function(e){
            if(!(String(Number(e.key))==='NaN')) {
                NumbersPressed.splice(e.key, 1, true);
            }
        });
        document.addEventListener('keyup', function(e){
            if(!(String(Number(e.key))==='NaN')) {
                if(NumbersPressed[e.key]) {
                    NumbersClick.splice(e.key, 1, true);
                    setTimeout(function(){
                        NumbersClick.splice(e.key, 1, false);
                    },3);
                }
                NumbersPressed.splice(e.key, 1, false);
            }
        });
    }
}

let Mouse = {
    down: false,
    x: 0,
    y: 0,
    click: false,
    initialize: function(){
        document.addEventListener('mousedown', function(){
            Mouse.down = true;
        });
        document.addEventListener('mouseup', function(){
            if(Mouse.down){
                Mouse.click = true;
                setTimeout(function(){
                    Mouse.click = false;
                },3);
            }
            Mouse.down = false;
        });
        let xx = document.getElementById('GameArea');
        xx.addEventListener('mousemove', function(e){
            let Canvas = document.getElementById('GameArea');
            let CanvasAttributes = Canvas.getBoundingClientRect();
            Mouse.x = (e.pageX-CanvasAttributes.left)*300/(CanvasAttributes.right-CanvasAttributes.left);
            Mouse.y = (e.pageY-CanvasAttributes.top)*150/(CanvasAttributes.bottom-CanvasAttributes.top);
        });
        xx.addEventListener('mouseover', function(e){
            let Canvas = document.getElementById('GameArea');
            let CanvasAttributes = Canvas.getBoundingClientRect();
            Mouse.x = (e.pageX-CanvasAttributes.left)*300/(CanvasAttributes.right-CanvasAttributes.left);
            Mouse.y = (e.pageY-CanvasAttributes.top)*150/(CanvasAttributes.bottom-CanvasAttributes.top);
        });
    },
}

function Load(){
    Keys.keystrokes();
    Keys.numbers();
    Mouse.initialize();
    PlayerSprite.XFlip = -1;
    PlayerSprite.YFlip = 1;
    PlayerSprite.WalkAnimation = ['Player1','Player2'];
    PlayerSprite.Invincibility = false;
    PlayerSprite.Opacity = 1;
    PlayerSprite.score = 0; //RemoveLater
    PlayerSprite.effects = [];
    PlayerSprite.collected = 0;
    let L1 = {
        ground: 3,
        scroll: false,
        scrollType: null,
        code: String(Math.floor(Math.random()*10))+String(Math.floor(Math.random()*10))+String(Math.floor(Math.random()*10))+String(Math.floor(Math.random()*10))+String(Math.floor(Math.random()*10)),
        completed: false,
        amber: 1,
        name: 'Into the Thick of It',
        flash: '132,48',
        highScore: 0,
    }
    let L2 = {
        ground: 7,
        scroll: true,
        scrollType: 'Limit',
        code: String(Math.floor(Math.random()*10))+String(Math.floor(Math.random()*10))+String(Math.floor(Math.random()*10))+String(Math.floor(Math.random()*10))+String(Math.floor(Math.random()*10)),
        completed: false,
        amber: 2,
        name: 'The Trek',
        flash: '190,60',
        highScore: 0,
    }
    let L3 = {
        ground: 21,
        scroll: true,
        scrollType: 'continue',
        code: String(Math.floor(Math.random()*10))+String(Math.floor(Math.random()*10))+String(Math.floor(Math.random()*10))+String(Math.floor(Math.random()*10))+String(Math.floor(Math.random()*10)),
        completed: false,
        amber: 0,
        name: 'The Final Escape',
        flash:'150,100',
        highScore: 0,
    }
    LevelDetails.push(L1);
    LevelDetails.push(L2);
    LevelDetails.push(L3);

    // InitializeLevel(1);
    // Spawners();

    GameArea.start();
}

function CreateSprites(x, y, w, h, scale, angle, VelocityX, VelocityY, VelocityAngled, AccelerationX, AccelerationY, img, Health, XFlipped, YFlipped){
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.scaled = scale;
    this.angle = angle;
    this.VelocityX = VelocityX;
    this.VelocityY = VelocityY;
    this.VelocityAngle = VelocityAngled;
    this.AccelX = AccelerationX;
    this.AccelY = AccelerationY;
    this.image = new Image();
    this.image.src = 'Pictures/'+img+'.jpg';
    this.health = Health;
    this.mirrorX = XFlipped;
    this.mirrorY = YFlipped;
    this.draw = function(){
        let ctx = document.getElementById('GameArea').getContext('2d');
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle*Math.PI/180);
        if(this === PlayerSprite){
            ctx.scale(this.scaled*this.XFlip,this.scaled*this.YFlip);
        }else{
            ctx.scale(this.scaled*this.mirrorX,this.scaled*this.mirrorY);
        }
        ctx.drawImage(this.image, -this.width/2, -this.height/2, this.width, this.height);
        ctx.restore();
    }
    this.update = function(){
        this.VelocityX = this.VelocityX + this.AccelX;
        this.VelocityY = this.VelocityY + this.AccelY;
        this.x = this.x + this.VelocityX;
        this.y = this.y + this.VelocityY;
        this.angle = this.angle + this.VelocityAngle;
    }
    this.HitLeft = [];
    this.HitUp = [];
    this.HitRight = [];
    this.HitDown = [];
    this.HitBoxes = [this.HitLeft, this.HitUp, this.HitRight, this.HitDown];
    this.HitBoxUpdate = function(){
        while(this.HitLeft.length>0){
            this.HitLeft.splice(0,1);
        }
        while(this.HitUp.length>0){
            this.HitUp.splice(0,1);
        }
        while(this.HitRight.length>0){
            this.HitRight.splice(0,1);
        }
        while(this.HitDown.length>0){
            this.HitDown.splice(0,1);
        }
        for(let i = this.x-this.scaled*this.width/2*0.8; i<this.x+0.8*this.scaled*this.width/2; i++){
            this.HitUp.push(String(i+','+String(Number(this.y-this.scaled*this.height/2))));
            this.HitDown.push(String(i+','+String(Number(this.y+this.scaled*this.height/2))));
        }
        for(let i = this.y-this.scaled*this.height/2*0.8; i<this.y+this.scaled*this.height/2*0.8; i++){
            this.HitLeft.push(String(Number(this.x-this.scaled*this.width/2))+','+i);
            this.HitRight.push(String(Number(this.x+this.scaled*this.width/2))+','+i);
        }
        while(this.HitBoxes.length>0){
            this.HitBoxes.splice(0,1);
        }
        this.HitBoxes.push(this.HitLeft);
        this.HitBoxes.push(this.HitUp);
        this.HitBoxes.push(this.HitRight);
        this.HitBoxes.push(this.HitDown);
    };
}

function InitializeLevel(level){
    let canvas = document.getElementById('GameArea');
    let ground = [];
    let caves = [];
    let object = LevelDetails[level];
    for(let i =0; i<14; i++){
        let x = [];
        LevelObjects.push(x);
    }
    let end = new CreateSprites(35, -140, 50, 20, 1, 0, 0, 0, 0, 0, 0, 'End', 0, 1, 1);
    LevelObjects[3].push(end);
    for(let i = 0; i<object.ground; i++){
        let clone = new CreateSprites(canvas.width/2-20*Math.cos(Math.PI*i), canvas.height-20-50*i, 1+canvas.width-20, 10, 1, 0, 0, 0, 0, 0, 0, 'Ground', 0, 1, 1);
        ground.push(clone);
        clone.draw();
    }
    LevelObjects.splice(0,1,ground);
    let ladders = [];
    for(let i = 0; i<object.ground-1; i++){
        let XPosition = 0;
        let place = false;
        while(place===false){
            XPosition = 80+Math.floor(Math.random()*(canvas.width-150));
            if((ladders.length===0)||(Math.abs(XPosition-ladders[ladders.length-1].x)>60)) {
                place = true;
            }
        }
        let ladder = new CreateSprites(XPosition, canvas.height-60-50*i, 20, 70, 1, 0, 0, 0, 0, 0, 0, 'Ladder', 0, 1, 1);
        let cave = new CreateSprites(-canvas.width/2*Math.cos(Math.PI*i)+canvas.width/2, canvas.height-40-50*i, 20, 20, 1, 0, 0, 0, 0, 0, 0, 'Cave', 0, -Math.cos(Math.PI*i), 1);
        cave = GroundSideCollision(cave);
        cave.HitBoxUpdate();
        while(!CheckHitBoxes(cave.HitDown, 0, true)){
            cave.y = cave.y + 1;
            cave.HitBoxUpdate();
        }
        cave.y = cave.y +2;
        caves.push(cave);
        ladders.push(ladder);
        ladder.draw();
    }
    LevelObjects.splice(1,1,ladders);
    LevelObjects.splice(4,1,caves);
    let XPos = 80+Math.floor(Math.random()*(canvas.width-150));
    let amber = [];
    for(let i =0; i<object.amber; i++){
        let place = false;
        while(place===false){
            XPos = 80+Math.floor(Math.random()*(canvas.width-150));
            place = true
            if(amber.length===0){
                continue;
            }
            for (let j = 0; j < amber.length; j++) {
                if(Math.abs(XPos-amber[j].x)<amber[j].width){
                    place = false;
                }
            }
        }
        let ambersprite = new CreateSprites(XPos, canvas.height-60-50*Math.floor(Math.random()*object.ground), 20, 20, 0.5, 0, 0, 0, 0, 0, 0, 'Amber', 0, 1, 1);
        ambersprite.HitBoxUpdate();
        while(!CheckHitBoxes(ambersprite.HitDown, 0, true)){
            ambersprite.y = ambersprite.y +1;
            ambersprite.HitBoxUpdate();
        }
        amber.push(ambersprite);
    }
    LevelObjects.splice(11,1,amber);
    if(level===2){
        let mosa = new CreateSprites(canvas.width/2, canvas.height+50, 40, 20, 3, 0, 0, 0, 0, 0, 0, 'Mosasaur', 0, 1, 1);
        let ocean = new CreateSprites(canvas.width/2, canvas.height+150, canvas.width, 100, 3, 0, 0, 0, 0, 0, 0, 'Water', 0, 1, 1);
        mosa.initialT = 0;
        mosa.rise = false;
        LevelObjects[12].push(mosa);
        LevelObjects[13].push(ocean);
    }
}

function UpdatePlayer(){
    PlayerSprite.HitBoxUpdate();
    let ctx = document.getElementById('GameArea').getContext('2d');
    let OnLadder = false;
    let LadderHit = [false, false];
    PlayerSprite = CheckGravity(PlayerSprite);
    for(let i = 0; i<LevelObjects[1].length; i++){
        let Sprite = LevelObjects[1][i];
        if(((PlayerSprite.x > (Sprite.x - Sprite.width / 2)) && (PlayerSprite.x < (Sprite.x + Sprite.width / 2))) && ((PlayerSprite.y > (Sprite.y - Sprite.height / 2)) && (PlayerSprite.y < (Sprite.y + Sprite.height / 2)))){
            OnLadder = true;
            if((PlayerSprite.y-1.1*PlayerSprite.scaled*PlayerSprite.height/2 > (Sprite.y - Sprite.height / 2))){
                //bottom
                LadderHit.splice(0, 1, true);
            }
            if((PlayerSprite.y+1.1*PlayerSprite.scaled*PlayerSprite.height/2 < (Sprite.y + Sprite.height / 2))){
                //top
                LadderHit.splice(1, 1, true);
            }
        }
    }
    if(((LadderHit[0]&&LadderHit[1])||(OnLadder&&(Keys.up||Keys.down)))){
        PlayerSprite.AccelY = 0;
        if (Keys.up && LadderHit[0]) {
            PlayerSprite.VelocityY = -0.25;
        } else if (Keys.down && LadderHit[1]) {
            PlayerSprite.VelocityY = 0.25;
        } else {
            PlayerSprite.VelocityY = 0;
        }
    } else {
        if (CheckHitBoxes(PlayerSprite.HitDown, 0, true)) {
            PlayerSprite.AccelY = 0;
            if (Keys.space) {
                PlayerSprite.VelocityY = -0.75;
            } else {
                PlayerSprite.VelocityY = 0;
            }
        } else {
            PlayerSprite = AntiPhase(PlayerSprite);
        }
    }
    if(PlayerSprite.Invincibility){
        if(Frames%19===0) {
            PlayerSprite.Opacity = 0.3 * Math.cos(Math.PI * (Frames % 2)) + 0.7;
        }
    }else{
        PlayerSprite.Opacity = 1;
    }
    ctx.globalAlpha = PlayerSprite.Opacity;
    PlayerHorizontalMovement();
    PlayerSprite.update();
    PlayerSprite.draw();
    ctx.globalAlpha  = 1;
}

function DetermineSpeed(){
    let speed;
    if((PlayerSprite.effects.indexOf('fast')>=0)&&((PlayerSprite.effects.indexOf('slow')>=0))){
        speed = 0.35;
    }else if(PlayerSprite.effects.indexOf('fast')>=0){
        speed = 0.55;
    }else if(PlayerSprite.effects.indexOf('slow')>=0){
        speed = 0.15;
    }else{
        speed = 0.35;
    }
    return(speed);
}

function PlayerHorizontalMovement(){
    if (!(Keys.left && Keys.right)) {
        let imagesrc = String(PlayerSprite.image.src);
        if ((Keys.left&&!CheckHitBoxes(PlayerSprite.HitLeft, 0, false)) || (Keys.right&&!CheckHitBoxes(PlayerSprite.HitRight, 0, false))) {
            if (Keys.left&&!CheckHitBoxes(PlayerSprite.HitLeft, 0, false)) {
                PlayerSprite.VelocityX = -DetermineSpeed();
                PlayerSprite.XFlip = -1;
            } else if (Keys.right&&!CheckHitBoxes(PlayerSprite.HitRight, 0, false)) {
                PlayerSprite.VelocityX = DetermineSpeed();
                PlayerSprite.XFlip = 1;
            }
            if (CheckHitBoxes(PlayerSprite.HitDown, 0, false)) {
                if(Frames%30===0){
                    PlayerSprite.image.src = 'Pictures/' + PlayerSprite.WalkAnimation[(PlayerSprite.WalkAnimation.indexOf(imagesrc.substring(71, imagesrc.length - 4)) + 1) % PlayerSprite.WalkAnimation.length] + '.jpg';
                }else{
                    PlayerSprite.image.src = 'Pictures/' + PlayerSprite.WalkAnimation[(PlayerSprite.WalkAnimation.indexOf(imagesrc.substring(71, imagesrc.length - 4))) % PlayerSprite.WalkAnimation.length] + '.jpg';
                }
            } else {
                PlayerSprite.image.src = 'Pictures/Player2.jpg'
            }
        } else {
            PlayerSprite.VelocityX = 0;
            PlayerSprite.image.src = 'Pictures/Player1.jpg';
        }
    }
    PlayerSprite = GroundSideCollision(PlayerSprite);
}

function CheckHitBoxes(HitBoxGroup, Target, OverRide){
    let Touch = false;
    if(!CheckEnd()||OverRide) {
        for (let i = 0; i < LevelObjects[Target].length; i++) {
            let Sprite = LevelObjects[Target][i];
            for (let j = 0; j < HitBoxGroup.length; j++) {
                let XPoint = Number(HitBoxGroup[j].substring(0, HitBoxGroup[j].indexOf(',')));
                let YPoint = Number(HitBoxGroup[j].substring(HitBoxGroup[j].indexOf(',') + 1, HitBoxGroup[j].length));
                if (((XPoint > (Sprite.x - Sprite.scaled * Sprite.width / 2)) && (XPoint < (Sprite.x + Sprite.scaled * Sprite.width / 2))) && ((YPoint > (Sprite.y - Sprite.scaled * Sprite.height / 2)) && (YPoint < (Sprite.y + Sprite.scaled * Sprite.height / 2)))) {
                    Touch = true;
                    break;
                }
            }
            if (Touch) {
                break;
            }
        }
    }
    return (Touch);
}

function Spawners(){
    let canvas = document.getElementById('GameArea');
    let SpawnDebug = [true, true, true, true];
    if(SpawnDebug[0]) {
        let SpawnBarrels = setInterval(function () {
            if (CheckEnd()) {
                clearInterval(SpawnBarrels);
            }else {
                let Barrel = new CreateSprites(100, LevelObjects[0][LevelObjects[0].length - 1].y - 60, 20, 20, 0.5, 40, 0.3, 0, 6, 0, 0, 'Barrels', 0, 1, 1);
                Barrel.draw();
                if (!CheckEnd()) {
                    LevelObjects[2].push(Barrel);
                }
                Barrel.remove = false;
            }
        }, 4000);
    }
    if(SpawnDebug[1]){
        let SpawnCompies = setInterval(function () {
            if (CheckEnd()) {
                clearInterval(SpawnCompies);
            } else if (LevelObjects[5].length < 3) {
                let SelectSpawn = LevelObjects[4][Math.floor(Math.random() * LevelObjects[4].length)];
                let compy = new CreateSprites(SelectSpawn.x, SelectSpawn.y, 20, 10, 0.8, 0, 0, 0, 0, 0, 0, 'Compy1', 0, 1, 1);
                compy = GroundSideCollision(compy);
                compy.HitBoxUpdate();
                if(!CheckEnd()) {
                    LevelObjects[5].push(compy);
                }
                compy.remove = false;
                compy.goAway = 0;
                compy.WalkAnimation = ['Compy1', 'Compy2'];
                let go = setTimeout(function () {
                    if (compy.remove || CheckEnd()) {
                        clearTimeout(go);
                    }
                    let find = 0;
                    if(!CheckEnd()) {
                        for (let i = 0; i < LevelObjects[4].length; i++) {
                            if (Math.abs(compy.y - LevelObjects[4][i].y) < 20) {
                                find = i;
                            }
                        }
                        compy.goAway = 0.3 * (LevelObjects[4][find].x - compy.x) / Math.abs(LevelObjects[4][find].x - compy.x);
                    }
                }, 25000);
            }
        }, 2500);
    }
    if(SpawnDebug[2]) {
        let SpawnSupplies = setInterval(function(){
            if(CheckEnd()){
                clearInterval(SpawnSupplies);
            }
            let supply = new CreateSprites(80 + Math.floor(Math.random() * (canvas.width - 150)), -100, 20, 20, 1, 0, 0, 0, 0, 0, 0, 'Deliver', 0, 1, 1);
            supply.InitialT = Frames;
            supply.break = false;
            supply.HitBoxUpdate();
            supply.time = 250*Math.floor(Math.random()*3)+200;
            supply.explode = false;
            if(!CheckEnd()){
                LevelObjects[6].push(supply);
            }
            let drop = setInterval(function(){
                if(Frames>=(supply.time+supply.InitialT)){
                    supply.break = true;
                    clearInterval(drop);
                }else if(supply.y>canvas.height+supply.height){
                    supply.remove = true;
                    clearInterval(drop);
                }
            },1);
        }, 4000);
    }
    if(SpawnDebug[3]){
        let SpawnSnails = setInterval(function(){
            if(CheckEnd()){
                clearInterval(SpawnSnails);
            }else {
                let SelectSpawn = LevelObjects[4][Math.floor(Math.random() * LevelObjects[4].length)];
                let slug = new CreateSprites(SelectSpawn.x, SelectSpawn.y, 20, 10, 0.6, 0, 0, 0, 0, 0, 0, 'Snail', 0, 1, 1);
                slug = GroundSideCollision(slug);
                slug.HitBoxUpdate();
                slug.remove = false;
                slug.index = -1;
                if (!CheckEnd()) {
                    LevelObjects[10].push(slug);
                }
            }
        }, 8000);
    }
}

function BarrelBehavior(Sprite, index){
    let Canvas = document.getElementById('GameArea');
    let Barrel = Sprite;
    let Change = [false, false];
    let BoxVelocity;
    if(index===2){
        BoxVelocity = 0.5;
    }else if(index===10){
        BoxVelocity = 0.2;
    }
    Barrel.HitBoxUpdate();
    Change.splice(0,1, CheckHitBoxes(Barrel.HitDown, 0, false));
    Barrel = CheckGravity(Barrel);
    Barrel = GroundSideCollision(Barrel);
    Barrel.update();
    Barrel.HitBoxUpdate();
    Change.splice(1, 1, CheckHitBoxes(Barrel.HitDown, 0, false));
    if((!Change[0])&&Change[1]){
        if(Barrel.x>Canvas.width/2){
            Barrel.VelocityX = -BoxVelocity;
            if(index===2){
                Barrel.VelocityAngle = -3;
            }else{
                Barrel.mirrorX = 1;
            }
        }else{
            Barrel.VelocityX = BoxVelocity;
            if(index===2){
                Barrel.VelocityAngle = 3;
            }else{
                Barrel.mirrorX = -1;
            }
        }
    }
    if(Barrel.y>LevelObjects[0][0].y+40+Barrel.scaled*Barrel.height){
        Barrel.remove = true;
    }else if(Level===3){
        if(Touching(LevelObjects[12][0], Barrel)){
            Barrel.remove = true;
        }
    }
    if(Touching(PlayerSprite, Barrel)&&(index===10)){
        if(Barrel.index===-1){
            PlayerSprite.effects.push('slow');
            Barrel.index = PlayerSprite.effects.length-1;
            let slow = setTimeout(function(){
                if(PlayerSprite<=0){
                    clearTimeout(slow);
                }
                PlayerSprite.effects.splice(Barrel.index, 1, null);
            }, 5000);
        }
    }
    return (Barrel);
}

function GroundSideCollision(Sprites){
    let Sprite = Sprites;
    let Canvas = document.getElementById('GameArea');
    while((Sprite.x+Sprite.width*Sprite.scaled/2)>Canvas.width){
        Sprite.x = Sprite.x - 1;
    }
    while((Sprite.x-Sprite.width*Sprite.scaled/2)<0){
        Sprite.x = Sprite.x + 1;
    }
    if((CheckHitBoxes(Sprite.HitLeft, 0, false)||CheckHitBoxes(Sprite.HitRight, 0, false))&&(!(CheckHitBoxes(Sprite.HitLeft, 0, false)&&CheckHitBoxes(Sprite.HitRight, 0, false)))){
        if(CheckHitBoxes(Sprite.HitLeft, 0, false)){
            while (CheckHitBoxes(Sprite.HitLeft, 0, false)){
                Sprite.x = Sprite.x + 1;
                Sprite.HitBoxUpdate();
            }
        }else if(CheckHitBoxes(Sprite.HitRight, 0, false)){
            while (CheckHitBoxes(Sprite.HitRight, 0, false)){
                Sprite.x = Sprite.x - 1;
                Sprite.HitBoxUpdate();
            }
        }
    }
    return (Sprite);
}

function CompyBehavior(sprite){
    let compy = sprite;
    let imagesrc = String(compy.image.src);
    compy.HitBoxUpdate();
    compy = CheckGravity(compy);
    if(compy.goAway===0) {
        if (PlayerSprite.x > compy.x) {
            compy.AccelX = 0.01;
        } else if (PlayerSprite.x < compy.x) {
            compy.AccelX = -0.01;
        }
        if ((PlayerSprite.x - compy.x > compy.VelocityX) || (PlayerSprite.x - compy.x < compy.VelocityX)) {
            compy.AccelX = (PlayerSprite.x - compy.x) / 100000;
        } else {
            compy.AccelX = (PlayerSprite.x - compy.x) / 1000000;
        }
        if (compy.y > LevelObjects[0][0].y + compy.scaled * compy.height) {
            compy.remove = true;
        }else if(Level===3){
            if(Touching(LevelObjects[12][0], compy)){
                compy.remove = true;
            }
        }
    }else{
        compy.VelocityX = compy.goAway;
        compy.AccelX = 0;
        if(CheckHitBoxes(compy.HitLeft,4, false)||CheckHitBoxes(compy.HitRight, 4, false)){
            compy.remove = true;
        }else if(Level===3){
            if(Touching(LevelObjects[12][0], compy)){
                compy.remove = true;
            }
        }
    }
    if (compy.VelocityX > 0) {
        compy.mirrorX = 1;
    } else if (compy.VelocityX < 0) {
        compy.mirrorX = -1;
    }
    if(Frames%30===0){
        compy.image.src = 'Pictures/' + compy.WalkAnimation[(compy.WalkAnimation.indexOf(imagesrc.substring(63, imagesrc.length - 4)) + 1) % compy.WalkAnimation.length] + '.jpg';
    }
    compy = AntiPhase(compy);
    compy = GroundSideCollision(compy);
    compy.update();
    return(compy);
}

function CheckGravity(Sprites){
    let sprite = Sprites;
    if(CheckHitBoxes(sprite.HitDown, 0, true)){
        sprite.AccelY = 0;
        sprite.VelocityY = 0;
    } else {
        sprite.AccelY = 0.01;
    }
    return sprite;
}

function UpdateClones(Index){
    let ctx = document.getElementById('GameArea').getContext('2d');
    if(!CheckEnd()){
        for (let i = 0; i < LevelObjects[Index].length; i++) {
            LevelObjects[Index][i].HitBoxUpdate();
            if (Index === 2 || Index === 10) {
                LevelObjects[Index].splice(i, 1, BarrelBehavior(LevelObjects[Index][i], Index));
            } else if (Index === 5) {
                LevelObjects[Index].splice(i, 1, CompyBehavior(LevelObjects[Index][i]));
            } else if (Index === 6) {
                LevelObjects[Index].splice(i, 1, CrateBehavior(LevelObjects[Index][i]));
            } else if ((Index >= 7) && (Index <= 9)) {
                LevelObjects[Index].splice(i, 1, PowerBehavior(LevelObjects[Index][i], Index));
            } else if (Index === 11) {
                LevelObjects[Index].splice(i, 1, AmberBehavior(LevelObjects[Index][i]));
            }else if(Index === 12||Index === 13){
                LevelObjects[Index].splice(i, 1, FinaleBehavior(LevelObjects[Index][i], Index));
            }
            LevelObjects[Index][i].draw();
            if (LevelObjects[Index][i].remove) {
                LevelObjects[Index].splice(i, 1, null);
            }
        }
        while (LevelObjects[Index].indexOf(null) >= 0) {
            LevelObjects[Index].splice(LevelObjects[Index].indexOf(null), 1);
        }
    }
    ctx.globalAlpha = 1;
}

function AntiPhase(Sprite){
    let sprites = Sprite;
    sprites.HitBoxUpdate();
    if (CheckHitBoxes(sprites.HitUp, 0, false)) {
        sprites.VelocityY = 0;
        while (CheckHitBoxes(sprites.HitUp, 0, false)){
            sprites.y = sprites.y + 1;
            sprites.HitBoxUpdate();
        }
    }
    return(sprites);
}

function PowerBehavior(heart, index){
    let sprite = heart;
    let ctx = document.getElementById('GameArea').getContext('2d');
    if(Frames%59===0&&sprite.flash ) {
        if (Frames % 2 === 0) {
            heart.Opacity = 0.01;
        } else {
            heart.Opacity = 1;
        }
    }
    ctx.globalAlpha = heart.Opacity;
    sprite.HitBoxUpdate();
    if(Touching(PlayerSprite,sprite)){
        if(index===7){
            PlayerSprite.health = PlayerSprite.health+1;
        }else if(index === 8){
            if(sprite.index === -1){
                PlayerSprite.effects.push('fast');
                sprite.index = PlayerSprite.effects.length-1;
                let fast = setTimeout(function(){
                    if(CheckEnd()){
                        clearTimeout(fast);
                    }
                    PlayerSprite.effects.splice(sprite.index, 1, null);
                }, 5000);
            }
        }else if(index===9){
            PlayerSprite.score = PlayerSprite.score+1;
        }
        sprite.remove = true;
    }else if(Level===3){
        if(Touching(sprite, LevelObjects[12][0])){
            sprite.remove = true;
        }
    }
    sprite = CheckGravity(sprite);
    sprite.update();
    return(sprite);
}

function Touching(s1, s2){
    s1.HitBoxUpdate();
    s2.HitBoxUpdate();
    for(let i =0; i<s1.HitBoxes.length; i++){
        for(let j = 0; j<s1.HitBoxes[i].length; j++){
            let XPoint = Number(s1.HitBoxes[i][j].substring(0, s1.HitBoxes[i][j].indexOf(',')));
            let YPoint = Number(s1.HitBoxes[i][j].substring(s1.HitBoxes[i][j].indexOf(',') + 1, s1.HitBoxes[i][j].length));
            if (((XPoint > (s2.x - s2.scaled*s2.width / 2)) && (XPoint < (s2.x + s2.scaled*s2.width / 2))) && ((YPoint > (s2.y - s2.scaled*s2.height / 2)) && (YPoint < (s2.y + s2.scaled*s2.height / 2)))) {
                return true;
            }
        }
    }
    for(let i =0; i<4; i++){
        for(let j = 0; j<s2.HitBoxes[i].length; j++){
            let XPoint = Number(s2.HitBoxes[i][j].substring(0, s2.HitBoxes[i][j].indexOf(',')));
            let YPoint = Number(s2.HitBoxes[i][j].substring(s2.HitBoxes[i][j].indexOf(',') + 1, s2.HitBoxes[i][j].length));
            if (((XPoint > (s1.x - s1.scaled*s1.width / 2)) && (XPoint < (s1.x + s1.scaled*s1.width / 2))) && ((YPoint > (s1.y - s1.scaled*s1.height / 2)) && (YPoint < (s1.y + s1.scaled*s1.height / 2)))) {
                return true;
            }
        }
    }
    return false;
}

function CrateBehavior(crate){
    let sprite = crate;
    sprite.HitBoxUpdate();
    if((sprite.break&&CheckHitBoxes(sprite.HitDown, 0, false))||(Touching(PlayerSprite,sprite))) {
        sprite.angle =  0;
        sprite.VelocityY =0;
        sprite.VelocityX=0;
        if(CheckHitBoxes(sprite.HitDown, 0, false)) {
            sprite.image.src = 'Pictures/Explode.jpg';
        }else{
            sprite.image.src = 'Pictures/Explode2.jpg';
        }
        if((!sprite.explode)) {
            let spawn = setTimeout(function () {
                if(CheckEnd()){
                    clearTimeout(spawn)
                }else {
                    let options = ['Heart', 'Lightning', 'Star'];
                    let random = Math.floor(Math.random() * options.length);
                    let PowerUp = new CreateSprites(sprite.x, sprite.y + 5, 10, 10, 0.8, 0, 0, 0, 0, 0, 0, options[random], 0, 1, 1);
                    PowerUp.index = -1;
                    PowerUp = CheckGravity(PowerUp);
                    PowerUp.flash = false;
                    PowerUp.Opacity = 1;
                    PowerUp.draw();
                    PowerUp.HitBoxUpdate()
                    let blink = setTimeout(function () {
                        if (CheckEnd()) {
                            clearTimeout(blink);
                        }
                        PowerUp.flash = true;
                        setTimeout(function () {
                            PowerUp.remove = true;
                        }, 5000);
                    }, 2000);
                    LevelObjects[random + 7].push(PowerUp);
                    sprite.remove = true;
                }
            }, 4000);
        }
        sprite.explode = true;
    }else if(!sprite.explode){
        sprite.VelocityX = 0.1 * Math.sin(1 / 50 * (Frames - sprite.InitialT));
        sprite.VelocityY = (Math.sin(Math.PI / 100 * (Frames - sprite.InitialT)) + 3) / 10;
        sprite.angle = 20 * Math.sin(Math.PI / 100 * (Frames - sprite.InitialT));
    }
    if(sprite.explode&&Touching(PlayerSprite,sprite)){
        PlayerLoseHealth(2);
    }
    sprite.update();
    return sprite;
}

function PlayerLoseHealth(lose){
    if(!PlayerSprite.Invincibility) {
        PlayerSprite.health = PlayerSprite.health - lose;
        if (PlayerSprite.health > 0) {
            PlayerSprite.Invincibility = true;
            setTimeout(function () {
                PlayerSprite.Invincibility = false;
            }, 3000);
        }
    }
}

function DrawLine(sx, sy, ex, ey, color, width){
    let ctx = document.getElementById('GameArea').getContext('2d');
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(sx,sy);
    ctx.lineTo(ex,ey);
    ctx.stroke();
    ctx.closePath();
}

function CheckBounds(check, LowerBound, UpperBound, inclusive) {
    if (inclusive) {
        return ((check >= LowerBound) && (check <= UpperBound));
    } else {
        return ((check > LowerBound) && (check < UpperBound));
    }
}

function DrawAll(){
    for(let i = 0; i<LevelObjects.length; i++){
        for(let j = 0; j<LevelObjects[i].length; j++){
            LevelObjects[i][j].draw();
        }
    }
}

function DrawMap(){
    let Canvas = document.getElementById('GameArea');
    let ctx = Canvas.getContext('2d');
    ctx.fillStyle = 'aqua';
    ctx.fillRect(0,0,Canvas.width, Canvas.height);
    let img = new CreateSprites(Canvas.width/2,Canvas.height/2, 50, 50, 2, 0, 0, 0, 0, 0, 0, 'Map', 3, 1, 1);
    img.draw();
    for(let i = 0; i<LevelDetails.length-1; i++){
        DrawLine(PointSubstring(LevelDetails[i].flash, 'x', ','),PointSubstring(LevelDetails[i].flash, 'y', ','),PointSubstring(LevelDetails[i+1].flash, 'x', ','),PointSubstring(LevelDetails[i+1].flash, 'y', ','),'yellow', 1);
    }
    ctx.fillStyle = 'Yellow';
    for(let i = 0; i<LevelDetails.length; i++){
        ctx.arc(PointSubstring(LevelDetails[i].flash, 'x', ','),PointSubstring(LevelDetails[i].flash, 'y', ','), 5, 0, 2*Math.PI);
        ctx.fill();
        ctx.closePath();
    }
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.textAllign = 'center';
    ctx.fillText('Isla Nublar', 230, 130);
}

function PointSubstring(point, position, splitter){
    let NewPoint = point;
    if(position==='x'){
        return Number(NewPoint.substring(0, NewPoint.indexOf(splitter)));
    }else if(position==='y'){
        return Number(NewPoint.substring(NewPoint.indexOf(splitter)+1, NewPoint.length));
    }
}

function CreateLevelScene(name, index){
    let Canvas = document.getElementById('GameArea');
    let ctx = Canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, Canvas.width, Canvas.height);
    ctx.fillStyle = 'red';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Level '+index, Canvas.width / 2, 40);
    ctx.fillText(name, Canvas.width / 2, 70);
    ctx.fillText('Loading', Canvas.width / 2, 100);
}

function AmberBehavior(amber){
    let sprite = amber;
    sprite.HitBoxUpdate();
    sprite = CheckGravity(sprite);
    sprite.HitBoxUpdate();
    if(Touching(PlayerSprite, sprite)){
        PlayerSprite.collected = PlayerSprite.collected +1;
        sprite.remove = true;
    }
    return sprite;
}

function CheckEnd(){
    if((LevelObjects.length>0)&&(Level>=1)) {
        return (((PlayerSprite.health <= 0) || (Touching(PlayerSprite, LevelObjects[3][0]) && (PlayerSprite.collected >= LevelDetails[Level - 1].amber))));
    }else{
        return true;
    }
}

function MoveHelicopter(AnimateLoop, sx, sy, ex, ey){
    let Canvas = document.getElementById('GameArea');
    if(CheckBounds(AnimateLoop, 0, 1000, true)){
        LevelObjects[3][0].x = Canvas.width+LevelObjects[3][0].width+(sx-Canvas.width-LevelObjects[3][0].width) / 1000 * (AnimateLoop);
        LevelObjects[3][0].y = Canvas.height+LevelObjects[3][0].height+(sy-Canvas.height-LevelObjects[3][0].height) / 1000 * (AnimateLoop);
        DrawAll();
        if(AnimateLoop===1000){
            PlayerSprite.x = sx;
            PlayerSprite.y = sy;
        }
        return false;
    }else if(CheckBounds(AnimateLoop, 1000, 2000, true)) {
        LevelObjects[3][0].x = sx + (ex - sx) / 1000 * (AnimateLoop - 1000);
        LevelObjects[3][0].y = sy + (ey - sy) / 1000 * (AnimateLoop - 1000);
        DrawAll();
        PlayerSprite.HitBoxUpdate();
        PlayerSprite = CheckGravity(PlayerSprite);
        PlayerSprite.update();
        PlayerSprite.draw();
        return false;
    }
    return true;
}

function MapAndFade(AnimateLoop, name, FlashLoc, level){
    let Canvas = document.getElementById('GameArea');
    let ctx = Canvas.getContext('2d');
    let index = 0;
    for(let i = 0; i<LevelDetails.length; i++){
        if(name === LevelDetails[i].name){
            index = i;
            break;
        }
    }
    ctx.globalAlpha = 1;
    if (CheckBounds(AnimateLoop, 0, 4000, true)) {
        DrawMap();
        if (CheckBounds(AnimateLoop%200, 0, 100, true)) {
            ctx.fillStyle = 'red';
            ctx.beginPath();
            ctx.arc(Number(FlashLoc.substring(0,FlashLoc.indexOf(','))), Number(FlashLoc.substring(FlashLoc.indexOf(',')+1, FlashLoc.length)), 5, 0, 3 * Math.PI);
            ctx.fill();
            ctx.closePath();
            ctx.fillStyle = 'yellow';
        }
        return false
    } else if (CheckBounds(AnimateLoop, 4000, 6000, true)) {
        DrawMap();
        ctx.globalAlpha = (AnimateLoop - 4000) / 2000;
        CreateLevelScene(name, index+1);
        ctx.globalAlpha = 1;
        if (AnimateLoop === 6000) {
            InitializeLevel(level);
            LevelObjects[3][0].x = Canvas.width + LevelObjects[3][0].width;
            LevelObjects[3][0].y = Canvas.height + LevelObjects[3][0].height;
        }
        return false;
    } else if (CheckBounds(AnimateLoop, 6000, 8000, true)) {
        DrawAll();
        ctx.globalAlpha = (8000 - AnimateLoop) / 2000;
        CreateLevelScene(name, index+1);
        ctx.globalAlpha = 1;
        return false
    }
    return true;
}

function FinaleBehavior(thing, index){
    let sprite = thing;
    let time = Frames-LevelObjects[12][0].initialT;
    if(index === 12){
        sprite.x = 120*Math.sin(Math.PI/180*time) + 150;
        sprite.y = 10*Math.sin(Math.PI/240*time) + 120;
        if(Math.cos(Math.PI/180*time)>0){
            sprite.mirrorX = -1;
        }else{
            sprite.mirrorX = 1;
        }
        if(Touching(PlayerSprite, sprite)){
            PlayerLoseHealth(9999999999999999999999999999999999);
        }
    }else if(index===13){
        sprite.y = 20*Math.sin(Math.PI/180*time) + 230;
    }
    return sprite;
}