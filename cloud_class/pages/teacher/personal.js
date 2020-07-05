import React, {useState, useEffect} from 'react'
import {PageContext} from "../../components/teacher/Context";
import Header from "../../components/teacher/header";
import {Avatar, Divider, Row, Col, Typography, message, Button} from "antd";
import cookie from "react-cookies";
import Router from "next/router";
import {RealAxios} from "../../components/config";
import UploadImg from "../../components/teacher/personal/upload";

const {Paragraph} = Typography;

const Personal = () => {
    const [image, setImage] = useState("");
    const [teacher, setTeacher] = useState({
        tid: "1",
        tphone: "1",
        temail: '1',
        tname: '1',
        tcollege: 'j',
        tpassword: "111",
        timage: "300.png"
    });
    useEffect(() => {
        if (cookie.load("identify") != "teacher" || !cookie.load("id")) {
            Router.push("/teacher/login")
        }
        const phone = cookie.load("id");
        RealAxios({
            method: 'post',
            url: "/teacher/getHeaderImg",
            data: {
                'phone': phone + "",
            }
        }).then((response) => {
            setImage('data:image/png;base64,' + response.data.image);
        }).catch((error) => {
            console.log(error);
        });
        getInfo();
    }, []);

    const submit = () => {
        RealAxios({
            method: 'post',
            url: '/teacher/update',
            data: teacher
        }).then((response) => {
            message.success("修改成功")

        })
    };
    const getInfo = () => {
        RealAxios({
            method: 'post',
            url: '/teacher/getInfo',
            data: {
                'phone': cookie.load("id"),
            }
        }).then((response) => {
            let newTeacher = JSON.parse(JSON.stringify(response.data));
            newTeacher.tpassword="******";
            setTeacher(newTeacher);
        }).catch((error) => {
            console.log(error);
        });
    };
    return (
        <div>
            <PageContext.Provider value="personal">
                <Header/>
            </PageContext.Provider>
            <div>
                <Row justify='center' style={{marginTop: "10px"}}>
                    <Avatar src={image} size={48}/>
                </Row>
                <Row justify='center'>
                    <h1>{teacher.tname}</h1>
                </Row>
                <Divider/>
                <Row><Col span={24}>
                    <Row gutter={[40,10]}>
                        <Col span={8} style={{textAlign:"right",color:"#c3c3c3"}}>姓名:</Col>
                        <Col span={16}>
                            <Paragraph editable={{
                                onChange: (str) => {
                                    const newTeacher = JSON.parse(JSON.stringify(teacher));
                                    newTeacher.tname = str;
                                    setTeacher(newTeacher)
                                }
                            }}>{teacher.tname}</Paragraph>
                        </Col>
                    </Row>
                    <Row gutter={[40,10]}>
                        <Col span={8} style={{textAlign:"right",color:"#c3c3c3"}}>电话:</Col>
                        <Col span={16}>
                            <Paragraph>{teacher.tphone}</Paragraph>
                        </Col>
                    </Row>
                    <Row gutter={[40,10]}>
                        <Col span={8} style={{textAlign:"right",color:"#c3c3c3"}}>电子邮件:</Col>
                        <Col span={16}>
                            <Paragraph editable={{
                                onChange: (str) => {
                                    const newTeacher = JSON.parse(JSON.stringify(teacher));
                                    newTeacher.temail = str;
                                    setTeacher(newTeacher)
                                }
                            }}>{teacher.temail}</Paragraph>
                        </Col>
                    </Row>
                    <Row gutter={[40,10]}>
                        <Col span={8} style={{textAlign:"right",color:"#c3c3c3"}}>学院:</Col>
                        <Col span={16}>
                            <Paragraph editable={{
                                onChange: (str) => {
                                    const newTeacher = JSON.parse(JSON.stringify(teacher));
                                    newTeacher.tcollege = str;
                                    setTeacher(newTeacher)
                                }
                            }}>{teacher.tcollege}</Paragraph>
                        </Col>
                    </Row>
                    <Row gutter={[40,10]}>
                        <Col span={8} style={{textAlign:"right",color:"#c3c3c3"}}>密码:</Col>
                        <Col span={16}>
                            <Paragraph editable={{
                                onChange: (str) => {
                                    const newTeacher = JSON.parse(JSON.stringify(teacher));
                                    newTeacher.tpassword = str;
                                    setTeacher(newTeacher)
                                }
                            }}>{new Array(teacher.tpassword.length+1).join("*")}</Paragraph>
                        </Col>
                    </Row>
                    <Row gutter={[40,10]}>
                        <Col span={8} style={{textAlign:"right",color:"#c3c3c3"}}>头像:</Col>
                        <Col span={16}>
                            <UploadImg/>
                        </Col>
                    </Row>
                    <Divider/>
                    <Row gutter={[40,10]}>
                        <Col span={8} style={{display:'flex',justifyContent:'flex-end'}}>
                            <Button type='primary' onClick={submit}>提交</Button>
                        </Col>
                        <Col span={16}>
                            <Button onClick={getInfo}>恢复</Button>
                        </Col>
                    </Row>
                </Col>
                </Row>
            </div>
        </div>
    )
};
export default Personal;
