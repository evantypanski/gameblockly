'use strict';

goog.provide('Blockly.Gameduino.Collision');

goog.require('Blockly.Arduino');

Blockly.Arduino['collision_enable'] = function(block) {
  var toEnable = block.getFieldValue('COLLISIONS');

  var collisionsCode = 'void collisions() {\n' +
              '  GD.__start(COLLISION);\n' +
              '  for (int i=0; i < MAX_SPRITES; i++) {\n' +
              '    sprites[i].collidingWith = SPI.transfer(0);\n' +
              '  }\n  GD.__end();\n};';
  Blockly.Arduino.addFunction('collisions', collisionsCode);

  var enableCode;
  if (toEnable === 'e') enableCode = 'GD.wr(JK_MODE, 1);\n';
  else enableCode = 'GD.wr(JK_MODE, 0);\n';
  Blockly.Arduino.addSetup('collisionsEnable', enableCode, false);

  return 'collisions();\n';
}

Blockly.Arduino['collision_if'] = function(block) {
  var argument = Blockly.Arduino.valueToCode(block, 'IF', Blockly.Arduino.ORDER_NONE) || 'false';
  var branch = Blockly.Arduino.statementToCode(block, 'DO');
  var code = 'if (' + argument + ') {\n' + branch + '}';
  return code + '\n';
}

Blockly.Arduino['collision_ifoptions'] = function(block) {
  var e= block.getFieldValue('EVENT');
  var code = "";
  if (e == 'h') code = "whoColliding >= 10";
  if (e == 'i') code = "whoColliding < 10 && whoColliding != -1";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
}
