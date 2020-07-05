package com.wangguo.mapper;

import com.wangguo.entity.StudyCourse;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @author 郭伟
 * @date 2020/6/13
 */
@Mapper
@Repository
public interface StudyCourseMapper {
    List<Map> getCourseByStudent(String cid);

    Integer insert(StudyCourse sc);

    StudyCourse findById(String scId);

    StudyCourse findByCondition(String sid, String cid);

    Integer archiveCourse(String scId, Integer archive);

    Map<String, Long> sizeBySid(String sid);

    Integer delete(String scId);

    List<Map> selectArchiveCourse(String sid);

}
