package com.wangguo.service;

import com.wangguo.entity.Course;
import com.wangguo.mapper.CourseMapper;
import com.wangguo.mapper.MessageMapper;
import com.wangguo.mapper.TworkMapper;
import com.wangguo.util.DefaultInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Base64Utils;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.*;

@Service
public class CourseServiceImpl implements CourseService{

    @Autowired
    private CourseMapper courseMapper;
    @Autowired
    private MessageMapper messageMapper;
    @Autowired
    private TworkMapper tworkMapper;

    @Override
    public Integer updateCourse(String cid, String cname, String cdate) {
        return courseMapper.updateCourse(cid, cname, cdate);
    }

    @Override
    public Integer deleteCourse(String cid) {
        return courseMapper.deleteCourse(cid);
    }

    @Override
    public Integer archiveCourse(String cid, Integer archive) {
        return courseMapper.archiveCourse(cid, archive);
    }

    public List<Map> getCourseByTeacher(String tid) {
        List<Map> teacherList = courseMapper.getCourseByTeacher(tid);
        for (int i = 0; i < teacherList.size(); i++) {
            String work = "无";
            if (tworkMapper.getLastWork(teacherList.get(i).get("cid").toString()).size() > 0)
                work = tworkMapper.getLastWork(teacherList.get(i).get("cid").toString()).get(0).get("wtitle");
            teacherList.get(i).put("work", work);
        }
        return teacherList;
    }

    public List<Map> getCourseByStudent(String sid) {
        List<Map> studentList = courseMapper.getCourseByStudent(sid);
        for (int i = 0; i < studentList.size(); i++) {
            String work = "无";
            if (tworkMapper.getLastWork(studentList.get(i).get("cid").toString()).size() > 0)
                work = tworkMapper.getLastWork(studentList.get(i).get("cid").toString()).get(0).get("wtitle");
            studentList.get(i).put("work", work);
        }
        return studentList;
    }


    @Override
    public Integer insert(Course course) {
        return courseMapper.insert(course);
    }

    @Override
    public Course getCourseByInvite(String courseCode) {
        Course course = courseMapper.findByInvite(courseCode);
        return course;
    }

    @Override
    public List<Map> getCourseMember(String cid) throws IOException {
        List<Map> memberList = courseMapper.selectCourseTeacher(cid);
        for (int i = 0; i < memberList.size(); i++) {
            if ("0".equals(memberList.get(i).get("job").toString())) {
                memberList.get(i).replace("job","管理员");
            }
            else {
                memberList.get(i).replace("job","老师/助教");
            }
            if (memberList.get(i).get("image") == null) {
                memberList.get(i).put("image","error.png");
            }
            String name = memberList.get(i).get("image").toString();
            String url = DefaultInfo.TEACHER_IMG+"\\"+name;
            BufferedImage image = ImageIO.read(new File(url));
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            ImageIO.write(image,"png",bos);
            String imgString = Base64Utils.encodeToString(bos.toByteArray());
            memberList.get(i).replace("image",imgString);
        }
        return memberList;
    }

    @Override
    public List<Map> getCourseStudent(String cid) throws IOException {
        List<Map> studentList = courseMapper.selectCourseSelect(cid);
        for (int i = 0; i < studentList.size(); i++) {
            studentList.get(i).putIfAbsent("image", "error.png");
            String name = studentList.get(i).get("image").toString();
            String url = DefaultInfo.STUDENT_IMG+"\\"+name;
            BufferedImage image = ImageIO.read(new File(url));
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            ImageIO.write(image,"png",bos);
            String imgString = Base64Utils.encodeToString(bos.toByteArray());
            studentList.get(i).replace("image",imgString);
        }
        return studentList;
    }

    @Override
    public List<Map> getCourseGrade(String cid) {
        List<Map> courseGrade = courseMapper.selectCourseGrade(cid);
        System.out.println("name: " + courseGrade.get(0).get("sname").toString());
        return courseGrade;
    }


    //    王游
    @Override
    public Course findById(String id) {
        return courseMapper.findById(id);
    }

    @Override
    public Integer updateNameById(String id, String name) {
        Integer result = 0;
        Map<String,Object> message = new HashMap<>();
        message.put("mid",new Date().getTime());
        message.put("cid",id);
        message.put("mtitle","课程更名");
        message.put("mcontent","课程更名为"+name);
        String now = Calendar.getInstance().get(Calendar.YEAR)+"/"+
                (Calendar.getInstance().get(Calendar.MONTH)+1)+"/"+
                Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
        message.put("mpublish",now);
        message.put("mnum","-1");
        result += messageMapper.insertMassage(message);
        HashMap<String,Object> info = new HashMap<>();
        info.put("id",id);
        info.put("name",name);
        return courseMapper.updateNameById(info);
    }
}
