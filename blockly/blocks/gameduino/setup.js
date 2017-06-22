/**
 * This file is used for setting up the game
 * This includes loading the map and initializing characters.
 */

'use strict';

goog.provide('Blockly.Blocks.setup');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

Blockly.Blocks.setup.HUE = 180;

Blockly.Blocks['setup_all'] = {
  /**
   * Block for creating a background image.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.setup.HUE);
    this.appendDummyInput()
        .appendField("setup game");
    this.appendDummyInput()
        .appendField("set speed to")
        .appendField(new Blockly.FieldNumber('50', 0, 100, 1), 'SPEED')
        .appendField("(0 to 100) 100 max speed");
    this.appendDummyInput()
        .appendField("Controls");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("set right to")
        .appendField(new Blockly.FieldDropdown(
            [['move\xa0right', 'r'], ['move left', 'l'], ['move up', 'u'], ['move down', 'd']]), 
            'CONTROLS_RIGHT');
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("set left to")
        .appendField(new Blockly.FieldDropdown(
            [['move\xa0left', 'l'], ['move right', 'r'], ['move up', 'u'], ['move down', 'd']]), 
            'CONTROLS_LEFT');
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("set up to")
        .appendField(new Blockly.FieldDropdown(
            [['move\xa0up', 'u'], ['move right', 'r'], ['move left', 'l'], ['move down', 'd']]),
            'CONTROLS_UP');
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("set down to")
        .appendField(new Blockly.FieldDropdown(
            [['move\xa0down', 'd'], ["move right", 'r'], ['move left', 'l'], ['move up', 'u']]), 
            'CONTROLS_DOWN');
    this.setInputsInline(false);
    this.setPreviousStatement(false, null);
    this.setNextStatement(true, null);

  }
};
