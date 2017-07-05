/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview XML toolbox embedded into a JavaScript text string.
 */
'use strict';

/** Create a namespace for the application. */
var Ardublockly = Ardublockly || {};

Ardublockly.TOOLBOX_XML =
'<xml>' +
'  <sep></sep>' +
'  <category id="catSetup" name="Setup">' +
'    <block type="setup_all"></block>' +
'  </category>' +
'  <sep></sep>' +
'  <category id="catControls" name="Controls">' +
'    <block type="if_controls">' +
'      <value name="IF">' +
'        <block type="controls_options"></block>' +
'      </value>' +
'    </block>' +
'    <block type="move_units">' + 
'      <value name="UNITS">' +
'        <block type="math_number">' +
'          <field name="NUM">5</field>' +
'        </block>' +
'      </value>' +
'    </block>' +
'    <block type="move_turn"></block>' +
'  </category>' +
'  <sep></sep>' +
'  <category id="catEvents" name="Events">' +
'    <block type="collision_enable"></block>' +
'    <block type="events_nolives"></block>' +
'    <block type="events_score"></block>' +
'    <block type="events_lose"></block>' +
'    <block type="events_win"></block>' +
'    <block type="events_respawn"></block>' +
'    <block type="events_lives"></block>' +
'  </category>' +
'  <sep></sep>' +
'  <category id="catMobs" name="Monsters and Items">' +
'    <block type="mobs_spawn"></block>' +
'    <block type="mobs_collision"></block>' +
'    <block type="mobs_destroy"></block>' + 
'  </category>' +
'  <sep></sep>' +
'  <category id="catWait" name="Time">' +
'    <block type="wait_every"></block>' +
'    <block type="wait_collision"></block>' +
'  </category>' +
'</xml>';
