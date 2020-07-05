package com.wangguo.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @author 郭伟
 * @date 2020/6/9
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TeachCourse {
    private String tcid;
    private String tid;
    private String cid;
    private Integer tarchive;
    private Integer job;
    private Integer tsort;
}
