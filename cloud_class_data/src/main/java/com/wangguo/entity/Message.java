package com.wangguo.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Message {
    private String mid;
    private String cid;
    private String mtitle;
    private String mcontent;
    private String mpublish;
    private String mnum;
}
