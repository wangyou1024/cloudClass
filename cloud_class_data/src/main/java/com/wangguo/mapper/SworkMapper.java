package com.wangguo.mapper;

import com.wangguo.entity.Swork;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Mapper
@Repository
public interface SworkMapper {
    /**
     * @author 王游
     * @date 2020/6/13
     * @action 需要修改的个数
     * @param twid
     * @return
     */
    Integer getNeedCorrect(String twid);

    /**
     * @author 王游
     * @date 2020/6/13
     * @action 已经修改的个数
     * @param twid
     * @return
     */
    Integer getCorrected(String twid);

    /**
     * @author 王游
     * @date 2020/6/13
     * @action 未提交的个数
     * @param twid
     * @return
     */
    Integer getLock(String twid);

    /**
     * @author 王游
     * @date 2020/6/13
     * @action 根据作业id删除
     * @param twid
     * @return
     */
    Integer deleteByTwid(String twid);

    /**
     * @author 王游
     * @date 2020/6/13
     * @action 获得已经提交内容
     * @param twid
     * @return
     */
    List<Map<String,Object>> getSubmit(String twid);

    /**
     * @author 王游
     * @date 2020/6/13
     * @action 获得未提交内容
     * @param twid
     * @return
     */
    List<Map<String,Object>> getNoSubmit(String twid);

    /**
     * @author 王游
     * @date 2020/6/13
     * @action 更新批语
     * @param info
     * @return
     */
    Integer updateCorrection(Map<String,Object> info);

    Integer updateScore(Map<String,Object> info);

    Integer updateSContent(Map<String, Object> info);

    Integer insert(Swork swork);
}
