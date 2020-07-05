import {Menu} from "antd";
import CourseCreateSpan from "./courseCreateSpan";
import CourseAddSpan from "./courseAddSpan";
import React from "react";

const AddOrCreateCourseMenu = (
    <Menu>
        <Menu.Item key='1'>
            <CourseCreateSpan/>
        </Menu.Item>
        <Menu.Item key='2'>
            <CourseAddSpan/>
        </Menu.Item>
    </Menu>
);

export default AddOrCreateCourseMenu;