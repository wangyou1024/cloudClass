package com.wangguo.controller;

import com.wangguo.entity.StudyCourse;
import com.wangguo.service.CourseService;
import com.wangguo.service.StudentService;
import com.wangguo.service.StudyCourseService;
import com.wangguo.util.CourseCode;
import lombok.extern.slf4j.Slf4j;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * @author 郭伟
 * @date 2020/6/11
 */
@Controller
@RequestMapping("sc")
@CrossOrigin    //允许跨域
@Slf4j
public class StudyController {
    @Autowired
    private StudyCourseService studyCourseService;
    @Autowired
    private StudentService studentService;
    @Autowired
    private CourseService courseService;

    @PostMapping("/findArchiveCourse")
    @ResponseBody
    public List<Map> findArchiveCourse(@RequestBody JSONObject info, HttpServletRequest request) {
        return studyCourseService.selectArchiveCourse(studentService.getInfo(info.getString("phone")).getSid());
    }

    @PostMapping("/deleteCourse")
    @ResponseBody
    public String deleteCourse(@RequestBody JSONObject info, HttpServletRequest request) {
        return studyCourseService.deleteCourse(info.getString("scid"))>=1?"success":"failed";
    }

    @PostMapping("/archiveCourse")
    @ResponseBody
    public String archiveCourse(@RequestBody JSONObject info, HttpServletRequest request) {
        return studyCourseService.archiveCourse(info.getString("scid"), info.getInt("archive"))>=1?"success":"failed";
    }

    @PostMapping("/getCourse")
    @ResponseBody
    public List<Map> getCourseByStudent(@RequestBody JSONObject info, HttpServletRequest request) {
        String sid = studentService.getInfo(info.getString("phone")).getSid();
        return studyCourseService.getCourseByStudent(sid);
    }

    @PostMapping("/addStudyCourse")
    @ResponseBody
    public String addStudyCourse(@RequestBody JSONObject scInfo) {
        if (courseService.getCourseByInvite(scInfo.getString("invite")) == null)
            return "not_exist_error";
        if (courseService.getCourseByInvite(scInfo.getString("invite")).getArchive() != 0)
            return "illegal_error";
        if (studyCourseService.getInfoByCidAndSid(courseService.getCourseByInvite(scInfo.getString("invite")).getCid(),scInfo.getString("sid")) != null)
            return "existed_error";
        StudyCourse sc = new StudyCourse();
        sc.setCid(courseService.getCourseByInvite(scInfo.getString("invite")).getCid());
        sc.setSid(scInfo.getString("sid"));
        sc.setGrade("-1");
        sc.setSort(studyCourseService.sizeBySid(scInfo.getString("sid")) + 1);
        sc.setSarchive(0);
        while(true) {
            String scId = CourseCode.getRandomNum(15);
            if (studyCourseService.getInfoById(scId) == null) {
                sc.setScid(scId);
                break;
            }
        }

        return studyCourseService.insert(sc)>=1?"success":"failed";
    }
}
