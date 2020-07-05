package com.wangguo.service;

import net.sf.json.JSONObject;

import java.util.List;
import java.util.Map;

public interface MassageService {
    public List<Map<String,Object>> getMassageListForStudent(String sphone,String cid);
    public List<Map<String,Object>> getMessageListForTeacher(String cid);
    public Integer insert(JSONObject info);

}
