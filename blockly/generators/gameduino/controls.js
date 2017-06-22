'use strict';

goog.provide('Blockly.Gameduino.Controls');

goog.require('Blockly.Arduino');

function makeCodeFromControl(control) {
  if (control == 'u') control = 'turn(0, \'u\');\n  moveCharacter(0, 5, \'u\');\n';
  if (control == 'd') control = 'turn(0, \'d\');\n  moveCharacter(0, 5, \'d\');\n';
  if (control == 'l') control = 'turn(0, \'l\');\n  moveCharacter(0, 5, \'l\');\n';
  if (control == 'r') control = 'turn(0, \'r\');\n  moveCharacter(0, 5, \'r\');\n';

  return control;
}

Blockly.Arduino['controls_up'] = function(block) {
  var control = block.getFieldValue('CONTROLS_UP');
  control = makeCodeFromControl(control);
  var code = 'if (digitalRead(4)) {\n' +
             '  ' + control + '}\n';
  return code;
}

Blockly.Arduino['controls_down'] = function(block) {
  var control = block.getFieldValue('CONTROLS_DOWN');
  control = makeCodeFromControl(control);
  var code = 'if (digitalRead(5)) {\n' +
             '  ' + control + '}\n';
  return code;
}
Blockly.Arduino['controls_left'] = function(block) {
  var control = block.getFieldValue('CONTROLS_LEFT');
  control = makeCodeFromControl(control);
  var code = 'if (digitalRead(6)) {\n' +
             '  ' + control + '}\n';
  return code;
}
Blockly.Arduino['controls_right'] = function(block) {
  var control = block.getFieldValue('CONTROLS_RIGHT');
  control = makeCodeFromControl(control);
  var code = 'if (digitalRead(7)) {\n' +
             '  ' + control + '}\n';
  return code;
}
