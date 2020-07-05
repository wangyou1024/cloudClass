import React, {useEffect, useState} from 'react'
import {withRouter} from "next/router";
import cookie from "react-cookies";
import Router from "next/router";
import Header from "../../components/teacher/header";
import {Button, Col, Collapse, List, message, Row, Select, Tabs, Tag, Typography,Timeline} from "antd";
import {WorkContext, AnswerContext, MessageContext} from "../../components/teacher/detail/detailContext";
import {PageContext} from "../../components/teacher/Context";
import HomeWork from "../../components/teacher/detail/homework";
import "../../public/style/teacher/detail.css";
import Correction from "../../components/teacher/detail/correction";
import Message from "../../components/teacher/detail/message";
import {RealAxios} from "../../components/config";

const Detail = ({router}) => {
    //作业表
    const [works, setWorks] = useState([]);
    //答案表
    const [answers, setAnswers] = useState([
    ]);
    //消息表
    const [messages, setMessages] = useState([
    ])
    //课程信息
    const [info, setInfo] = useState({
        cid: "1",
        tid: "1",
        cname: "1",
        cdate: "2020",
        cnum: 1,
        invite: "jksfd",
        archive: 0
    });
    //作业名称
    const [wName, setWName] = useState([{twid:"1",wtitle:"第一次"}, {twid:"2",wtitle:"第二次"}])

    const [answerConfig, setAnswerConfig] = useState({twid:"1",kind:"0"});
    //加载作业信息
    const loadWorks = ()=>{
        RealAxios({
            method:"post",
            url: "/twork/findWorksForTeacher",
            data:{
                id:router.query.id,
            }
        }).then((response)=>{
            setWorks(response.data);
        }).catch(error=>{
            console.log(error)
        })
    }
    //加载作业选项
    const loadNameList = ()=>{
        RealAxios({
            method:"post",
            url:"/twork/getNameList",
            data:{
                id:router.query.id
            }
        }).then(response=>{
            setWName(response.data);
            let newConfig = JSON.parse(JSON.stringify(answerConfig))
            if (response.data.length>0) {
                newConfig.twid = response.data[0].twid;
            }
            loadAnswer(newConfig);
            setAnswerConfig(newConfig);
        })
    }
    //加载作业
    const loadAnswer = (newAnswerConfig)=>{
        setAnswers([]);
        RealAxios({
            method:"post",
            url:"/swork/getAnswers",
            data:newAnswerConfig
        }).then(response=>{
            setAnswers(response.data);
        })
    }
    //加载消息
    const loadMessage = () => {
        RealAxios({
            method:"post",
            url:"/message/getMessageListForTeacher",
            data:{
                cid:router.query.id
            }
        }).then(response=>{
            setMessages(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }
    //发布新作业时间在作业首部添加一个新的空作业
    const publish = () => {
        RealAxios({
            method:"post",
            url: "/twork/findWorksForTeacher",
            data:{
                id:router.query.id,
            }
        }).then((response)=>{
            setWorks(response.data);
            const newWorks = JSON.parse(JSON.stringify(works));
            newWorks.unshift({
                twid: "000000",
                tid: info.tid,
                cid: info.cid,
                wtitle: "",
                tcontent: "支持markdown",
                tpublish: "2020/06/09",
                deadline: "2020/06/09",
                scale: 0,
                needCorrect: 0,
                corrected: 0,
                lock: 0
            });
            setWorks(newWorks);
        }).catch(error=>{
            console.log(error)
        })
    }
    //答案的展示首部
    const head = (realAnswer) => {
        return (
            <Row justify="space-around"
                >
                <Col span={2} style={{ textAlign: 'center'}}>
                    {realAnswer.snum}
                </Col>
                <Col span={2} style={{ textAlign: 'center'}}>
                    {realAnswer.sname}
                </Col>
                <Col span={2} style={{ textAlign: 'center'}}>
                    {realAnswer.score == undefined?
                        <div>未知</div>:
                        <Typography.Paragraph editable={{
                            onChange: (str) => {
                                RealAxios({
                                    method:"post",
                                    url:"/swork/updateScore",
                                    data:{
                                        id:realAnswer.swid,
                                        score: str
                                    }
                                }).then(response=>{
                                    if (response.data.result != 0){
                                        message.success("修改成功")
                                        loadAnswer(answerConfig);
                                    }
                                }).catch(error=>{
                                    message.error("修改失败");
                                })
                            }
                        }}>
                            {realAnswer.score}
                        </Typography.Paragraph>
                    }
                </Col>
                <Col span={2} style={{ textAlign: 'center'}}>
                    {realAnswer.spublish==undefined?"未知":realAnswer.spublish}
                </Col>
                <Col span={2} style={{ textAlign: 'center'}}>
                    {realAnswer.correct==undefined?
                        <div style={{cursor: "default",color:"red"}} onClick={()=>{
                            RealAxios({
                                method:"post",
                                url:"/message/insert",
                                data:{
                                    sid:realAnswer.sid,
                                    cid:router.query.id,
                                    twid:answerConfig.twid,
                                    mpublish:new Date().toLocaleDateString()
                                }
                            }).then(response=>{
                                if (response.data.result != 0){
                                    message.success("催交成功");
                                }
                            })
                        }}>催交</div>:
                        <div>{realAnswer.correction == undefined || realAnswer.score == 0?"未批":"已批"}</div>}
                </Col>
            </Row>
        )
    }

    useEffect(()=>{
        if (cookie.load("identify") != "teacher" || !cookie.load("id")) {
            Router.push("/teacher/login")
        }
        if (router.query.id != undefined) {
            //加载课程信息
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
            loadMessage()
            loadWorks();
            loadNameList()
        }
    },[router.query])

    //更新名字的请求
    const updateName = (str)=>{
        RealAxios({
            method:"post",
            url:"/course/updateNameById",
            data:{
                id:router.query.id+"",
                name:str,
            }
        }).then((response)=>{
            if (response.data.result != 0) {
                message.success("修改成功");
                const newInfo = JSON.parse(JSON.stringify(info));
                newInfo.cname=str;
                setInfo(newInfo);
            }
        }).catch(error=>{
            console.log(error);
        })
    }

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
                            <Typography.Title editable={{onChange:(str)=>updateName(str)}} level={2}>{info.cname}</Typography.Title>
                        </Row>
                        <Row>
                            <Tag color='lime'>加课码：{info.invite}</Tag>
                            <Tag color='green' onClick={() => Router.push('/teacher/member?id='+router.query.id)}>人数：{info.cnum}</Tag>
                            <Tag color='purple' onClick={() => Router.push('/teacher/grade?id='+router.query.id)}>成绩</Tag>
                        </Row>
                    </Col>
                </Row>
                <Row style={{borderRadius: "0 0 8px 8px"}}>
                    <Tabs defaultActiveKey='work' style={{
                        width: "100%",
                    }} onTabClick={(key,e)=>{
                        switch (key) {
                            case "work":loadWorks();break
                            case "manage": loadNameList();break;
                            case "message": loadMessage();break;
                            default:loadWorks();loadNameList();loadMessage();break;
                        }
                    }}>
                        <Tabs.TabPane tab="作业" key='work'>
                            <Button type='primary' onClick={() => {
                                publish();
                            }} style={{margin: "0 5px 10px 0"}}>发布作业</Button>
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
                        <Tabs.TabPane tab="作业批改" key='manage'>
                            <Row gutter={[10,10]} align="middle">
                                <Col>作业名称：</Col>
                                <Col>
                                    <Select  style={{ width: 120 }}
                                             onChange={(value) => {
                                                 const newConfig = JSON.parse(JSON.stringify(answerConfig))
                                                 newConfig.twid = value;
                                                 loadAnswer(newConfig)
                                                 setAnswerConfig(newConfig);
                                    }}>{
                                        wName.map(item => {
                                            return (
                                                <Select.Option key={item.twid} value={item.twid}>{item.wtitle}</Select.Option>
                                            )
                                        })
                                    }
                                    </Select>
                                </Col>
                                <Col>提交情况：</Col>
                                <Col>
                                    <Select  style={{ width: 120 }}
                                             onChange={(value) => {
                                                 const newConfig = JSON.parse(JSON.stringify(answerConfig))
                                                 newConfig.kind = value;
                                                 loadAnswer(newConfig)
                                                 setAnswerConfig(newConfig);
                                    }}>
                                        <Select.Option key={"不限"} value="0">不限</Select.Option>
                                        <Select.Option key={"已交"} value="1">已交</Select.Option>
                                        <Select.Option key={"未交"} value="2">未交</Select.Option>
                                    </Select>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Row justify="space-around"
                                         align="middle"
                                         style={{
                                        backgroundColor:"#f7f7f7",
                                        height:"50px",
                                    }}>
                                        <Col span={2} style={{ textAlign: 'center'}}>学号</Col>
                                        <Col span={2} style={{ textAlign: 'center'}}>姓名</Col>
                                        <Col span={2} style={{ textAlign: 'center'}}>成绩</Col>
                                        <Col span={2} style={{ textAlign: 'center'}}>提交时间</Col>
                                        <Col span={2} style={{ textAlign: 'center'}}>批改状态</Col>
                                    </Row>
                                    <Collapse>
                                        {
                                            answers.map((item, index) => {
                                                return (
                                                    <Collapse.Panel key={item.snum}
                                                                    showArrow={false}
                                                                    header={head(item)}
                                                                    disabled={item.correct != undefined ? false : true}>
                                                        <AnswerContext.Provider value={item}>
                                                            <Correction/>
                                                        </AnswerContext.Provider>
                                                    </Collapse.Panel>
                                                )
                                            })
                                        }
                                    </Collapse>
                                </Col>
                            </Row>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="公告" key="message">
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
