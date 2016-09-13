'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Field = require('./Field');

var Form = React.createClass({
    displayName: 'Form',

    propTypes: {
        onSubmit: React.PropTypes.func.isRequired
    },
    getInitialState: function getInitialState() {
        var store = this.props.store;

        return {
            store: store
        };
    },
    getDefaultProps: function getDefaultProps() {
        return {
            store: {}
        };
    },
    handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        var store = this.state.store;
        var onSubmit = this.props.onSubmit;

        onSubmit(store);
        return false;
    },
    onFieldChange: function onFieldChange(name, value) {
        var store = this.state.store;

        store[name] = value;
        this.setState({
            store: store
        });
    },
    formatFormFields: function formatFormFields(children) {
        var _this = this;

        var store = this.state.store;

        var nodes = React.Children.map(children, function (item) {
            if (item.type === Field) {
                return _this.formatField(item, store);
            }

            var subChildren = item.props.children;
            if (typeof subChildren === 'string') {
                return item;
            }
            if (subChildren) {
                var cmp = item;
                return React.createElement(
                    'cmp',
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