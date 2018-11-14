package com.ums.project.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ums.project.entity.UserInfo;

@Repository("userInfoRepository")
public interface UserInfoRepository  extends JpaRepository<UserInfo,String>{
	
	 public Page<UserInfo> findAll(Specification<UserInfo> spec, Pageable pageable);
}
