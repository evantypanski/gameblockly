'use strict';
  
goog.provide('Blockly.Blocks.collision');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

Blockly.Blocks.collision.HUE = 25;

Blockly.Blocks['collision_enable'] = {
  init: function() {
    this.setColour(Blockly.Blocks.collision.HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(
          [['enable', 'e'], ['disable', 'd']]), 'COLLISIONS')
        .appendField("collisions");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
}

Blockly.Blocks['collision_if'] = {
  init: function() {
    this.setColour(Blockly.Blocks.collision.HUE);
    this.appendValueInput('IF')
        .setAlign(Blockly.ALIGN_RIGHT)
        .setCheck(Blockly.Types.BOOLEAN.checklist)
        .appendField("if");
    this.appendStatementInput('DO')
        .appendField("do");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
}

Blockly.Blocks['collision_ifoptions'] = {
  init: function() {
    this.setColour(Blockly.Blocks.collision.HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(
              [['character\xa0is\xa0hit', 'h'], ['character collects item', 'i']]), 'EVENT');
    this.setOutput(true, Blockly.Types.BOOLEAN.output);
  }
}

