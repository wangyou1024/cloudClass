package com.wangguo.util;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.Random;


/**
 * @author 郭伟
 * @date 2020/6/9
 */
public class CourseCode {
    public static String getCode(int length) {
        StringBuilder val = new StringBuilder();
        Random random = new Random();

        for(int i = 0; i < length; i++)
        {
            String charOrNum = random.nextInt(2) % 2 == 0 ? "char" : "num"; // 输出字母还是数字

            if("char".equalsIgnoreCase(charOrNum)) // 字符串
            {
                val.append((char) (65 + random.nextInt(26)));
            }
            else if("num".equalsIgnoreCase(charOrNum)) // 数字

            {
                val.append(random.nextInt(10));
            }

        }
        return val.toString();
    }


    public static String getRandomNum(int length) {
        StringBuilder val = new StringBuilder();
        Random random = new Random();

        for(int i = 0; i < length; i++)
        {
            val.append(random.nextInt(10));
        }
        return val.toString();
    }
}
