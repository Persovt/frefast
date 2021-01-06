import React from 'react';
import { Input, Space,Button } from 'antd';
import { EyeTwoTone,EyeInvisibleOutlined } from '@ant-design/icons';
import {connect} from 'react-redux'
import {inputReducer,fetchingReducer} from '../state/auth.reducer'

const changeHandler = (event: any) => {
    return {value: event.target.value, name: event.target.name}
}

const AuthPage = (props: any) => {
        return(
            <>

                <Space direction="vertical"  >

                    <Input placeholder="input email" 
                           name='email' 
                           onChange = {(e: any)=> props.inputReducer(changeHandler(e))} />
                           
                    <Input.Password
                        placeholder="input password"
                        name='password' 
                        onChange = {(e: any)=> props.inputReducer(changeHandler(e))}
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                    <Button onClick={() => props.fetchingReducer()}>Auth me!</Button>
                </Space>
            </>
        )
}
const mapStateToProps = (state: any) => {

}


export default connect(mapStateToProps, {
    inputReducer,
    fetchingReducer
})(AuthPage)