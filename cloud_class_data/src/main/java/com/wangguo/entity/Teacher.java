package com.wangguo.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @author 王游
 * @date 2020/5/31
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Teacher {
    private String tid;
    private String tphone;
    private String temail;
    private String tpassword;
    private String tname;
    private String tcollege;
    private String timage;
}
