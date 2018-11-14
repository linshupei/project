package com.ums.project.service;

import org.springframework.data.domain.Page;

import com.ums.project.entity.UserLoanInfo;
import com.ums.project.queryBean.UserLoanInfoQueryBean;
import com.ums.project.result.DataPage;

public interface UserLoanInfoService {
	
	public Page<UserLoanInfo> userInfoPageData(UserLoanInfoQueryBean queryBean, DataPage page);

	public UserLoanInfo findById(String id);

	/**
	 * 	同意放款
	 * @param id
	 * @param makeLoansLimit
	 * @param payDate
	 */
	public void agreeUserLoanInfo(String id, String makeLoansLimit, String payDate);

	/**
	 *	 拒绝放款
	 * @param id
	 * @param makeLoansLimit
	 * @param payDate
	 */
	public void loanDenied(String id);

	/**
	 * 	确认还款操作
	 * @param vo
	 * @return
	 */
	public void confirmLoan(String id);

	/**
	 * 	更新用户贷款信息
	 * @param vo
	 * @return
	 */
	public void updateUserLoanInfo(String id, String makeLoansLimit, String payDate);

}
