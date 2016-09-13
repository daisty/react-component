const React = require('react');

const Field = React.createClass({
    getDefaultProps() {
        return {
            type: 'input'
        }
    },
    render() {
        const {props} = this
        let {component, type, name, formState, onChange} = props
        if (name && formState) {
            let CMP = component
            let storeVal = formState[name]

            if (component) {
                if (Object.prototype.toString.call(component) === '[object String]') {
                    props.value = storeVal
                    if (onChange) {
                        props.onChange = e => onChange(name, e.target.value)
                    }
                    switch(type){
                        case 'checkbox':
                            props.onChange = e => {
                                let checked = e.target.checked;
                                if (checked) {
                                    onChange(name, storeVal.concat(e.target.value))
                                } else {
                                    onChange(name, storeVal.filter(val => val !== e.target.value))
                                }
                            }
                            break
                        case 'radio':
                            props.onChange = e => onChange(name, e.target.value)
                            break
                        default:
                            break
                    }
                    return <CMP type={type} name={name} chidren={props.chidren} onChange={onChange} value={props.value} />
                }

                props.onChange= val => onChange(name, val)
                switch(component.displayName){
                    case 'Radio':
                        // props.checked = storeVal === props.value
                        props.onChange = (e, value) => onChange(name, value)
                        break
                    case 'CheckBox':
                        props.onChange = (e, value) => onChange(name, value)
                        break
                    case 'DropDown':
                        props.labelName = props.labelName || 'name'
                        props.valueName = props.valueName || 'value'
                        break
                    default:
                        break
                }

                return (
                    <CMP  {...props}/>
                )
            }
        }
        
        return (
            <div {...props}></div>
        )
    }
});

module.exports = Field