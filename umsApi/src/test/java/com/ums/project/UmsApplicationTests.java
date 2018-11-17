package com.ums.project;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.ums.project.util.Base64Utils;

@RunWith(SpringRunner.class)
@SpringBootTest(classes=ServletInitializer.class)//不指定具体执行类，如果查询到多个springconfig会报错
public class UmsApplicationTests {

	@Test
	public void contextLoads() {
	}
	
	public static void main(String[] args) {
		
		System.out.println(Base64Utils.ImageToBase64ByLocal("H:\\老婆手机照片\\1.JPG"));
	}

}
