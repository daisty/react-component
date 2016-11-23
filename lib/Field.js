'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');

var Field = React.createClass({
    displayName: 'Field',
    getDefaultProps: function getDefaultProps() {
        return {
            type: 'div'
        };
    },
    renderBasicCMP: function renderBasicCMP(CMP, _ref) {
        var type = _ref.type,
            oldVal = _ref.oldVal,
            newProps = _ref.newProps,
            _onChange = _ref.onChange,
            name = _ref.name;

        switch (type) {
            case 'checkbox':
                if (!oldVal) {
                    oldVal = false;
                }
                return React.createElement('input', _extends({}, newProps, { type: 'checkbox', checked: oldVal === true,
                    onChange: function onChange(e) {
                        return _onChange(name, e.target.checked);
                    } }));
            case 'radio':
                return React.createElement('input', _extends({}, newProps, { type: 'radio', checked: newProps.value === oldVal,
                    onChange: function onChange() {
                        return _onChange(name, newProps.value);
                    } }));
            default:
                return React.createElement(CMP, _extends({}, newProps, { value: oldVal, onChange: function onChange(e) {
                        return _onChange(name, e.target.value);
                    } }));
        }
    },
    renderOtherCMP: function renderOtherCMP(CMP, _ref2) {
        var newProps = _ref2.newProps,
            oldVal = _ref2.oldVal,
            onChange = _ref2.onChange,
            name = _ref2.name;

        newProps.onChange = function (val) {
            return onChange(name, val);
        };
        switch (CMP.displayName) {
            case 'Radio':
                newProps.checked = oldVal === newProps.value;
                newProps.onChange = function (e, value) {
                    return onChange(name, value);
                };
                break;
            case 'CheckBox':
                if (!oldVal) {
                    oldVal = false;
                }
                newProps.checked = oldVal === true;
                newProps.onChange = function (e) {
                    return onChange(name, e.target.checked);
                };
                break;
            case 'DropDown':
                if (newProps.multi && !oldVal) {
                    oldVal = [];
                }
                newProps.value = oldVal;
                newProps.labelName = newProps.labelName || 'name';
                newProps.valueName = newProps.valueName || 'value';
                break;
            case 'CheckBoxGroup':
                if (!oldVal) {
                    oldVal = [];
                }
                newProps.value = oldVal;
                break;
            default:
                newProps.value = oldVal;
                break;
        }

        return React.createElement(CMP, newProps);
    },
    render: function render() {
        var _props = this.props,
            component = _props.component,
            type = _props.type,
            name = _props.name,
            formState = _props.formState,
            onChange = _props.onChange;

        var newProps = Object.assign({}, this.props);
        // remove all not use props
        delete newProps.component;
        delete newProps.type;
        delete newProps.name;
        delete newProps.formState;
        delete newProps.onChange;

        if (name && formState) {
            var oldVal = formState[name];
            if (oldVal === undefined) {
                oldVal = '';
            }
            if (component) {
                // original html tag
                if (Object.prototype.toString.call(component) === '[object String]') {
                    return this.renderBasicCMP(component, { type: type, newProps: newProps, oldVal: oldVal, onChange: onChange, name: name });
                }
                // Component
                return this.renderOtherCMP(component, { newProps: newProps, oldVal: oldVal, onChange: onChange, name: name });
            }
        }

        return React.createElement('div', newProps);
    }
});

module.exports = Field;