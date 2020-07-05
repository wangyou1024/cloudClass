package com.wangguo.controller;

import com.wangguo.entity.Swork;
import com.wangguo.service.SworkService;
import com.wangguo.service.SworkServiceImpl;
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
@RequestMapping("/swork")
@CrossOrigin    //允许跨域
@Slf4j
public class SworkController {

    @Autowired
    SworkService sworkService;

    @PostMapping("/getAnswers")
    @ResponseBody
    public List<Map<String,Object>> getAnswers(@RequestBody JSONObject info){
        List<Map<String,Object>> result = null;
        switch (info.getString("kind")){
            case "0": result = sworkService.getAll(info.getString("twid"));break;
            case "1": result = sworkService.getSubmit(info.getString("twid"));break;
            case "2": result = sworkService.getNoSubmit(info.getString("twid"));break;
            default: result = sworkService.getAll(info.getString("twid"));break;
        }
        return result;
    }

    @PostMapping("/updateCorrection")
    @ResponseBody
    public Map<String,Object> updateCorrection(@RequestBody JSONObject info){
        Map<String,Object> result = new HashMap<>();
        result.put("result",sworkService.updateCorrection(info.getString("id"),info.getString("correction")));
        return result;
    }

    @PostMapping("/updateScore")
    @ResponseBody
    public Map<String,Object> updateScore(@RequestBody JSONObject info){
        Map<String,Object> result = new HashMap<>();
        result.put("result",sworkService.updateScore(info.getString("id"),info.getString("score")));
        return result;
    }

    @PostMapping("/updateSContent")
    @ResponseBody
    public Map<String,Object> updateSContent(@RequestBody JSONObject info){
        Map<String,Object> result = new HashMap<>();
        result.put("result",sworkService.updateSContent(info.getString("swid"),info.getString("content")));
        return result;
    }

    @PostMapping("/insert")
    @ResponseBody
    public Map<String,Object> insert(@RequestBody JSONObject info){
        Map<String,Object> result = new HashMap<>();
        Swork swork = (Swork) JSONObject.toBean(info,Swork.class);
        swork.setSwid(new Date().getTime()+"");
        result.put("result",sworkService.insert(swork));
        return result;
    }
}
