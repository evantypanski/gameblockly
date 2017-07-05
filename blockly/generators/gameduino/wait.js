'use strict';

goog.provide('Blockly.Gameduino.Wait');

goog.require('Blockly.Arduino');

var oneSecond = 72;

Blockly.Arduino['wait_every'] = function(block) {
  var seconds = block.getFieldValue('SECONDS');
  var branch = Blockly.Arduino.statementToCode(block, 'DO');

  var code = 'if (t != 0 && t % ' + seconds * oneSecond + ' == 0) {\n' + branch + '}';
  return code + '\n';
};

Blockly.Arduino['wait_collision'] = function(block) {
  var seconds = block.getFieldValue('SECONDS');
  var s = block.getFieldValue('SPRITE');
  var branch = Blockly.Arduino.statementToCode(block, 'DO');
  var code = 'if (t == last' + s + ' + ' + seconds * oneSecond + ' && last' + s + ' != -1) {\n' +
              branch + '}';
  return code + '\n';
};
