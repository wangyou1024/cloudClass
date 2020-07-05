import React,{useState,useContext} from 'react'
import {Input, Modal, Row, message} from 'antd';
import {UserSvg} from "../../Svg";
import {RealAxios} from "../../config";
import cookie from "react-cookies";
import {CoursesContext} from "../Context";


const CourseAddSpan = ()=>{
    const [visible, setVisible] = useState(false);
    const [courseCode, setCourseCode] = useState('');
    const [studentId, setStudentId] = useState('');
    const { coursesInfo,dispatch} = useContext(CoursesContext);

    const openModal = () => {
        setVisible(true);
    };

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

    const getTeacherId = () => {
        RealAxios({
            method: 'post',
            url: '/student/getInfo',
            data: {
                'phone':cookie.load("id"),
            }
        }).then((response) => {
            setStudentId(response.data.sid);
        }).catch((error) => {
            console.log(error)
        });
    };
    getTeacherId();

    const handleOk = () => {
        RealAxios({
            method: 'post',
            url: '/sc/addStudyCourse',
            data: {
                'sid': studentId,
                'invite': courseCode,
            }
        }).then((response) => {
            if(response.data === "success") {
                message.success("加课成功");
                getCourseInfo();
                setCourseCode('');
            }
            else if(response.data === "failed")
                message.error("加课失败");
            else if(response.data === "existed_error")
                message.error("课程已加入，无需再次申请");
            else if(response.data === "not_exist_error")
                message.error("无效课程邀请码ss");
            else if(response.data === "illegal_error")
                message.error("无效课程邀请码aa");
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
                    <Input size="large" type='text' placeholder='请输入课程加课邀请码'  value={courseCode} onChange={(e)=>{setCourseCode(e.target.value)}}/>
                </Row></p>
            </Modal>
        </div>
    )
};

export default CourseAddSpan;
