import React, { Component } from 'react';
import {Form, Field, Radio, RadioGroup, DropDown, Item, CheckBox, CheckBoxGroup} from './index';
import FormMixin from '../../component/mixin/FormMixin';

const options = [{
    name: '语文',
    value: 1,
}, {
    name: '数学',
    value: 2,
}, {
    name: '英语',
    value: 3,
}]

const provinces = [{
    name: '北京',
    id: 1,
}, {
    name: '河北',
    id: 2
}, {
    name: '河南',
    id: 3
}]

const cityHash = {
    '1': [{
        id: 101,
        name: '顺义',
    }, {
        id: 102,
        name: '延庆'
    }],
    '2': [{
        id: 201,
        name: '石家庄'
    }, {
        id: 202,
        name: '张家口'
    }],
    '3': [{
        id: 301,
        name: '郑州'
    }]
}

let user = {
    name: '王二小',
    sex: 'm',
    age: 22,
    job: ['老师', '学生'],
    description: '王小二是个好同学',
    single: false,
    course: [1, 3],
    cityId: 201,
    provinceId: 2,
}

export const SimpleFormDemo = React.createClass({
    mixins: [FormMixin],
    getInitialState() {
        return {
            cities: []
        }
    },
    handleProvinceChange(pid){
        let cities = cityHash[pid]
        this.state.store.cityId = cities[0].id
        this.setState({
            cities,
            store: this.state.store
        })
    },
    handleSubmit(store){
        console.log(store)
    },

    render() {
        const {store} = this.state
        return (
            <Form {...this.connectStore()} onSubmit={this.handleSubmit}>
                <Field component="input" name="name"></Field>
                <Field component="textarea" name="description" placeholder="描述"></Field>
                <pre>
                    <code>{JSON.stringify(store, null, 4)}</code>
                </pre>
                <div>
                    <h4>Radio</h4>
                    <Field component={Radio} name="single" value={true}>
                        单身狗？
                    </Field>
                </div>
                <div>
                    <h4>radio</h4>
                    <label>
                        <Field component="input" type="radio" name="single" value={true}/>
                        单身狗？
                    </label>
                    <label>
                        <Field component="input" type="radio" name="single" value={false}/>
                        非单身狗？
                    </label>
                </div>
                <h4>radio group</h4>
                <Field component={RadioGroup} name="single">
                    <Radio value={true}>单身狗？</Radio>
                    <Radio value={false}>非单身狗？</Radio>
                </Field>
                <h4>checkbox</h4>
                <label htmlFor="">
                    <Field component="input" type="checkbox" name="single"/>
                    单身狗？
                </label>
                <h4>CheckBox</h4>
                <Field component={CheckBox} name="single">单身狗？</Field>
                <div>
                    <h4>checkbox group</h4>
                    <Field component={CheckBoxGroup} name="job">
                        <CheckBox value="老师">老师</CheckBox>
                        <CheckBox value="学生">学生</CheckBox>
                        <CheckBox value="校长">校长</CheckBox>
                    </Field>
                </div>

                <Field component={DropDown} name="sex">
                    <Item name="男" value="m"></Item>
                    <Item name="女" value="f"></Item>
                </Field>
                <Field component="select" name="sex">
                    <option value="m">男</option>
                    <option value="f">女</option>
                </Field>
                <div>
                    <Field component={DropDown} name="provinceId" options={provinces} 
                        labelName="name" valueName="id" onChange={this.handleProvinceChange}></Field>
                    <Field options={this.state.cities} component={DropDown} valueName="id" name="cityId"></Field>
                </div>
                <Field component={DropDown} multi={true} name="course" options={options}></Field>
                <input type="submit" value="submit"/>
            </Form>
        );
    }
});

export default class FormDemo extends Component {  
    constructor(props){
        super(props)
        this.state = {
            user: {}
        }
    }
    loadData(e){
        e.preventDefault()
        this.setState({
            user
        });
    }
    initData(e){
        e.preventDefault()
        this.setState({
            user: {}
        });
    }
    render() {
        return (
            <div>
                <SimpleFormDemo store={this.state.user}/>
                <button onClick={this.initData.bind(this)}>init Data</button>
                <button onClick={this.loadData.bind(this)}>load Data</button>
            </div>
        );
    }
}
