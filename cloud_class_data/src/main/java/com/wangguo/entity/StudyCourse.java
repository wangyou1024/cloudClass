package com.wangguo.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @author 郭伟
 * @date 2020/6/13
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class StudyCourse {
    private String scid;
    private String sid;
    private String cid;
    private String grade;
    private Integer sarchive;
    private Integer sort;
}
