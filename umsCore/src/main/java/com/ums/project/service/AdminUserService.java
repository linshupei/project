package com.ums.project.service;

import com.ums.project.entity.AdminUser;

public interface AdminUserService {
	
	
	public AdminUser findAccountAndPassword(String account,String password);

	public AdminUser findByAccount(String account);

	public void updatePassword(String account, String oldPassword, String newPassword);
}
