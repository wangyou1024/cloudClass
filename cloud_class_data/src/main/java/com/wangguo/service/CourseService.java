package com.wangguo.service;

import com.wangguo.entity.Course;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface CourseService {
    public Integer updateCourse(String cid,String cname,String cdate);

    public Integer deleteCourse(String cid);

    public Integer archiveCourse(String cid, Integer archive);

    public List<Map> getCourseByTeacher(String tid);

    public List<Map> getCourseByStudent(String sid);

    public Integer insert(Course course);

    public Course getCourseByInvite(String courseCode);


    public List<Map> getCourseMember(String cid) throws IOException;

    public List<Map> getCourseStudent(String cid) throws IOException;

    public List<Map> getCourseGrade(String cid);
    //    王游
    public Course findById(String id);
    public Integer updateNameById(String id, String name);

}
