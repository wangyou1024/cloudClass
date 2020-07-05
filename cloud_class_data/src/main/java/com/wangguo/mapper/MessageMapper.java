package com.wangguo.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Mapper
@Repository
public interface MessageMapper {
    List<Map<String,Object>> getMassageListForStudent(Map<String,Object> info);
    List<Map<String,Object>> getMessageListForTeacher(String cid);
    Integer insertMassage(Map<String,Object> message);
    Integer insertSM(Map<String,Object> sm);
}
