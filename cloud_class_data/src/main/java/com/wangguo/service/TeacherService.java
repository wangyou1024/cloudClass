package com.wangguo.service;

import com.wangguo.entity.Teacher;

/**
 * @author 王游
 * @date 2020/5/31
 */
public interface TeacherService {
    public Integer update(Teacher teacher);
    public Teacher getInfo(String phone);
    public String register(Teacher teacher);
    public String checkLogin(String phone,String password);
    public String getImg(String phone);
}
