'use strict';

goog.provide('Blockly.Gameduino.Mobs');

goog.require('Blockly.Arduino');

var oneSecond = 72;

Blockly.Arduino['mobs_hostile'] = function(block) {
  var code = ''; 
  var s = block.getFieldValue('MOB_SPRITE');
  var spawnLoc = block.getFieldValue('MOB_SPAWN_LOC');
  var spawnTime = block.getFieldValue('MOB_SPAWN_TIME');
  var speed = 11 - block.getFieldValue('MOB_SPEED');
  var moves = block.getFieldValue('MOB_MOVES');

  if (spawnTime === '1') code += 'if (t != 0 && t % ' + oneSecond + ' == 0) {\n';
  if (spawnTime === '3') code += 'if (t != 0 && t % ' + oneSecond * 3 + ' == 0) {\n';
  if (spawnTime === '5') code += 'if (t != 0 && t % ' + oneSecond * 5 + ' == 0) {\n';
  if (spawnTime === '10') code += 'if (t != 0 && t % ' + oneSecond * 10 + ' == 0) {\n';
  if (spawnTime === '20') code += 'if (t != 0 && t % ' + oneSecond * 20 + ' == 0) {\n';
  if (spawnTime === '50') code += 'if (t != 0 && t % ' + oneSecond * 50 + ' == 0) {\n';

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

  var moveCode;
  if (moves === 'au') moveCode = 0;
  if (moves === 'ad') moveCode = 1;
  if (moves === 'al') moveCode = 2;
  if (moves === 'ar') moveCode = 3;
  
  code += '  spawnMob(' + xVal + ', ' + yVal + ', ' + s + ', ' + 
          speed + ', ' + moveCode + ');\n}';

  return code;
}
