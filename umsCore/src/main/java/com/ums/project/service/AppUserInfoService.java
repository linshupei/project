package com.ums.project.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.ums.project.entity.AppUserInfo;
import com.ums.project.queryBean.AppUserInfoQueryBean;
import com.ums.project.result.DataPage;

public interface AppUserInfoService {
	
	public Page<AppUserInfo> userInfoPageData(AppUserInfoQueryBean queryBean, DataPage page);

	public String resetPassword(String id);

	public AppUserInfo findByUserAccount(String userAccount);
	
	public List<AppUserInfo> findListByUserAccount(String userAccount);
	
	public AppUserInfo findByUserAccountAndPassword(String userAccount,String password);

	public void save(AppUserInfo info);

	public void updateSmsRecordUploadTime(String id, long currentTimeMillis);

	public void updateCallRecordUploadTime(String id, long currentTimeMillis);
	
	public void updateContactRecordUploadTime(String id, long currentTimeMillis);

	public void updateLoanNum(String id, String loanNum);
}
