function checkOP(op, a, b) {
    if ((a == 'Number' || a == "Boolean") && (b == 'Number' || b == "Boolean")) return 0;
    if (a == 'String' && (b == 'Number' || b == "Boolean") && op == '*') return 0;
    if (a == 'String' && b == 'String' && op == '+') return 0;
    if (op == '+' ) return 1;
    if (op == '*' && (b == 'Number' || b == 'Boolean')) return 2;
    return 3;
}

Blockly.common.defineBlocks({
    general_number: {
        init: function() {
            this.appendDummyInput()
                .appendField(new Blockly.FieldNumber(0), 'NUM');
            this.setOutput(true, 'Number');
            this.setColour(120);
            this.setTooltip('');
            this.setHelpUrl('');
        }
    },
    general_string: {
        init: function() {
            this.appendDummyInput()
                .appendField('❝')
                .appendField(new Blockly.FieldTextInput(''), 'STR')
                .appendField('❞')
            this.setOutput(true, 'String');
            this.setColour(120);
            this.setTooltip('');
            this.setHelpUrl('');
        }
    },
    general_boolean: {
        init: function() {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([
                    ['đúng', 'True'],
                    ['sai', 'False']
                ]), 'BOOL');
            this.setOutput(true, 'Boolean');
            this.setColour(120);
            this.setTooltip('');
            this.setHelpUrl('');
        }
    },
    general_null: {
        init: function() {
            this.appendDummyInput()
                .appendField('None');
            this.setOutput(true, 'None');
            this.setColour(120);
            this.setTooltip('');
            this.setHelpUrl('');
        }
    },
    general_rev: {
        init: function() {
            this.appendValueInput('VALUE')
                .setCheck(['Boolean'])
                .appendField('không');
            this.setOutput(true, 'Boolean');
            this.setColour(120);
            this.setTooltip('');
            this.setHelpUrl('');
        }
    },
    general_operator: {
        init: function() {
            this.appendValueInput('A')  
            this.appendValueInput('B')
                .appendField(new Blockly.FieldDropdown([
                    ['+', '+'],
                    ['-', '-'],
                    ['*', '*'],
                    ['/', '/'],
                    ['%', '%']
                ]), 'OP')
            this.setOutput(true, null);
            this.setInputsInline(true);
            this.setColour(210);
            this.setTooltip('');
            this.setHelpUrl('');
        },
        onchange: function(a) {
            if (workspace && workspace.isDragging()) return;
            if (!this.isInFlyout) {
                const targetA = this.getInputTargetBlock('A')?.outputConnection.check
                const targetB = this.getInputTargetBlock('B')?.outputConnection.check
                const op = this.getFieldValue('OP')
                const at = targetA == null ? "None" : targetA[0]
                const bt = targetB == null ? "None" : targetB[0]
                this.setDisabledReason(checkOP(op, at, bt)==3, "Invalid input");
            }
        }
    },

    general_compare: {
        init: function() {
            this.appendValueInput('A')
            this.appendValueInput('B')
                .appendField(new Blockly.FieldDropdown([
                    ['=', '=='],
                    ['≠', '!='],
                    ['>', '>'],
                    ['<', '<'],
                    ['≥', '>='],
                    ['≤', '<=']
                ]), 'OP')
            this.setOutput(true, 'Boolean');
            this.setInputsInline(true);
            this.setColour(210);
            this.setTooltip('');
            this.setHelpUrl('');
        }
    },

    general_typeof: {
        init: function() {
            this.appendValueInput('VALUE')
                .setCheck(null)
                .appendField('kiểu của');
            this.setOutput(true, 'String');
            this.setColour(120);
            this.setTooltip('');
            this.setHelpUrl('');
        }
    },

    controls_if: {
        init: function() {
            this.appendValueInput('IF0')
                .setCheck('Boolean')
                .appendField('Nếu');
            this.appendStatementInput('DO0')
                .appendField('thì');
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(120);
            this.setTooltip('');
            this.setHelpUrl('');
        }
    },
    controls_else: {
        init: function() {
            this.appendDummyInput()
                .appendField('nếu không');
            this.appendStatementInput('ELSE')
                .appendField('thì');
            this.setPreviousStatement(true, 'controls_if');
            this.setNextStatement(true, null);
            this.setColour(120);
            this.setTooltip('');
            this.setHelpUrl('');
        },
        onchange: function(a) {
            if (workspace && workspace.isDragging()) return;
            let valid = true;
            if (!this.isInFlyout) {
                if (this.getPreviousBlock() === null) valid = false;
                else if (this.getPreviousBlock().type !== 'controls_if') valid = false;
            }
            this.setDisabledReason(!valid);
        }
    },
    general_loop_operator: {
        init: function() {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([
                    ['thoát vòng lặp này', 'break'],
                    ['tới lần lặp kế tiếp', 'continue']
                ]), 'OP')
            this.setPreviousStatement(true, null);
            this.setInputsInline(true);
            this.setColour(120);
            this.setTooltip('');
            this.setHelpUrl('');
        }
    },
})

generator.forBlock['general_number'] = function(block) {
    return [block.getFieldValue('NUM'), generator.ORDER_NONE];
}

generator.forBlock['general_string'] = function(block) {
    return [`'${block.getFieldValue('STR')}'`, generator.ORDER_NONE];
}

generator.forBlock['general_boolean'] = function(block) {
    return [block.getFieldValue('BOOL'), generator.ORDER_NONE];
}

generator.forBlock['general_null'] = function(block) {
    return ['None', generator.ORDER_NONE];
}

generator.forBlock['general_rev'] = function(block) {
    const value = generator.valueToCode(block, 'VALUE', generator.ORDER_NONE);
    return [`not ${value}`, generator.ORDER_NONE];
}

generator.forBlock['general_operator'] = function(block) {
    const a = generator.valueToCode(block, 'A', generator.ORDER_NONE);
    const b = generator.valueToCode(block, 'B', generator.ORDER_NONE);
    const op = block.getFieldValue('OP');
    const ab = block.getInputTargetBlock('A')?.outputConnection.check
    const bb = block.getInputTargetBlock('B')?.outputConnection.check
    const at = ab == null ? "None" : ab[0]
    const bt = bb == null ? "None" : bb[0]
    const type = checkOP(op, at, bt)
    if (type == 0) return [`${a} ${op} ${b}`, generator.ORDER_NONE];
    if (type == 1) return [`${at!='String'?`str(${a})`:a} + ${bt!='String'?`str(${b})`:b}`, generator.ORDER_NONE];
    if (type == 2) return [`str(${a}) * ${b}`, generator.ORDER_NONE];
}

generator.forBlock['general_compare'] = function(block) {
    const a = generator.valueToCode(block, 'A', generator.ORDER_NONE);
    const b = generator.valueToCode(block, 'B', generator.ORDER_NONE);
    const op = block.getFieldValue('OP');
    return [`${a} ${op} ${b}`, generator.ORDER_NONE];
}

generator.forBlock['general_typeof'] = function(block) {
    const value = generator.valueToCode(block, 'VALUE', generator.ORDER_NONE);
    return [`type(${value}).__name__`, generator.ORDER_NONE];
}

generator.forBlock['controls_else'] = function(block) {
    let elseCode = generator.statementToCode(block, 'ELSE');
    if (elseCode === '') elseCode = '  pass\n';
    return `else:\n${elseCode}`;
}

generator.forBlock['general_loop_operator'] = function(block) {
    return block.getFieldValue('OP');
}