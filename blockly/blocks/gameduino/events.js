'use strict';
  
goog.provide('Blockly.Blocks.collision');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

Blockly.Blocks.collision.HUE = 25;

var spawnLocations = [['randomly', 'r'], ['in the top left', 'tl'], 
                      ['in the top middle', 'tm'], ['in the top right', 'tr'],
                      ['in the middle left', 'ml'], ['in the middle', 'mm'],
                      ['in the middle right', 'mr'], ['in the bottom left', 'bl'],
                      ['in the bottom middle', 'bm'], ['in the bottom right', 'br']];

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
};

Blockly.Blocks['events_if'] = {
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
};

Blockly.Blocks['events_options'] = {
  init: function() {
    this.setColour(Blockly.Blocks.collision.HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(
              [['character\xa0is\xa0hit', 'h'], ['character collects item', 'i'], 
               ['character dies', 'd'], ['no lives remaining', 'l']]),
               'EVENT');
    this.setOutput(true, Blockly.Types.BOOLEAN.output);
  }
};

Blockly.Blocks['events_score'] = {
  init: function() {
    this.setColour(Blockly.Blocks.collision.HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([['increase', '+'], ['decrease', '-']]),
          'OPERATOR')
        .appendField("score by")
        .appendField(new Blockly.FieldNumber('50', 0, 10000, 1), 'AMOUNT')
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['events_reset'] = {
  init: function() {
    this.setColour(Blockly.Blocks.collision.HUE);
    this.appendDummyInput()
        .appendField("reset game");
    this.setPreviousStatement(true);
    this.setNextStatement(false);
  }
};

Blockly.Blocks['events_respawn'] = {
  init: function() {
    this.setColour(Blockly.Blocks.collision.HUE);
    this.appendDummyInput()
        .appendField("respawn: where?")
        .appendField(new Blockly.FieldDropdown(spawnLocations), 
                'RESPAWN_LOC');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['events_lives'] = {
  init: function() {
    this.setColour(Blockly.Blocks.collision.HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([['lose', '-'], ['gain', '+']]),
          'OPERATOR')
        .appendField("a life");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
