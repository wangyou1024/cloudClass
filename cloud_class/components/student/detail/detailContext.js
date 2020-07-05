import React,{createContext}from 'react'

//作业信息
export const WorkContext = createContext({swid:"1",twid:"1",tid:"1",cid:"1",wtitle:"1",
    tcontent:"### 你好",tpublish:"1",deadline:"1",scale:"1",scontent:"1",correct:"1",score:"2",correction:"不错"});

//消息
export const MessageContext = createContext({mid:"1",cid:"1",mtitle:"1",mcontent:"1",mpublish:"2020/09/08"});