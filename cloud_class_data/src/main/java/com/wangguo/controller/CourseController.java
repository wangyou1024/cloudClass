package com.wangguo.controller;

import com.wangguo.entity.Course;
import com.wangguo.entity.Student;
import com.wangguo.entity.TeachCourse;
import com.wangguo.entity.Teacher;
import com.wangguo.service.CourseService;
import com.wangguo.service.StudentService;
import com.wangguo.service.TeachCourseService;
import com.wangguo.service.TeacherService;
import com.wangguo.util.CourseCode;
import com.wangguo.util.DefaultInfo;
import lombok.extern.slf4j.Slf4j;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/course")
@CrossOrigin    //允许跨域
@Slf4j
public class CourseController {

    @Autowired
    private CourseService courseService;
    @Autowired
    private TeacherService teacherService;
    @Autowired
    private StudentService studentService;
    @Autowired
    private TeachCourseService teachCourseService;

    @PostMapping("/updateCourse")
    @ResponseBody
    public String updateCourse(@RequestBody JSONObject info, HttpServletRequest request) {
        return courseService.updateCourse(info.getString("cid"),info.getString("cname"),info.getString("cdate"))>=1?"success":"failed";
    }

    @PostMapping("/deleteCourse")
    @ResponseBody
    public String deleteCourse(@RequestBody JSONObject info, HttpServletRequest request) {
        return courseService.deleteCourse(info.getString("cid"))>=1?"success":"failed";
    }

    @PostMapping("/archiveCourse")
    @ResponseBody
    public String archiveCourse(@RequestBody JSONObject info, HttpServletRequest request) {
        if (info.getInt("archive") == 0) {
            Integer item_1 = teachCourseService.archiveCourse(info.getString("tcid"), info.getInt("archive"));
            Integer item_2 = courseService.archiveCourse(info.getString("cid"), info.getInt("archive"));
            return item_1+item_2>=1?"success":"failed";
        }
        return courseService.archiveCourse(info.getString("cid"), info.getInt("archive"))>=1?"success":"failed";
    }

    @PostMapping("/createCourse")
    @ResponseBody
    public Map<String, String> createCourse(@RequestBody JSONObject courseInfo, HttpServletRequest request) {
        Map<String, String> result = new HashMap<>();

        Course course = new Course();
        course.setCdate(courseInfo.getString("cdate"));
        course.setCname(courseInfo.getString("cname"));
        course.setTid(courseInfo.getString("tid"));
        String cid = new Date().getTime() + "";
        course.setCid(cid);
        while(true) {
            String courseCode = CourseCode.getCode(8);
            if (courseService.getCourseByInvite(courseCode) == null) {
                course.setInvite(courseCode);
                break;
            }
        }
        course.setCnum(0);
        course.setArchive(0);

        Integer flag = courseService.insert(course);
        if (flag >= 1) {

            TeachCourse tc = new TeachCourse();
            tc.setCid(cid);
            tc.setTarchive(0);
            tc.setJob(0);
            tc.setTsort(teachCourseService.sizeByTid(courseInfo.getString("tid")));
            tc.setTid(courseInfo.getString("tid"));
            while(true) {
                String tcId = CourseCode.getRandomNum(15);
                if (teachCourseService.getInfoById(tcId) == null) {
                    tc.setTcid(tcId);
                    break;
                }
            }
            teachCourseService.insert(tc);
        }
        result .put("msg", flag>=1?"success":"failed");
        result.put("cid", cid);

        return result;
    }


    @PostMapping("/getCourseByTeacher")
    @ResponseBody
    public List<Map> getTeacherCourse(@RequestBody JSONObject info) throws Exception {
        Teacher teacher = teacherService.getInfo(info.getString("phone"));
        return courseService.getCourseByTeacher(teacher.getTid());
    }


    @PostMapping("/getCourseByStudent")
    @ResponseBody
    public List<Map> getStudentCourse(@RequestBody JSONObject info) throws Exception {
        Student student = studentService.getInfo(info.getString("phone"));
        return courseService.getCourseByStudent(student.getSid());
    }

    @PostMapping("getCourseMember")
    @ResponseBody
    public List<Map> getCourseMember(@RequestBody JSONObject info) throws IOException {
        List<Map> memberList = courseService.getCourseMember(info.getString("cid"));
        return memberList;
    }

    @PostMapping("getCourseStudent")
    @ResponseBody
    public List<Map> getCourseStudent(@RequestBody JSONObject info) throws IOException {
        List<Map> studentList = courseService.getCourseStudent(info.getString("cid"));
        return studentList;
    }

    @PostMapping("getCourseGrade")
    @ResponseBody
    public List<Map> getCourseGrade(@RequestBody JSONObject info) throws IOException {
        System.out.println(info.getString("cid"));
        List<Map> gradeList = courseService.getCourseGrade(info.getString("cid"));
        return gradeList;
    }


    //    王游
    @PostMapping("/getOneCourse")
    @ResponseBody
    public Map<String,Object> getOneCourse(@RequestBody JSONObject info) throws Exception {
        Map<String,Object> result = null;
        String id = info.get("id").toString();
        courseService.findById(info.get("id").toString());
        result = DefaultInfo.convertToMap(courseService.findById(info.get("id").toString()));
        return result;
    }

    @PostMapping("updateNameById")
    @ResponseBody
    public Map<String,Object> updateNameById(@RequestBody JSONObject info) {
        Map<String,Object> result = new HashMap<>();
        Integer integer = courseService.updateNameById(info.getString("id"),info.getString("name"));
        result.put("result",integer);
        return result;
    }

}
