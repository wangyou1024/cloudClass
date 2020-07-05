package com.wangguo.controller;

import com.wangguo.service.MassageServiceImpl;
import lombok.extern.slf4j.Slf4j;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/message")
@CrossOrigin    //允许跨域
@Slf4j
public class MessageController {

    @Autowired
    MassageServiceImpl massageService;

    @PostMapping("/getMessageListForStudent")
    @ResponseBody
    public List<Map<String,Object>> getMessageListForStudent(@RequestBody JSONObject info){
        return massageService.getMassageListForStudent(info.getString("sphone"),info.getString("cid"));
    }

    @PostMapping("/getMessageListForTeacher")
    @ResponseBody
    public List<Map<String,Object>> getMessageListForTeacher(@RequestBody JSONObject info){
        return massageService.getMessageListForTeacher(info.getString("cid"));
    }

    @PostMapping("/insert")
    @ResponseBody
    public Integer insert(@RequestBody JSONObject info){
        return massageService.insert(info);
    }


}
