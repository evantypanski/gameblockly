'use strict';
  
goog.provide('Blockly.Blocks.events');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

Blockly.Blocks.events.HUE = 25;

var spritesList = [['goomba', '12'], ['mystery block', '0'], ['star', '11'], ['brick', '14'],
                ['bullet bill', '16'], ['cheep cheep', '30'], ['hammer', '28'], 
                ['cloud', '27'], ['moblin', '40'], ['lynel', '47'], ['octorok', '34'],
                ['coin', '5'], ['mushroom', '8'], ['fire flower', '10']];

var spawnLocations = [['randomly', 'r'], ['in the top left', 'tl'], 
                      ['in the top middle', 'tm'], ['in the top right', 'tr'],
                      ['in the middle left', 'ml'], ['in the middle', 'mm'],
                      ['in the middle right', 'mr'], ['in the bottom left', 'bl'],
                      ['in the bottom middle', 'bm'], ['in the bottom right', 'br']];

Blockly.Blocks['collision_enable'] = {
  init: function() {
    this.setColour(Blockly.Blocks.events.HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(
          [['enable', '0'], ['disable', '1']]), 'COLLISIONS')
        .appendField("collisions");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks['events_score'] = {
  init: function() {
    this.setColour(Blockly.Blocks.events.HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([['increase', '+'], ['decrease', '-']]),
          'OPERATOR')
        .appendField("score by")
        .appendField(new Blockly.FieldNumber('50', 0, 10000, 1), 'AMOUNT')
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['events_nolives'] = {
  init: function() {
    this.setColour(Blockly.Blocks.events.HUE);
    this.appendDummyInput()
        .appendField("if no lives remaining");
    this.appendStatementInput('DO')
        .appendField("do");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['events_compare'] = {
  init: function() {
    this.setColour(Blockly.Blocks.events.HUE);
    this.appendDummyInput()
        .appendField("if")
        .appendField(new Blockly.FieldDropdown([['score', 's'], ['lives', 'l']]), 'TO_COMPARE')
        .appendField(new Blockly.FieldDropdown([['>', '>'], ['=', '=='], ['<', '<']]), 'OP')
        .appendField(new Blockly.FieldNumber('5000', 0, 999999, 1), 'TARG');
    this.appendStatementInput('DO')
        .appendField("do");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};


Blockly.Blocks['events_lose'] = {
  init: function() {
    this.setColour(Blockly.Blocks.events.HUE);
    this.appendDummyInput()
        .appendField("lose game"); 
    this.appendDummyInput()
        .appendField("reset after")
        .appendField(new Blockly.FieldNumber('5', 0, 15, 1), 'SECONDS')
        .appendField("second(s)");
    this.setPreviousStatement(true);
    this.setNextStatement(false);
  }
};

Blockly.Blocks['events_win'] = {
  init: function() {
    this.setColour(Blockly.Blocks.events.HUE);
    this.appendDummyInput()
        .appendField("win game"); 
    this.appendDummyInput()
        .appendField("reset after")
        .appendField(new Blockly.FieldNumber('5', 0, 15, 1), 'SECONDS')
        .appendField("second(s)");
    this.setPreviousStatement(true);
    this.setNextStatement(false);
  }
};

Blockly.Blocks['events_respawn'] = {
  init: function() {
    this.setColour(Blockly.Blocks.events.HUE);
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
    this.setColour(Blockly.Blocks.events.HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([['lose', '-'], ['gain', '+']]),
          'OPERATOR')
        .appendField("a life");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
