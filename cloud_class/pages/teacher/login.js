import React,{useState,useEffect} from 'react'
import cookie from 'react-cookies'
import {Button, Col, Input, message, Row, Tabs} from "antd";
import {BackSvg, CollegeSvg, EmailSvg, NameSvg, PasswordSvg, SecurityCodeSvg, UserSvg} from "../../components/Svg";
import Router from 'next/router';
import '../../public/style/login.css';
import {RealAxios, URL} from "../../components/config";
import Head from "next/head";

const {TabPane} = Tabs;
const {Password} = Input;
const Login = ()=>{
    const [action,setAction] = useState('login');
    const [tPhone, setTPhone] = useState('');
    const [tPassword,setTPassword] = useState('');
    const [tEmail,setTEmail] = useState('');
    const [tName,setTName] = useState('');
    const [tCollege,setTCollege] = useState('');
    const [security, setSecurity] = useState('');
    const [image,setImage] = useState('');
    const [code, setCode] = useState('');
    const changeCode = ()=>{
        setSecurity("");
        RealAxios.get("teacher/getSecurityCode?time="+new Date().getTime())
            .then((response)=>{
                setImage('data:image/png;base64,'+response.data.image);
                setCode(response.data.code);
            })
    };
    useEffect(()=>{
        changeCode();
    },[]);
    const login = ()=>{
        if (security.toLowerCase() != code.toString().toLowerCase()){
            message.error("验证码错误");
            return;
        }
        RealAxios({
            method:'post',
            url:'/teacher/login',
            data:{
                'code':security,
                'tPhone':tPhone,
                'tPassword':tPassword,
            }
        }).then((response)=>{
            if (response.data.msg == "errorPassword"){
                message.error("密码错误");
                setTPassword("");
                changeCode();
            }else if (response.data.msg=="noTeacher"){
                message.error("没有该用户");
                setAction("sign");
                changeCode();
            }else if (response.data.msg == 'ok'){
                cookie.save("identify","teacher",{path:"/"})
                cookie.save("id",tPhone,{path:"/"})
                Router.push("/teacher");
            }
        }).catch((error)=>{
            console.log(error);
            changeCode();
        })
    };
    const signUp = ()=>{
        if (security.toLowerCase() != code.toString().toLowerCase()){
            message.error("验证码错误");
            return;
        }
        RealAxios({
            method:'post',
            url:'/teacher/register',
            data:{
                'code':security,
                'tPhone':tPhone,
                'tPassword':tPassword,
                'tEmail':tEmail,
                'tName':tName,
                'tCollege':tCollege
            }
        }).then((response)=>{
            if (response.data.msg == "ok"){
                message.success("注册成功");
                setAction("login");
                changeCode();
            } else if (response.data.msg == "haveTeacher"){
                message.error("用户已存在");
                setAction("login");
                changeCode();
            } else {
                alert("未知错误");
                changeCode();
            }
        }).catch((error)=>{
            console.log(error)
        })
    };
    return (
        <Row id='login' justify='center' align='middle' style={{paddingTop: 50 + "px"}}>
            <Head>
                <title>云课堂</title>
                <meta charSet='utf-8' />
            </Head>
            <Col span={6}>
                <div className='wrap'>
                    <Row gutter={[16, 0]}>
                        <Col onClick={()=>{Router.push('/')}} style={{
                            display:'flex',justifyContent:'center'
                        }}><BackSvg/>选择身份</Col>
                    </Row>
                    <Row>
                        <Tabs activeKey={action} size='large' style={{width:'100%'}} onTabClick={(key,event)=>{
                            setAction(key);
                        }}>
                            <TabPane key='login' tab={
                                <div style={{display:'flex',justifyContent:'center'}}>
                                    登录
                                </div>
                            }>
                                <Row style={{margin:"10px"}}>
                                <Input size="large" type='text' placeholder='手机号' prefix={<UserSvg />} value={tPhone} onChange={(e)=>{setTPhone(e.target.value)}}/>
                                </Row>
                                <Row style={{margin:"10px"}}>
                                <Password size='large' placeholder='密码' prefix={<PasswordSvg/>} value={tPassword} onChange={(e)=>{setTPassword(e.target.value)}}/>
                                </Row>
                                <Row style={{margin:"10px"}} justify='space-between'>
                                    <Col span={11}>
                                        <Input type='text' size='large' placeholder='验证码' prefix={<SecurityCodeSvg/>} value={security} onChange={(e)=>{setSecurity(e.target.value)}}/>
                                    </Col>
                                    <Col span={11}>
                                        <img src={image} onClick={changeCode}/>
                                    </Col>
                                </Row>
                                <Row style={{margin:"10px"}}>
                                <Button size='large' type='primary' style={{width:'100%'}} onClick={login}>登录</Button>
                                </Row>
                            </TabPane>
                            <TabPane tab={
                                <div style={{display:'flex',justifyContent:'center'}}>
                                    注册
                                </div>
                            } key='sign'>
                                <Row style={{margin:"10px"}}>
                                    <Input size="large" type='text' placeholder='手机号' prefix={<UserSvg />} value={tPhone} onChange={(e)=>{setTPhone(e.target.value)}}/>
                                </Row>
                                <Row style={{margin:"10px"}}>
                                    <Password size='large' placeholder='密码' prefix={<PasswordSvg/>} value={tPassword} onChange={(e)=>{setTPassword(e.target.value)}}/>
                                </Row>
                                <Row style={{margin:'10px'}}>
                                    <Input size='large' placeholder='电子邮箱' prefix={<EmailSvg/>} value={tEmail} onChange={(e)=>{setTEmail(e.target.value)}}/>
                                </Row>
                                <Row style={{margin:'10px'}}>
                                    <Input size='large' placeholder='姓名' prefix={<NameSvg/>} value={tName} onChange={(e)=>{setTName(e.target.value)}}/>
                                </Row>
                                <Row style={{margin:'10px'}}>
                                    <Input size='large' placeholder='学院' prefix={<CollegeSvg/>} value={tCollege} onChange={(e)=>{setTCollege(e.target.value)}}/>
                                </Row>
                                <Row style={{margin:"10px"}} justify='space-between'>
                                    <Col span={11}>
                                        <Input type='text' size='large' placeholder='验证码' prefix={<SecurityCodeSvg/>} value={security} onChange={(e)=>{setSecurity(e.target.value)}}/>
                                    </Col>
                                    <Col span={11}>
                                        <img src={image} onClick={changeCode}/>
                                    </Col>
                                </Row>
                                <Row style={{margin:"10px"}}>
                                    <Button size='large' type='primary' style={{width:'100%'}} onClick={signUp}>注册</Button>
                                </Row>
                            </TabPane>
                        </Tabs>
                    </Row>
                </div>
            </Col>
        </Row>
    );
};

export default Login;
