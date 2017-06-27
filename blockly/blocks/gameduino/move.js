/**
 * This file is used for moving a sprite around
 */
'use strict';

goog.provide('Blockly.Blocks.move');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

Blockly.Blocks.move.HUE = 90;

Blockly.Blocks['move_units'] = {
  /**
   * Move a certain number of units (pixels)
   */
  init: function() {
    this.setColour(Blockly.Blocks.move.HUE);
    this.appendValueInput('UNITS')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField("move");
    this.appendDummyInput()
        .appendField("units in the direction")
        .appendField(new Blockly.FieldDropdown(
            [['up', 'u'], ['right', 'r'], ['left', 'l'], ['down', 'd']]), 'TO_MOVE');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};
Blockly.Blocks['move_turn'] = {
  /**
   * Turn a sprite a direction
   */
  init: function() {
    this.setColour(Blockly.Blocks.move.HUE);
    this.appendDummyInput()
        .appendField("turn to face ")
        .appendField(new Blockly.FieldDropdown(
            [['right', 'r'], ['left', 'l'], ['up', 'u'], ['down', 'd']]), 'TO_TURN');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};
