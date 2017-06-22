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
  var delay = 500 - 4 * block.getFieldValue('SPEED');
  var numSprites = 1;

  // Include gameduino libraries
  Blockly.Arduino.addInclude('spi', '#include <SPI.h>'); // SPI must be before GD
  Blockly.Arduino.addInclude('gd', '#include <GD.h>');


  // Initialize variables for sprites

  /* Sprite order for row:
   * Row 0: Frog
   */

  /* Sprites are listed in arrays with:
   *   {x value, y value, rotation}
   */ 
  var spriteCode = 'int sprites[' + numSprites + '][3] = {\n' +
                    '  {120, 232, 0}\n' +
                    '};';
  Blockly.Arduino.addVariable('sprites', spriteCode, false);

  /* Sprite animations are essentially a fourth entry into the sprite[][] variable,
   * but a byte array.
   */
  var spriteAnimCode = 'byte spriteAnim[' + numSprites + '][5] = {\n' +
                        '  {2, 1, 0, 0, 2}\n' +
                        '};';
  Blockly.Arduino.addVariable('spriteAnim', spriteAnimCode, false);
                          

  // Include constants
  Blockly.Arduino.addDeclaration('BG_BLACK', '#define BG_BLACK 34');
  Blockly.Arduino.addDeclaration('NUM_SPRITES', '#define NUM_SPRITES ' + numSprites); // increment if adding sprite
  Blockly.Arduino.addDeclaration('CONTROL_RIGHT', '#define CONTROL_RIGHT 5');
  Blockly.Arduino.addDeclaration('CONTROL_LEFT', '#define CONTROL_LEFT 3');
  Blockly.Arduino.addDeclaration('CONTROL_UP', '#define CONTROL_UP 0');
  Blockly.Arduino.addDeclaration('CONTROL_DOWN', '#define CONTROL_DOWN 6');

  var setupCode = 'GD.begin();\n  delay(500);\n';
  // Setup background
  Blockly.Arduino.addInclude('bg', '#include <froggerbg.h>');
  setupCode += '  GD.copy(RAM_CHR, froggerbg_pic, sizeof(froggerbg_pic));\n'; // Load background
  setupCode += '  GD.fill(RAM_PIC, BG_BLACK, 4096);\n';

  // Setup sprites
  Blockly.Arduino.addInclude('sprites', '#include <sprite.h>');
  setupCode += '  GD.copy(PALETTE16A, sprite_sprpal, sizeof(sprite_sprpal));\n';
  setupCode += '  GD.uncompress(RAM_SPRIMG, sprite_sprimg);\n';


  // Setup pins for controller
  Blockly.Arduino.reservePin(block, 4, 'Up', 'Up control');
  Blockly.Arduino.reservePin(block, 5, 'Down', 'Down control');
  Blockly.Arduino.reservePin(block, 6, 'Left', 'Left control');
  Blockly.Arduino.reservePin(block, 7, 'Right', 'Right control');
  setupCode += '\n  for (byte i = 4; i < 8; i++) {\n' +
               '    pinMode(i, INPUT);' +
               '    digitalWrite(i, HIGH);\n  }';
  // Add setupCode to setup() function
  Blockly.Arduino.addSetup('setupBG',  setupCode, false);

  var controls = [block.getFieldValue('CONTROLS_UP'), block.getFieldValue('CONTROLS_DOWN'), 
            block.getFieldValue('CONTROLS_LEFT'), block.getFieldValue('CONTROLS_RIGHT')];
  for (var i = 0; i < controls.length; i++) {
    if (controls[i] == 'u') controls[i] = 'turn(0, \'u\');\n    moveCharacter(0, 5, \'u\');\n';
    if (controls[i] == 'd') controls[i] = 'turn(0, \'d\');\n    moveCharacter(0, 5, \'d\');\n';
    if (controls[i] == 'l') controls[i] = 'turn(0, \'l\');\n    moveCharacter(0, 5, \'l\');\n';
    if (controls[i] == 'r') controls[i] = 'turn(0, \'r\');\n    moveCharacter(0, 5, \'r\');\n';
  }
  // Pin layout:
  //   4 - up  5 - down  6 - left  7 - right
  var controlsCode = 'void readControls() {\n' +
                 '  if (digitalRead(4)) {\n' +
                 '    ' + controls[0]  + '  }\n' + // TODO
                 '  if (digitalRead(5)) {\n' +
                 '    ' + controls[1]  + '  }\n' + // TODO
                 '  if (digitalRead(6)) {\n' +
                 '    ' + controls[2]  + '  }\n' + // TODO
                 '  if (digitalRead(7)) {\n' +
                 '    ' + controls[3]  + '  }\n}\n'; // TODO
  Blockly.Arduino.addFunction('readControls', controlsCode);


  // Add redrawAll() function
  var redrawAllCode = 'void redrawAll() {\n' +
                     '  for (int i = 0; i < NUM_SPRITES; i++) {\n' +
                     '    draw_sprite(sprites[i][0], sprites[i][1],\n' +
                     '                spriteAnim[i], sprites[i][2]);\n' +
                     '  }\n' +
                     '}';
  Blockly.Arduino.addFunction('redrawAll', redrawAllCode);

  var dirToRotCode = 'int dirToRot(char toTurn) {\n' +
                 '  switch(toTurn) {\n' +
                 '  case \'r\':\n      return CONTROL_RIGHT;\n' +
                 '  case \'l\':\n      return CONTROL_LEFT;\n' +
                 '  case \'u\':\n      return CONTROL_UP;\n' +
                 '  case \'d\':\n      return CONTROL_DOWN;\n' +
                 '  }\n}';
  Blockly.Arduino.addFunction('dirToRot', dirToRotCode);

  // Add turn(int s, char toTurn) function
  // s is the sprite number that is to be turned
  // toTurn is a character ('r', 'l', 'u', 'd') that symbolizes a direction
  // to turn the sprite
  var turnCode = 'void turn(int s, char toTurn) {\n' +
                 '  sprites[s][2] = dirToRot(toTurn);\n' +
                 '}';
  Blockly.Arduino.addFunction('turn', turnCode);

  // Add moveForward(int s, int units) function
  // s is the sprite number that is to be moved
  // dir is the direction character (same as toTurn above)
  var moveCharacterCode = 'void moveCharacter(int s, int units, char toMove) {\n' +
                '  int dir = dirToRot(toMove);\n  switch(dir) {\n' +
                '    case CONTROL_RIGHT:\n      sprites[s][0] += units;  break;\n' +
                '    case CONTROL_LEFT:\n      sprites[s][0] -= units;  break;\n' +
                '    case CONTROL_UP:\n      sprites[s][1] -= units;  break;\n' +
                '    case CONTROL_DOWN:\n      sprites[s][1] += units;  break;\n' +
                '  }\n}';
  Blockly.Arduino.addFunction('moveCharacter', moveCharacterCode);

  // Add code to loop() to constantly redraw all sprites
  var code = 'GD.__wstartspr(0);\nredrawAll();\nGD.__end();\n' +
             'readControls();\ndelay(' + delay + ');\n';
  return code;
};

