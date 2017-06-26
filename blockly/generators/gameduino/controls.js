'use strict';

goog.provide('Blockly.Gameduino.Controls');

goog.require('Blockly.Arduino');

function makeCodeFromControl(control) {
  if (control == 'u') control = 'turnCharacter(\'u\');\n    moveCharacter(5, \'u\');\n';
  if (control == 'd') control = 'turnCharacter(\'d\');\n    moveCharacter(5, \'d\');\n';
  if (control == 'l') control = 'turnCharacter(\'l\');\n    moveCharacter(5, \'l\');\n';
  if (control == 'r') control = 'turnCharacter(\'r\');\n    moveCharacter(5, \'r\');\n';

  return control;
};

Blockly.Arduino['if_controls'] = function(block) {
  var argument = Blockly.Arduino.valueToCode(block, 'IF', Blockly.Arduino.ORDER_NONE) || 'false';
  var branch = Blockly.Arduino.statementToCode(block, 'DO');
  var code = 'if (t % sprites[0].speedVal == 0) {\n  if (' + argument + ') {\n' + 
             branch + '  }\n}';
  return code + '\n';
}

Blockly.Arduino['controls_options'] = function(block) {
  var control = block.getFieldValue('CONTROL');
  var code = "digitalRead(";
  if (control == 'u') code += 4;
  if (control == 'd') code += 5;
  if (control == 'l') code += 6;
  if (control == 'r') code += 7;
  code += ")";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
}
