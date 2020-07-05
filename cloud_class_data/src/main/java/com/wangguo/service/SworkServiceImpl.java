package com.wangguo.service;

import com.wangguo.entity.Student;
import com.wangguo.entity.Swork;
import com.wangguo.mapper.StudentMapper;
import com.wangguo.mapper.SworkMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SworkServiceImpl implements SworkService{

    @Autowired
    private SworkMapper sworkMapper;
    @Autowired
    private StudentMapper studentMapper;

    /**
     * @author 王游
     * @date 2020/6/13
     * @action 获取已经提交的作业
     * @param twid
     * @return
     */
    @Override
    public List<Map<String, Object>> getSubmit(String twid) {
        return sworkMapper.getSubmit(twid);
    }

    /**
     * @author 王游
     * @date 2020/6/13
     * @action 获取未人员
     * @param twid
     * @return
     */
    @Override
    public List<Map<String, Object>> getNoSubmit(String twid) {
        return sworkMapper.getNoSubmit(twid);
    }

    /**
     * @author 王游
     * @date 2020/6/13
     * @action 获取所有人员答案
     * @param twid
     * @return
     */
    @Override
    public List<Map<String, Object>> getAll(String twid) {
        List<Map<String, Object>> all = sworkMapper.getSubmit(twid);
        all.addAll(sworkMapper.getNoSubmit(twid));
        return all;
    }

    @Override
    public Integer updateCorrection(String swid,String correction){
        Map<String, Object> info = new HashMap<>();
        info.put("swid",swid);
        info.put("correction",correction);
        return sworkMapper.updateCorrection(info);
    }

    @Override
    public Integer updateScore(String swid,String score){
        Map<String, Object> info = new HashMap<>();
        info.put("swid",swid);
        info.put("score",score);
        return sworkMapper.updateScore(info);
    }

    @Override
    public Integer updateSContent(String swid,String content){
        Map<String, Object> info = new HashMap<>();
        info.put("swid",swid);
        info.put("scontent",content);
        return sworkMapper.updateSContent(info);
    }

    public Integer insert(Swork swork){
        swork.setSid(studentMapper.findByPhone(swork.getSid()).getSid());
        return sworkMapper.insert(swork);
    }
}
