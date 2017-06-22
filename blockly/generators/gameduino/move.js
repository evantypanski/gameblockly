'use strict';

goog.provide('Blockly.Gameduino.Move');

goog.require('Blockly.Arduino');

/**
 * Function for moving a sprite
 * Arduino code: TODO
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['move_units'] = function(block) {
  var units = Blockly.Arduino.valueToCode(block, 'UNITS',
    Blockly.Arduino.ORDER_ATOMIC);
  var toMove = 'r';
  var code = 'moveForward(0, ' + units + ', \'' + toMove + '\');\n';
  return code;
};

Blockly.Arduino['move_turn'] = function(block) {
  var toTurn = block.getFieldValue('TO_TURN');
  var code = 'turn(0, \'' + toTurn + '\');\n';
  return code;
};
