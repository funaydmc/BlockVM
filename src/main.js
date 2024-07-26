const generator = python.pythonGenerator
window.generator = generator

window.debug = function() {
  let blocks = workspace.getAllBlocks()
  let target = blocks[0]
  if (target == null) {console.log('No block found'); return}
  console.log(target.type)
  let inputs = target.inputList
  console.log(inputs)
  inputs.forEach(input => {
    console.log(input.name)
    input.fieldRow.forEach(field => {
      if (field.name != undefined) console.log('|--> '+field.name)
    });
  });
}


Blockly.common.defineBlocks({player_with_name: {
    init: function() {
      this.appendValueInput('NAME')
      .setCheck('String')
        .appendField('người chơi')
      this.setOutput(true, 'player');
      this.setInputsInline(true);
      this.setTooltip('');
      this.setHelpUrl('');
      this.setColour(225);
    }
}});

generator.forBlock['player_with_name'] = function(block) {
    generator.definitions_.bukkit = 'from org.bukkit import Bukkit';
    const name = generator.valueToCode(block, 'NAME', generator.ORDER_NONE);
    const code = `Bukkit.getPlayer(${name})`;
    return [code, generator.ORDER_NONE];
}

const send_message = {
  init: function() {
    this.appendValueInput('MSG')
    .setCheck('String')
      .appendField('Gửi tin nhắn');
    this.appendValueInput('WHO')
    .setCheck(['player', 'console'])
      .appendField('cho');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(225);
  }
};
Blockly.common.defineBlocks({send_message: send_message});
generator.forBlock['send_message'] = function(block) {
    generator.definitions_.chatcolor = 
      'from org.bukkit import ChatColor\n'
    + 'def colorize(msg): return ChatColor.translateAlternateColorCodes(\'&\', str(msg))';
    // todo: replace with provideFunction_
    const msg = generator.valueToCode(block, 'MSG', generator.ORDER_NONE);
    const who = generator.valueToCode(block, 'WHO', generator.ORDER_NONE);
    return `${who}.sendMessage(colorize(${msg}))\n`;
}