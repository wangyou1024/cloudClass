import {Row, Col} from "antd";
import {CourseContext} from "../Context";
import CourseModule from "./courseModule";
import React, {useState, useEffect, useContext} from 'react'
import {RealAxios} from "../../config";
import CourseAddModule from "./courseAddModule";
import cookie from 'react-cookies';


const CoursesModule = () => {
    const [coursesInfo, setCoursesInfo] = useState([]);

    useEffect(() => {
        getCourseInfo();
    },[]);

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
            console.log(response.data);
            setCoursesInfo(result);
        }).catch((error) => {
            console.log(error)
        });
    };

    return (
        <Row  gutter={[9,30]} justify='start'>
        {coursesInfo.map((item,key) =>  (
                <Col key={key}>
                    <CourseContext.Provider value={item}>
                        <CourseModule/>
                    </CourseContext.Provider>
                </Col>
            ))}
            <Col><CourseAddModule/></Col>
            </Row>
    );

};

export default CoursesModule;
