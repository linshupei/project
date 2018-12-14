package com.ums.project;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;

import javax.annotation.Resource;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.util.DigestUtils;

import com.ums.project.memcaced.MemcachedConfiguration;

@RunWith(SpringRunner.class)
@SpringBootTest(classes=ServletInitializer.class)//不指定具体执行类，如果查询到多个springconfig会报错
public class UmsApplicationTests {

	@Resource(name="memcachedConfiguration")
	MemcachedConfiguration memcachedConfiguration;
	@Test
	public void contextLoads() {
		memcachedConfiguration.add("123","123");
	}
	
	public static void main(String[] args) {
		
		System.out.println("test");
		Timestamp t = new  Timestamp(1544768330000L);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		System.out.println(sdf.format(t));
	}

}
