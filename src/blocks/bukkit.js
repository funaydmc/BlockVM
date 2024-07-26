Blockly.common.defineBlocks({
    bukkit_print_console: {
        init: function() {
            this.appendValueInput('MSG')
                .appendField('in ra console');
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour('#F16900');
            this.setTooltip('');
            this.setHelpUrl('');
        }
    },

    bukkit_sendMessage: {
        init: function() {
            this.appendValueInput('WHO')
                .appendField('Gửi đến')
                .setCheck(['Player', 'Console']);
            this.appendValueInput('MSG')
                .appendField('tin nhắn')
                .setCheck('String');
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setInputsInline(true);
            this.setColour('#F16900');
            this.setTooltip('');
            this.setHelpUrl('');
        }
    },
    bukkit_player: {
        init: function() {
            this.appendValueInput('NAME')
                .appendField('người chơi')
                .setCheck('String');
            this.setOutput(true, 'Player');
            this.setColour('#F16900');
            this.setTooltip('');
            this.setHelpUrl('');
        }
    },
    bukkit_online_players: {
        init: function() {
            this.appendDummyInput()
                .appendField('tất cả người chơi online');
            this.setOutput(true, ['List', 'Player']);
            this.setColour('#F16900');
            this.setTooltip('');
            this.setHelpUrl('');
        }
    },
})

generator.forBlock['bukkit_print_console'] = function(block) {
    generator.definitions_.bukkit = 'from org.bukkit import Bukkit'
    generator.definitions_.chatcolor = 'from org.bukkit import ChatColor'
    generator.provideFunction_('colorize', `def colorize(msg): return ChatColor.translateAlternateColorCodes(\'&\', str(msg))`);

    var msg = generator.valueToCode(block, 'MSG', generator.ORDER_NONE) || '""';
    return `Bukkit.getConsoleSender().sendMessage(colorize(${msg}))\n`  
}

generator.forBlock['bukkit_sendMessage'] = function(block) {
    generator.definitions_.chatcolor = 'from org.bukkit import ChatColor'
    generator.provideFunction_('colorize', `def colorize(msg): return ChatColor.translateAlternateColorCodes(\'&\', str(msg))`);
    var who = generator.valueToCode(block, 'WHO', generator.ORDER_NONE) || '""';
    var msg = generator.valueToCode(block, 'MSG', generator.ORDER_NONE) || '""';
    var type = block.getInputTargetBlock('WHO')?.outputConnection.check;
    if (type!=null && type[0] == 'List') return `[p.sendMessage(colorize(${msg})) for p in ${who}]\n`;
    else return `${who}.sendMessage(colorize(${msg}))\n`;
}

generator.forBlock['bukkit_player'] = function(block) {
    generator.definitions_.bukkit = 'from org.bukkit import Bukkit'
    return [`Bukkit.getPlayer(${generator.valueToCode(block, 'NAME', generator.ORDER_NONE)})`, generator.ORDER_NONE];
}

generator.forBlock['bukkit_online_players'] = function(block) {
    generator.definitions_.bukkit = 'from org.bukkit import Bukkit'
    return [`list(Bukkit.getOnlinePlayers())`, generator.ORDER_NONE];
}