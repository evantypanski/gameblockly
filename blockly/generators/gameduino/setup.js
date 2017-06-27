'use strict';

goog.provide('Blockly.Gameduino.Setup');

goog.require('Blockly.Arduino');

Blockly.Arduino['setup_all'] = function(block) {
  var characterSpeed = 11 - block.getFieldValue('SPEED');
  var maxSprites = 100; // Change this to get more sprites
  var maxGoodSprites = 20;

  // Include gameduino libraries
  Blockly.Arduino.addInclude('spi', '#include <SPI.h>'); // SPI must be before GD
  Blockly.Arduino.addInclude('gd', '#include <GD.h>');


  // Initialize variables
  Blockly.Arduino.addVariable('t', 'static unsigned int t;', false);
  Blockly.Arduino.addVariable('whoColliding', 'int whoColliding = -1;', false);
  Blockly.Arduino.addVariable('score', 'long score;', false);
  Blockly.Arduino.addVariable('lives', 'int lives;', false);
  Blockly.Arduino.addVariable('dead', 'byte dead;', false);

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
    downSprite = 53;
    upSprite = 58;
    leftRotation = 2;
  }

  var sprites = "struct Sprites {\n" +
                "  int x, y;\n  byte spriteNum;\n  byte rot;\n  byte jk;\n" +
                "  byte speedVal;\n  int mobMove;\n} sprites[100];";
  Blockly.Arduino.addVariable('sprites', sprites, false);


  // Include constants
  Blockly.Arduino.addDeclaration('BG_BLACK', '#define BG_BLACK 34');
  Blockly.Arduino.addDeclaration('MAX_SPRITES', '#define MAX_SPRITES ' + maxSprites);
  Blockly.Arduino.addDeclaration('MAX_GOOD_SPRITES', '#define MAX_GOOD_SPRITES ' + 
                                  maxGoodSprites);
  Blockly.Arduino.addDeclaration('MAX_X', '#define MAX_X 400');
  Blockly.Arduino.addDeclaration('MIN_X', '#define MIN_X 0');
  Blockly.Arduino.addDeclaration('MAX_Y', '#define MAX_Y 300');
  Blockly.Arduino.addDeclaration('MIN_Y', '#define MIN_Y 0');

  var setupCode = 'GD.begin();\n  delay(500);\n';
  // Setup background
  Blockly.Arduino.addInclude('bg', '#include <froggerbg.h>');
  setupCode += '  GD.copy(RAM_CHR, froggerbg_pic, sizeof(froggerbg_pic));\n'; // Load background
  setupCode += '  GD.fill(RAM_PIC, BG_BLACK, 4096);\n';

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

  // setup the empty sprites
  setupCode += '  for (int i = 1; i < MAX_GOOD_SPRITES; i++) {\n' +
               '    sprites[i].jk = 1;\n' + // friendly mobs get jk value 0
               '    sprites[i].mobMove = -3;\n  }\n';
  setupCode += '  for (int i = MAX_GOOD_SPRITES; i < MAX_SPRITES; i++) {\n' +
               '    sprites[i].jk = 1;\n' + // hostile mobs get jk value 1
               '    sprites[i].mobMove = -1;\n  }\n';

  // Now setup the initial character location
  setupCode += '  sprites[0].x = 120;\n';
  setupCode += '  sprites[0].y = 232;\n';
  setupCode += '  sprites[0].spriteNum = ' + lAndRSprite + ';\n';
  setupCode += '  sprites[0].rot = 0;\n';
  setupCode += '  sprites[0].speedVal = ' + characterSpeed + ';\n';
  setupCode += '  sprites[0].mobMove = -2;\n';
  setupCode += '  sprites[0].jk = 0;\n';

  // setup variables that need changing between games
  var lives = block.getFieldValue('LIVES');
  setupCode += '  lives = ' + lives + ';\n';
  setupCode += '  dead = 0;\n';
  setupCode += '  score = 0;\n';

  // User made setup code
  setupCode += Blockly.Arduino.statementToCode(block, 'DO');

  // Add setupCode to setup() function
  Blockly.Arduino.addSetup('setupCode',  setupCode, false);

  var loopSpriteCode = 'void loopSprite(byte s) {\n' +
                      '  if (sprites[s].x > MAX_X) sprites[s].x %= MAX_X;\n' +
                      '  if (sprites[s].x < MIN_X) sprites[s].x = MIN_X + sprites[s].x;\n' +
                      '  if (sprites[s].y > MAX_Y) sprites[s].y %= MAX_Y;\n' +
                      '  if (sprites[s].y < MIN_Y) sprites[s].y = MIN_Y + sprites[s].y;\n}\n';
  var blockSpriteCode = 'void blockSprite(byte s) {\n' +
                      '  if (sprites[s].x > MAX_X) sprites[s].x = MAX_X;\n' +
                      '  if (sprites[s].x < MIN_X) sprites[s].x = MIN_X;\n' +
                      '  if (sprites[s].y > MAX_Y) sprites[s].y = MAX_Y;\n' +
                      '  if (sprites[s].y < MIN_Y) sprites[s].y = MIN_Y;\n}\n';
  Blockly.Arduino.addFunction('loopSprite', loopSpriteCode);
  Blockly.Arduino.addFunction('blockSprite', blockSpriteCode);

  var edgeBehavior = block.getFieldValue('EDGE');
  var redrawAllCode = 'void redrawAll() {\n  for (int i=0; i < MAX_SPRITES; i++) {\n' + 
                      '    if (sprites[i].mobMove == -3 || sprites[i].mobMove == -1)\n' + 
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

  var spawnMobCode = 'void spawnMob(int xVal, int yVal, int s, int speedVal, int mobMove=6) {\n' +
                  '  for (int i=MAX_GOOD_SPRITES; i < MAX_SPRITES; i++) {\n' +
                  '    if (sprites[i].mobMove == -1) {\n' +
                  '      sprites[i].x = xVal;\n' +
                  '      sprites[i].y = yVal;\n' +
                  '      sprites[i].spriteNum = s;\n' +
                  '      sprites[i].rot = 0;\n' +
                  '      sprites[i].speedVal = speedVal;\n' +
                  '      sprites[i].mobMove = mobMove;\n' +
                  '      break;\n    }\n  }\n}';
  Blockly.Arduino.addFunction('spawnMob', spawnMobCode);

  var spawnItemCode = 'void spawnItem(int xVal, int yVal, int s,\n' +
                      '               int speedVal = 0, int mobMove = -2) {\n' +
                      '  for (int i=1; i<MAX_GOOD_SPRITES; i++) {\n' +
                      '    if (sprites[i].mobMove == -3) {\n' +
                      '      sprites[i].x = xVal;\n' +
                      '      sprites[i].y = yVal;\n' +
                      '      sprites[i].spriteNum = s;\n' +
                      '      sprites[i].rot = 0;\n' +
                      '      sprites[i].speedVal = speedVal;\n' +
                      '      sprites[i].mobMove = mobMove;\n' +
                      '      break;\n    }\n  }\n}';
  Blockly.Arduino.addFunction('spawnCoin', spawnItemCode);

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
                '  else if (toRemove < 10) sprites[toRemove].mobMove = -3;\n' +
                '  else sprites[toRemove].mobMove = -1;\n}\n';
  Blockly.Arduino.addFunction('removeSprite', removeSpriteCode);

  var respawnCode = 'void respawn(int x, int y) {\n' +
                    '  sprites[0].x = x;\n' +
                    '  sprites[0].y = y;\n' +
                    '  dead = 0;\n}\n';
  Blockly.Arduino.addFunction('respawn', respawnCode);

  // Add code to loop() to constantly redraw all sprites
  var code = 'whoColliding = -1;\nmoveMobs();\nt++;\nGD.__wstartspr(0);\nredrawAll();' + 
             '\nGD.__end();\nGD.waitvblank();\ncollisions();\n';
  return code;
};

