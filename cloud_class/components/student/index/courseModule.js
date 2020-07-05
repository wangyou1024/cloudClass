import { Row, Col, Avatar, Dropdown, Menu, Modal, Input, Select, message} from "antd";
import { CoursesContext} from "../Context";
import React, {useState, useEffect, useContext} from 'react';
import '../../../public/style/teacher/course.css';
import {RealAxios} from "../../config";
import cookie from "react-cookies";
import Router from "next/router";


const CourseModule = () => {
    const { item,coursesInfo,dispatch} = useContext(CoursesContext);
    const [courseInfo,setCourseInfo] = useState(item);
    const [image, setImage] = useState("");

    useEffect(() => {
        RealAxios({
            method: 'post',
            url: "/teacher/getHeaderImg",
            data: {
                'phone': courseInfo.tphone
            }
        }).then((response) => {
            setImage('data:image/png;base64,' + response.data.image);
        }).catch((error) => {
            console.log(error);
        })
    });

    const getCourseInfo = () => {
        let result = [];
        RealAxios({
            method: 'post',
            url: '/course/getCourseByStudent',
            data: {
                phone: cookie.load("id")
            }
        }).then((response) => {
            result = response.data;
            dispatch({type:"update",coursesInfo:[]});
            dispatch({type:"update",coursesInfo:result});
        }).catch((error) => {
            console.log(error)
        });
    };

    const archive = () => {
        RealAxios({
            method:'post',
            url: '/sc/archiveCourse',
            data: {
                'scid':courseInfo.scid,
                'archive':1
            }
        }).then((response) => {
            console.log(courseInfo.cname + response.data);
            if(response.data === "success") {
                message.success("归档成功");
                getCourseInfo();
            }
            else if(response.data === "failed")
                message.error("归档失败");
        }).catch((error) => {
            console.log(error)
        })
    };

    const deleteCourse = () => {
        RealAxios({
            method:'post',
            url:'/sc/deleteCourse',
            data: {
                'scid':courseInfo.scid
            }
        }).then((response) => {
            console.log(response.data);
            if(response.data === "success") {
                message.success("退课成功");
                getCourseInfo();
            }
            else if(response.data === "failed")
                message.error("退课失败");
        }).catch((error) => {
            console.log(error);
        })
    };

    const MoreOption = (
        <Menu>
            <Menu.Item key='3'>
                <span onClick={archive}>归档</span>
            </Menu.Item>
            <Menu.Item key='4'>
                <span onClick={deleteCourse}>退课</span>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className='course-module'>
            <div className="course-module-header">
                <div className="course-module-header-left">
                    <span style={{fontSize: 20+'px', color:"#fff"}} onClick={()=>Router.push("/student/detail?id="+courseInfo.cid)}>{courseInfo.cname}</span>
                    <span style={{fontSize: 12+'px', color:"rgba(255,255,255,1)"}}>{courseInfo.invite}</span>
                </div>
                <span style={{color:"rgba(255,255,255,1)", alignSelf: "flex-end"}}>{courseInfo.cdate}</span>
            </div>
            <ul className="course-module-body">
                <li><span style={{color:"rgba(95,99,104,1)", fontSize:12+'px'}}>最近作业</span></li>
                <li>{courseInfo.work}</li>
            </ul>
            <div className="course-module-footer">
                <Row justify="space-between">
                    <Row justity="start" gutter={[10,0]}>
                        <Col>
                            <Avatar src={image} size={24}/>
                        </Col>
                        <Col>{courseInfo.tname}</Col>
                    </Row>
                    <Col justity="start" gutter='[5,0]'>
                        <Col>
                            <Dropdown overlay={MoreOption} trigger={['click']}>
                                <span>更多</span>
                            </Dropdown>
                        </Col>
                    </Col>
                </Row>
            </div>
        </div>
    )
};

export default CourseModule;
