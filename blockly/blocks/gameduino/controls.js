'use strict';

goog.provide('Blockly.Blocks.controls');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

Blockly.Blocks.controls.HUE = 90;

Blockly.Blocks['if_controls'] = {
  init: function() {
    this.setColour(Blockly.Blocks.controls.HUE);
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

Blockly.Blocks['controls_options'] = {
  init: function() {
    this.setColour(Blockly.Blocks.controls.HUE);
    this.appendDummyInput() 
        .appendField(new Blockly.FieldDropdown(
              [['joystick\xa0presses\xa0up', 'u'], ['joystick presses right', 'r'], 
               ['joystick presses left', 'l'], ['joystick presses down', 'd']]), 'CONTROL');
    this.setOutput(true, Blockly.Types.BOOLEAN.output);
  }
}
