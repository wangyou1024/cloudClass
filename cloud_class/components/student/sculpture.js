import React,{useState,useEffect} from 'react'
import {Avatar, Col, Popover, Row} from "antd";
import cookie from "react-cookies";
import Router from "next/router";
import {RealAxios} from "../config";
import "../../public/style/head.css"

const action = (
    <Row type='flex' justify='center'>
        <Col>
            <Row type='flex' align="middle" justify='center' gutter={[10, 0]} className="header-action">
                <Col span={24} onClick={()=>{Router.push("/student/personal")}}>
                    个人中心
                </Col>
            </Row>
            <Row typw='flex' align='middle' justify='center' gutter={[20, 0]} className="header-action">
                <Col span={24} onClick={()=>{
                    cookie.remove("identify",{path:"/"});
                    cookie.remove("id",{path:"/"});
                    Router.push("/student/login");
                }}>
                    退出登录
                </Col>
            </Row>
        </Col>
    </Row>
);

const Sculpture = ()=>{
    const [image,setImage] = useState("");
    useEffect(()=>{
        const phone = cookie.load("id");
        RealAxios({
            method:'post',
            url:"/student/getHeaderImg",
            data:{
                'phone':phone+"",
            }
        }).then((response)=>{
            setImage('data:image/png;base64,'+response.data.image);
        }).catch((error)=>{
            console.log(error);
        })
    },[]);
    return (
        <div>
                <Popover trigger="hover" placement="bottom" arrowPointAtCenter
                         content={action}>
                    <Avatar src={image} size={36}/>
                </Popover>
        </div>
    )
};

export default Sculpture;
