'use strict';

goog.provide('Blockly.Gameduino.Setup');

goog.require('Blockly.Arduino');

var findSpawnLoc = function(spawnLoc) {
  var xVal;
  var yVal;
  if (spawnLoc == 'r') { 
    xVal = 'random(MAX_X)';
    yVal = 'random(MAX_Y - 20)';
  }
  if (spawnLoc === 'tl') {
    xVal = 50;
    yVal = 40;
  }
  if (spawnLoc === 'tm') {
    xVal = 200;
    yVal = 40;
  }
  if (spawnLoc === 'tr') {
    xVal = 350;
    yVal = 40;
  }
  if (spawnLoc === 'ml') {
    xVal = 50;
    yVal = 150;
  }
  if (spawnLoc === 'mm') {
    xVal = 200;
    yVal = 150;
  }
  if (spawnLoc === 'mr') {
    xVal = 350;
    yVal = 150;
  }
  if (spawnLoc === 'bl') {
    xVal = 50;
    yVal = 260;
  }
  if (spawnLoc === 'bm') {
    xVal = 200;
    yVal = 260;
  }
  if (spawnLoc === 'br') {
    xVal = 350;
    yVal = 260;
  }

  return [xVal, yVal];
};


Blockly.Arduino['setup_all'] = function(block) {
  var characterSpeed = block.getFieldValue('SPEED');
  var maxSprites = 150; // Change this to get more sprites
  var maxGoodSprites = 20;

  // Include gameduino libraries
  Blockly.Arduino.addInclude('spi', '#include <SPI.h>'); // SPI must be before GD
  Blockly.Arduino.addInclude('gd', '#include <GD.h>');


  // Initialize variables
  Blockly.Arduino.addVariable('t', 'static unsigned int t;', false);
  Blockly.Arduino.addVariable('recentPickup', 'static unsigned int recentPickup;', false);
  Blockly.Arduino.addVariable('recentHit', 'static unsigned int recentHit;', false);
  Blockly.Arduino.addVariable('whoColliding', 'int whoColliding = -1;', false);
  Blockly.Arduino.addVariable('score', 'long score;', false);
  Blockly.Arduino.addVariable('lives', 'int lives;', false);

  // These variables look very naive, but it makes the Blockly easier to code and better
  //   so using this space for the variables makes other parts of Blockly easier to understand
  // They are timing variables for each sprite, storing the t value of the last interaction
  //   with that sprite for the time blocks
  Blockly.Arduino.addVariable('last0', 'static unsigned int last0;', false);
  Blockly.Arduino.addVariable('last5', 'static unsigned int last5;', false);
  Blockly.Arduino.addVariable('last8', 'static unsigned int last8;', false);
  Blockly.Arduino.addVariable('last10', 'static unsigned int last10;', false);
  Blockly.Arduino.addVariable('last11', 'static unsigned int last11;', false);
  Blockly.Arduino.addVariable('last12', 'static unsigned int last12;', false);
  Blockly.Arduino.addVariable('last14', 'static unsigned int last14;', false);
  Blockly.Arduino.addVariable('last16', 'static unsigned int last16;', false);
  Blockly.Arduino.addVariable('last27', 'static unsigned int last27;', false);
  Blockly.Arduino.addVariable('last28', 'static unsigned int last28;', false);
  Blockly.Arduino.addVariable('last30', 'static unsigned int last30;', false);
  Blockly.Arduino.addVariable('last34', 'static unsigned int last34;', false);
  Blockly.Arduino.addVariable('last40', 'static unsigned int last40;', false);
  Blockly.Arduino.addVariable('last47', 'static unsigned int last47;', false);

  // Initialize variables for sprites

  var sprite = block.getFieldValue('SPRITE');
  var lAndRSprite, downSprite, upSprite; // Different characters have different sprites
                                         // for left/right, down, and up
  var leftRotation;                      // Right rotation = 0, left rotation defined here
  if (sprite == 'm') {
    Blockly.Arduino.addInclude('sprites', '#include <spritesMario.h>');
    lAndRSprite = 48;
    downSprite = 58;
    upSprite = 59;
    leftRotation = 2;
  }

  if (sprite == 'l') {
    Blockly.Arduino.addInclude('sprites', '#include <spritesLink.h>');
    lAndRSprite = 48;
    downSprite = 54;
    upSprite = 58;
    leftRotation = 2;
  }

  var sprites = 'struct Sprites {\n' +
                '  int x, y;\n  byte spriteNum;\n  byte rot;\n  byte jk;\n' +
                '  byte speedVal;\n  int mobMove;\n} sprites[' + maxSprites + '];';
  Blockly.Arduino.addVariable('sprites', sprites, false);


  // Include constants
  Blockly.Arduino.addDeclaration('BG_ZERO', '#define BG_ZERO 5');
  Blockly.Arduino.addDeclaration('BG_ALPHA', '#define BG_ALPHA 15');
  Blockly.Arduino.addDeclaration('BG_BLACK', '#define BG_BLACK 44');
  Blockly.Arduino.addDeclaration('BG_WHITE', '#define BG_WHITE 45');
  Blockly.Arduino.addDeclaration('OVERLAY_Y', '#define OVERLAY_Y 36');
  Blockly.Arduino.addDeclaration('SCORE_X', '#define SCORE_X 35');
  Blockly.Arduino.addDeclaration('LIVES_X', '#define LIVES_X 1');

  Blockly.Arduino.addDeclaration('MAX_SPRITES', '#define MAX_SPRITES ' + maxSprites);
  Blockly.Arduino.addDeclaration('MAX_GOOD_SPRITES', '#define MAX_GOOD_SPRITES ' + 
                                  maxGoodSprites);
  Blockly.Arduino.addDeclaration('MAX_X', '#define MAX_X 400');
  Blockly.Arduino.addDeclaration('MIN_X', '#define MIN_X 0');
  Blockly.Arduino.addDeclaration('MAX_Y', '#define MAX_Y 300');
  Blockly.Arduino.addDeclaration('MIN_Y', '#define MIN_Y 0');

  var setupCode = 'GD.begin();\n  delay(500);\n';
  // Setup background
  Blockly.Arduino.addInclude('bg', '#include <zeldaBG.h>');
  setupCode += '  for (byte y = 0; y < 38; y++)\n' +
               '    GD.copy(RAM_PIC + y * 64, bg_pic + y * 50, 50);\n' +
               '  GD.copy(RAM_CHR, bg_chr, sizeof(bg_chr));\n' +
               '  GD.copy(RAM_PAL, bg_pal, sizeof(bg_pal));\n';

  // Draw word "score""
  setupCode += '  drawWord(atxy(SCORE_X + 0, OVERLAY_Y), "score:");\n';

  // Draw work "lives:"
  setupCode += '  drawWord(atxy(LIVES_X + 0, OVERLAY_Y), "lives:");\n';

  // Setup sprites
  setupCode += '  GD.copy(RAM_SPRPAL, sprite_sprpal, sizeof(sprite_sprpal));\n';
  setupCode += '  GD.copy(RAM_SPRIMG, sprite_sprimg, sizeof(sprite_sprimg));\n';

  // Enable collisions by default
  setupCode += '  GD.wr(JK_MODE, 1);\n';


  // Setup pins for controller
  Blockly.Arduino.reservePin(block, 4, 'Up', 'Up control');
  Blockly.Arduino.reservePin(block, 5, 'Down', 'Down control');
  Blockly.Arduino.reservePin(block, 6, 'Left', 'Left control');
  Blockly.Arduino.reservePin(block, 7, 'Right', 'Right control');
  setupCode += '\n  for (byte i = 4; i < 8; i++) {\n' +
               '    pinMode(i, INPUT);\n' +
               '    digitalWrite(i, HIGH);\n  }\n';
  // Initialize timing variables to 0
  setupCode += '  last0 = -1;\n';
  setupCode += '  last5 = -1;\n';
  setupCode += '  last8 = -1;\n';
  setupCode += '  last10 = -1;\n';
  setupCode += '  last11 = -1;\n';
  setupCode += '  last12 = -1;\n';
  setupCode += '  last14 = -1;\n';
  setupCode += '  last16 = -1;\n';
  setupCode += '  last27 = -1;\n';
  setupCode += '  last28 = -1;\n';
  setupCode += '  last30 = -1;\n';
  setupCode += '  last34 = -1;\n';
  setupCode += '  last40 = -1;\n';
  setupCode += '  last47 = -1;\n\n';

  // setup the empty sprites
  setupCode += '  resetSprites();\n';

  // Get spawn location for character
  var spawn = findSpawnLoc(block.getFieldValue('SPAWN_LOC'));
  // Now setup the initial character location
  setupCode += '  sprites[0].x = ' + spawn[0] + ';\n';
  setupCode += '  sprites[0].y = ' + spawn[1] + ';\n';
  setupCode += '  sprites[0].spriteNum = ' + lAndRSprite + ';\n';
  setupCode += '  sprites[0].rot = 0;\n';
  setupCode += '  sprites[0].speedVal = ' + characterSpeed + ';\n';
  setupCode += '  sprites[0].mobMove = -2;\n';
  setupCode += '  sprites[0].jk = 0;\n';

  // setup variables that need changing between games
  var lives = block.getFieldValue('LIVES');
  setupCode += '  lives = ' + lives + ';\n';
  setupCode += '  score = 0;\n';
  setupCode += '  t = 0;\n';
  setupCode += '  recentPickup = -1;\n';
  setupCode += '  recentHit = -1;\n';

  // User made setup code
  setupCode += Blockly.Arduino.statementToCode(block, 'DO');

  // Add setupCode to setup() function
  Blockly.Arduino.addSetup('setupCode',  setupCode, false);

  var atxyCode = 'static uint16_t atxy(byte x, byte y) {\n' +
                 '  return RAM_PIC + 64 * y + x;\n}\n';
  Blockly.Arduino.addFunction('atxy', atxyCode);

  var drawScoreCode = 'static void drawScore(uint16_t dst, long n) {\n' +
                      '  if (n < 0) { score=0; n=0; }\n' +
                      '  GD.wr(dst + 0, BG_ZERO + (n / 10000000) % 10);\n' + 
                      '  GD.wr(dst + 1, BG_ZERO + (n / 1000000) % 10);\n' + 
                      '  GD.wr(dst + 2, BG_ZERO + (n / 100000) % 10);\n' + 
                      '  GD.wr(dst + 3, BG_ZERO + (n / 10000) % 10);\n' + 
                      '  GD.wr(dst + 4, BG_ZERO + (n / 1000) % 10);\n' + 
                      '  GD.wr(dst + 5, BG_ZERO + (n / 100) % 10);\n' + 
                      '  GD.wr(dst + 6, BG_ZERO + (n / 10) % 10);\n' + 
                      '  GD.wr(dst + 7, BG_ZERO + n % 10);\n}\n';
  Blockly.Arduino.addFunction('drawScore', drawScoreCode);

  var drawLivesCode = 'static void drawLives(uint16_t dst, int n) {\n' +
                      '  if (n < 0) { lives=0; n=0; }\n' +
                      '  GD.wr(dst + 0, BG_ZERO + (n / 100) % 10);\n' +
                      '  GD.wr(dst + 1, BG_ZERO + (n / 10) % 10);\n' +
                      '  GD.wr(dst + 2, BG_ZERO + n % 10);\n}\n';
  Blockly.Arduino.addFunction('drawLives', drawLivesCode);

  var drawWordCode = 'static void drawWord(uint16_t dst, char *w) {\n' +
                     '  for (byte i=0; i<strlen(w); i++) {\n' +
                     '    char toPrint = *(w + i);\n    byte charCode;\n' +
                     '    if (toPrint == \' \') charCode = BG_BLACK;\n' +
                     '    else if (toPrint == \':\') charCode = BG_ALPHA + 26;\n' +
                     '    else if (toPrint == \'?\') charCode = BG_ALPHA + 27;\n' +
                     '    else charCode = toPrint - 82;\n' +
                     '    GD.wr(dst+i, charCode);\n  }\n}\n';
  Blockly.Arduino.addFunction('drawWord', drawWordCode);

  var gameOverCode = 'void gameOver(byte t) {\n' +
                     '  resetSprites();\n  GD.fill(RAM_PIC, BG_BLACK, 4096);\n' +
                     '  drawWord(atxy(20, 10), "game over");\n' +
                     '  drawWord(atxy(22, 18), "score:");\n' +
                     '  drawScore(atxy(21, 20), score);\n' +
                     '  delay(t * 1000);\n  setup();\n}\n';
  Blockly.Arduino.addFunction('gameOver', gameOverCode);

  var gameWonCode = 'void gameWon(byte t) {\n' +
                     '  resetSprites();\n  GD.fill(RAM_PIC, BG_BLACK, 4096);\n' +
                     '  drawWord(atxy(21, 10), "you win");\n' +
                     '  drawWord(atxy(22, 18), "score:");\n' +
                     '  drawScore(atxy(21, 20), score);\n' +
                     '  delay(t * 1000);\n  setup();\n}\n';
  Blockly.Arduino.addFunction('gameWon', gameWonCode);

  var resetSpritesCode = 'void resetSprites() {\n' +
               '  for (int i = 0; i < MAX_SPRITES; i++) {\n' +
               '    sprites[i].jk = 1;\n' + // hostile mobs get jk value 1
               '    sprites[i].mobMove = -1;\n  }\n' +
               '  GD.__wstartspr(0);\n  redrawAll();\n  GD.__end();\n}\n';
  Blockly.Arduino.addFunction('resetSprites', resetSpritesCode);

  var loopSpriteCode = 'void loopSprite(byte s) {\n' +
                      '  if (sprites[s].x > MAX_X) sprites[s].x %= MAX_X;\n' +
                      '  if (sprites[s].x < MIN_X) sprites[s].x = MAX_X + sprites[s].x;\n' +
                      '  if (sprites[s].y > MAX_Y) sprites[s].y %= MAX_Y;\n' +
                      '  if (sprites[s].y < MIN_Y) sprites[s].y = MAX_Y + sprites[s].y;\n}\n';
  var blockSpriteCode = 'void blockSprite(byte s) {\n' +
                      '  if (sprites[s].x > MAX_X) sprites[s].x = MAX_X;\n' +
                      '  if (sprites[s].x < MIN_X) sprites[s].x = MIN_X;\n' +
                      '  if (sprites[s].y > MAX_Y) sprites[s].y = MAX_Y;\n' +
                      '  if (sprites[s].y < MIN_Y) sprites[s].y = MIN_Y;\n}\n';
  Blockly.Arduino.addFunction('loopSprite', loopSpriteCode);
  Blockly.Arduino.addFunction('blockSprite', blockSpriteCode);

  var edgeBehavior = block.getFieldValue('EDGE');
  var redrawAllCode = 'void redrawAll() {\n  for (int i=0; i < MAX_SPRITES; i++) {\n' + 
                      '    if (sprites[i].mobMove == -1)\n' + 
                      '      draw_sprite(0, 400, 0, 0);\n' +
                      '    else {\n      ' +
                      'if (sprites[i].mobMove >= 0 && sprites[i].mobMove < 4)\n' +
                      '        loopSprite(i);\n      else ';
  if (edgeBehavior == 'l') redrawAllCode += 'loopSprite(i);\n';
  else if (edgeBehavior == 'w') redrawAllCode += 'blockSprite(i);\n';
        
 redrawAllCode +=     '      draw_sprite(sprites[i].x, sprites[i].y, \n' + 
                      '                     sprites[i].spriteNum, sprites[i].rot,\n' +
                      '                     sprites[i].jk);\n    }\n  }\n}\n';
  Blockly.Arduino.addFunction('redrawAll', redrawAllCode);

  var collisionsCode = 'void collisions() {\n' +
              '  GD.waitvblank();\n' + 
              '  GD.__start(COLLISION);\n' +
              '  for (int i=0; i < MAX_SPRITES; i++) {\n' +
              '    byte col = SPI.transfer(0);\n' +
              '    if (col == 0x00) {\n' + 
              '      whoColliding = i;\n      break;\n    }\n' +
              '  }\n  GD.__end();\n}';
  Blockly.Arduino.addFunction('collisions', collisionsCode);

  // Add turn(int s, char toTurn) function
  // s is the sprite number that is to be turned
  // toTurn is a character ('r', 'l', 'u', 'd') that symbolizes a direction
   var turnCode = 'void turnCharacter(char toTurn) {\n' +
                 '  switch(toTurn) {\n' +
                 '  case \'r\':\n      sprites[0].spriteNum=' + lAndRSprite + 
                                       ';\n      sprites[0].rot=0;  break;\n' +
                 '  case \'l\':\n      sprites[0].spriteNum=' + lAndRSprite + 
                 ';\n      sprites[0].rot=' + leftRotation + ';  break;\n' +
                 '  case \'u\':\n      sprites[0].spriteNum=' + upSprite + 
                 ';\n      sprites[0].rot=0;  break;\n' +
                 '  case \'d\':\n      sprites[0].spriteNum=' + downSprite + 
                 ';\n      sprites[0].rot=0;  break;\n' +
                 '  }\n}';
  Blockly.Arduino.addFunction('turnCharacter', turnCode);

  // to turn the sprite
  // Add moveForward(int s, int units) function
  // s is the sprite number that is to be moved
  // dir is the direction character (same as toTurn above)
  var moveCharacterCode = 'void moveCharacter(int units, char toMove) {\n' +
                '  switch(toMove) {\n' +
                '    case \'r\':\n      sprites[0].x += units;  break;\n' +
                '    case \'l\':\n      sprites[0].x -= units;  break;\n' +
                '    case \'u\':\n      sprites[0].y -= units;  break;\n' +
                '    case \'d\':\n      sprites[0].y += units;  break;\n' +
                '  }\n}';
  Blockly.Arduino.addFunction('moveCharacter', moveCharacterCode);

  var spawnSpriteCode = 'void spawnSprite(int xVal, int yVal, int s,\n' + 
                  '                    int speedVal = 0, int mobMove=6) {\n' +
                  '  for (int i=1; i < MAX_SPRITES; i++) {\n' +
                  '    if (sprites[i].mobMove == -1) {\n' +
                  '      sprites[i].x = xVal;\n' +
                  '      sprites[i].y = yVal;\n' +
                  '      sprites[i].spriteNum = s;\n' +
                  '      sprites[i].rot = 0;\n' +
                  '      sprites[i].jk = 1;\n' +
                  '      sprites[i].speedVal = speedVal;\n' +
                  '      sprites[i].mobMove = mobMove;\n' +
                  '      break;\n    }\n  }\n}';
  Blockly.Arduino.addFunction('spawnSprite', spawnSpriteCode);

  var moveMobsCode = 'void moveMobs() {\n' +
                '  for (int i=0; i < MAX_SPRITES; i++) {\n' +
                '    int speedVal = sprites[i].speedVal;\n' + 
                '    if (speedVal != -1 && t % speedVal == 0) {\n' +
                '      byte randMove;\n' +
                '      switch(sprites[i].mobMove) {\n' +
                '        case 0: sprites[i].y -= 5;  break;\n' +
                '        case 1: sprites[i].y += 5;  break;\n' +
                '        case 2: sprites[i].x -= 5;  break;\n' +
                '        case 3: sprites[i].x += 5;  break;\n' +
                '        case 4: {\n          randMove = random(4);\n' +
                '          if      (randMove == 0) sprites[i].y -= 5;\n' +
                '          else if (randMove == 1) sprites[i].y += 5;\n' +
                '          else if (randMove == 2) sprites[i].x -= 5;\n' +
                '          else                    sprites[i].x += 5;  break;\n        }\n' +
                '        case 5: {\n' +
                '          if (sprites[i].y > sprites[0].y+5) sprites[i].y -= 3;\n' +
                '          if (sprites[i].y < sprites[0].y-5) sprites[i].y += 3;\n' +
                '          if (sprites[i].x > sprites[0].x+5) sprites[i].x -= 3;\n' +
                '          if (sprites[i].x < sprites[0].x-5) sprites[i].x += 3;\n' +
                '          break;\n        }\n' +
                '        case 6: break;\n' +
                '      }\n    }\n  }\n}\n';
  Blockly.Arduino.addFunction('movesMob', moveMobsCode);

  var removeSpriteCode = 'void removeSprite(byte toRemove) {\n' +
                '  if (toRemove == -1) ;\n' +
                '  else {\n    sprites[toRemove].mobMove = -1;\n' +
                '    sprites[toRemove].jk = 0;\n' +
                '    GD.__wstartspr(0);\n' +
                '    draw_sprite(0, 400, sprites[toRemove].spriteNum, \n' +
                '                sprites[toRemove].rot, sprites[toRemove].jk);\n' +
                '    GD.__end();\n' +
                '  }\n}\n';
  Blockly.Arduino.addFunction('removeSprite', removeSpriteCode);

  var respawnCode = 'void respawn(int x, int y) {\n' +
                    '  sprites[0].x = x;\n' +
                    '  sprites[0].y = y;\n}\n';
  Blockly.Arduino.addFunction('respawn', respawnCode);

  // Add code to loop() to constantly redraw all sprites
  var code = 'whoColliding = -1;\nmoveMobs();\nt++;\nGD.__wstartspr(0);\nredrawAll();' + 
             '\nGD.__end();\ncollisions();\n' +
             'drawScore(atxy(SCORE_X + 6, OVERLAY_Y), score);\n' +
             'drawLives(atxy(LIVES_X + 6, OVERLAY_Y), lives);\n';
  return code;
};

