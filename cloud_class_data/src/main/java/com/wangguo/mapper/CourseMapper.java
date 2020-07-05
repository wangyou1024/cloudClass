package com.wangguo.mapper;


import com.wangguo.entity.Course;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Mapper
@Repository
public interface CourseMapper {
    List<Map> selectCourseGrade(String cid);

    List<Map> selectCourseTeacher(String cid);

    List<Map> selectCourseSelect(String cid);

    Integer coursePeopleDel(String cid);

    Integer coursePeopleAdd(String cid);

    Integer updateCourse(String cid, String cname, String cdate);

    Integer deleteCourse(String cid);

    Integer archiveCourse(String cid, Integer archive);

    /**
     * @author 郭伟
     * @date 2020/6/9
     * @param course
     * @return
     */
    Integer insert(Course course);

    Course findByInvite(String courseCode);

    List<Map> getCourseByStudent(String sid);

    /**
     * @author 郭伟
     * @date 2020/6/7
     * @return
     */
    List<Map> getCourseByTeacher(String tid);



    /**
     * @author 王游
     * @action 通过id查找课程
     * @param id
     * @return
     */
    Course findById(String id);

    /**
     * @author 王游
     * @action 通过id查找并修改名称
     * @param info
     * @return
     */
    Integer updateNameById(HashMap info);

}
