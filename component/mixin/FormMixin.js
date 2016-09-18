const React = require('react')
const FormMixin = {
    getInitialState() {
        const {store} = this.props
        return {
            store: store
        }
    },
    propTypes: {
        store: React.PropTypes.object.isRequired
    },
    componentWillReceiveProps(nextProps) {
        if (this.props.store !== nextProps.store) {
            this.setState({
                store: nextProps.store
            })
        }
    },
    connectStore(){
        const {store} = this.state
        let that = this
        return {
            store,
            onStoreChange(){
                that.setState({
                    store
                });
            }
        }
    }
}

module.exports = FormMixin