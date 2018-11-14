package com.ums.project;

import javax.annotation.Resource;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.test.context.junit4.SpringRunner;

import com.ums.project.entity.AppUserInfo;
import com.ums.project.entity.UserInfo;
import com.ums.project.queryBean.AppUserInfoQueryBean;
import com.ums.project.queryBean.UserInfoQueryBean;
import com.ums.project.repository.AppUserInfoRepository;
import com.ums.project.repository.UserInfoRepository;
import com.ums.project.result.DataPage;
import com.ums.project.service.AppUserInfoService;
import com.ums.project.service.UserInfoService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UmsApplicationTests {
	
	@Resource(name="appUserInfoService")
	private AppUserInfoService appUserInfoService;
	
	@Resource(name="userInfoService")
	private UserInfoService userInfoService;

	@Test
	public void contextLoads() { 
		AppUserInfoQueryBean bean = new AppUserInfoQueryBean();
		bean.setKey("linsp");
		DataPage page = new DataPage();
		page.setLimit(10);
		page.setPage(1);
		Page<AppUserInfo> data = appUserInfoService.userInfoPageData(bean, page);
		System.out.println(data.getContent().size());
	}

}
