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
                return (
                    <input {...newProps} type="checkbox" checked={oldVal && oldVal.indexOf(newProps.value) !== -1}
                        onChange={e => {
                            let checked = e.target.checked;
                            if (checked) {
                                onChange(name, oldVal.concat(newProps.value))
                            } else {
                                onChange(name, oldVal.filter(val => val !== newProps.value))
                            }
                        }}/>
                )
            case 'radio':
                return (
                    <input {...newProps} type="radio" checked={String(newProps.value) === String(oldVal)}
                        onChange={() => onChange(name, newProps.value)}/>
                )
            default:
                return <CMP {...newProps} value={oldVal} onChange={e => onChange(name, e.target.value)} />
        }
    },
    renderOtherCMP(CMP, {newProps, oldVal, onChange, name}){
        switch(CMP.displayName){
            case 'Radio':
                newProps.checked = String(oldVal) === String(newProps.value)
                newProps.onChange = (e, value) => onChange(name, value)
                break
            case 'CheckBox':
                newProps.onChange = (e, value) => onChange(name, value)
                break
            case 'DropDown':
                newProps.value = oldVal
                newProps.onChange= val => onChange(name, val)
                newProps.labelName = newProps.labelName || 'name'
                newProps.valueName = newProps.valueName || 'value'
                break
            default:
                newProps.onChange= val => onChange(name, val)
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