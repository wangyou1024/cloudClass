package com.wangguo.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Swork {
    private String swid;
    private String twid;
    private String sid;
    private String scontent;
    private String spublish;
    private String correct;
    private String score;
    private String correction;
}
