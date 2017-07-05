'use strict';

goog.provide('Blockly.Gameduino.Mobs');

goog.require('Blockly.Arduino');

var oneSecond = 72;

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

Blockly.Arduino['mobs_spawn'] = function(block) {
  var s = block.getFieldValue('SPRITE');
  var spawnLoc = block.getFieldValue('SPAWN_LOC');
  var doesMove  = block.getFieldValue('MOVE_YN');
  var speed = block.getFieldValue('SPEED');
  var moves = block.getFieldValue('MOVES');

  var spawn = findSpawnLoc(spawnLoc);

  var code = 'spawnSprite(' + spawn[0] + ', ' + spawn[1] + ', ' + s;

  if (doesMove == 'y') code += ', ' + speed + ', ' + moves;

  code += ');\n';

  return code;
};

Blockly.Arduino['mobs_collision'] = function(block) {
  var s = block.getFieldValue('SPRITE');
  var branch = Blockly.Arduino.statementToCode(block, 'DO');
  var code = 'if (whoColliding != -1 && sprites[whoColliding].spriteNum == ' + s + ') {\n' +
             branch + '  last' + s + ' = t;\n}';
  return code + '\n';
}

Blockly.Arduino['mobs_destroy'] = function(block) {
  return 'removeSprite(whoColliding);\n';
};
