'use strict';

goog.provide('Blockly.Gameduino.Setup');

goog.require('Blockly.Arduino');

/**
 * Function for setting up Gameduino for programming
 * All setup is done in this function.  The setup is intentionally complicated
 *   in order to make the rest of the code easier and more intuitive for
 *   educational purposes.  Thus, all additions and subtractions from other code
 *   will require some modification of setup code.  Setup code must therefore
 *   be well organized - to find what you're looking for.
 * Included, in order:
 *   Library inclusion for Gameduino
 *   Sprite variables which hold information on each sprite.  Order is described
 *      at the definition of the sprite variables.
 *   Definitions for constants
 *   A setup function, which initializes the background and sprites
 *   A basic redrawAll() function which redraws all sprites according to sprite arrays
 *   A basic turn() function which turns the sprite given
 *   A basic move() function which moves the sprite forwards (where it is facing)
 *   A call to redrawAll() in the loop in order to redraw at the start of all loops
 * Note: The sprite[][] variable and spriteAnim[][] variable are both capturing the current
 *   state of a specific sprite.  Thus, spriteAnim[][] is NOT a place to store the animations
 *   of sprites, but instead store its current animation.  This design choice was made to allow
 *   more ease for blocks to change these variables with as close to a single line as possible.
 * To add a sprite: 
 *   1) Add to header file used
 *   2) Increment numSprites definition by 1 - note this is a Javascript variable, not to be 
 *      exported to c, so it's near beginning of function
 *   3) Add sprite to sprites and spriteAnim variables
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['setup_all'] = function(block) {
  var characterSpeed = 11 - block.getFieldValue('SPEED');
  var maxSprites = 100; // Change this to get more sprites

  // Include gameduino libraries
  Blockly.Arduino.addInclude('spi', '#include <SPI.h>'); // SPI must be before GD
  Blockly.Arduino.addInclude('gd', '#include <GD.h>');


  // Initialize timing variable
  var timingCode = 'static unsigned int t;';
  Blockly.Arduino.addVariable('t', timingCode, false);

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

  var spriteLocs = 'int spriteLocs[100][6];'
  
  Blockly.Arduino.addVariable('spriteLocs', spriteLocs, false);

  // Include constants
  Blockly.Arduino.addDeclaration('BG_BLACK', '#define BG_BLACK 34');
  Blockly.Arduino.addDeclaration('MAX_SPRITES', '#define MAX_SPRITES ' + maxSprites);

  var setupCode = 'GD.begin();\n  delay(500);\n';
  // Setup background
  Blockly.Arduino.addInclude('bg', '#include <froggerbg.h>');
  setupCode += '  GD.copy(RAM_CHR, froggerbg_pic, sizeof(froggerbg_pic));\n'; // Load background
  setupCode += '  GD.fill(RAM_PIC, BG_BLACK, 4096);\n';

  // Setup sprites

  setupCode += '  GD.copy(RAM_SPRPAL, sprite_sprpal, sizeof(sprite_sprpal));\n';
  setupCode += '  GD.copy(RAM_SPRIMG, sprite_sprimg, sizeof(sprite_sprimg));\n';


  // Setup pins for controller
  Blockly.Arduino.reservePin(block, 4, 'Up', 'Up control');
  Blockly.Arduino.reservePin(block, 5, 'Down', 'Down control');
  Blockly.Arduino.reservePin(block, 6, 'Left', 'Left control');
  Blockly.Arduino.reservePin(block, 7, 'Right', 'Right control');
  setupCode += '\n  for (byte i = 4; i < 8; i++) {\n' +
               '    pinMode(i, INPUT);' +
               '    digitalWrite(i, HIGH);\n  }\n';

  // Setup the spriteLocs variable - first initialize all to -1 to show unused
  setupCode += '  for (int i = 0; i < MAX_SPRITES; i++) {\n' +
               '    for (int j = 0; j < 6; j++) {\n' +
               '      spriteLocs[i][j] = -1;\n' +
               '    }\n  }\n';
  // Now setup the initial character location
  setupCode += '  spriteLocs[0][0] = 120;\n';
  setupCode += '  spriteLocs[0][1] = 232;\n';
  setupCode += '  spriteLocs[0][2] = ' + lAndRSprite + ';\n';
  setupCode += '  spriteLocs[0][3] = 0;\n';
  setupCode += '  spriteLocs[0][4] = ' + characterSpeed + ';\n';
  // Add setupCode to setup() function
  Blockly.Arduino.addSetup('setupCode',  setupCode, false);

  var redrawAllCode = 'void redrawAll() {\n  for (int i=0; i < MAX_SPRITES; i++) {\n' + 
                      '    if (spriteLocs[i][0] == -1) continue;\n' +
                      '    else draw_sprite(spriteLocs[i][0], spriteLocs[i][1], \n' + 
                      '                     spriteLocs[i][2], spriteLocs[i][3]);\n' +
                      '  }\n}\n';
  Blockly.Arduino.addFunction('redrawAll', redrawAllCode);

  // Add turn(int s, char toTurn) function
  // s is the sprite number that is to be turned
  // toTurn is a character ('r', 'l', 'u', 'd') that symbolizes a direction
   var turnCode = 'void turnCharacter(char toTurn) {\n' +
                 '  switch(toTurn) {\n' +
                 '  case \'r\':\n      spriteLocs[0][2]=' + lAndRSprite + 
                                       ';\n      spriteLocs[0][3]=0;  break;\n' +
                 '  case \'l\':\n      spriteLocs[0][2]=' + lAndRSprite + 
                 ';\n      spriteLocs[0][3]=' + leftRotation + ';  break;\n' +
                 '  case \'u\':\n      spriteLocs[0][2]=' + upSprite + 
                 ';\n      spriteLocs[0][3]=0;  break;\n' +
                 '  case \'d\':\n      spriteLocs[0][2]=' + downSprite + 
                 ';\n      spriteLocs[0][3]=0;  break;\n' +
                 '  }\n}';
  Blockly.Arduino.addFunction('turnCharacter', turnCode);

 // to turn the sprite
  // Add moveForward(int s, int units) function
  // s is the sprite number that is to be moved
  // dir is the direction character (same as toTurn above)
  var moveCharacterCode = 'void moveCharacter(int units, char toMove) {\n' +
                '  switch(toMove) {\n' +
                '    case \'r\':\n      spriteLocs[0][0] += units;  break;\n' +
                '    case \'l\':\n      spriteLocs[0][0] -= units;  break;\n' +
                '    case \'u\':\n      spriteLocs[0][1] -= units;  break;\n' +
                '    case \'d\':\n      spriteLocs[0][1] += units;  break;\n' +
                '  }\n}';
  Blockly.Arduino.addFunction('moveCharacter', moveCharacterCode);

  var spawnMobCode = 'void spawnMob(int xVal, int yVal, int s, int speedVal, int moveCode) {\n' +
                  '  for (int i=0; i < MAX_SPRITES; i++) {\n' +
                  '    if (spriteLocs[i][0] == -1) {\n' +
                  '      spriteLocs[i][0] = xVal;\n' +
                  '      spriteLocs[i][1] = yVal;\n' +
                  '      spriteLocs[i][2] = s;\n' +
                  '      spriteLocs[i][3] = 0;\n' +
                  '      spriteLocs[i][4] = speedVal;\n' +
                  '      spriteLocs[i][5] = moveCode;\n' +
                  '      break;\n    }\n  }\n}';
  Blockly.Arduino.addFunction('spawnMob', spawnMobCode);

  var moveMobsCode = 'void moveMobs() {\n' +
                '  for (int i=0; i < MAX_SPRITES; i++) {\n' +
                '    int speedVal = spriteLocs[i][4];\n' + 
                '    if (speedVal != -1 && t % speedVal == 0) {\n' +
                '      int moveCode = spriteLocs[i][5];\n' +
                '      switch(moveCode) {\n' +
                '        case 0: spriteLocs[i][1] -= 5;  break;\n' +
                '        case 1: spriteLocs[i][1] += 5;  break;\n' +
                '        case 2: spriteLocs[i][0] -= 5;  break;\n' +
                '        case 3: spriteLocs[i][0] += 5;  break;\n' +
                '      }\n    }\n  }\n}\n';
  Blockly.Arduino.addFunction('movesMob', moveMobsCode);

  // Add code to loop() to constantly redraw all sprites
  var code = 'moveMobs();\nt++;\nGD.__wstartspr(0);\nredrawAll();' + 
             '\nGD.__end();\nGD.waitvblank();\n';
  return code;
};

