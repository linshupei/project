package com.ums.project.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ums.project.entity.UserLoanInfo;

/**
 * desc：用户贷款信息数据操作库
 * @author Administrator
 *
 */
@Repository("userLoanInfoRepository")
public interface UserLoanInfoRepository  extends JpaRepository<UserLoanInfo,String>{
	

	public Page<UserLoanInfo> findAll(Specification<UserLoanInfo> spec, Pageable pageable);

	 @Modifying //update或delete时必须使用@Modifying对方法进行注解，才能使得ORM知道现在要执行的是写操作
	 @Query("update UserLoanInfo set makeLoansLimit=:makeLoansLimit,payDate=:payDate,status='2' where id = :id")
	public void agreeUserLoanInfo(String id, String makeLoansLimit, String payDate);

	 @Modifying
	 @Query("update UserLoanInfo set status='1' where id = :id")
	public void loanDenied(String id);

	 @Modifying
	 @Query("update UserLoanInfo set status='4' where id = :id")
	public void confirmLoan(String id);

	 @Modifying
	 @Query("update UserLoanInfo set makeLoansLimit=:makeLoansLimit,payDate=:payDate where id = :id")
	public void updateUserLoanInfo(String id, String makeLoansLimit, String payDate);
}
