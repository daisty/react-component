const React = require('react');

const Field = React.createClass({
    getDefaultProps() {
        return {
            type: 'div'
        }
    },
    renderBasicCMP(CMP, {type, oldVal, newProps, onChange, name}){
        switch(type){
            case 'checkbox':
                if (!oldVal) {
                    oldVal = false
                }
                return (
                    <input {...newProps} type="checkbox" checked={oldVal === true}
                        onChange={e => onChange(name, e.target.checked)} />
                )
            case 'radio':
                return (
                    <input {...newProps} type="radio" checked={newProps.value === oldVal}
                        onChange={() => onChange(name, newProps.value)}/>
                )
            default:
                return <CMP {...newProps} value={oldVal} onChange={e => onChange(name, e.target.value)} />
        }
    },
    renderOtherCMP(CMP, {newProps, oldVal, onChange, name}){
        newProps.onChange= val => onChange(name, val)
        switch(CMP.displayName){
            case 'Radio':
                newProps.checked = oldVal === newProps.value
                newProps.onChange = (e, value) => onChange(name, value)
                break
            case 'CheckBox':
                if (!oldVal) {
                    oldVal = false
                }
                newProps.checked = oldVal === true
                newProps.onChange = (e) => onChange(name, e.target.checked)
                break
            case 'DropDown':
                if (newProps.multi && !oldVal) {
                    oldVal = []
                }
                newProps.value = oldVal
                newProps.labelName = newProps.labelName || 'name'
                newProps.valueName = newProps.valueName || 'value'
                break
            case 'CheckBoxGroup':
                if (!oldVal) {
                    oldVal = []
                }
                newProps.value = oldVal
                break
            default:
                newProps.value = oldVal
                break
        }

        return (
            <CMP  {...newProps}/>
        )
    },
    render() {
        let {component, type, name, formState, onChange} = this.props
        let newProps = Object.assign({}, this.props)
        // remove all not use props
        delete newProps.component
        delete newProps.type
        delete newProps.name
        delete newProps.formState
        delete newProps.onChange

        if (name && formState) {
            let oldVal = formState[name]
            if (oldVal === undefined) {
                oldVal = ''
            }
            if (component) {
                // original html tag
                if (Object.prototype.toString.call(component) === '[object String]') {
                    return this.renderBasicCMP(component, { type, newProps, oldVal, onChange, name })
                }
                // Component
                return this.renderOtherCMP(component, { newProps, oldVal, onChange, name });
                
            }
        }

        return (
            <div {...newProps}></div>
        )
    }
});

module.exports = Field