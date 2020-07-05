package com.wangguo.mapper;

import com.wangguo.entity.TeachCourse;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @author 郭伟
 * @date 2020/6/11
 */
@Mapper
@Repository
public interface TeachCourseMapper {

    /**
     * @author 郭伟
     * @date 2020/6/11
     * @param tc
     * @return
     */
    Integer insert(TeachCourse tc);

    TeachCourse findById(String tcId);

    TeachCourse findByCondition(String cid, String tid);

    Map<String, Long> sizeByTid(String tid);

    Integer updateArchive(String tcid, Integer archive);

    List<Map> selectArchiveCourse(String tid);
}
