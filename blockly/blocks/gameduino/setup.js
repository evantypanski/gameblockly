/**
 * This file is used for setting up the game
 * This includes loading the map and initializing characters.
 */

'use strict';

goog.provide('Blockly.Blocks.setup');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

Blockly.Blocks.setup.HUE = 220;

var spawnLocations = [['random', 'r'], ['in the top left', 'tl'], 
                      ['in the top middle', 'tm'], ['in the top right', 'tr'],
                      ['in the middle left', 'ml'], ['in the middle', 'mm'],
                      ['in the middle right', 'mr'], ['in the bottom left', 'bl'],
                      ['in the bottom middle', 'bm'], ['in the bottom right', 'br']];

Blockly.Blocks['setup_all'] = {
  /**
   * Block for creating a background image.
   * ... and a lot more
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.setup.HUE);
    this.appendDummyInput()
        .appendField("setup game");
    this.appendDummyInput()
        .appendField("set character speed to")
        .appendField(new Blockly.FieldNumber('3', 0, 10, 1), 'SPEED')
        .appendField("(0 to 10) 0 max speed");
    this.appendDummyInput()
        .appendField("select character")
        .appendField(new Blockly.FieldDropdown([['Mario', 'm'], ['Link', 'l']]), 'SPRITE');
    this.appendDummyInput()
        .appendField("character initially spawns")
        .appendField(new Blockly.FieldDropdown(spawnLocations), 'SPAWN_LOC');
    this.appendDummyInput()
        .appendField("if a sprite hits the edge")
        .appendField(new Blockly.FieldDropdown([['loop\xa0around', 'l'], ['hit wall', 'w']]), 
                     'EDGE');
    this.appendDummyInput()
        .appendField("number of lives")
        .appendField(new Blockly.FieldNumber('3', 0, 10000, 1), 'LIVES');
    this.appendStatementInput('DO')
        .appendField("insert code to be run once at the beginning:");
    this.appendDummyInput()
        .appendField("insert code to be run 72 times a second below");
    this.setPreviousStatement(false);
    this.setNextStatement(true);
  }
};
