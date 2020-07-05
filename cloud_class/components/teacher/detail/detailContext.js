import React,{createContext}from 'react'

//作业题目
export const WorkContext = createContext({twid:"1",tid:"1",cid:"1",wtitle:"1",
    tcontent:"### 你好",tpublish:"1",deadline:"1",scale:"1",needCorrect:1,corrected:1,lock:1,});

//学生答案
export const AnswerContext = createContext({swid:"1",twid:"1",sid:"1",snum:"1",sname:"张强",scontent:"1",
    spublish:"2020/06/05",correct:"1",score:"2",correction:"不错"})

//消息
export const MessageContext = createContext({mid:"1",cid:"1",mtitle:"1",mcontent:"1",mpublish:"2020/09/08"});