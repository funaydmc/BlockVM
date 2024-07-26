Blockly.common.defineBlocks({
    list_empty: {
        init: function() {
            this.appendDummyInput()
                .appendField('danh sách trống');
            this.setOutput(true, 'List');
            this.setColour('#745ba5');
            this.setTooltip('');
            this.setHelpUrl('');
        }
    },
    list_length: {
        init: function() {
            this.appendValueInput('LIST')
                .setCheck('List')
                .appendField('kích thước của');
            this.setOutput(true, 'Number');
            this.setColour('#745ba5');
            this.setTooltip('');
            this.setHelpUrl('');
        }
    },

    list_index: {
        init: function() {
            this.appendValueInput('LIST')
                .setCheck('List')
                .appendField('trong');
            this.appendValueInput('INDEX')
                .setCheck('Number')
                .appendField('lấy phần tử');
            this.setOutput(true, null);
            this.setColour('#745ba5');
            this.setInputsInline(true);
            this.setTooltip('');
            this.setHelpUrl('');
        }
    },
    list_set: {
        init: function() {
            this.appendValueInput('LIST')
                .setCheck('List')
                .appendField('trong');
            this.appendValueInput('INDEX')
                .setCheck('Number')
                .appendField('đặt phần tử');
            this.appendValueInput('VALUE')
                .appendField('là');
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour('#745ba5');
            this.setInputsInline(true);
            this.setTooltip('');
            this.setHelpUrl('');
        }
    },
    list_add: {
        init: function() {
            this.appendValueInput('LIST')
                .setCheck('List')
                .appendField('trong');
            this.appendValueInput('VALUE')
                .appendField('thêm phần tử');
            const at = new Blockly.FieldDropdown([
                ['vào cuối danh sách', 'last'],
                ['vào đầu danh sách', 'first'],
                ['vào vị trí', 'insert']
            ])
            at.setValidator(function(option) {
                this.sourceBlock_.getInput('INDEX').setVisible(option == 'insert');
            })
            this.appendDummyInput()
                .appendField(at, 'AT')
                
            this.appendValueInput('INDEX')
                .setCheck('Number')
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour('#745ba5');
            this.setInputsInline(true);
            this.setTooltip('');
            this.setHelpUrl('');
        }
    },
    list_random: {
        init: function() {
            this.appendValueInput('LIST')
                .setCheck('List')
                .appendField('phần tử ngẫu nhiên trong');
            this.setOutput(true, null);
            this.setColour('#745ba5');
            this.setTooltip('');
            this.setHelpUrl('');
            this.setInputsInline(true);
        }
    },
    list_remove: {
        init: function() {
            this.appendValueInput('LIST')
                .setCheck('List')
                .appendField('trong');
            this.appendValueInput('ELEMENT')
                .appendField('xóa phần tử');
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour('#745ba5');
            this.setInputsInline(true);
            this.setTooltip('');
            this.setHelpUrl('');
        }
    },
    list_remove_at: {
        init: function() {
            this.appendValueInput('LIST')
                .setCheck('List')
                .appendField('trong');
            const at = new Blockly.FieldDropdown([
                ['xóa phần tử cuối cùng', 'last'],
                ['xóa phần tử đầu tiên', 'first'],
                ['xóa phần tử ở vị trí', 'index']
            ])
            at.setValidator(function(option) {
                this.sourceBlock_.getInput('INDEX').setVisible(option == 'index');
            })
            this.appendDummyInput()
                .appendField(at, 'AT');
            this.appendValueInput('INDEX')
                .setCheck('Number')
                .setVisible(false);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour('#745ba5');
            this.setInputsInline(true);
            this.setTooltip('');
            this.setHelpUrl('');
        }
    },
})

generator.forBlock['list_empty'] = function(block) {
    return ['[]', generator.ORDER_NONE];
}

generator.forBlock['list_length'] = function(block) {
    const list = generator.valueToCode(block, 'LIST', generator.ORDER_NONE);
    return [`len(${list})`, generator.ORDER_NONE];
}

generator.forBlock['list_index'] = function(block) {
    const list = generator.valueToCode(block, 'LIST', generator.ORDER_NONE);
    const index = generator.valueToCode(block, 'INDEX', generator.ORDER_NONE);
    return [`${list}[${index}]`, generator.ORDER_NONE];
}

generator.forBlock['list_set'] = function(block) {
    const list = generator.valueToCode(block, 'LIST', generator.ORDER_NONE);
    const index = generator.valueToCode(block, 'INDEX', generator.ORDER_NONE);
    const value = generator.valueToCode(block, 'VALUE', generator.ORDER_NONE);
    return `${list}[${index}] = ${value}\n`;
}

generator.forBlock['list_add'] = function(block) {
    const list = generator.valueToCode(block, 'LIST', generator.ORDER_NONE);
    const value = generator.valueToCode(block, 'VALUE', generator.ORDER_NONE);
    const at = block.getFieldValue('AT');
    if (at == 'last') {
        return `${list}.append(${value})\n`;
    } else if (at == 'first') {
        return `${list}.insert(0, ${value})\n`;
    } else {
        const index = generator.valueToCode(block, 'INDEX', generator.ORDER_NONE);
        return `${list}.insert(${index}, ${value})\n`;
    }
}

generator.forBlock['list_random'] = function(block) {
    generator.definitions_.random = 'import random';
    const list = generator.valueToCode(block, 'LIST', generator.ORDER_NONE);
    return [`random.choice(${list})`, generator.ORDER_NONE];
}

generator.forBlock['list_remove'] = function(block) {
    const list = generator.valueToCode(block, 'LIST', generator.ORDER_NONE);
    const element = generator.valueToCode(block, 'ELEMENT', generator.ORDER_NONE);
    return `${list}.remove(${element})\n`;
}

generator.forBlock['list_remove_at'] = function(block) {
    const list = generator.valueToCode(block, 'LIST', generator.ORDER_NONE);
    const at = block.getFieldValue('AT');
    if (at == 'last') {
        return `${list}.pop()\n`;
    } else if (at == 'first') {
        return `${list}.pop(0)\n`;
    } else {
        const index = generator.valueToCode(block, 'INDEX', generator.ORDER_NONE);
        return `${list}.pop(${index})\n`;
    }
}