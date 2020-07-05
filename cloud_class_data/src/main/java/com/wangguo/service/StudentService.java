package com.wangguo.service;

import com.wangguo.entity.Student;
import com.wangguo.entity.Teacher;

/**
 * @author 王游
 * @date 2020/6/2
 */
public interface StudentService {
    public Integer update(Student student);
    public Student getInfo(String phone);
    public String register(Student student);
    public String checkLogin(String phone,String password);
    public String getImg(String phone);
}
