'use strict';

goog.provide('Blockly.Gameduino.Mobs');

goog.require('Blockly.Arduino');

var oneSecond = 72;

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

Blockly.Arduino['mobs_hostile'] = function(block) {
  var code = ''; 
  var s = block.getFieldValue('MOB_SPRITE');
  var spawnLoc = block.getFieldValue('MOB_SPAWN_LOC');
  var speed = 11 - block.getFieldValue('MOB_SPEED');
  var moves = block.getFieldValue('MOB_MOVES');

  var spawn = findSpawnLoc(spawnLoc);

  code += 'spawnMob(' + spawn[0] + ', ' + spawn[1] + ', ' + s + ', ' + 
          speed + ', ' + moves + ');\n';

  return code;
};

Blockly.Arduino['mobs_items'] = function(block) {
  var s = block.getFieldValue('ITEM_SPRITE');
  var spawnLoc = block.getFieldValue('ITEM_SPAWN_LOC');
  var doesMove  = block.getFieldValue('ITEM_MOVE_YN');
  var speed = 11 - block.getFieldValue('ITEM_SPEED');
  var moves = block.getFieldValue('ITEM_MOVES');

  var spawn = findSpawnLoc(spawnLoc);

  var code = 'spawnItem(' + spawn[0] + ', ' + spawn[1] + ', ' + s;

  if (doesMove == 'y') code += ', ' + speed + ', ' + moves;

  code += ');\n';

  return code;
};

Blockly.Arduino['mobs_destroy'] = function(block) {
  return 'removeSprite(whoColliding);\n';
};
