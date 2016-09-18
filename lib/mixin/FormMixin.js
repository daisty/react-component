'use strict';

var React = require('react');
var FormMixin = {
    getInitialState: function getInitialState() {
        var store = this.props.store;

        return {
            store: store
        };
    },

    propTypes: {
        store: React.PropTypes.object.isRequired
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (this.props.store !== nextProps.store) {
            this.setState({
                store: nextProps.store
            });
        }
    },
    connectStore: function connectStore() {
        var store = this.state.store;

        var that = this;
        return {
            store: store,
            onStoreChange: function onStoreChange() {
                that.setState({
                    store: store
                });
            }
        };
    }
};

module.exports = FormMixin;