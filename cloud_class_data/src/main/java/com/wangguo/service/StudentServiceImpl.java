package com.wangguo.service;

import com.wangguo.entity.Student;
import com.wangguo.entity.Teacher;
import com.wangguo.mapper.StudentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author 王游
 * @date 2020/6/2
 */
@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentMapper studentMapper;

    /**
     * @author 王游
     * @date 2020/6/5
     * @action 更新学生信息
     * @param student
     * @return
     */
    @Override
    public Integer update(Student student){
        Integer effectRow = studentMapper.update(student);
        return effectRow;
    }

    /**
     * @author 王游
     * @date 2020/6/4
     * @action 获取学生信息
     * @param phone
     * @return
     */
    @Override
    public Student getInfo(String phone) {
        Student student = null;
        student = studentMapper.findByPhone(phone);
        return student;
    }

    /**
     * @author 王游
     * @date 2020/6/2
     * @action 注册
     * @param student
     * @return
     */
    @Override
    public String register(Student student) {
        String result = "error";
        if (studentMapper.findByPhone(student.getSphone()) != null) {
            result = "haveStudent";
        } else {
            studentMapper.save(student);
            result = "ok";
        }
        return result;
    }

    /**
     * @author 王游
     * @date 2020/6/2
     * @action 登录验证
     * @param phone
     * @param password
     * @return
     */
    @Override
    public String checkLogin(String phone, String password) {
        String result = "ok";
        Student student = studentMapper.findByPhone(phone);
        if (student == null) {
            result = "noStudent";
        } else if (student.getSpassword().equals(password) == false) {
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
        Student student = studentMapper.findByPhone(phone);
        if (student == null) {
            result = "error.png";
        } else {
            result = student.getSimage();
        }
        return result;
    }
}
