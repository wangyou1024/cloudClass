import React, {useState, useEffect, useContext} from 'react'
import {Input, message, Modal, Row} from 'antd';
import {UserSvg} from "../../Svg";
import {RealAxios} from "../../config";
import cookie from "react-cookies";
import {CoursesContext} from "../Context";

const CourseAddSpan = ()=>{
    const [visible, setVisible] = useState(false);
    const [courseCode, setCourseCode] = useState('');
    const { dispatch} = useContext(CoursesContext);
    const [teacherId, setTeacherId] = useState('');

    const openModal = () => {
        setVisible(true);
    };

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
        }).then((error) => {
            console.log(error)
        });
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
    getTeacherId();

    const handleOk = () => {
        RealAxios({
            method: 'post',
            url: '/tc/addTeachCourse',
            data: {
                'tid': teacherId,
                'invite': courseCode,
            }
        }).then((response) => {
            if (response.data === "success") {
                message.success("加入课程成功");
                getCourseInfo();
            }
            else if(response.data === "failed")
                message.error("加课失败");
            else if(response.data === "existed_error")
                message.error("课程已加入，无需再次申请");
            else if(response.data === "not_exist_error")
                message.error("无效课程邀请码");
            else if(response.data === "illegal_error")
                message.error("无效课程邀请码");
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
            <span onClick={openModal}>加入课程{visible}</span>
            <Modal
                title = {"加入课程"}
                visible = {visible}
                onOk = {handleOk}
                okText = {'加入'}
                cancelText = {'取消'}
                onCancel = {handleCancel}>
                <p><Row style={{margin:"10px"}}>
                    <Input size="large" type='text' placeholder='请输入课程加课验证码'  value={courseCode} onChange={(e)=>{setCourseCode(e.target.value)}}/>
                </Row></p>
            </Modal>
        </div>
    )
};

export default CourseAddSpan;