'use strict';

goog.provide('Blockly.Blocks.controls');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

Blockly.Blocks.controls.HUE = 180;

Blockly.Blocks['controls_up'] = {
  init: function() {
    this.setColour(Blockly.Blocks.controls.HUE);
    this.appendDummyInput()
        .appendField("set joystick UP to")
        .appendField(new Blockly.FieldDropdown(
            [['move\xa0up', 'u'], ['move right', 'r'], ['move left', 'l'], ['move down', 'd']]),
            'CONTROLS_UP');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks['controls_down'] = {
  init: function() {
    this.setColour(Blockly.Blocks.controls.HUE);
    this.appendDummyInput()
        .appendField("set joystick DOWN to")
        .appendField(new Blockly.FieldDropdown(
            [['move\xa0down', 'd'], ['move right', 'r'], ['move left', 'l'], ['move up', 'u']]),
            'CONTROLS_DOWN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks['controls_left'] = {
  init: function() {
    this.setColour(Blockly.Blocks.controls.HUE);
    this.appendDummyInput()
        .appendField("set joystick LEFT to")
        .appendField(new Blockly.FieldDropdown(
            [['move\xa0left', 'l'], ['move right', 'r'], ['move down', 'd'], ['move up', 'u']]),
            'CONTROLS_LEFT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks['controls_right'] = {
  init: function() {
    this.setColour(Blockly.Blocks.controls.HUE);
    this.appendDummyInput()
        .appendField("set joystick RIGHT to")
        .appendField(new Blockly.FieldDropdown(
            [['move\xa0right', 'r'], ['move down', 'd'], ['move left', 'l'], ['move up', 'u']]),
            'CONTROLS_RIGHT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};
