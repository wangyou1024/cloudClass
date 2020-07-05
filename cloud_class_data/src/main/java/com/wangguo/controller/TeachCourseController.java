package com.wangguo.controller;

import com.wangguo.entity.TeachCourse;
import com.wangguo.entity.Teacher;
import com.wangguo.service.CourseService;
import com.wangguo.service.TeachCourseService;
import com.wangguo.service.TeacherService;
import com.wangguo.util.CourseCode;
import lombok.extern.slf4j.Slf4j;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @author 郭伟
 * @date 2020/6/11
 */
@Controller
@RequestMapping("/tc")
@CrossOrigin    //允许跨域
@Slf4j
public class TeachCourseController {
    @Autowired
    private TeachCourseService teachCourseService;
    @Autowired
    private CourseService courseService;
    @Autowired
    private TeacherService teacherService;

    @PostMapping("/findArchiveCourse")
    @ResponseBody
    public List<Map> findArchiveCourse(@RequestBody JSONObject info, HttpServletRequest request) {
        Teacher teacher = teacherService.getInfo(info.getString("phone"));
        return teachCourseService.selectArchiveCourse(teacher.getTid());
    }

    @PostMapping("/archiveCourse")
    @ResponseBody
    public String archiveCourse(@RequestBody JSONObject info, HttpServletRequest request) {
        Integer flag = teachCourseService.archiveCourse(info.getString("tcid"), info.getInt("archive"));

        return flag>=1?"success":"failed";
    }

    @PostMapping("/addTeachCourse")
    @ResponseBody
    public String addTeachCourse(@RequestBody JSONObject tcInfo, HttpServletRequest request) {
        if (courseService.getCourseByInvite(tcInfo.getString("invite")) == null)
            return "not_exist_error";
        if (courseService.getCourseByInvite(tcInfo.getString("invite")).getArchive() != 0)
            return "illegal_error";
        if (teachCourseService.getInfoByCidAndTid(courseService.getCourseByInvite(tcInfo.getString("invite")).getCid(),tcInfo.getString("tid")) != null)
            return "existed_error";
        TeachCourse tc = new TeachCourse();
        tc.setCid(courseService.getCourseByInvite(tcInfo.getString("invite")).getCid());
        tc.setJob(1);
        tc.setTarchive(0);
        tc.setTid(tcInfo.getString("tid"));
        tc.setTsort(teachCourseService.sizeByTid(tcInfo.getString("tid")) + 1);
        while(true) {
            String tcId = CourseCode.getRandomNum(15);
            if (teachCourseService.getInfoById(tcId) == null) {
                tc.setTcid(tcId);
                break;
            }
        }

        return teachCourseService.insert(tc)>=1?"success":"error";
    }


    @PostMapping("/addTeachCourseByCreator")
    @ResponseBody
    public String addTeachCourse(@RequestBody JSONObject tcInfo) {
        TeachCourse tc = new TeachCourse();
        tc.setCid(tcInfo.getString("cid"));
        tc.setJob(0);
        tc.setTarchive(0);
        tc.setTid(tcInfo.getString("tid"));
        tc.setTsort(teachCourseService.sizeByTid(tcInfo.getString("tid")));
        while(true) {
            String tcId = CourseCode.getRandomNum(15);
            if (teachCourseService.getInfoById(tcId) == null) {
                tc.setTcid(tcId);
                break;
            }
        }

        return teachCourseService.insert(tc)>=1?"success":"failed";
    }
}
