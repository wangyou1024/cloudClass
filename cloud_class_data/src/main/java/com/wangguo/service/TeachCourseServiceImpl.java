package com.wangguo.service;

import com.wangguo.entity.TeachCourse;
import com.wangguo.mapper.CourseMapper;
import com.wangguo.mapper.TeachCourseMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @author 郭伟
 * @date 2020/6/11
 */
@Service
public class TeachCourseServiceImpl implements TeachCourseService {
    @Autowired
    private TeachCourseMapper teachCourseMapper;
    @Autowired
    private CourseMapper courseMapper;

    @Override
    public Integer insert(TeachCourse tc) {
        courseMapper.coursePeopleAdd(tc.getCid());
        return teachCourseMapper.insert(tc);
    }

    @Override
    public TeachCourse getInfoById(String tcId) {
        return teachCourseMapper.findById(tcId);
    }

    @Override
    public TeachCourse getInfoByCidAndTid(String cid, String tid) {
        return teachCourseMapper.findByCondition(cid, tid);
    }

    @Override
    public Integer sizeByTid(String tid) {
        if (teachCourseMapper.sizeByTid(tid) == null)
            return 0;
        Number value = (Number)teachCourseMapper.sizeByTid(tid).get("countCourse");
        return value.intValue();
    }

    @Override
    public Integer archiveCourse(String tcid, Integer archive) {
        return teachCourseMapper.updateArchive(tcid,archive);
    }

    @Override
    public List<Map> selectArchiveCourse(String tid) {
        return teachCourseMapper.selectArchiveCourse(tid);
    }
}
