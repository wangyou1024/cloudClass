package com.wangguo.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Course {
    private String cid;
    private String tid;
    private String cname;
    private String cdate;
    private Integer cnum;
    private String invite;
    private Integer archive;
}
