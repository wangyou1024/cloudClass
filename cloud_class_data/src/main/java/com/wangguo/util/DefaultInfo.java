package com.wangguo.util;

import java.lang.reflect.Field;
import java.util.HashMap;

/**
 * @author 王游
 * @date 2020/6/2
 */
public class DefaultInfo {
    public static final String TEACHER_IMG = "E:\\computer2\\file\\header\\teacher";
    public static final String STUDENT_IMG = "E:\\computer2\\file\\header\\student";

    public static HashMap<String, Object> convertToMap(Object obj)
            throws Exception {

        HashMap<String, Object> map = new HashMap<String, Object>();
        Field[] fields = obj.getClass().getDeclaredFields();
        for (int i = 0, len = fields.length; i < len; i++) {
            String varName = fields[i].getName();
            boolean accessFlag = fields[i].isAccessible();
            fields[i].setAccessible(true);
            Object o = fields[i].get(obj);
            if (o != null)
                map.put(varName, o.toString());

            fields[i].setAccessible(accessFlag);
        }

        return map;
    }
}
