package com.wangguo.mapper;

import com.wangguo.entity.Twork;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;


@Mapper
@Repository
public interface TworkMapper {
    /**
     * @author 王游
     * @date 2020/6/13
     * @action 通过课程id查找作业
     * @param id
     * @return
     */
    List<Map<String,Object>> findWorksByCourseId(String id);

    /**
     * @author 王游
     * @date 2020/6/13
     * @action 为学生查找消息
     * @param info
     * @return
     */
    List<Map<String,Object>> findWorksForStudent(Map<String,Object> info);

    /**
     * @author 王游
     * @date 2020/6/13
     * @actin 根据id查找一个作业
     * @param twid
     * @return
     */
    Map<String,Object> findWorkByTwid(String twid);

    /**
     * @author 王游
     * @date 2020/6/13
     * @acion 更新作业
     * @param twork
     * @return
     */
    Integer update(Twork twork);

    /**
     * @author 王游
     * @date 2020/6/13
     * @actin 删除作业
     * @param twid
     * @return
     */
    Integer delete(String twid);

    /**
     * @author 王游
     * @date 2020/6/13
     * @action 新增作业
     * @param twork
     * @return
     */
    Integer insert(Twork twork);

    /**
     * @author 王游
     * @date 2020/6/13
     * @action 获得所有的作业名称列表
     * @param cid
     * @return
     */
    List<Map<String,Object>> getWorkList(String cid);

    /**
     * @author 郭伟
     * @date 2020/6/20
     * @param cid
     * @return
     */
    List<Map<String,String>> getLastWork(String cid);
}
