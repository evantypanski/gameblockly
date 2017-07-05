'use strict';

goog.provide('Blockly.Gameduino.Events');

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

Blockly.Arduino['collision_enable'] = function(block) {
  var toEnable = block.getFieldValue('COLLISIONS');
  var code = 'sprites[0].jk = ' + toEnable + ';\n';

  return code;
};

Blockly.Arduino['events_nolives'] = function(block) {
  var branch = Blockly.Arduino.statementToCode(block, 'DO');
  var code = 'if (lives <= 0) {\n' + branch + '}';
  return code + '\n';
};

Blockly.Arduino['events_score'] = function(block) {
  var op = block.getFieldValue('OPERATOR');
  var amt = block.getFieldValue('AMOUNT');
  return 'score ' + op + '= ' + amt + ';\n';
};

Blockly.Arduino['events_lose'] = function(block) {
  return 'gameOver(' + block.getFieldValue('SECONDS') + ');\n';
};

Blockly.Arduino['events_win'] = function(block) {
  return 'gameWon(' + block.getFieldValue('SECONDS') + ');\n';
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
