import React, {useEffect, useState} from 'react'
import {Table, Tabs, Col, Row, Avatar, Button, message, Affix, Menu} from 'antd';
import cookie from "react-cookies";
import Router from "next/router";
import {withRouter} from "next/router";
import {RealAxios} from "../../components/config";
import Link from "next/link";
import Sculpture from "../../components/student/sculpture";
import Head from "next/head";
import {BackSvg} from "../../components/Svg";

const {TabPane} = Tabs;


function callback(key) {
    console.log(key);
}

const CourseMember = ({router}) => {
    const [courseMember, setCourseMember] = useState([]);
    const [courseStudent, setCourseStudent] = useState([]);

    const memberColumns = [
        {
            title:'头像',
            dataIndex: 'image',
            key: 'image',
            render: (text) => {
                if (text != null)
                    return <Avatar src={'data:image/png;base64,'+text} size={22}/>;
            }
        },{
            title: '姓名',
            dataIndex: 'tname',
            key: 'tname',
        },{
            title: '电话',
            dataIndex: 'tphone',
            key: 'tphone',
        },{
            title: '身份',
            dataIndex: 'job',
            key: 'job',
        }];
    const studentColumns = [{
        dataIndex: 'image',
        key: 'image',
        render: (text) => {
            if (text != null)
                return <Avatar src={'data:image/png;base64,'+text} size={22}/>;
        }
    },{
        title: '姓名',
        dataIndex: 'sname',
        key: 'sname',
    },{
        title: '学号',
        dataIndex: 'snum',
        key: 'snum',
    },{
        title: '邮箱',
        dataIndex: 'semail',
        key: 'semail',
    }];

    useEffect(() => {
        if (cookie.load("identify") != "student" || !cookie.load("id")) {
            Router.push("/teacher/login")
        }
        if (router.query.id != undefined) {
            getCourseMember(router.query.id);
            getCourseStudent(router.query.id);
        }
    }, [router.query]);

    const getCourseMember = (cid) => {
        let result = [];
        RealAxios({
            method: 'post',
            url: '/course/getCourseMember',
            data: {
                cid:cid
            }
        }).then((response) => {
            result = response.data;
            setCourseMember(result);
        }).catch((error) => {
            console.log(error)
        });
    };

    const getCourseStudent = (cid) => {
        let result = [];
        RealAxios({
            method: 'post',
            url: '/course/getCourseStudent',
            data: {
                cid:cid
            }
        }).then((response) => {
            result = response.data;
            setCourseStudent(result);
        }).catch((error) => {
            console.log(error)
        });
    };

    return (
        <Col span={24}>
                <Affix offsetTop={0}>
                    <Head>
                        <title>云课堂</title>
                        <meta charSet='utf-8' />
                    </Head>
                    <div id='header-wrap'>
                        <Col span={18} offset={3} style={{height: "50px"}}>
                            <Row type='flex' align='middle' id='' style={{height: '50px'}}>
                                <Col span={4}>
                                    <Link href={'/student/detail?id='+router.query.id}><a><BackSvg /></a></Link>
                                </Col>
                                <Col span={10}>
                                    <Menu
                                        mode="horizontal"
                                        defaultSelectedKeys='member'
                                    >
                                        <Menu.Item key='member'>
                                            <Link href={'/student/member?id='+router.query.id}><a>成员</a></Link>
                                        </Menu.Item>
                                        <Menu.Item key='grader'>
                                            <Link href={'/student/grade?id='+router.query.id}><a>成绩</a></Link>
                                        </Menu.Item>
                                    </Menu>
                                </Col>
                                <Col span={2} offset={8} style={{height: '100%', paddingTop: "5px"}}>
                                    <Sculpture/>
                                </Col>
                            </Row>
                        </Col>
                    </div>
                </Affix>
            <Row style={{marginTop:50+'px'}}>
                <Col span={18} offset={3}>
                    <Tabs defaultActivekey="1" onchange={callback} tabPosition="left">
                        <TabPane tab={"课程团队 ("+courseMember.length+")"} key="1">
                            <Table columns={memberColumns} dataSource={courseMember} />
                        </TabPane>
                        <TabPane tab={"学生成员 ("+courseStudent.length+")"} key="2">
                            <Table columns={studentColumns} dataSource={courseStudent} />
                        </TabPane>
                    </Tabs>

                </Col>
            </Row>
        </Col>
        )
};

export default withRouter(CourseMember);
