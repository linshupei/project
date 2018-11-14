package com.ums.project.quartz;


import javax.annotation.Resource;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.ums.project.service.UserLoanInfoService;

/**
 * desc：用户贷款状态变更定时任务
 * @author Administrator
 *
 */
@Component
public class UserLoanStatusQuartz {

	@Resource(name="userLoanInfoService")
	private UserLoanInfoService userLoanInfoService;
	
	@Scheduled(cron = "0 */5 * * * * ")
	public void updateUserLoanStatus(){
		userLoanInfoService.findOutDateUserLoanInfos();
	}

}
