import '../../../public/style/teacher/course.css';
import React, {useState, useEffect, useContext} from 'react'
import {Modal, Input, Row, message} from "antd";
import {RealAxios} from "../../config";
import cookie from "react-cookies";
import {CoursesContext} from "../Context";

const CourseAddModule = () => {
    const [visible, setVisible] = useState(false);
    const [courseCode, setCourseCode] = useState('');
    const [studentId, setStudentId] = useState('');
    const { coursesInfo,dispatch} = useContext(CoursesContext);

    useEffect(() => {
        getStudentId();
    },[]);

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

    const openModal = () => {
        setVisible(true);
    };

    const getStudentId = () => {
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
                setCourseCode('');
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

    return (<div className='course-module'>
            <div className="course-module-add-header">
            </div>
            <div style={{height: 159+'px',
                borderRadius: '0 0 8px 8px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'start'}}>
                <p style={{height: 24+'px',textAlign:"center",cursor:"pointer"}} onClick={openModal}>
                    <span style={{fontSize:24+'px',fontWeight:"bold"}}>+</span><br/>加入课程</p>
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
        </div>
    )
};

export default CourseAddModule;
