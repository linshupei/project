package com.ums.project.controller.userInfo;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ums.project.entity.UserLiabilitiesInfo;
import com.ums.project.queryBean.UserLiabilitiesInfoQueryBean;
import com.ums.project.queryBean.UserLoanInfoQueryBean;
import com.ums.project.result.DataPage;
import com.ums.project.result.ResetPasswordResult;
import com.ums.project.result.TableData;
import com.ums.project.service.UserLiabilitiesInfoService;
import com.ums.project.vo.AppUserInfoVo;
import com.ums.project.vo.UserLiabilitiesInfoVo;

/**
 * desc：用户负债信息controller
 * @author Administrator
 *
 */
@RestController
public class UserLiabilitiesInfoController {
	
	@Resource(name="userLiabilitiesInfoService")
	private UserLiabilitiesInfoService userLiabilitiesInfoService;
	
	@RequestMapping("/api/userLiabilitiesInfos")
	public TableData userLiabilitiesInfos(@RequestParam(required=false) String userInfoId,@RequestParam(required=false) String keyword,@RequestParam int page,@RequestParam int limit) {
		
		UserLiabilitiesInfoQueryBean queryBean = new UserLiabilitiesInfoQueryBean();
		DataPage datapage = new DataPage();
		queryBean.setKey(keyword);
		queryBean.setUserInfoId(userInfoId);
		datapage.setLimit(limit);
		datapage.setPage(page);
		
		List<UserLiabilitiesInfoVo> userInfos = new ArrayList<UserLiabilitiesInfoVo>();
		Page<UserLiabilitiesInfo> userInfoPageData = userLiabilitiesInfoService.userInfoPageData(queryBean, datapage);
		
		for(UserLiabilitiesInfo info:userInfoPageData) {
			UserLiabilitiesInfoVo vo = new UserLiabilitiesInfoVo();
			vo.setId(info.getId());
			vo.setLiabilitiesAmount(info.getLiabilitiesAmount());
			vo.setLiabilitiesPlatform(info.getLiabilitiesPlatformInfo().getLiabilitiesPlatformName());		
			userInfos.add(vo);
		}
	
		TableData td = new TableData();
		td.setCode("0");
		td.setCount(userInfoPageData.getTotalElements());
		td.setMsg("");
		td.setData(userInfos);
		
		return td;
	}
}
