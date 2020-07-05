package com.wangguo.service;

import com.wangguo.entity.Teacher;
import com.wangguo.mapper.TeacherMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author 王游
 * @date 2020/5/31
 */
@Service
public class TeacherServiceImpl implements TeacherService {
    @Autowired
    TeacherMapper teacherMapper;

    /**
     * @author 王游
     * @date 2020/6/5
     * @action 更新教师信息
     * @param teacher
     * @return
     */
    @Override
    public Integer update(Teacher teacher){
        Integer effectRow = teacherMapper.update(teacher);
        return effectRow;
    }

    /**
     * @author 王游
     * @date 2020/6/4
     * @action 获取教师信息
     * @param phone
     * @return
     */
    @Override
    public Teacher getInfo(String phone) {
        Teacher teacher = null;
        teacher = teacherMapper.findByPhone(phone);
        return teacher;
    }

    /**
     * @author 王游
     * @date 2020/6/1
     * @action 注册
     * @param teacher
     * @return
     */
    @Override
    public String register(Teacher teacher){
        String result = "error";
        if (teacherMapper.findByPhone(teacher.getTphone()) != null) {
            result = "haveTeacher";
        } else {
            teacherMapper.save(teacher);
            result = "ok";
        }
        return result;
    }

    /**
     * @author 王游
     * @date 2020/6/1
     * @action 登录验证
     * @param phone
     * @param password
     * @return
     */
    @Override
    public String checkLogin(String phone, String password) {
        String result = "ok";
        Teacher teacher = teacherMapper.findByPhone(phone);
        if (teacher == null) {
            result = "noTeacher";
        } else if (teacher.getTpassword().equals(password) == false) {
            result = "errorPassword";
        }
        return result;
    }

    /**
     * @author 王游
     * @date 2020/6/2
     * @action 通过号码查询头像
     * @param phone
     * @return
     */
    @Override
    public String getImg(String phone){
        String result = null;
        Teacher teacher = teacherMapper.findByPhone(phone);
        if (teacher == null) {
            result = "error.png";
        } else {
            result = teacher.getTimage();
        }
        return result;
    }
}
