import React, {useState, useEffect, useContext} from 'react'
import {Input, message, Modal, Row, Select} from 'antd';
import {UserSvg} from "../../Svg";
import cookie from 'react-cookies'
import {RealAxios} from "../../config";
import {Router} from "next/router";
import {CoursesContext} from "../Context";

const CourseCreateSpan = ()=>{
    const [visible, setVisible] = useState(false);
    const [courseName, setCourseName] = useState('');
    const [teacherId, setTeacherId] = useState('');
    const { coursesInfo,dispatch} = useContext(CoursesContext);
    const [courseDate, setCourseDate] = useState('2019-2020');
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
        getTeacherId();
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


    const getTeacherId = () => {
        RealAxios({
            method: 'post',
            url: '/teacher/getInfo',
            data: {
                'phone':cookie.load("id"),
            }
        }).then((response) => {
            setTeacherId(response.data.tid);
        }).catch((error) => {
            console.log(error)
        });
    };

    const handleOk = () => {
        RealAxios({
            method: 'post',
            url: '/course/createCourse',
            data: {
                'tid': teacherId,
                'cname': courseName,
                'cdate': courseDate
            }
        }).then((response) => {
            if (response.data.msg === "success") {
                message.success("课程创建成功");
                getCourseInfo();
            }
            else if(response.data.msg === "failed")
                message.success("课程创建失败");
        }).catch((error) => {
            console.log(error)
        });
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <div>
            <span onClick={openModal}>创建课程{visible}</span>
            <Modal
                title = {"创建课程"}
                visible = {visible}
                onOk = {handleOk}
                okText = {'创建'}
                cancelText = {'取消'}
                onCancel = {handleCancel}>
                <div>
                    <Row style={{margin:"10px"}}>
                        <Input size="large" type='text' placeholder='课程名称' value={courseName} onChange={(e)=>{setCourseName(e.target.value)}}/>
                    </Row>
                    <Row style={{margin:"10px"}}>
                        <Select size="large" defaultValue='2019-2020' style={{ width: 452+'px' }} onChange={(value)=>{setCourseDate(value)}}>
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

export default CourseCreateSpan;
