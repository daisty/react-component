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
        var type = _ref.type;
        var oldVal = _ref.oldVal;
        var newProps = _ref.newProps;
        var _onChange = _ref.onChange;
        var name = _ref.name;

        switch (type) {
            case 'checkbox':
                return React.createElement('input', _extends({}, newProps, { type: 'checkbox', checked: oldVal && oldVal.indexOf(newProps.value) !== -1,
                    onChange: function onChange(e) {
                        var checked = e.target.checked;
                        if (checked) {
                            _onChange(name, oldVal.concat(newProps.value));
                        } else {
                            _onChange(name, oldVal.filter(function (val) {
                                return val !== newProps.value;
                            }));
                        }
                    } }));
            case 'radio':
                return React.createElement('input', _extends({}, newProps, { type: 'radio', checked: String(newProps.value) === String(oldVal),
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
        var newProps = _ref2.newProps;
        var oldVal = _ref2.oldVal;
        var onChange = _ref2.onChange;
        var name = _ref2.name;

        switch (CMP.displayName) {
            case 'Radio':
                newProps.checked = String(oldVal) === String(newProps.value);
                newProps.onChange = function (e, value) {
                    return onChange(name, value);
                };
                break;
            case 'CheckBox':
                newProps.onChange = function (e, value) {
                    return onChange(name, value);
                };
                break;
            case 'DropDown':
                newProps.value = oldVal;
                newProps.onChange = function (val) {
                    return onChange(name, val);
                };
                newProps.labelName = newProps.labelName || 'name';
                newProps.valueName = newProps.valueName || 'value';
                break;
            default:
                newProps.onChange = function (val) {
                    return onChange(name, val);
                };
                newProps.value = oldVal;
                break;
        }

        return React.createElement(CMP, newProps);
    },
    render: function render() {
        var _props = this.props;
        var component = _props.component;
        var type = _props.type;
        var name = _props.name;
        var formState = _props.formState;
        var onChange = _props.onChange;

        var newProps = Object.assign({}, this.props);
        // remove all not use props
        delete newProps.component;
        delete newProps.type;
        delete newProps.name;
        delete newProps.formState;
        delete newProps.onChange;

        if (name && formState) {
            var oldVal = formState[name];
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