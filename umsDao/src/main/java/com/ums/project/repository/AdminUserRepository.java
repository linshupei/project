package com.ums.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ums.project.entity.AdminUser;

/**
 * desc：用户贷款信息数据操作库
 * @author Administrator
 *
 */
@Repository("adminUserRepository")
public interface AdminUserRepository  extends JpaRepository<AdminUser,String>{
	

	@Query("select aui from AdminUser aui where aui.account=:account and password=:password")
	public AdminUser findAccountAndPassword(String account,String password);

	public AdminUser findByAccount(String account);


}
