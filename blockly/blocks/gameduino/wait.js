'use strict';

goog.provide('Blockly.Blocks.wait');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

Blockly.Blocks.wait.HUE = 260;

var spritesList = [['goomba', '12'], ['mystery block', '0'], ['star', '11'], ['brick', '14'],
                ['bullet bill', '16'], ['cheep cheep', '30'], ['hammer', '28'], 
                ['cloud', '27'], ['moblin', '40'], ['lynel', '47'], ['octorok', '34'],
                ['coin', '5'], ['mushroom', '8'], ['fire flower', '10']];

Blockly.Blocks['wait_every'] = {
  init: function() {
    this.setColour(Blockly.Blocks.time.HUE);
    this.appendDummyInput()
        .appendField("every")
        .appendField(new Blockly.FieldNumber('1', 0, 1000, 1), 'SECONDS')
        .appendField("second(s)");
    this.appendStatementInput('DO')
        .appendField("do");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['wait_collision'] = {
  init: function() {
    this.setColour(Blockly.Blocks.time.HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldNumber('1', 0, 1000, 1), 'SECONDS')
        .appendField("seconds after most recent collision with")
        .appendField(new Blockly.FieldDropdown(spritesList), 'SPRITE');
    this.appendStatementInput('DO')
        .appendField("do");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
