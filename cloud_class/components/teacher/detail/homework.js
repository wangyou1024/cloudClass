import React, {useState, useContext, useEffect} from 'react'
import {Button, Col, DatePicker, Divider, Input, message, Popover, Row, InputNumber} from "antd";
import moment from 'moment';
import marked from 'marked';
import hljs  from 'highlight.js'
import 'highlight.js/styles/github.css';
import "../../../public/style/teacher/detail.css"
import "./detailContext"
import {WorkContext} from "./detailContext";
import {FormOutlined} from "@ant-design/icons";
import {RealAxios} from "../../config";

const HomeWork = () => {
    const info = useContext(WorkContext);
    const [realInfo, setRealInfo] = useState({
        twid: "000000",
        tid: "1",
        cid: "1",
        wtitle: "xxx",
        tcontent: "",
        tpublish: new Date().toLocaleDateString(),
        deadline: new Date().toLocaleDateString(),
        scale: "0.10",
        needCorrect: 0,
        corrected: 0,
        lock: 0,
    })
    const [edit, setEdit] = useState(0);
    const [del,setDel] = useState(0)
    const dateFormat = 'YYYY-MM-DD';
    useEffect(() => {
        if (info.twid != "000000") {
            setEdit(0)
        } else {
            setEdit(1);
        }
        setRealInfo(JSON.parse(JSON.stringify(info)));
    }, [info]);

    marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function(code) {
            return hljs.highlightAuto(code).value;
        },
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
    });
    const update = () => {
        RealAxios({
            method: "post",
            url: realInfo.twid != "000000"?"/twork/update":"/twork/insert",
            data: {
                twid: realInfo.twid,
                tid: realInfo.tid,
                cid: realInfo.cid,
                wtitle: realInfo.wtitle,
                tcontent: realInfo.tcontent,
                tpublish: realInfo.tpublish,
                deadline: realInfo.deadline,
                scale: realInfo.scale
            }
        }).then(response => {
            if (response.data.result != 0) {
                if (realInfo.twid != "000000") {
                    message.success("修改成功");
                    setEdit(0);
                }
                else{
                    RealAxios({
                        method:"post",
                        url:"/twork/findWorksByTwid",
                        data:{
                            id:response.data.twid
                        }
                    }).then(response=>{
                        setRealInfo(response.data);
                        message.success("添加成功");
                        setEdit(0);
                    })
                }
            }
        }).catch(error => {
            console.log(error);
            message.error("提交失败");
        })
    }
    const deleteInfo = ()=>{
        RealAxios({
            method:"post",
            url:"/twork/delete",
            data:{
                id:realInfo.twid,
                cid: realInfo.cid,
                mpublish:new Date().toLocaleDateString()
            }
        }).then(response=>{
            message.warn("删除成功");
            setDel(1);
        })
    }
    const action = (
        <Row type='flex' justify='center'>
            <Col>
                <Row type='flex' align="middle" justify='center' gutter={[10, 0]}>
                    <Col span={24}
                         style={{cursor: "default"}}
                         onClick={() => {
                             setEdit(1);
                         }}>
                        编辑
                    </Col>
                </Row>
                <Row typw='flex' align='middle' justify='center' gutter={[20, 0]}>
                    <Col span={24}
                         style={{cursor: "default"}}
                         onClick={() => {
                             deleteInfo();
                         }}>
                        删除
                    </Col>
                </Row>
            </Col>
        </Row>
    );
    return (
        <Row className='wrap' gutter={[10, 10]} style={{display:del==0?"flex":"none"}}>
            <Col span={edit == 1 ? 24 : 0}>
                <Row gutter={[10, 10]}>
                    <Col span={2}>作业名称：</Col>
                    <Col span={6}><Input type='text' value={realInfo.wtitle} onChange={(e) => {
                        const newInfo = JSON.parse(JSON.stringify(realInfo))
                        newInfo.wtitle = e.target.value;
                        setRealInfo(newInfo);
                    }}/></Col>
                </Row>
                <Row gutter={[10, 10]}>
                    <Col span={2}>作业要求：</Col>
                    <Col span={16}>
                        <Input.TextArea rows={4} value={realInfo.tcontent} columns={20}
                                        onChange={(e) => {
                                            const newInfo = JSON.parse(JSON.stringify(realInfo))
                                            newInfo.tcontent = e.target.value;
                                            setRealInfo(newInfo);
                                        }}/></Col>
                </Row>
                <Row gutter={[10, 10]}>
                    <Col span={2}>发布日期：</Col>
                    <Col>
                        <DatePicker value={moment(realInfo.tpublish, dateFormat)}
                                    format={dateFormat}
                                    onChange={(date, dateString) => {
                                        const newInfo = JSON.parse(JSON.stringify(realInfo))
                                        newInfo.tpublish = dateString
                                        setRealInfo(newInfo);
                                    }}/></Col>
                </Row>
                <Row gutter={[10, 10]}>
                    <Col span={2}>截止日期：</Col>
                    <Col>
                        <DatePicker value={moment(realInfo.deadline, dateFormat)} format={dateFormat}
                                    onChange={(date, dateString) => {
                                        const newInfo = JSON.parse(JSON.stringify(realInfo))
                                        newInfo.deadline = dateString;
                                        setRealInfo(newInfo);
                                    }}/></Col>
                </Row>
                <Row gutter={[10, 10]}>
                    <Col span={2}>成绩占比：</Col>
                    <Col>
                        <InputNumber min={0} max={1} precision={2} value={realInfo.scale} onChange={(value) => {
                            const newInfo = JSON.parse(JSON.stringify(realInfo))
                            newInfo.scale = value;
                            setRealInfo(newInfo);
                        }}/>,
                    </Col>
                </Row>
                <Divider/>
                <Row gutter={[10, 10]}>
                    <Col span={2}><Button type="primary" onClick={() => {
                        update()
                    }}>提交</Button></Col>
                    <Col><Button onClick={() => {
                        setEdit(0);
                        if (info.twid == "000000"){
                            setDel(1);
                        }else {
                            setRealInfo(JSON.parse(JSON.stringify(info)))
                        }
                    }}>取消</Button></Col>
                </Row>


            </Col>
            <Col span={edit == 0 ? 24 : 0}>
                <Row gutter={[10, 10]} justify="space-between">
                    <Col>
                        发布日期：{realInfo.tpublish}
                    </Col>
                    <Col>
                        <Popover trigger="hover" placement="bottom" arrowPointAtCenter
                                 content={action}>
                            <FormOutlined/>
                        </Popover>
                    </Col>
                </Row>
                <Row gutter={[10, 10]}>
                    <Col span={18}>
                        <Row gutter={[10, 0]}>
                            <Col>
                                <h2>
                                    {realInfo.wtitle}
                                </h2>
                            </Col>
                        </Row>
                        <Row gutter={[10, 0]}>
                            <Col>
                                <div dangerouslySetInnerHTML={{__html: marked(realInfo.tcontent)}}>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={[10, 0]}>
                            <Col>截止时间：{realInfo.deadline}
                            </Col>
                            <Col>成绩占比：{realInfo.scale}
                            </Col>
                        </Row>
                    </Col>
                    <Col span={6}>
                        <Row gutter={[10, 0]} justify="space-around">
                            <Col><h2>{realInfo.corrected}</h2></Col>
                            <Col><h2>{realInfo.needCorrect}</h2></Col>
                            <Col><h2>{realInfo.lock}</h2></Col>
                        </Row>
                        <Row gutter={[10, 0]} justify="space-around">
                            <Col>已批</Col>
                            <Col>未批</Col>
                            <Col>未交</Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
};

export default HomeWork
