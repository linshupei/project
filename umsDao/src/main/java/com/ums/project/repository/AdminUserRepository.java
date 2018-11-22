package com.ums.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.ums.project.entity.AdminUser;

/**
 * desc：用户贷款信息数据操作库
 * @author Administrator
 *
 */
@Repository("adminUserRepository")
public interface AdminUserRepository  extends JpaRepository<AdminUser,String>{
	

	@Query("select aui from AdminUser aui where aui.account=:account and password=:password")
	public AdminUser findByAccountAndPassword(@Param("account") String account,@Param("password") String password);

	public AdminUser findByAccount(String account);

	 @Modifying
	 @Transactional
	@Query("update AdminUser  set password=:newPassword  where account=:account and password=:oldPassword")
	public void updatePassword(@Param("account") String account, @Param("oldPassword") String oldPassword, @Param("newPassword") String newPassword);


}
