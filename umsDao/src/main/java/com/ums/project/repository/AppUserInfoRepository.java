package com.ums.project.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ums.project.entity.AppUserInfo;

@Repository("appUserInfoRepository")
public interface AppUserInfoRepository  extends JpaRepository<AppUserInfo,String>{

	@Query("select aui from AppUserInfo aui where aui.id = :id")
	public List<AppUserInfo> queryList(String id);
	
	public Page<AppUserInfo> findAll(Specification<AppUserInfo> spec, Pageable pageable);
	
	 @Modifying //update或delete时必须使用@Modifying对方法进行注解，才能使得ORM知道现在要执行的是写操作
	 @Query("update AppUserInfo set loginPassword=:password where id = :appUserId")
	public void resetPassword(String appUserId, String password);

	public AppUserInfo findByUserAccount(String userAccount);

	public AppUserInfo findByUserAccountAndLoginPassword(String userAccount, String loginPassword);
}
