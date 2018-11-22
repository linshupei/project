package com.ums.project.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ums.project.entity.AdminUser;
import com.ums.project.repository.AdminUserRepository;
import com.ums.project.service.AdminUserService;

@Service("adminUserService")
public class AdminUserServiceImpl implements AdminUserService{

	@Resource(name="adminUserRepository")
	private AdminUserRepository adminUserRepository;
	
	public AdminUser findAccountAndPassword(String account,String password){
		return adminUserRepository.findByAccountAndPassword(account, password);
	}

	@Override
	public AdminUser findByAccount(String account) {
		return adminUserRepository.findByAccount(account);
	}

	@Override
	public void updatePassword(String account, String oldPassword, String newPassword) {
		 
		adminUserRepository.updatePassword(account,oldPassword,newPassword);
	}
}
