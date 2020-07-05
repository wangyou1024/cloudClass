import React, {useState, useEffect} from 'react'
import {PageContext} from "../../components/student/Context";
import Header from "../../components/student/header";
import {Avatar, Divider, Row, Col, Typography, message, Button} from "antd";
import cookie from "react-cookies";
import Router from "next/router";
import {RealAxios} from "../../components/config";
import UploadImg from "../../components/student/personal/upload";

const {Paragraph} = Typography;

const Personal = () => {
    const [image, setImage] = useState("");
    const [student, setStudent] = useState({
        sid: "1",
        sphone: "1",
        semail: '1',
        sname: '1',
        scollege: 'j',
        spassword: "111",
        snum:"1",
        timage: "300.png"
    });
    useEffect(() => {
        if (cookie.load("identify") != "student" || !cookie.load("id")) {
            Router.push("/student/login")
        }
        const phone = cookie.load("id");
        RealAxios({
            method: 'post',
            url: "/student/getHeaderImg",
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
            url: '/student/update',
            data: student
        }).then((response) => {
            message.success("修改成功")

        })
    };
    const getInfo = () => {
        RealAxios({
            method: 'post',
            url: '/student/getInfo',
            data: {
                'phone': cookie.load("id"),
            }
        }).then((response) => {
            let newStudent = JSON.parse(JSON.stringify(response.data));
            newStudent.spassword="******";
            setStudent(newStudent);
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
                    <h1>{student.sname}</h1>
                </Row>
                <Divider/>
                <Row><Col span={24}>
                    <Row gutter={[40,10]}>
                        <Col span={8} style={{textAlign:"right",color:"#c3c3c3"}}>姓名:</Col>
                        <Col span={8}>
                            <Paragraph editable={{
                                onChange: (str) => {
                                    const newStudent = JSON.parse(JSON.stringify(student));
                                    newStudent.sname = str;
                                    setStudent(newStudent)
                                }
                            }}>{student.sname}</Paragraph>
                        </Col>
                    </Row>
                    <Row gutter={[40,10]}>
                        <Col span={8} style={{textAlign:"right",color:"#c3c3c3"}}>电话:</Col>
                        <Col span={8}>
                            <Paragraph>{student.sphone}</Paragraph>
                        </Col>
                    </Row>
                    <Row gutter={[40,10]}>
                        <Col span={8} style={{textAlign:"right",color:"#c3c3c3"}}>学号:</Col>
                        <Col span={8}>
                            <Paragraph editable={{
                                onChange: (str) => {
                                    const newStudent = JSON.parse(JSON.stringify(student));
                                    newStudent.snum = str;
                                    setStudent(newStudent)
                                }
                            }}>{student.snum}</Paragraph>
                        </Col>
                    </Row>
                    <Row gutter={[40,10]}>
                        <Col span={8} style={{textAlign:"right",color:"#c3c3c3"}}>电子邮件:</Col>
                        <Col span={10}>
                            <Paragraph editable={{
                                onChange: (str) => {
                                    const newStudent = JSON.parse(JSON.stringify(student));
                                    newStudent.semail = str;
                                    setStudent(newStudent)
                                }
                            }}>{student.semail}</Paragraph>
                        </Col>
                    </Row>
                    <Row gutter={[40,10]}>
                        <Col span={8} style={{textAlign:"right",color:"#c3c3c3"}}>学院:</Col>
                        <Col span={10}>
                            <Paragraph editable={{
                                onChange: (str) => {
                                    const newStudent = JSON.parse(JSON.stringify(student));
                                    newStudent.scollege = str;
                                    setStudent(newStudent)
                                }
                            }}>{student.scollege}</Paragraph>
                        </Col>
                    </Row>
                    <Row gutter={[40,10]}>
                        <Col span={8} style={{textAlign:"right",color:"#c3c3c3"}}>密码:</Col>
                        <Col span={10}>
                            <Paragraph editable={{
                                onChange: (str) => {
                                    const newStudent = JSON.parse(JSON.stringify(student));
                                    newStudent.spassword = str;
                                    setStudent(newStudent)
                                }
                            }}>{new Array(student.spassword.length+1).join("*")}</Paragraph>
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
