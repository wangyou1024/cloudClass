package com.wangguo.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @author 王游
 * @date 2020/6/2
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Student {
    private String sid;
    private String sphone;
    private String semail;
    private String spassword;
    private String snum;
    private String sname;
    private String scollege;
    private String simage;
}
