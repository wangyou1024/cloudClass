package com.wangguo.service;

import com.wangguo.entity.Twork;
import com.wangguo.mapper.MessageMapper;
import com.wangguo.mapper.SworkMapper;
import com.wangguo.mapper.TworkMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TworkServiceImpl implements TworkService{

    @Autowired
    TworkMapper tworkMapper;
    @Autowired
    SworkMapper sworkMapper;
    @Autowired
    MessageMapper messageMapper;


    /**
     * @author 王游
     * @action 加载课程详情页的作业
     * @param id
     * @return
     */
    @Override
    public List<Map<String, Object>> findTworkByCourseIdForTeacher(String id) {
        List<Map<String,Object>> result = tworkMapper.findWorksByCourseId(id);
        for (int i = 0; i < result.size(); i++){
            result.get(i).put("needCorrect",sworkMapper.getNeedCorrect(result.get(i).get("twid").toString()));
            result.get(i).put("corrected",sworkMapper.getCorrected(result.get(i).get("twid").toString()));
            result.get(i).put("lock",sworkMapper.getLock(result.get(i).get("twid").toString()));
        }
        return result;
    }

    @Override
    public List<Map<String, Object>> findTworkByCourseIdForStudent(String cid,String sid) {
        Map<String, Object> info = new HashMap<>();
        info.put("cid",cid);
        info.put("sid",sid);
        List<Map<String,Object>> result = tworkMapper.findWorksForStudent(info);
        for (int i = 0; i < result.size(); i++){
            if (result.get(i).get("scontent") == null){
                result.get(i).put("scontent","");
                result.get(i).put("correction","");
            }
        }
        return result;
    }

    /**
     * @author 王游
     * @action 加载某个的作业
     * @param twid
     * @return
     */
    @Override
    public Map<String, Object> findTworkByTwid(String twid){
        Map<String, Object> result = tworkMapper.findWorkByTwid(twid);
        result.put("needCorrect",sworkMapper.getNeedCorrect(result.get("twid").toString()));
        result.put("corrected",sworkMapper.getCorrected(result.get("twid").toString()));
        result.put("lock",sworkMapper.getLock(result.get("twid").toString()));
        return result;
    }

    /**
     * @author 王游
     * @action 修改作业
     * @param twork
     * @return
     */
    @Override
    public Integer update(Twork twork) {
        Integer result = 0;
        Map<String,Object> message = new HashMap<>();
        message.put("mid",new Date().getTime());
        message.put("cid",twork.getCid());
        message.put("mtitle","作业修改");
        message.put("mcontent","作业名："+twork.getWtitle()+
                ";作业内容：请查看详情；截止时间："+twork.getDeadline());
        String now = Calendar.getInstance().get(Calendar.YEAR)+"/"+
                (Calendar.getInstance().get(Calendar.MONTH)+1)+"/"+
                Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
        message.put("mpublish",now);
        message.put("mnum","-1");
        result += messageMapper.insertMassage(message);
        return tworkMapper.update(twork);
    }

    /**
     * @author 王游
     * @date 2020/6/13
     * @action 删除
     * @param twid
     * @return
     */
    @Override
    public Integer delete(String twid) {
        Integer result = 0;
        Map<String,Object> twork = tworkMapper.findWorkByTwid(twid);
        Map<String,Object> message = new HashMap<>();
        message.put("mid",new Date().getTime());
        message.put("cid",twork.get("cid"));
        message.put("mtitle","作业取消");
        message.put("mcontent","作业名："+twork.get("wtitle")+
                ";作业内容：请查看详情；截止时间："+twork.get("deadline"));
        String now = Calendar.getInstance().get(Calendar.YEAR)+"/"+
                (Calendar.getInstance().get(Calendar.MONTH)+1)+"/"+
                Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
        message.put("mpublish",now);
        message.put("mnum","-1");
        result += messageMapper.insertMassage(message);
        result += sworkMapper.deleteByTwid(twid);
        result += tworkMapper.delete(twid);
        return result;
    }

    /**
     * @author 王游
     * @date 2020/6/13
     * @action 添加作业
     * @param twork
     * @return
     */
    @Override
    public Integer insert(Twork twork) {
        Integer result = 0;
        Map<String,Object> message = new HashMap<>();
        message.put("mid",new Date().getTime());
        message.put("cid",twork.getCid());
        message.put("mtitle","新增作业");
        message.put("mcontent","作业名："+twork.getWtitle()+
                ";作业内容：请查看详情；截止时间："+twork.getDeadline());
        String now = Calendar.getInstance().get(Calendar.YEAR)+"/"+
                (Calendar.getInstance().get(Calendar.MONTH)+1)+"/"+
                Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
        message.put("mpublish",now);
        message.put("mnum","-1");
        result += messageMapper.insertMassage(message);
        result += tworkMapper.insert(twork);
        return result;
    }

    /**
     * @author 王游
     * @date 2020/6/13
     * @action 查询所有的作业名称
     * @param cid
     * @return
     */
    @Override
    public List<Map<String, Object>> getNameList(String cid) {
        return tworkMapper.getWorkList(cid);
    }

}
