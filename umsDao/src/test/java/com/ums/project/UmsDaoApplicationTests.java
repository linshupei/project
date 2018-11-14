package com.ums.project;

import java.util.List;

import javax.annotation.Resource;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.ums.project.entity.AppUserInfo;
import com.ums.project.repository.AppUserInfoRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UmsDaoApplicationTests {

	@Resource(name="appUserInfoRepository")
	private AppUserInfoRepository appUserInfoRepository;
	
	@Test
	public void contextLoads() {
		List<AppUserInfo> findAll = appUserInfoRepository.findAll();
		System.out.println(findAll.size());
	}

}
