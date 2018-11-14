package com.ums.project.controller.userInfo;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.jsp.tagext.PageData;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ums.project.entity.UserInfo;
import com.ums.project.queryBean.UserInfoQueryBean;
import com.ums.project.result.DataPage;
import com.ums.project.result.ResetPasswordResult;
import com.ums.project.result.TableData;
import com.ums.project.service.UserInfoService;
import com.ums.project.vo.UserInfoVo;

@RestController
public class UserInfoController {
	
	@Resource(name="userInfoService")
	private UserInfoService userInfoService;
	
	/**
	 * 分页查询列表
	 * @param keyword
	 * @param page
	 * @param limit
	 * @return
	 */
	@RequestMapping("/api/userInfos")
	public TableData UserInfoPageData(@RequestParam(required=false) String keyword,@RequestParam int page,@RequestParam int limit) {
		
		UserInfoQueryBean queryBean = new UserInfoQueryBean();
		queryBean.setKey(keyword);
		DataPage datapage = new DataPage();
		queryBean.setKey(keyword);
		datapage.setLimit(limit);
		datapage.setPage(page);
		
		List<UserInfoVo> userInfos = new ArrayList<UserInfoVo>();
		Page<UserInfo> userInfoPageData = userInfoService.userInfoPageData(queryBean, datapage);
		for(UserInfo userInfo:userInfoPageData) {
			UserInfoVo vo = new UserInfoVo();
			vo.setUserAccount(userInfo.getUserAccount());
			vo.setMobileRealNameTime(userInfo.getMobileRealNameTime());
			vo.setId(userInfo.getId());
			vo.setAlipayAccount(userInfo.getAlipayAccount());
			vo.setBankCard(userInfo.getBankCard());
			vo.setBankCardImage(userInfo.getBankCardImage());
			vo.setHuaBei(userInfo.getHuaBei());
			vo.setIdCard(userInfo.getIdCard());
			vo.setIdCardHand(userInfo.getIdCardHand());
			vo.setIdCardOtherSize(userInfo.getIdCardOtherSize());
			vo.setIdCardPositive(userInfo.getIdCardPositive());
			vo.setMobile(userInfo.getMobile());
			vo.setMobileServicePassword(userInfo.getMobileServicePassword());
			vo.setSex(userInfo.getSex());
			vo.setUserName(userInfo.getName());
			vo.setZhiMaFen(userInfo.getZhiMaFen());			
			vo.setZhiMaFenImage(userInfo.getZhiMaFenImage());
			vo.setHuaBeiImage(userInfo.getHuaBeiImage());
			userInfos.add(vo);
		}
	
		
		TableData td = new TableData();
		td.setCode("0");
		td.setCount(userInfoPageData.getNumber());
		td.setMsg("");
		td.setData(userInfos);
		
		return td;
	}
}
