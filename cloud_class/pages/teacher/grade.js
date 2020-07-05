import React, {useEffect, useState} from 'react'
import {Table, Col, Row, Affix, Menu} from 'antd';
import cookie from "react-cookies";
import Router from "next/router";
import {withRouter} from "next/router";
import {RealAxios} from "../../components/config";
import {PageContext} from "../../components/teacher/Context";
import Head from "next/dist/next-server/lib/head";
import Link from "next/link";
import Sculpture from "../../components/teacher/sculpture";
import {BackSvg} from "../../components/Svg";


const CourseGrade = ({router}) => {
    const [courseGrade, setCourseGrade] = useState([]);

    const gradeColumns = [
        {
            title:'学号',
            dataIndex: 'snum',
            key: 'snum',
        },{
            title: '姓名',
            dataIndex: 'sname',
            key: 'sname',
        },{
            title: '成绩',
            dataIndex: 'allsum',
            key: 'allsum',
        }];



    useEffect(() => {
        if (cookie.load("identify") != "teacher" || !cookie.load("id")) {
            Router.push("/teacher/login")
        }
        if (router.query.id != undefined) {
            getCourseGrade(router.query.id);
        }
    }, [router.query]);

    const getCourseGrade = (cid) => {
        let result = [];
        RealAxios({
            method: 'post',
            url: '/course/getCourseGrade',
            data: {
                cid:cid
            }
        }).then((response) => {
            result = response.data;
            for (let i = 0; i < result.length; i++){
                if (result[i].allsum == undefined){
                    result[i].allsum = 0;
                }
                else {
                    let grade = (result[i].allsum+"").split(".")
                    if (grade.length == 2) {
                        result[i].allsum = grade[0] + "." + grade[1].substr(0, 2);
                    }
                }
            }
            setCourseGrade(result);
        }).catch((error) => {
            console.log(error)
        });
    };

    return (
        <Col span={24}>
            <PageContext.Provider value={"index"}>
                <Affix offsetTop={0}>
                    <Head>
                        <title>云课堂</title>
                        <meta charSet='utf-8' />
                    </Head>
                    <div id='header-wrap'>
                        <Col span={18} offset={3} style={{height: "50px"}}>
                            <Row type='flex' align='middle' id='' style={{height: '50px'}}>
                                <Col span={4}>
                                    <Link href={'/teacher/detail?id='+router.query.id}><a><BackSvg /></a></Link>
                                </Col>
                                <Col span={10}>
                                    <Menu
                                        mode="horizontal"
                                        defaultSelectedKeys='grade'
                                    >
                                        <Menu.Item key='member'>
                                            <Link href={'/teacher/member?id='+router.query.id}><a>成员</a></Link>
                                        </Menu.Item>
                                        <Menu.Item key='grade'>
                                            <Link href={'/teacher/grade?id='+router.query.id}><a>成绩</a></Link>
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
            </PageContext.Provider>
            <Row style={{marginTop:50+'px'}}>
                <Col span={18} offset={3}>
                    <Table columns={gradeColumns} dataSource={courseGrade} />
                </Col>
            </Row>
        </Col>
    )
};

export default withRouter(CourseGrade);
