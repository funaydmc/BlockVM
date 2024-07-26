Blockly.common.defineBlocks({
    string_length: {
        init: function() {
            this.appendValueInput('STR')
                .setCheck('String')
                .appendField('độ dài của');
            this.setOutput(true, 'Number');
            this.setInputsInline(true);
            this.setColour(160);
            this.setTooltip('');
            this.setHelpUrl('');
        }
    },
    string_start_end: {
        init: function() {
            this.appendValueInput('STR')
                .setCheck('String')
            this.appendValueInput('SUBSTR')
                .setCheck('String')
                .appendField(new Blockly.FieldDropdown([
                    ['bắt đầu với', 'startswith'],
                    ['kết thúc bằng', 'endswith'],
                    ['có chứa', 'contain']
                ]), 'OP')
            this.setOutput(true, 'Boolean');
            this.setInputsInline(true);
            this.setColour(160);
            this.setTooltip('');
            this.setHelpUrl('');
        }
    },

    string_slice: {
        init: function() {
            this.appendValueInput('STR')
                .setCheck('String')
                .appendField('trích đoạn của');
            this.appendValueInput('START')
                .setCheck('Number')
                .appendField('từ');
            this.appendValueInput('END')
                .setCheck('Number')
                .appendField('đến');
            this.setOutput(true, 'String');
            this.setInputsInline(true);
            this.setColour(160);
            this.setTooltip('');
            this.setHelpUrl('');
        }
    }
})

generator.forBlock['string_length'] = function(block) {
    const str = generator.valueToCode(block, 'STR', generator.ORDER_NONE);
    return [`len(${str})`, generator.ORDER_NONE];
}

generator.forBlock['string_start_end'] = function(block) {
    const str = generator.valueToCode(block, 'STR', generator.ORDER_NONE);
    const substr = generator.valueToCode(block, 'SUBSTR', generator.ORDER_NONE);
    const op = block.getFieldValue('OP');
    switch (op) {
        case 'startswith':
        case 'endswith':
            return [`${str}.${op}(${substr})`, generator.ORDER_NONE];
        case 'contain':
            return [`${substr} in ${str}`, generator.ORDER_NONE];
    }
}

generator.forBlock['string_slice'] = function(block) {
    const str = generator.valueToCode(block, 'STR', generator.ORDER_NONE);
    const start = generator.valueToCode(block, 'START', generator.ORDER_NONE);
    const end = generator.valueToCode(block, 'END', generator.ORDER_NONE);
    return [`${str}[${start}:${end}]`, generator.ORDER_NONE];
}