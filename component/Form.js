const React = require('react');
const Field = require('./Field');

const Form = React.createClass({
    propTypes: {
        onSubmit: React.PropTypes.func.isRequired,
    },
    getInitialState() {
        let {store} = this.props
        return {
            store
        }
    },
    getDefaultProps() {
        return {
            store: {}
        }
    },
    handleSubmit(e){
        e.preventDefault()
        const {store} = this.state
        const {onSubmit} = this.props
        onSubmit(store)
        return false
    },
    onFieldChange(name, value){
        let {store} = this.state
        store[name] =value
        this.setState({
            store
        })
    },
    formatFormFields(children){
        const {store} = this.state
        let nodes = React.Children.map(children, item => {
            if (item.type === Field) {
                return this.formatField(item, store)
            }

            let subChildren = item.props.children
            if (typeof subChildren === 'string') {
                return item
            }
            if (subChildren) {
                let cmp = item
                return (
                    <cmp {...item.props}>
                        {this.formatFormFields(subChildren)}
                    </cmp>
                )
            }
            return item
        })
        return (
            <div>
                {nodes}
            </div>
        )
    },
    formatField(item, store){
        let {onChange} = item.props
        if (onChange) {
            return <Field {...item.props} onChange={(name, value) => {
                        this.onFieldChange(name, value)
                        onChange(value)
                    }} formState={store}/>
        }
        return <Field {...item.props} onChange={this.onFieldChange} formState={store}/>
    },
    render() {
        const {children} = this.props
        return (
            <form className="form" onSubmit={this.handleSubmit}>
                {this.formatFormFields(children)}
            </form>
        );
    }
});

module.exports = Form