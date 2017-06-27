'use strict';

goog.provide('Blockly.Gameduino.Collision');

goog.require('Blockly.Arduino');

var findSpawnLoc = function(spawnLoc) {
  var xVal;
  var yVal;
  if (spawnLoc == 'r') { 
    xVal = 'random(400)';
    yVal = 'random(300)';
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

var oneSecond = 72;

Blockly.Arduino['collision_enable'] = function(block) {
  var toEnable = block.getFieldValue('COLLISIONS');
  var enableCode;
  if (toEnable === 'e') enableCode = 'GD.wr(JK_MODE, 1);\n';
  else enableCode = 'GD.wr(JK_MODE, 0);\n';

  return enableCode;
};

Blockly.Arduino['events_if'] = function(block) {
  var argument = Blockly.Arduino.valueToCode(block, 'IF', Blockly.Arduino.ORDER_NONE) || 'false';
  var branch = Blockly.Arduino.statementToCode(block, 'DO');
  var code = 'if (' + argument + ') {\n' + branch + '}';
  return code + '\n';
};

Blockly.Arduino['events_options'] = function(block) {
  var e = block.getFieldValue('EVENT');
  var code = "";
  if (e == 'h') code = "whoColliding >= 10";
  if (e == 'i') code = "whoColliding < 10 && whoColliding != -1";
  if (e == 'd') code = "dead";
  if (e == 'l') code = "lives <= 0";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['events_score'] = function(block) {
  var op = block.getFieldValue('OPERATOR');
  var amt = block.getFieldValue('AMOUNT');
  return 'score ' + op + '= ' + amt + ';\n';
};

Blockly.Arduino['events_reset'] = function(block) {
  return 'setup();\n';
};

Blockly.Arduino['events_respawn'] = function(block) {
  var spawnLoc = block.getFieldValue('RESPAWN_LOC');

  var spawn = findSpawnLoc(spawnLoc);

  return 'respawn(' + spawn[0] + ', ' + spawn[1] + ');\n';
};

Blockly.Arduino['events_lives'] = function(block) {
  var op = block.getFieldValue('OPERATOR');
  return 'lives ' + op + '= 1;\n';
};
