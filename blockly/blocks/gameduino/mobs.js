'use strict';

goog.provide('Blockly.Blocks.mobs');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

var hostileMobsList = [['goomba', '12'], ['mystery block', '0'], ['star', '11'], ['brick', '14'],
                ['bullet bill', '16'], ['cheep cheep', '30'], ['hammer', '28'], 
                ['cloud', '27'], ['moblin', '40'], ['lynel', '47'], ['octorok', '34']];
var itemsList = [['coin', '5'], ['mushroom', '8'], ['fire flower', '10'], ['star', '11'],
                 ['hammer', '12']];
var spawnLocations = [['randomly', 'r'], ['in the top left', 'tl'], 
                      ['in the top middle', 'tm'], ['in the top right', 'tr'],
                      ['in the middle left', 'ml'], ['in the middle', 'mm'],
                      ['in the middle right', 'mr'], ['in the bottom left', 'bl'],
                      ['in the bottom middle', 'bm'], ['in the bottom right', 'br']];
var moves = [['randomly', '4'], ['following the player', '5'], ['always left', '2'], 
             ['always right', '3'], ['always up', '0'], ['always down', '1'],
             ['none', '6']];

Blockly.Blocks['mobs_hostile'] = {
  init: function() {
    this.setColour(360);
    this.appendDummyInput()
        .appendField("make hostile mob with sprite")
        .appendField(new Blockly.FieldDropdown(hostileMobsList), 'MOB_SPRITE');
    this.appendDummyInput()
        .appendField("who spawns")
        .appendField(new Blockly.FieldDropdown(spawnLocations), 'MOB_SPAWN_LOC');
    this.appendDummyInput()
        .appendField("with a speed of")
        .appendField(new Blockly.FieldNumber('5', 0, 10, 1), 'MOB_SPEED')
        .appendField("(0 to 10) 10 max speed");
    this.appendDummyInput()
        .appendField("who moves")
        .appendField(new Blockly.FieldDropdown(moves), 'MOB_MOVES');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks['mobs_items'] = {
  init: function() {
    this.setColour(100);
    
    this.appendDummyInput()
        .appendField("make item with sprite")
        .appendField(new Blockly.FieldDropdown(itemsList), 'ITEM_SPRITE');
    this.appendDummyInput()
        .appendField("which spawns")
        .appendField(new Blockly.FieldDropdown(spawnLocations), 'ITEM_SPAWN_LOC');
    this.appendDummyInput()
        .appendField("does the item move?")
        .appendField(new Blockly.FieldDropdown([['no', 'n'], ['yes', 'y']]), 'ITEM_MOVE_YN');
    this.appendDummyInput()
        .appendField("if so, how?")
        .appendField(new Blockly.FieldDropdown(moves), 'ITEM_MOVES');
    this.appendDummyInput()
        .appendField("and at what speed?")
        .appendField(new Blockly.FieldNumber('5', 0, 10, 1), 'ITEM_SPEED')
        .appendField("(0 to 10) 10 max speed");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks['mobs_destroy'] = {
  init: function() {
    this.setColour(100);
    this.appendDummyInput()
        .appendField("destroy sprite character is touching");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
