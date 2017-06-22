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
        .appendField("move forward");
    this.appendDummyInput()
        .appendField(" units");
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
