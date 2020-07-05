package com.wangguo.service;

import com.wangguo.entity.Swork;

import java.util.List;
import java.util.Map;

public interface SworkService {
    public List<Map<String,Object>> getSubmit(String twid);
    public List<Map<String,Object>> getNoSubmit(String twid);
    public List<Map<String,Object>> getAll(String twid);
    public Integer updateCorrection(String swid,String correction);
    public Integer updateScore(String swid,String score);
    public Integer updateSContent(String swid,String content);
    public Integer insert(Swork swork);
}
