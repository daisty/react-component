'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Field = require('./Field');
var klassName = require('./util/className');

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
    formatFormFields: function formatFormFields(context) {
        var _this = this;

        var store = this.props.store;

        var children = context ? context.props.children : this.props.children;
        var nodes = React.Children.map(children, function (item) {
            return _this.formatSingleField(item, store);
        });
        if (!context) {
            var className = this.props.className;

            className = klassName(className, 'form');
            return React.createElement(
                'form',
                { className: className, onSubmit: this.handleSubmit },
                nodes
            );
        }
        return React.createElement(
            context.type,
            context.props,
            nodes
        );
    },
    formatSingleField: function formatSingleField(item, store) {
        if (typeof item === 'string') {
            return item;
        }
        if (item.type === Field) {
            return this.assembleField(item, store);
        }
        var subChildren = item.props.children;
        if (typeof subChildren === 'string') {
            return item;
        }
        if (subChildren) {
            return this.formatFormFields(item);
        }
        return item;
    },
    assembleField: function assembleField(item, store) {
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
        return this.formatFormFields();
    }
});

module.exports = Form;