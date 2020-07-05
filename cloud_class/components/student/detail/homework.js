import React, {useState, useContext, useEffect} from 'react'
import cookie from 'react-cookies'
import {Button, Col, DatePicker, Divider, Input, message, Popover, Row, InputNumber} from "antd";
import moment from 'moment';
import marked from 'marked';
import hljs  from 'highlight.js';
import 'highlight.js/styles/github.css';
import "../../../public/style/teacher/detail.css"
import "./detailContext"
import {WorkContext} from "./detailContext";
import {RealAxios} from "../../config";

const HomeWork = () => {
    const info = useContext(WorkContext);
    const [realInfo, setRealInfo] = useState({
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
    })
    const [edit, setEdit] = useState(0);
    const dateFormat = 'YYYY-MM-DD';
    useEffect(() => {
        setRealInfo(JSON.parse(JSON.stringify(info)));
        // console.log(realInfo);
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
            method:"post",
            url:realInfo.swid == "000000"?"/swork/insert":"/swork/updateSContent",
            data:realInfo.swid == "000000"?{
                swid:"000000",
                twid:realInfo.twid,
                sid:cookie.load("id"),
                scontent:realInfo.scontent,
                spublish:new Date().toLocaleDateString()+"",
                correct:0,
                score:0,
                correction:""
            }:{
                swid: realInfo.swid,
                content: realInfo.scontent
            }
        }).then(response=>{
            if (response.data.result != 0){
                message.success("提交成功");
                setEdit(0);
            }
        }).catch(error=>{
            console.log(error);
            message.error("提交失败");
        })
    }
    return (
        <Row className='wrap' gutter={[10, 10]}>
            <Col span={edit == 1 ? 24 : 0}>
                <Row gutter={[10,10]}><h2>题目：</h2></Row>
                <Row gutter={[10,10]}>
                    <div dangerouslySetInnerHTML={{__html: marked(realInfo.tcontent)}}></div>
                </Row>
                <Row gutter={[10,10]}><h2>答案：</h2></Row>
                <Row gutter={[10,10]}>
                    <div dangerouslySetInnerHTML={{__html: marked(realInfo.scontent==""?"请填写答案":realInfo.scontent)}}></div>
                </Row>
                <Row gutter={[10,10]}><h2>批语：</h2></Row>
                <Row gutter={[10,10]}>
                    <div dangerouslySetInnerHTML={{__html: marked(realInfo.correction == ""?"暂无批语":realInfo.correction)}}></div>
                </Row>
                <Row gutter={[10,10]}><h2>答案：</h2></Row>
                <Row gutter={[10,10]}><Input.TextArea value={realInfo.scontent}
                                     rows={5}
                                     onChange={(e) => {
                                         const newInfo = JSON.parse(JSON.stringify(realInfo));
                                         newInfo.scontent = e.target.value;
                                         setRealInfo(newInfo);
                                     }}/></Row>
                <Row gutter={[10,10]}>
                    <Col><Button type="primary" onClick={() => {
                        update();
                    }}>提交</Button>
                    </Col>
                    <Col>
                        <Button onClick={() => {
                            setRealInfo(JSON.parse(JSON.stringify(info)));
                            setEdit(0);
                        }}>取消</Button>
                    </Col>
                </Row>
            </Col>
            <Col span={edit == 0 ? 24 : 0}>
                <Row gutter={[10, 10]} justify="space-between">
                    <Col>
                        发布日期：{realInfo.tpublish}
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
                        <Row gutter={[10, 0]} justify="center">
                            <Col><h2>{realInfo.score==undefined?0:realInfo.score}</h2></Col>
                        </Row>
                        <Row gutter={[10, 0]} justify="center">
                            <Col>评分</Col>
                        </Row>
                        <Row gutter={[10, 0]} justify="center">
                            <Col>
                                <Button type="primary" onClick={() => {
                                    setEdit(1)
                                }}>{realInfo.swid == undefined?"待提交":<div>{realInfo.correct == 0?"未批改":"已批改"}</div>}</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
};

export default HomeWork
