package com.wangguo.service;

import com.wangguo.mapper.MessageMapper;
import com.wangguo.mapper.TworkMapper;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MassageServiceImpl implements MassageService{
    @Autowired
    MessageMapper messageMapper;
    @Autowired
    TworkMapper tworkMapper;

    @Override
    public List<Map<String,Object>> getMassageListForStudent(String sphone, String cid){
        Map<String, Object> info = new HashMap<>();
        info.put("sphone",sphone);
        info.put("cid",cid);
        return messageMapper.getMassageListForStudent(info);
    }

    @Override
    public List<Map<String,Object>> getMessageListForTeacher(String cid){
        return messageMapper.getMessageListForTeacher(cid);
    }

    @Override
    public Integer insert(JSONObject info){
        Integer result = 0;
        String mid = new Date().getTime()+"";
        String twork = tworkMapper.findWorkByTwid(info.getString("twid")).get("wtitle").toString();
        Map<String,Object> message = new HashMap<>();
        message.put("mid",mid);
        message.put("cid",info.getString("cid"));
        message.put("mtitle",twork+"催交通知");
        message.put("mcontent","你该提交"+twork+"的作业了，请及时提交");
        message.put("mpublish",info.getString("mpublish"));
        message.put("mnum","1");
        result += messageMapper.insertMassage(message);
        Map<String, Object> sm = new HashMap<>();
        sm.put("rid",new Date().getTime()+"");
        sm.put("sid",info.getString("sid"));
        sm.put("mid",mid);
        sm.put("isread","0");
        result+=messageMapper.insertSM(sm);
        return result;
    }

    public Integer insertMainMessage(String mid,String cid,String mtitle,String mcontent,String mpublish,String mnum){
        Integer result = 0;
        Map<String,Object> message = new HashMap<>();
        message.put("mid",mid);
        message.put("cid",cid);
        message.put("mtitle",mtitle);
        message.put("mcontent",mcontent);
        message.put("mpublish",mpublish);
        message.put("mnum","-1");
        result += messageMapper.insertMassage(message);
        return result;
    }
}
