const React = require('react');
const Field = require('./Field');
const klassName = require('./util/className');

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
    formatFormFields(context){
        const {store} = this.props
        let children = context ? context.props.children : this.props.children
        let nodes = React.Children.map(children, item => {
            return this.formatSingleField(item, store)
        })
        if (!context) {
            let {className} = this.props
            className = klassName(className, 'form')
            return (
                <form className={className} onSubmit={this.handleSubmit}>
                    {nodes}
                </form>
            )
        }
        return (
            <context.type {...context.props}>
                {nodes}
            </context.type>
        )
    },
    formatSingleField(item, store){
        if (typeof item === 'string') {
            return item
        }
        if (item.type === Field) {
            return this.assembleField(item, store)
        }
        let subChildren = item.props.children
        if (typeof subChildren === 'string') {
            return item
        }
        if (subChildren) {
            return (
                this.formatFormFields(item)
            )
        }
        return item
    },
    assembleField(item, store){
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
        return (
            this.formatFormFields()
        );
    }
});

module.exports = Form