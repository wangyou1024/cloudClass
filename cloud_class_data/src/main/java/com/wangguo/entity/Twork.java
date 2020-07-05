package com.wangguo.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Twork {
    private String twid;
    private String tid;
    private String cid;
    private String wtitle;
    private String tcontent;
    private String tpublish;
    private String deadline;
    private String scale;
}
