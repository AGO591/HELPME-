let imgm;
let imge;
let imgl;
let imga;
let imgr;
let imgr2;
let imgg;
let imgw;
let imgq;
let imgac;
let imgac2;
let imgrb;
let imgbgr;
let imgbga;
let imgbgt;
let font;

let villain = [];
let player;
let citizen;

let vNum = 1;
let savedNum1 = 0;
let savedNum2 = 0;
let highScore = 0;
let bestPlayer = 'none';

let idx = 4;
let xdir = [1, -1, 0, 0, 0];
let ydir = [0, 0, 1, -1, 0];

let idx2 = 4;
let xdir2 = [1, -1, 0, 0, 0];
let ydir2 = [0, 0, 1, -1, 0];

let scaleC = 1.0;
let scaleN = 0.05;

let vSpeed = 30;
let cSpeed = 15;

function preload() {
    imgm = loadImage('./mikasa.png');
    imge = loadImage('./eren.png');
    imgl = loadImage('./levi.png');
    imga = loadImage('./armin.png');
    imgr = loadImage('./red.png');
    imgr2 = loadImage('./red2.png');
    imgg = loadImage('./grand.png');
    imgw = loadImage('./wolf.png');
    imgq = loadImage('./queen.png');
    imgac = loadImage('./alice.png');
    imgac2 = loadImage('./alice2.png');
    imgrb = loadImage('./rabbit.png');
    imgbgr = loadImage('./red_bg.png');
    imgbga = loadImage('./alice_bg.png');
    imgbgt = loadImage('./titan_bg.png');
    font = loadFont('./EF_Diary.ttf');
}

function setup() {
    createCanvas(800, 800);
    imageMode(CENTER);
    textFont(font);

    for (let i = 0; i < vNum; i++) {
        villain[i] = new Villain(200, 500);
    }
    player1 = new Player(200, 200);
    player2 = new Player(500, 500);
    citizen = new Citizen(300, 400);

    // 테마 선택 메뉴
    menu = createSelect();
    menu.position(50, 15);
    menu.option('Red Riding Hood');
    menu.option('Alice in Wonderland');
    menu.option('Attack on Titan');
    menu.selected('Red Riding Hood');

    // 플레이 인원 수 선택 메뉴
    menu2 = createSelect();
    menu2.position(300, 15);
    menu2.option('Single-Player');
    menu2.option('Two-Player');
    menu2.selected('Single-Player');
}

function draw() {
    // 1인 플레이어 모드
    if (menu2.selected() === 'Single-Player') {

        let vNum = 1;
        let savedNum1 = 0;
        let savedNum2 = 0;

        // 테마 1 : red riding hood
        if (menu.selected() === 'Red Riding Hood') {
            background(255);
            fill(0);
            rect(50, 70, 700, 700);
            image(imgbgr, 400, 420, 700, 700);

            let vNum = 1;
            let savedNum1 = 0;
            let savedNum2 = 0;

            fill(0);
            textSize(15);
            text('High Score : ' + highScore, 50, 60);
            text('# of villains : ' + vNum, 350, 60);
            text('# of saved citizen : ' + savedNum1, 540, 60);

            // high score와 best player 갱신 시스템
            if (highScore < savedNum1) {
                highScore = savedNum1;
            }

            //citizen
            citizen.display(imgg);
            if (citizen.saved(player1.x, player1.y) == true) {

                citizen.x = random(100, 700);
                citizen.y = random(120, 720);

                // citizen과 villain이 겹치게 생성되지 않도록 제어
                for (let i = 0; i < villain.length; i++) {
                    if (villain[i].intersects(citizen.x, citizen.y)) {
                        citizen.x = random(100, 700);
                        citizen.y = random(120, 720);
                    }
                }
                savedNum1 += 1;
                if (savedNum1 % 5 == 0 && savedNum1 !== 0) {
                    vNum += 1;
                    if (player1.x >= 350) {
                        villain.push(new Villain(150, 500));
                    } else if (player1.x < 350) {
                        villain.push(new Villain(650, 500));
                    }
                }
            }

            //player
            player1.display(imgr);

            //player 방향 조절
            player1 = new Player(player1.x + xdir[idx] * cSpeed, player1.y + ydir[idx] * cSpeed);

            //villain
            for (let i = 0; i < villain.length; i++) {
                villain[i].display(imgw);

                // villain이 citizen을 피하도록 설정
                if (villain[i].intersects(citizen.x, citizen.y)) {
                    print("Touched");
                    villain[i].avoid();

                    // villain이 player와 만나면 game over
                } else if (villain[i].intersects(player1.x, player1.y)) {
                    print("game over");
                    vNum = 1;
                    savedNum1 = 0;
                    villain.splice(1);
                    player1.reStart1();
                    citizen.reStart();

                }
            }

            // 테마 2 : alice in wonderland
        } else if (menu.selected() === 'Alice in Wonderland') {
            background(255);
            fill(0);
            rect(50, 70, 700, 700);
            image(imgbga, 400, 420, 700, 700);

            let vNum = 1;
            let savedNum1 = 0;
            let savedNum2 = 0;

            fill(0);
            textSize(15);
            text('High Score : ' + highScore, 50, 60);
            text('# of villains : ' + vNum, 350, 60);
            text('# of saved citizens : ' + savedNum1, 540, 60);

            // high score & best player
            if (highScore < savedNum1) {
                highScore = savedNum1;
            }

            //citizen
            citizen.display(imgrb);
            if (citizen.saved(player1.x, player1.y) == true) {

                citizen.x = random(100, 700);
                citizen.y = random(120, 720);

                for (let i = 0; i < villain.length; i++) {
                    if (villain[i].intersects(citizen.x, citizen.y)) {
                        citizen.x = random(100, 700);
                        citizen.y = random(120, 720);
                    }
                }
                savedNum1 += 1;
                if (savedNum1 % 5 == 0 && savedNum1 !== 0) {
                    vNum += 1;
                    if (player1.x >= 350) {
                        villain.push(new Villain(150, 500));
                    } else if (player1.x < 350) {
                        villain.push(new Villain(650, 500));
                    }
                }
            }

            //player
            player1.display(imgac);

            player1 = new Player(player1.x + xdir[idx] * cSpeed, player1.y + ydir[idx] * cSpeed);

            //villain
            for (let i = 0; i < villain.length; i++) {
                villain[i].display(imgq);
                if (villain[i].intersects(citizen.x, citizen.y)) {
                    print("Touched");
                    villain[i].avoid();

                } else if (villain[i].intersects(player1.x, player1.y)) {
                    print("game over");
                    vNum = 1;
                    savedNum1 = 0;
                    villain.splice(1);
                    player1.reStart1();
                    citizen.reStart();

                }
            }

            // 테마 3 : attack on titan
        } else if (menu.selected() === 'Attack on Titan') {
            background(255);
            fill(0);
            rect(50, 70, 700, 700);
            image(imgbgt, 400, 420, 700, 700);

            let vNum = 1;
            let savedNum1 = 0;
            let savedNum2 = 0;

            fill(0);
            textSize(15);
            text('High Score : ' + highScore, 50, 60);
            text('# of villains : ' + vNum, 350, 60);
            text('# of saved citizens : ' + savedNum1, 540, 60);

            // high score & best player
            if (highScore < savedNum1) {
                highScore = savedNum1;
            }

            //citizen
            citizen.display(imgm);
            if (citizen.saved(player1.x, player1.y) == true) {

                citizen.x = random(100, 700);
                citizen.y = random(120, 720);

                for (let i = 0; i < villain.length; i++) {
                    if (villain[i].intersects(citizen.x, citizen.y)) {
                        citizen.x = random(100, 700);
                        citizen.y = random(120, 720);
                    }
                }
                savedNum1 += 1;
                if (savedNum1 % 5 == 0 && savedNum1 !== 0) {
                    vNum += 1;
                    if (player1.x >= 350) {
                        villain.push(new Villain(150, 500));
                    } else if (player1.x < 350) {
                        villain.push(new Villain(650, 500));
                    }
                }
            }

            //player
            player1.display(imge);

            player1 = new Player(player1.x + xdir[idx] * cSpeed, player1.y + ydir[idx] * cSpeed);

            //villain
            for (let i = 0; i < villain.length; i++) {
                villain[i].display(imga);
                if (villain[i].intersects(citizen.x, citizen.y)) {
                    print("Touched");
                    villain[i].avoid();

                } else if (villain[i].intersects(player1.x, player1.y)) {
                    print("game over");
                    vNum = 1;
                    savedNum1 = 0;
                    villain.splice(1);
                    player1.reStart1();
                    citizen.reStart();

                }
            }
        }

        // 2인 플레이어 모드
    } else if (menu2.selected() === 'Two-Player') {

        let vNum = 1;
        let savedNum1 = 0;
        let savedNum2 = 0;

        // 테마 1 : red riding hood
        if (menu.selected() === 'Red Riding Hood') {
            background(255);
            fill(0);
            rect(50, 70, 700, 700);
            image(imgbgr, 400, 420, 700, 700);

            let vNum = 1;
            let savedNum1 = 0;
            let savedNum2 = 0;

            fill(0);
            textSize(15);
            text('High Score : ' + highScore + ' - ' + bestPlayer, 50, 60);
            text('# of villains : ' + vNum, 350, 60);
            text('# of saved citizens 1 : ' + savedNum1, 540, 30);
            text('# of saved citizens 2 : ' + savedNum2, 540, 60);

            // high score와 best player 갱신 시스템
            if (highScore < savedNum1) {
                highScore = savedNum1;
                bestPlayer = 'Player 1';
            } else if (highScore < savedNum2) {
                highScore = savedNum2;
                bestPlayer = 'Player 2';
            }

            //citizen
            citizen.display(imgg);
            if (citizen.saved(player1.x, player1.y) == true) {

                citizen.x = random(100, 700);
                citizen.y = random(120, 720);

                // citizen과 villain이 겹치게 생성되지 않도록 제어
                for (let i = 0; i < villain.length; i++) {
                    if (villain[i].intersects(citizen.x, citizen.y)) {
                        citizen.x = random(100, 700);
                        citizen.y = random(120, 720);
                    }
                }
                savedNum1 += 1;
                if (savedNum1 % 5 == 0 && savedNum1 !== 0) {
                    vNum += 1;
                    villain.push(new Villain(500, 500));
                }
            } else if (citizen.saved(player2.x, player2.y) == true) {

                citizen.x = random(100, 700);
                citizen.y = random(120, 720);

                for (let i = 0; i < villain.length; i++) {
                    if (villain[i].intersects(citizen.x, citizen.y)) {
                        citizen.x = random(100, 700);
                        citizen.y = random(120, 720);
                    }
                }
                savedNum2 += 1;
                if (savedNum2 % 5 == 0 && savedNum2 !== 0) {
                    vNum += 1;
                    villain.push(new Villain(500, 500));
                }
            }

            //player
            player1.display(imgr);
            player2.display(imgr2);

            //player 방향 조절
            player1 = new Player(player1.x + xdir[idx] * cSpeed, player1.y + ydir[idx] * cSpeed);
            player2 = new Player(player2.x + xdir2[idx2] * cSpeed, player2.y + ydir2[idx2] * cSpeed);

            //villain
            for (let i = 0; i < villain.length; i++) {
                villain[i].display(imgw);

                // villain이 citizen을 피하도록 설정
                if (villain[i].intersects(citizen.x, citizen.y)) {
                    print("Touched");
                    villain[i].avoid();

                    // villain이 player와 만나면 game over
                } else if (villain[i].intersects(player1.x, player1.y)) {
                    print("game over");
                    vNum = 1;
                    savedNum1 = 0;
                    savedNum2 = 0;
                    villain.splice(1);
                    player1.reStart1();
                    player2.reStart2();
                    citizen.reStart();

                } else if (villain[i].intersects(player2.x, player2.y)) {
                    print("game over");
                    vNum = 1;
                    savedNum1 = 0;
                    savedNum2 = 0;
                    villain.splice(1);
                    player1.reStart1();
                    player2.reStart2();
                    citizen.reStart();
                }
            }

            // 테마 2 : alice in wonderland
        } else if (menu.selected() === 'Alice in Wonderland') {
            background(255);
            fill(0);
            rect(50, 70, 700, 700);
            image(imgbga, 400, 420, 700, 700);

            let vNum = 1;
            let savedNum1 = 0;
            let savedNum2 = 0;

            fill(0);
            textSize(15);
            text('High Score : ' + highScore + ' - ' + bestPlayer, 50, 60);
            text('# of villains : ' + vNum, 350, 60);
            text('# of saved citizens 1 : ' + savedNum1, 540, 30);
            text('# of saved citizens 2 : ' + savedNum2, 540, 60);

            // high score & best player
            if (highScore < savedNum1) {
                highScore = savedNum1;
                bestPlayer = 'Player 1';
            } else if (highScore < savedNum2) {
                highScore = savedNum2;
                bestPlayer = 'Player 2';
            }

            //citizen
            citizen.display(imgrb);
            if (citizen.saved(player1.x, player1.y) == true) {

                citizen.x = random(100, 700);
                citizen.y = random(120, 720);

                for (let i = 0; i < villain.length; i++) {
                    if (villain[i].intersects(citizen.x, citizen.y)) {
                        citizen.x = random(100, 700);
                        citizen.y = random(120, 720);
                    }
                }
                savedNum1 += 1;
                if (savedNum1 % 5 == 0 && savedNum1 !== 0) {
                    vNum += 1;
                    villain.push(new Villain(500, 500));
                }
            } else if (citizen.saved(player2.x, player2.y) == true) {

                citizen.x = random(100, 700);
                citizen.y = random(120, 720);

                for (let i = 0; i < villain.length; i++) {
                    if (villain[i].intersects(citizen.x, citizen.y)) {
                        citizen.x = random(100, 700);
                        citizen.y = random(120, 720);
                    }
                }
                savedNum2 += 1;
                if (savedNum2 % 5 == 0 && savedNum2 !== 0) {
                    vNum += 1;
                    villain.push(new Villain(500, 500));
                }
            }

            //player
            player1.display(imgac);
            player2.display(imgac2);

            player1 = new Player(player1.x + xdir[idx] * cSpeed, player1.y + ydir[idx] * cSpeed);
            player2 = new Player(player2.x + xdir2[idx2] * cSpeed, player2.y + ydir2[idx2] * cSpeed);

            //villain
            for (let i = 0; i < villain.length; i++) {
                villain[i].display(imgq);
                if (villain[i].intersects(citizen.x, citizen.y)) {
                    print("Touched");
                    villain[i].avoid();

                } else if (villain[i].intersects(player1.x, player1.y)) {
                    print("game over");
                    vNum = 1;
                    savedNum1 = 0;
                    savedNum2 = 0;
                    villain.splice(1);
                    player1.reStart1();
                    player2.reStart2();
                    citizen.reStart();

                } else if (villain[i].intersects(player2.x, player2.y)) {
                    print("game over");
                    vNum = 1;
                    savedNum1 = 0;
                    savedNum2 = 0;
                    villain.splice(1);
                    player1.reStart1();
                    player2.reStart2();
                    citizen.reStart();
                }
            }

            // 테마 3 : attack on titan
        } else if (menu.selected() === 'Attack on Titan') {
            background(255);
            fill(0);
            rect(50, 70, 700, 700);
            image(imgbgt, 400, 420, 700, 700);

            let vNum = 1;
            let savedNum1 = 0;
            let savedNum2 = 0;

            fill(0);
            textSize(15);
            text('High Score : ' + highScore + ' - ' + bestPlayer, 50, 60);
            text('# of villains : ' + vNum, 350, 60);
            text('# of saved citizens 1 : ' + savedNum1, 540, 30);
            text('# of saved citizens 2 : ' + savedNum2, 540, 60);

            // high score & best player
            if (highScore < savedNum1) {
                highScore = savedNum1;
                bestPlayer = 'Player 1';
            } else if (highScore < savedNum2) {
                highScore = savedNum2;
                bestPlayer = 'Player 2';
            }

            //citizen
            citizen.display(imgm);
            if (citizen.saved(player1.x, player1.y) == true) {

                citizen.x = random(100, 700);
                citizen.y = random(120, 720);

                for (let i = 0; i < villain.length; i++) {
                    if (villain[i].intersects(citizen.x, citizen.y)) {
                        citizen.x = random(100, 700);
                        citizen.y = random(120, 720);
                    }
                }
                savedNum1 += 1;
                if (savedNum1 % 5 == 0 && savedNum1 !== 0) {
                    vNum += 1;
                    villain.push(new Villain(500, 500));
                }
            } else if (citizen.saved(player2.x, player2.y) == true) {

                citizen.x = random(100, 700);
                citizen.y = random(120, 720);

                for (let i = 0; i < villain.length; i++) {
                    if (villain[i].intersects(citizen.x, citizen.y)) {
                        citizen.x = random(100, 700);
                        citizen.y = random(120, 720);
                    }
                }
                savedNum2 += 1;
                if (savedNum2 % 5 == 0 && savedNum2 !== 0) {
                    vNum += 1;
                    villain.push(new Villain(500, 500));
                }
            }

            //player
            player1.display(imge);
            player2.display(imgl);

            player1 = new Player(player1.x + xdir[idx] * cSpeed, player1.y + ydir[idx] * cSpeed);
            player2 = new Player(player2.x + xdir2[idx2] * cSpeed, player2.y + ydir2[idx2] * cSpeed);

            //villain
            for (let i = 0; i < villain.length; i++) {
                villain[i].display(imga);
                if (villain[i].intersects(citizen.x, citizen.y)) {
                    print("Touched");
                    villain[i].avoid();

                } else if (villain[i].intersects(player1.x, player1.y)) {
                    print("game over");
                    vNum = 1;
                    savedNum1 = 0;
                    savedNum2 = 0;
                    villain.splice(1);
                    player1.reStart1();
                    player2.reStart2();
                    citizen.reStart();

                } else if (villain[i].intersects(player2.x, player2.y)) {
                    print("game over");
                    vNum = 1;
                    savedNum1 = 0;
                    savedNum2 = 0;
                    villain.splice(1);
                    player1.reStart1();
                    player2.reStart2();
                    citizen.reStart();
                }
            }
        }
    }
}

// player 방향키로 이동
function keyPressed() {
    if (keyCode == RIGHT_ARROW) {
        idx = 0;
    } else if (keyCode == LEFT_ARROW) {
        idx = 1;
    } else if (keyCode == DOWN_ARROW) {
        idx = 2;
    } else if (keyCode == UP_ARROW) {
        idx = 3;
    }
    if (keyCode == 68) {
        idx2 = 0;
    } else if (keyCode == 65) {
        idx2 = 1;
    } else if (keyCode == 83) {
        idx2 = 2;
    } else if (keyCode == 87) {
        idx2 = 3;
    }
}

// 방향키를 누르지 않을 땐 정지
function keyReleased() {
    idx = 4;
    idx2 = 4;
}

class Villain {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.xSpeed;
        this.ySpeed;
    }
    display(img) {
        push();
        frameRate(15);
        image(img, this.x, this.y);
        this.xSpeed = random(-vSpeed, vSpeed);
        this.ySpeed = random(-vSpeed, vSpeed);
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.x = constrain(this.x, 100, 700);
        this.y = constrain(this.y, 120, 720);
        pop();
    }
    // 충돌 감지
    intersects(xc, yc) {
        let distanceX = abs(this.x - xc);
        let distanceY = abs(this.y - yc);
        return (distanceX < 35 && distanceY < 45);
    }
    // 방향 전환
    avoid() {
        this.x -= this.xSpeed;
        this.y -= this.ySpeed;
    }
}

class Player {
    constructor(x1, y1) {
        this.x = x1;
        this.y = y1;
    }
    display(img) {
        image(img, this.x, this.y);
        this.x = constrain(this.x, 100, 690);
        this.y = constrain(this.y, 120, 710);
    }
    // player 1 위치 리셋
    reStart1() {
        this.x = 200;
        this.y = 200;
    }
    // player 2 위치 리셋
    reStart2() {
        this.x = 500;
        this.y = 500;
    }
}

class Citizen {
    constructor(x2, y2) {
        this.x = x2;
        this.y = y2;
    }
    display(img) {
        scaleC += scaleN
        if (scaleC > 1.05 || scaleC < 0.95) {
            scaleN *= -1;
        }
        let scaledWidth = img.width * scaleC;
        let scaledHeight = img.height * scaleC;
        image(img, this.x, this.y, scaledWidth, scaledHeight);
    }
    // player와 접촉 감지
    saved(sx, sy) {
        if (sx > this.x - 35 && sx < this.x + 35 && sy > this.y - 45 && sy < this.y + 45) {
            return true;
        } else {
            return false;
        }
    }
    // citizen 위치 리셋
    reStart() {
        this.x = 300;
        this.y = 400;
    }
}
