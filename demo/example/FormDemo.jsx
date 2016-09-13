import React, { Component } from 'react';
import {Form, Field, Radio, RadioGroup, DropDown, Item, CheckBox, CheckBoxGroup} from './index';

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

export default class FormDemo extends Component {
    constructor(props){
        super(props)
        this.state = {
            cities: cityHash[user.provinceId],
        }
    }
    handleProvinceChange(pid){
        let cities = cityHash[pid]
        this.setState({
            cities,
        })
        user.cityId = cities[0].id
    }
    handleSubmit(value){
        console.log(value)
    }
    render() {
        return (
            <div>
                <h3>Custom component</h3>
                <Form store={user} onSubmit={this.handleSubmit.bind(this)}>
                    {/*<Field component="input" name="name"></Field>
                    <Field component="textarea" name="description" placeholder="描述"></Field>*/}
                    <h4>Single</h4>
                    <div>
                        <Field component={Radio} name="single">
                            单身？
                        </Field>
                        <Field component="input" type="radio" name="single">
                            单身？
                        </Field>
                        <Field component="input" type="checkbox" name="single">
                            单身？
                        </Field>
                    </div>

                    {/*<Field component={CheckBoxGroup} name="job">
                        <CheckBox value="老师">老师</CheckBox>
                        <CheckBox value="学生">学生</CheckBox>
                        <CheckBox value="校长">校长</CheckBox>
                    </Field>
                    <Field component={DropDown} name="sex">
                        <Item name="男" value="m"></Item>
                        <Item name="女" value="f"></Item>
                    </Field>
                    <Field component="select" name="sex">
                        <option value="m">男</option>
                        <option value="f">女</option>
                    </Field>
                    <div>
                        <Field component={DropDown} name="provinceId" options={provinces} labelName="name" valueName="id" onChange={this.handleProvinceChange.bind(this)}></Field>
                        <Field options={this.state.cities} component={DropDown} valueName="id" name="cityId"></Field>
                    </div>
                    <Field component={DropDown} multi={true} name="course" options={options}></Field>*/}
                    <input type="submit" value="submit"/>
                </Form>
            </div>
        );
    }
}
