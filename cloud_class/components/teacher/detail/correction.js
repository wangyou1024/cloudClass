import React, {useState, useEffect, useContext} from 'react';
import {AnswerContext} from "./detailContext";
import {Button, Col, Collapse, Divider, Input, message, Row, Typography} from "antd";
import marked from "marked";
import hljs  from 'highlight.js'
import 'highlight.js/styles/github.css';
import {RealAxios} from "../../config";

const Correction = () => {
    const answer = useContext(AnswerContext);
    const [realAnswer, setRealAnswer] = useState({swid:"1",twid:"1",sid:"1",snum:"1",sname:"张强",scontent:"1",
        spublish:"2020/06/05",correct:"1",score:"2",correction:"不错"});
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
    useEffect(()=>{
        setRealAnswer(answer)
    },[answer])
    const updateCorrection = ()=>{
        RealAxios({
            method:"post",
            url:'/swork/updateCorrection',
            data:{
                id:realAnswer.swid,
                correction: realAnswer.correction
            }
        }).then(response=>{
            if (response.data.result != 0){
                message.success("修改成功");
            }
        }).catch(error=>{
            message.error("修改失败");
            console.log(error);
        })
    }
    const head = () => {
        return (
            <Row justify="space-around">
                <Col>
                    {realAnswer.snum}
                </Col>
                <Col>
                    {realAnswer.sname}
                </Col>
                <Col>
                    <Typography.Paragraph editable={{
                        onChange: (str) => {
                            const newAnswer = JSON.parse(JSON.stringify(realAnswer));
                            newAnswer.score = str;
                            setRealAnswer(newAnswer);
                        }
                    }}>
                        {realAnswer.score}
                    </Typography.Paragraph>
                </Col>
                <Col>
                    {realAnswer.spublish}
                </Col>
            </Row>
        )
    }
    return (
            <div>
                <Row>
                    回答：
                </Row>
                <Row>
                    <div dangerouslySetInnerHTML={{__html: marked(realAnswer.scontent)}}></div>
                </Row>
                <Row>评语：</Row>
                <Row>
                    <Input.TextArea value={realAnswer.correction}
                                    rows={5}
                                    onChange={(e) => {
                        const newAnswer = JSON.parse(JSON.stringify(realAnswer));
                        newAnswer.correction = e.target.value;
                        setRealAnswer(newAnswer);
                    }}></Input.TextArea>
                </Row>
                <Divider/>
                <Row gutter={[10,0]}>
                    <Col><Button type='primary' onClick={() => {
                        updateCorrection();
                    }}>修改</Button>
                    </Col>
                </Row>
            </div>
    )
}
export default Correction;