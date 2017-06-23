'use strict';

goog.provide('Blockly.Blocks.mobs');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

Blockly.Blocks.mobs.HUE = 360;

var mobsList = [['1', '1'], ['2', '2'], ['3', '3'], ['4', '4']];
var spawnLocations = [['randomly', 'r'], ['in the top left', 'tl'], 
                      ['in the top middle', 'tm'], ['in the top right', 'tr']];
var spawnTimes = [['time\xa0a\xa0coin\xa0is\xa0retrieved', 'c'], ['second', '1'],
                  ['3 seconds', '3'], ['5 seconds', '5'], ['10 seconds', '10'],
                  ['20 seconds', '20'], ['50 seconds', '50']];
var moves = [['randomly', 'r'], ['always left', 'al'], ['always right', 'ar'], 
             ['always up', 'au'], ['always down', 'ad']];

Blockly.Blocks['mobs_hostile'] = {
  init: function() {
    this.setColour(Blockly.Blocks.mobs.HUE);
    this.appendDummyInput()
        .appendField("make hostile mob with sprite")
        .appendField(new Blockly.FieldDropdown(mobsList), 'MOB_SPRITE');
    this.appendDummyInput()
        .appendField("who spawns")
        .appendField(new Blockly.FieldDropdown(spawnLocations), 'MOB_SPAWN_LOC')
        .appendField("every")
        .appendField(new Blockly.FieldDropdown(spawnTimes), 'MOB_SPAWN_TIME');
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

