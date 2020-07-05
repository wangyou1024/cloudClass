import React, {useState,useEffect} from 'react'
import {withRouter} from "next/router";
import cookie from 'react-cookies';
import Router from "next/router";
import Header from "../../components/student/header";
import {Col, List, message, Row, Tabs, Tag, Timeline, Typography} from "antd";
import {WorkContext} from "../../components/student/detail/detailContext";
import {PageContext} from "../../components/student/Context";
import HomeWork from "../../components/student/detail/homework";
import "../../public/style/student/detail.css";
import {MessageContext} from "../../components/student/detail/detailContext";
import Message from "../../components/student/detail/message";
import {RealAxios} from "../../components/config";

const Detail = ({router}) => {
    const [works, setWorks] = useState([{
        swid: "1",
        twid: "1",
        tid: "1",
        cid: "1",
        wtitle: "1",
        tcontent: "### 你好",
        tpublish: "1",
        deadline: "1",
        scale: "1",
        scontent: "1",
        correct: "1",
        score: "2",
        correction: "不错"
    },
        {
            swid: "1",
            twid: "2",
            tid: "1",
            cid: "1",
            wtitle: "1",
            tcontent: "### 你好",
            tpublish: "1",
            deadline: "1",
            scale: "1",
            scontent: "1",
            correct: "1",
            score: "2",
            correction: "不错"
        }]);
    const [messages, setMessages] = useState([
        {mid:"2",cid:"1",mtitle:"1",mcontent:"1",mpublish:"2020/09/08"},
        {mid:"1",cid:"1",mtitle:"1",mcontent:"1",mpublish:"2020/09/08"},
    ])
    const [info, setInfo] = useState({
        cid: "1",
        tid: "1",
        cname: "1",
        cdate: "2020",
        cnum: 1,
        invite: "jksfd",
        archive: 0
    });

    const loadMessage = ()=>{
        RealAxios({
            method:"post",
            url:"/message/getMessageListForStudent",
            data:{
                sphone:cookie.load("id"),
                cid:router.query.id,
            }
        }).then(response=>{
            setMessages(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const loadWorks= ()=>{
        RealAxios({
            method:"post",
            url: "/twork/findWorksForStudent",
            data:{
                cid:router.query.id,
                sid:cookie.load("id")
            }
        }).then((response)=>{
            setWorks(response.data);
        }).catch(error=>{
            console.log(error)
        });
    }
    useEffect(()=>{
        if (cookie.load("identify") != "student" || !cookie.load("id")){
            Router.push("/student/login")
        }
        if (router.query.id != undefined) {
            RealAxios({
                method: "post",
                url: "/course/getOneCourse",
                data: {
                    id: router.query.id + "",
                }
            }).then((response) => {
                setInfo(response.data);
            }).catch(error => {
                console.log(error);
            });
            loadMessage();
            loadWorks()
        }
    },[router.query]);
    return (
        <div id="detail">
            <PageContext.Provider value="error">
                <Header/>
            </PageContext.Provider>
            <Col span={18} offset={3}>
                <Row style={{
                    padding: "40px",
                    backgroundColor: "blue",
                    backgroundImage: "linear-gradient(45deg,#ffffff,#4bc0c8)",
                    borderRadius: "8px 8px 0 0",
                    margin: "20px 0 0 0"
                }}
                >
                    <Col span={24}>
                        <Row>
                            <Typography.Title level={2}>{info.cname}</Typography.Title>
                        </Row>
                        <Row>
                            <Tag color='lime'>加课码：{info.invite}</Tag>
                            <Tag color='green'  onClick={() => Router.push('/student/member?id='+router.query.id)}>人数：{info.cnum}</Tag>
                            <Tag color='purple' onClick={() => Router.push('/student/grade?id='+router.query.id)}>成绩</Tag>
                        </Row>
                    </Col>
                </Row>
                <Row style={{borderRadius: "0 0 8px 8px"}}>
                    <Tabs defaultActiveKey='work' style={{
                        width: "100%",
                    }} onTabClick={(key,e)=>{
                        switch (key) {
                            case "work":loadWorks();break;
                            case "message":loadMessage();break;
                            default:loadWorks();loadMessage();break;
                        }
                    }}>
                        <Tabs.TabPane tab="作业" key='work'>
                            <List
                                itemLayout='horizontal'
                                dataSource={works}
                                split={false}
                                renderItem={item => (
                                    <WorkContext.Provider key={item.twid} value={item}>
                                        <HomeWork/>
                                    </WorkContext.Provider>
                                )}
                            />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="公告" key='message'>
                            <Timeline mode="alternate">
                                {
                                    messages.map((item,index)=>{
                                        return (
                                            <Timeline.Item key={item.mid}>
                                                <MessageContext.Provider value={item}>
                                                    <Message />
                                                </MessageContext.Provider>
                                            </Timeline.Item>
                                        )
                                    })
                                }
                            </Timeline>
                        </Tabs.TabPane>
                    </Tabs>
                </Row>
            </Col>
        </div>
    )
};

export default withRouter(Detail);
