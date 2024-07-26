Blockly.common.defineBlocks({
    math_round: {
        init: function() {
            this.appendValueInput('NUM')
                .setCheck('Number')
                .appendField(new Blockly.FieldDropdown([
                    ['làm tròn', 'round'],
                    ['làm tròn xuống', 'floor'],
                    ['làm tròn lên', 'ceil']
                ]), 'OP');
            this.setOutput(true, 'Number');
            this.setColour(210);
            this.setTooltip('');
            this.setHelpUrl('');
        }
    },
    math_trigo: {
        init: function() {
            this.appendValueInput('NUM')
                .setCheck('Number')
                .appendField(new Blockly.FieldDropdown([
                    ['sin', 'sin'],
                    ['cos', 'cos'],
                    ['tan', 'tan'],
                    ['asin', 'asin'],
                    ['acos', 'acos'],
                    ['atan', 'atan']
                ]), 'OP');
            this.setOutput(true, 'Number');
            this.setColour(210);
            this.setTooltip('');
            this.setHelpUrl('');
        }
    },
    math_util: {
        init: function() {
            this.appendValueInput('NUM')
                .setCheck('Number')
                .appendField(new Blockly.FieldDropdown([
                    ['|x|', 'abs'],
                    ['√x', 'sqrt'],
                    ['x^2', 'sqr']
                ]), 'OP');
            this.setOutput(true, 'Number');
            this.setColour(210);
            this.setTooltip('');
            this.setHelpUrl('');
        }
    },
    math_random: {
        init: function() {
            
            this.appendValueInput('FROM')
                .setCheck('Number')
                .appendField('số')
                .appendField(new Blockly.FieldDropdown([
                    ['nguyên', 'randint'],
                    ['thực', 'uniform'],
                ]), 'TYPE')
                .appendField('ngẫu nhiên từ');
            this.appendValueInput('TO')
                .setCheck('Number')
                .appendField('đến');
            this.setOutput(true, 'Number');
            this.setColour(210);
            this.setTooltip('');
            this.setHelpUrl('');
            this.setInputsInline(true);
        }
    }
})

generator.forBlock['math_round'] = function(block) {
    const num = generator.valueToCode(block, 'NUM', generator.ORDER_NONE);
    const op = block.getFieldValue('OP');
    return [`${op}(${num})`, generator.ORDER_NONE];
}

generator.forBlock['math_trigo'] = function(block) {
    generator.definitions_.math = 'import math';

    const num = generator.valueToCode(block, 'NUM', generator.ORDER_NONE);
    const op = block.getFieldValue('OP');
    return [`math.${op}(${num})`, generator.ORDER_NONE];
}

generator.forBlock['math_util'] = function(block) {
    const num = generator.valueToCode(block, 'NUM', generator.ORDER_NONE);
    const op = block.getFieldValue('OP');
    switch (op) {
        case 'abs':
            return [`abs(${num})`, generator.ORDER_NONE];
        case 'sqrt':
            generator.definitions_.math = 'import math';
            return [`math.sqrt(${num})`, generator.ORDER_NONE];
        case 'sqr':
            generator.definitions_.math = 'import math';
            return [`math.pow(${num}, 2)`, generator.ORDER_NONE];
    }
}

generator.forBlock['math_random'] = function(block) {
    generator.definitions_.random = 'import random';
    const from = generator.valueToCode(block, 'FROM', generator.ORDER_NONE);
    const to = generator.valueToCode(block, 'TO', generator.ORDER_NONE);
    const type = block.getFieldValue('TYPE');
    return [`random.${type}(${from}, ${to})`, generator.ORDER_NONE];
}