package com.wangguo.service;

import com.wangguo.entity.Twork;

import java.util.List;
import java.util.Map;

public interface TworkService {
    public List<Map<String,Object>> findTworkByCourseIdForTeacher(String id);
    public List<Map<String,Object>> findTworkByCourseIdForStudent(String cid,String sid);
    public Map<String, Object> findTworkByTwid(String twid);
    public Integer update(Twork twork);
    public Integer delete(String twid);
    public Integer insert(Twork twork);
    public List<Map<String,Object>> getNameList(String cid);
}
