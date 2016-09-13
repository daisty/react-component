'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var React = require('react');

var Field = React.createClass({
    displayName: 'Field',
    getDefaultProps: function getDefaultProps() {
        return {
            type: 'input'
        };
    },
    render: function render() {
        var props = this.props;
        var component = props.component;
        var type = props.type;
        var name = props.name;
        var formState = props.formState;
        var onChange = props.onChange;

        if (name && formState) {
            var _ret = function () {
                var CMP = component;
                var storeVal = formState[name];

                if (component) {
                    if (Object.prototype.toString.call(component) === '[object String]') {
                        props.value = storeVal;
                        if (onChange) {
                            props.onChange = function (e) {
                                return onChange(name, e.target.value);
                            };
                        }
                        switch (type) {
                            case 'checkbox':
                                props.onChange = function (e) {
                                    var checked = e.target.checked;
                                    if (checked) {
                                        onChange(name, storeVal.concat(e.target.value));
                                    } else {
                                        onChange(name, storeVal.filter(function (val) {
                                            return val !== e.target.value;
                                        }));
                                    }
                                };
                                break;
                            case 'radio':
                                props.onChange = function (e) {
                                    return onChange(name, e.target.value);
                                };
                                break;
                            default:
                                break;
                        }
                        return {
                            v: React.createElement(CMP, { type: type, name: name, chidren: props.chidren, onChange: onChange, value: props.value })
                        };
                    }

                    props.onChange = function (val) {
                        return onChange(name, val);
                    };
                    switch (component.displayName) {
                        case 'Radio':
                            // props.checked = storeVal === props.value
                            props.onChange = function (e, value) {
                                return onChange(name, value);
                            };
                            break;
                        case 'CheckBox':
                            props.onChange = function (e, value) {
                                return onChange(name, value);
                            };
                            break;
                        case 'DropDown':
                            props.labelName = props.labelName || 'name';
                            props.valueName = props.valueName || 'value';
                            break;
                        default:
                            break;
                    }

                    return {
                        v: React.createElement(CMP, props)
                    };
                }
            }();

            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
        }

        return React.createElement('div', props);
    }
});

module.exports = Field;