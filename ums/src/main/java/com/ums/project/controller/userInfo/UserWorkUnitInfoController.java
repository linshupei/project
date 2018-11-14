package com.ums.project.controller.userInfo;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ums.project.entity.UserWorkUnitInfo;
import com.ums.project.queryBean.UserEmergencyContactQueryBean;
import com.ums.project.queryBean.UserWorkUnitInfoQueryBean;
import com.ums.project.result.DataPage;
import com.ums.project.result.TableData;
import com.ums.project.service.UserWorkUnitInfoService;
import com.ums.project.vo.useWorkUnitInfoVo;

@RestController
public class UserWorkUnitInfoController {
	
	@Resource(name="userWorkUnitInfoService")
	private UserWorkUnitInfoService userWorkUnitInfoService;
	
	@RequestMapping("/api/userWorkUnitInfos")
	public TableData userWorkUnitInfos(@RequestParam(required=false) String userInfoId,@RequestParam(required=false) String keyword,@RequestParam int page,@RequestParam int limit) {
		 UserWorkUnitInfoQueryBean queryBean = new  UserWorkUnitInfoQueryBean();
		DataPage datapage = new DataPage();
		queryBean.setKey(keyword);
		queryBean.setUserInfoId(userInfoId);
		datapage.setLimit(limit);
		datapage.setPage(page);
		
		List<useWorkUnitInfoVo> userInfos = new ArrayList<useWorkUnitInfoVo>();
		Page<UserWorkUnitInfo> userInfoPageData = userWorkUnitInfoService.userInfoPageData(queryBean, datapage);
		
		for( UserWorkUnitInfo info:userInfoPageData) {
			useWorkUnitInfoVo vo = new useWorkUnitInfoVo();
			vo.setId(info.getId());
			vo.setWorkUnitAddress(info.getWorkUnitAddress());
			vo.setWorkUnitName(info.getWorkUnitName());
			vo.setWorkUnitPhone(info.getWorkUnitPhone());		
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
