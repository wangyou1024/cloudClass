package com.wangguo.controller;

import com.wangguo.entity.Twork;
import com.wangguo.service.CourseService;
import com.wangguo.service.TworkService;
import lombok.extern.slf4j.Slf4j;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/twork")
@CrossOrigin    //允许跨域
@Slf4j
public class TworkController {
    @Autowired
    private TworkService tworkService;

    /**
     * @param info
     * @return
     * @author 王游
     * @date 2020/6/13
     * @action 为了教师端展示数据
     */
    @PostMapping("/findWorksForTeacher")
    @ResponseBody
    public List<Map<String, Object>> findWorksForTeacher(@RequestBody JSONObject info) {
        String id = info.getString("id");
        return tworkService.findTworkByCourseIdForTeacher(id);
    }

    @PostMapping("/findWorksForStudent")
    @ResponseBody
    public List<Map<String, Object>> findWorksForStudent(@RequestBody JSONObject info) {
        String cid = info.getString("cid");
        String sid = info.getString("sid");
        return tworkService.findTworkByCourseIdForStudent(cid,sid);
    }

    /**
     * @param info
     * @return
     * @author 王游
     * @date 2020/6/13
     * @action 为了获取某个
     */
    @PostMapping("/findWorksByTwid")
    @ResponseBody
    public Map<String, Object> findWorksByTwid(@RequestBody JSONObject info) {
        String id = info.getString("id");
        return tworkService.findTworkByTwid(id);
    }

    /**
     * @param info
     * @return
     * @author 王游
     * @date 2020/6/13
     * @acion 更新数据
     */
    @PostMapping("/update")
    @ResponseBody
    public Map<String, Object> update(@RequestBody JSONObject info) {
        Twork twork = (Twork) JSONObject.toBean(info, Twork.class);
        Map<String, Object> result = new HashMap<>();
        result.put("result", tworkService.update(twork));
        return result;
    }

    /**
     * @param info
     * @return
     * @author 王游
     * @date 2020/6.13
     * @action 删除作业信息
     */
    @PostMapping("/delete")
    @ResponseBody
    public Map<String, Object> delete(@RequestBody JSONObject info) {
        Map<String, Object> result = new HashMap<>();
        result.put("result", tworkService.delete(info.getString("id")));
        return result;
    }

    /**
     * @param info
     * @return
     * @author 王游
     * @date 2020/6/13
     * @action 新增作业
     */
    @PostMapping("/insert")
    @ResponseBody
    public Map<String, Object> insert(@RequestBody JSONObject info) {
        Twork twork = (Twork) JSONObject.toBean(info, Twork.class);
        String twid = new Date().getTime() + "";
        twork.setTwid(twid);
        Map<String, Object> result = new HashMap<>();
        result.put("result", tworkService.insert(twork));
        result.put("twid", twid);
        return result;
    }


    /**
     * @author 王游
     * @date 2020/6/13
     * @action 查询所有的作业名称
     * @param info
     * @return
     */
    @PostMapping("/getNameList")
    @ResponseBody
    public List<Map<String, Object>> getNameList(@RequestBody JSONObject info){
        List<Map<String, Object>> result = tworkService.getNameList(info.getString("id"));
        return result;
    }

}
