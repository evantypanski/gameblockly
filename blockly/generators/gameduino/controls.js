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

Blockly.Arduino['controls_up'] = function(block) {
  var control = block.getFieldValue('CONTROLS_UP');
  control = makeCodeFromControl(control);
  var code = 'if (t % charSpeed == 0) {\n' + 
             '  if (digitalRead(4)) {\n' +
             '    ' + control + '  }\n}\n';
  return code;
};

Blockly.Arduino['controls_down'] = function(block) {
  var control = block.getFieldValue('CONTROLS_DOWN');
  control = makeCodeFromControl(control);
  var code = 'if (t % charSpeed == 0) {\n' + 
             '  if (digitalRead(5)) {\n' +
             '    ' + control + '  }\n}\n';
  return code;
};

Blockly.Arduino['controls_left'] = function(block) {
  var control = block.getFieldValue('CONTROLS_LEFT');
  control = makeCodeFromControl(control);
  var code = 'if (t % charSpeed == 0) {\n' + 
             '  if (digitalRead(6)) {\n' +
             '    ' + control + '  }\n}\n';
  return code;
};

Blockly.Arduino['controls_right'] = function(block) {
  var control = block.getFieldValue('CONTROLS_RIGHT');
  control = makeCodeFromControl(control);
  var code = 'if (t % charSpeed == 0) {\n' + 
             '  if (digitalRead(7)) {\n' +
             '    ' + control + '  }\n}\n';
  return code;
};
