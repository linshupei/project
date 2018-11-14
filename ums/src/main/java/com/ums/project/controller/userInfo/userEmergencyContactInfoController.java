package com.ums.project.controller.userInfo;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ums.project.entity.UserEmergencyContact;
import com.ums.project.queryBean.UserEmergencyContactQueryBean;
import com.ums.project.result.DataPage;
import com.ums.project.result.TableData;
import com.ums.project.service.UserEmergencyContactService;
import com.ums.project.vo.userEmergencyContactInfoVo;

@RestController
public class userEmergencyContactInfoController {
	
	@Resource(name="userEmergencyContactService")
	private UserEmergencyContactService userEmergencyContactService;
	
	@RequestMapping("/api/userEmergencyContactInfos")
	public TableData userLiabilitiesInfos(@RequestParam(required=false) String userInfoId,@RequestParam(required=false) String keyword,@RequestParam int page,@RequestParam int limit) {
		UserEmergencyContactQueryBean queryBean = new UserEmergencyContactQueryBean();
		DataPage datapage = new DataPage();
		queryBean.setKey(keyword);
		queryBean.setUserInfoId(userInfoId);
		datapage.setLimit(limit);
		datapage.setPage(page);
		
		List<userEmergencyContactInfoVo> userInfos = new ArrayList<userEmergencyContactInfoVo>();
		Page<UserEmergencyContact> userInfoPageData = userEmergencyContactService.userInfoPageData(queryBean, datapage);
		for(UserEmergencyContact info:userInfoPageData) {
			userEmergencyContactInfoVo vo = new userEmergencyContactInfoVo();
			vo.setId(info.getId());
			vo.setMobile(info.getMobile());
			vo.setName(info.getName());			
			
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
