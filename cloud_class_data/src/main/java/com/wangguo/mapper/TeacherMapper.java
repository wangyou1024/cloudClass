package com.wangguo.mapper;

import com.wangguo.entity.Teacher;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;


/**
 * @author 王游
 * @date 2020/5/31
 */
@Mapper
@Repository
public interface TeacherMapper {

    /**
     * @author 王游
     * @date 2020/6/4
     * @param teacher
     * @return
     */
    Integer update(Teacher teacher);

    /**
     * @author 王游
     * @date 2020/6/1
     * @action 保存
     * @param teacher
     */
    void save(Teacher teacher);

    /**
     * @author 王游
     * @date 2020/6/1
     * @action 通过号码查询
     * @param phone
     * @return
     */
    Teacher findByPhone(String phone);

}
