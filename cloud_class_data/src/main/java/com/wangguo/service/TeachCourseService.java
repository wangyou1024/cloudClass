package com.wangguo.service;

import com.wangguo.entity.TeachCourse;

import java.util.List;
import java.util.Map;

/**
 * @author 郭伟
 * @date 2020/6/11
 */
public interface TeachCourseService {
    public Integer insert(TeachCourse tc);

    public TeachCourse getInfoById(String tcId);

    public TeachCourse getInfoByCidAndTid(String cid, String tid);

    public Integer sizeByTid(String tid);

    public Integer archiveCourse(String tcid, Integer archive);

    public List<Map> selectArchiveCourse(String tid);

}
