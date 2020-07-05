package com.wangguo.controller;

import com.wangguo.entity.Teacher;
import com.wangguo.service.TeacherService;
import com.wangguo.util.CreateImageCode;
import com.wangguo.util.DefaultInfo;
import com.wangguo.util.MD5;
import lombok.extern.slf4j.Slf4j;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * @author 王游
 * @date 2020/5/31
 */
@Controller
@RequestMapping("/teacher")
@CrossOrigin    //允许跨域
@Slf4j
public class TeacherController {
    @Autowired
    private TeacherService teacherService;

    /**
     * @author 王游
     * @date 2020/6/5
     * @action 上传图片
     * @param request
     * @param file
     * @return
     */
    @PostMapping("/uploadImg")
    @ResponseBody
    public String FileUpdate (HttpServletRequest request,@RequestParam("avatar") MultipartFile file) {

        String phone =request.getParameter("phone");
        //表示获得服务器的绝对路径
        String str=DefaultInfo.TEACHER_IMG;
        //得到上传时的文件名字
        String originalname=file.getOriginalFilename();
        //substring(originalname.lastIndexOf(".")截取图片名后缀
        String newName= originalname.substring(originalname.lastIndexOf("."));
        //利用UUidUtil工具类生成新的文件名字
        newName =new Date().getTime()+newName;
        File newFile=new File(str,newName);

        //获得文件目录，判断是否存在
        if(!newFile.getParentFile().exists()) {
            //如果path路径不存在，创建一个文件夹，存在则使用当前文件夹
            newFile.getParentFile().mkdirs();
        }
        try {
            //保存文件到指定路径之中
            file.transferTo(newFile);
            Teacher teacher = teacherService.getInfo(phone);
            teacher.setTimage(newName);
            teacherService.update(teacher);
        } catch (IllegalStateException | IOException e) {
            e.printStackTrace();
        }
        log.info("phone:"+phone+"newName:"+newName);
        return str+"\\"+newName;


    }

    /**
     * @author 王游
     * @date 2020/6/4
     * @action 获取教师信息
     * @param info
     * @return
     * @throws Exception
     */
    @PostMapping("getInfo")
    @ResponseBody
    public Map<String, Object> getInfo(@RequestBody JSONObject info) throws Exception {
        Map<String, Object> result = new HashMap<>();
        result = DefaultInfo.convertToMap(teacherService.getInfo(info.getString("phone")));
        return result;
    }

    /**
     * @author 王游
     * @date 2020/6/4
     * @action 更新教师信息
     * @param info
     * @return
     */
    @PostMapping("update")
    @ResponseBody
    public Integer update(@RequestBody JSONObject info){
        Integer result = null;
        Teacher teacher = (Teacher)JSONObject.toBean(info,Teacher.class);
        if (teacher.getTpassword().equals("******")){
            teacher.setTpassword(teacherService.getInfo(teacher.getTphone()).getTpassword());
        }
        else {
            teacher.setTpassword(MD5.getInstance().getMD5(teacher.getTpassword()));
        }
        teacher.setTimage(teacherService.getInfo(teacher.getTphone()).getTimage());
        result = teacherService.update(teacher);
        return result;
    }

    /**
     * @author 王游
     * @date 2020/6/1
     * @action 登录
     * @param info
     * @param request
     * @return
     */
    @PostMapping("login")
    @ResponseBody
    public Map<String, String> login(@RequestBody JSONObject info, HttpServletRequest request) {
        Map<String, String> result = new HashMap<>();
        log.info("登录用户：" + info.get("tPhone"));
        log.info("接收到的验证码是" + info.getString("code"));
        Teacher teacher = new Teacher();
        teacher.setTid(new Date().getTime() + "");
        teacher.setTphone(info.getString("tPhone"));
        teacher.setTpassword(MD5.getInstance().getMD5(info.getString("tPassword")));
        String answer = teacherService.checkLogin(teacher.getTphone(), teacher.getTpassword());
        result.put("msg", answer);
        log.info(answer);
        return result;
    }

    /**
     * @author 王游
     * @date 2020/5/31
     * @action 注册
     * @param info
     * @param request
     * @return
     */
    @PostMapping("register")
    @ResponseBody
    public Map<String, String> register(@RequestBody JSONObject info, HttpServletRequest request) {
        Map<String, String> result = new HashMap<>();
        log.info("注册用户：" + info.get("tPhone"));
        log.info("接收到的验证码是" + info.getString("code"));
        Teacher teacher = new Teacher();
        teacher.setTid(new Date().getTime() + "");
        teacher.setTphone(info.getString("tPhone"));
        teacher.setTpassword(MD5.getInstance().getMD5(info.getString("tPassword")));
        teacher.setTemail(info.getString("tEmail"));
        teacher.setTcollege(info.getString("tCollege"));
        teacher.setTname(info.getString("tName"));
        String answer = teacherService.register(teacher);
        result.put("msg", answer);
        log.info(answer);
        return result;
    }

    /**
     * @author 王游
     * @date 2020/5/31
     * @action 生成验证码
     * @param request
     * @return
     */
    @GetMapping("getSecurityCode")
    @ResponseBody
    public Map<String, String> getCode(HttpServletRequest request) throws IOException {
        Map<String, String> result = new HashMap<>();
        CreateImageCode createImageCode = new CreateImageCode();
        // 获取验证码
        String securityCode = createImageCode.getCode();
        log.info(securityCode);
        //生成图片
        BufferedImage image = createImageCode.getBuffImg();
        //进行base64编码
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        ImageIO.write(image, "png", bos);
        String string = Base64Utils.encodeToString(bos.toByteArray());
        result.put("image", string);
        result.put("code",securityCode);
        return result;
    }

    /**
     * @author 王游
     * @date 2020/6/2
     * @action 返回头像
     * @param info
     * @param request
     * @return
     * @throws IOException
     */
    @PostMapping("getHeaderImg")
    @ResponseBody
    public Map<String, String> getHeaderImg(@RequestBody JSONObject info, HttpServletRequest request) throws IOException {
        Map<String,String> result = new HashMap<>();
        String name = teacherService.getImg(info.getString("phone"));
        if (name== null){
            name = "error.png";
        }
        String url = DefaultInfo.TEACHER_IMG+"\\"+name;
        log.info(info.getString("phone")+":"+url);
        BufferedImage image = ImageIO.read(new File(url));
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        ImageIO.write(image,"png",bos);
        String imgString = Base64Utils.encodeToString(bos.toByteArray());
        result.put("image",imgString);
        result.put("type","png");
        return result;
    }

}
