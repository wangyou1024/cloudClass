package com.wangguo.service;


import com.wangguo.entity.StudyCourse;
import com.wangguo.mapper.CourseMapper;
import com.wangguo.mapper.StudyCourseMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @author 郭伟
 * @date 2020/6/13
 */
@Service
public class StudyCourseServiceImpl implements StudyCourseService {
    @Autowired
    private StudyCourseMapper studyCourseMapper;
    @Autowired
    private CourseMapper courseMapper;

    @Override
    public List<Map> getCourseByStudent(String sid) {
        return studyCourseMapper.getCourseByStudent(sid);
    }

    @Override
    public Integer insert(StudyCourse sc) {
        courseMapper.coursePeopleAdd(sc.getCid());
        return studyCourseMapper.insert(sc);
    }

    @Override
    public Integer sizeBySid(String sid) {
        if (studyCourseMapper.sizeBySid(sid) == null)
            return 0;
        Number value = studyCourseMapper.sizeBySid(sid).get("countCourse");
        return value.intValue();
    }

    @Override
    public StudyCourse getInfoByCidAndSid(String cid, String sid) {
        return studyCourseMapper.findByCondition(sid, cid);
    }

    @Override
    public StudyCourse getInfoById(String scId) {
        return studyCourseMapper.findById(scId);
    }

    @Override
    public Integer archiveCourse(String scId, Integer archive) {
        return studyCourseMapper.archiveCourse(scId, archive);
    }

    @Override
    public Integer deleteCourse(String scId) {
        courseMapper.coursePeopleDel(studyCourseMapper.findById(scId).getCid());
        return studyCourseMapper.delete(scId);
    }

    @Override
    public List<Map> selectArchiveCourse(String sid) {
        return studyCourseMapper.selectArchiveCourse(sid);
    }
}
