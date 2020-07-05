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
    const [visible, setVisible] = useState(false);
    const [courseName, setCourseName] = useState(courseInfo.cname);
    const [courseDate, setCourseDate] = useState(courseInfo.cdate);
    const {Option} = Select;
    const data = [
        {'option':'2015-2016'},
        {'option':'2016-2017'},
        {'option':'2017-2018'},
        {'option':'2018-2019'},
        {'option':'2019-2020'},
        {'option':'2021-2022'},
        {'option':'2022-2023'},
        {'option':'2023-2024'},];


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
            url: '/course/getCourseByTeacher',
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


    const openModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        RealAxios({
            method: 'post',
            url: '/course/updateCourse',
            data: {
                'cid': courseInfo.cid,
                'cname': courseName,
                'cdate': courseDate
            }
        }).then((response) => {
            console.log(response.data);
            if (response.data === "success") {
                message.success("修改成功")
            }

            getCourseInfo();
        }).catch((error) => {
            console.log(error)
        });
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const archiveSelf = () => {
        RealAxios({
            method:'post',
            url: '/tc/archiveCourse',
            data: {
                'tcid':courseInfo.tcid,
                'archive':1
            }
        }).then((response) => {
            console.log(courseInfo.cname + response.data);
            getCourseInfo();
        }).then((error) => {
            console.log(error)
        })
    };


    const archiveAll = () => {
        RealAxios({
            method:'post',
            url: '/course/archiveCourse',
            data: {
                'cid':courseInfo.cid,
                'archive':1
            }
        }).then((response) => {
            console.log(response.data);
            getCourseInfo();
        }).catch((error) => {
            console.log(error)
        })
    };

    const deleteCourse = () => {
        RealAxios({
            method:'post',
            url:'/course/deleteCourse',
            data: {
                'cid':courseInfo.cid
            }
        }).then((response) => {
            console.log(response.data);
            getCourseInfo();
        }).catch((error) => {
            console.log(error);
        })
    };

    const MoreOption = (
        <Menu>
            <Menu.Item key='1'>
                <span onClick={openModal}>编辑</span>
            </Menu.Item>
            <Menu.Item key='2'>
                <span onClick={archiveSelf}>归档自己</span>
            </Menu.Item>
            <Menu.Item key='3'>
                <span onClick={archiveAll}>归档所有</span>
            </Menu.Item>
            <Menu.Item key='4'>
                <span onClick={deleteCourse}>删除</span>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className='course-module'>
            <div className="course-module-header">
                <div className="course-module-header-left">
                    <span style={{fontSize: 20+'px', color:"#fff"}} onClick={()=>Router.push("/teacher/detail?id="+courseInfo.cid)}>{courseInfo.cname}</span>
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
            <Modal
                title = {"修改课程信息"}
                visible = {visible}
                onOk = {handleOk}
                okText = {'保存'}
                cancelText = {'取消'}
                onCancel = {handleCancel}>
                <div>
                    <Row style={{margin:"10px"}}>
                        <Input size="large" type='text' placeholder={courseName} onChange={(e)=>{setCourseName(e.target.value)}}/>
                    </Row>
                    <Row style={{margin:"10px"}}>
                        <Select size="large" defaultValue={courseDate} style={{ width: 452+'px' }} onChange={(value)=>{setCourseDate(value)}}>
                            {data.map((item,key) => (
                                <Option value={item.option} key={key}>{item.option}</Option>
                            ))}
                        </Select>
                    </Row>
                </div>
            </Modal>
        </div>
    )
};

export default CourseModule;
