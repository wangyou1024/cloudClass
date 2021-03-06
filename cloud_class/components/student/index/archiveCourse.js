import React, {useState, useEffect, useContext,createContext} from 'react'
import cookie from "react-cookies";
import {RealAxios} from "../../config";
import {Modal, Row, Col, Dropdown, Menu, message} from "antd";
import CourseModule from "./courseModule";
import {CoursesContext} from "../Context";

const CourseContext = createContext({});


const ArchiveCourse = () => {
    const [coursesInfo, setCoursesInfo] = useState([]);
    const [visible, setVisible] = useState(false);

    const MoreOption = () => {
        const {coursesInfo,dispatch} = useContext(CoursesContext);
        const courseInfo = useContext(CourseContext);

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

        const resumeCourse = () => {
            RealAxios({
                method:'post',
                url: '/sc/archiveCourse',
                data: {
                    'scid':courseInfo.scid,
                    'cid':courseInfo.cid,
                    'archive':0
                }
            }).then((response) => {
                if (response.data === "success")
                    message.success("恢复成功");
                else if(response.data === "failed")
                    message.error("恢复失败");
                getCourseInfo();
                getArchiveCourse()
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
                if (response.data === "success")
                    message.success("退课成功");
                else if(response.data === "failed")
                    message.error("退课失败");
                getCourseInfo();
                getArchiveCourse();
            }).catch((error) => {
                console.log(error);
            })
        };

        const moreOption = (
            <Menu>
                <Menu.Item key='1'>
                    <span onClick={resumeCourse}>恢复</span>
                </Menu.Item>
                <Menu.Item key='2'>
                    <span onClick={deleteCourse}>退课</span>
                </Menu.Item>
            </Menu>
        );

        return (
            <Dropdown overlay={moreOption} trigger={['click']}>
                <span>更多</span>
            </Dropdown>
        );
    };

    useEffect(() => {
        getArchiveCourse();
    }, []);

    const getArchiveCourse = () => {
        let result = [];
        RealAxios({
            method: 'post',
            url: '/sc/findArchiveCourse',
            data: {
                phone: cookie.load("id")
            }
        }).then((response) => {
            result = response.data;
            console.log("archiveCourse: " + response.data);
            setCoursesInfo(result);
        }).catch((error) => {
            console.log(error)
        });
    };

    const openModal = () => {
        getArchiveCourse();
        setVisible(true);
    };
    const closeModal = () => {
        setVisible(false);
    };

    return (
        <div>
            <a onClick={openModal}>课程归档</a>
            <Modal
                title={"归档管理"}
                visible={visible}
                footer={null}
                onCancel={closeModal}
            >
                <Row justity="center" style={{paddingLeft:60+'px',}}>
                {coursesInfo.map((item,key) => (
                    <Col key={key} span={10}>
                        <Row align="middle" gutter={[10,20]} >
                            <Col offset={1}><p style={{fontSize:15+'px', width:100+'px',margin:0}}>{item.cname}</p></Col>
                            <Col offset={1}>
                                <CourseContext.Provider value={item}>
                                    <MoreOption />
                                </CourseContext.Provider>
                            </Col>
                        </Row>
                    </Col>
                ))}
                </Row>
            </Modal>
        </div>
    );
};

export default ArchiveCourse;
