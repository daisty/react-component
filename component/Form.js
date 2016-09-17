const React = require('react');
const Field = require('./Field');

const Form = React.createClass({
    propTypes: {
        onSubmit: React.PropTypes.func.isRequired,
        onStoreChange: React.PropTypes.func.isRequired,
    },
    getDefaultProps() {
        return {
            store: {}
        }
    },
    handleSubmit(e){
        e.preventDefault()
        const {store, onSubmit} = this.props
        onSubmit(store)
        return false
    },
    handleStoreChange(){
        const {onStoreChange} = this.props
        onStoreChange(this.props.store)
    },
    onFieldChange(name, value){
        let {store, onStoreChange} = this.props
        store[name] = value
        onStoreChange(store)
    },
    formatFormFields(children){
        const {store} = this.props
        let nodes = React.Children.map(children, item => {
            if (typeof item === 'string') {
                return item
            }
            if (item.type === Field) {
                return this.formatField(item, store)
            }
            let subChildren = item.props.children
            if (typeof subChildren === 'string') {
                return item
            }
            if (subChildren) {
                let CMP = item
                return (
                    <CMP.type {...item.props}>
                        {this.formatFormFields(subChildren)}
                    </CMP.type>
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