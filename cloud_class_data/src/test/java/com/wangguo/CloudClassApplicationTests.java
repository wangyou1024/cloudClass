package com.wangguo;

import com.wangguo.entity.Teacher;
import com.wangguo.mapper.TeacherMapper;
import org.junit.jupiter.api.Test;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.sql.DataSource;
import java.sql.SQLException;

@SpringBootTest
class CloudClassApplicationTests {
    @Autowired
    DataSource dataSource;
    @Autowired(required = false)
    TeacherMapper teacherMapper;
    @Test
    void contextLoads() throws SQLException {
        System.out.println(dataSource.getClass());
        System.out.println(dataSource.getConnection());
        teacherMapper.save(new Teacher("1000","1","1","1","1","1","1"));
    }

}
