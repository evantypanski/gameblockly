'use strict';

goog.provide('Blockly.Blocks.mobs');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

Blockly.Blocks.mobs.HUE = 125;

var spritesList = [['goomba', '12'], ['mystery block', '0'], ['star', '11'], ['brick', '14'],
                ['bullet bill', '16'], ['cheep cheep', '30'], ['hammer', '28'], 
                ['cloud', '27'], ['moblin', '40'], ['lynel', '47'], ['octorok', '34'],
                ['coin', '5'], ['mushroom', '8'], ['fire flower', '10']];
var spawnLocations = [['randomly', 'r'], ['in the top left', 'tl'], 
                      ['in the top middle', 'tm'], ['in the top right', 'tr'],
                      ['in the middle left', 'ml'], ['in the middle', 'mm'],
                      ['in the middle right', 'mr'], ['in the bottom left', 'bl'],
                      ['in the bottom middle', 'bm'], ['in the bottom right', 'br']];
var moves = [['randomly', '4'], ['following the player', '5'], ['always left', '2'], 
             ['always right', '3'], ['always up', '0'], ['always down', '1']];


Blockly.Blocks['mobs_spawn'] = {
  init: function() {
    this.setColour(Blockly.Blocks.mobs.HUE);
    this.appendDummyInput()
        .appendField("make sprite")
        .appendField(new Blockly.FieldDropdown(spritesList), 'SPRITE');
    this.appendDummyInput()
        .appendField("which spawns")
        .appendField(new Blockly.FieldDropdown(spawnLocations), 'SPAWN_LOC');
    this.appendDummyInput()
        .appendField("does the sprite move?")
        .appendField(new Blockly.FieldDropdown([['no', 'n'], ['yes', 'y']]), 'MOVE_YN');
    this.appendDummyInput()
        .appendField("if so, how?")
        .appendField(new Blockly.FieldDropdown(moves), 'MOVES');
    this.appendDummyInput()
        .appendField("and at what speed?")
        .appendField(new Blockly.FieldNumber('5', 0, 10, 1), 'SPEED')
        .appendField("(1 to 10) 1 max speed");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks['mobs_collision'] = {
  init: function() {
    this.setColour(Blockly.Blocks.mobs.HUE);
    this.appendDummyInput()
        .appendField("if character hits sprite")
        .appendField(new Blockly.FieldDropdown(spritesList), 'SPRITE');
    this.appendStatementInput('DO')
        .appendField("do");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
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
