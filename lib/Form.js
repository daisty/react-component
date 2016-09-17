'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Field = require('./Field');

var Form = React.createClass({
    displayName: 'Form',

    propTypes: {
        onSubmit: React.PropTypes.func.isRequired,
        onStoreChange: React.PropTypes.func.isRequired
    },
    getDefaultProps: function getDefaultProps() {
        return {
            store: {}
        };
    },
    handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        var _props = this.props;
        var store = _props.store;
        var onSubmit = _props.onSubmit;

        onSubmit(store);
        return false;
    },
    handleStoreChange: function handleStoreChange() {
        var onStoreChange = this.props.onStoreChange;

        onStoreChange(this.props.store);
    },
    onFieldChange: function onFieldChange(name, value) {
        var _props2 = this.props;
        var store = _props2.store;
        var onStoreChange = _props2.onStoreChange;

        store[name] = value;
        onStoreChange(store);
    },
    formatFormFields: function formatFormFields(children) {
        var _this = this;

        var store = this.props.store;

        var nodes = React.Children.map(children, function (item) {
            if (typeof item === 'string') {
                return item;
            }
            if (item.type === Field) {
                return _this.formatField(item, store);
            }
            var subChildren = item.props.children;
            if (typeof subChildren === 'string') {
                return item;
            }
            if (subChildren) {
                var CMP = item;
                return React.createElement(
                    CMP.type,
                    item.props,
                    _this.formatFormFields(subChildren)
                );
            }
            return item;
        });
        return React.createElement(
            'div',
            null,
            nodes
        );
    },
    formatField: function formatField(item, store) {
        var _this2 = this;

        var _onChange = item.props.onChange;

        if (_onChange) {
            return React.createElement(Field, _extends({}, item.props, { onChange: function onChange(name, value) {
                    _this2.onFieldChange(name, value);
                    _onChange(value);
                }, formState: store }));
        }
        return React.createElement(Field, _extends({}, item.props, { onChange: this.onFieldChange, formState: store }));
    },
    render: function render() {
        var children = this.props.children;

        return React.createElement(
            'form',
            { className: 'form', onSubmit: this.handleSubmit },
            this.formatFormFields(children)
        );
    }
});

module.exports = Form;