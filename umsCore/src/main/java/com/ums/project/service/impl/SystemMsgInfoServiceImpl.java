package com.ums.project.service.impl;

import javax.annotation.Resource;
import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.ums.project.entity.SystemMsgInfo;
import com.ums.project.repository.SystemMsgInfoRepository;
import com.ums.project.result.DataPage;
import com.ums.project.service.SystemMsgInfoService;


/**
 * desc：系统消息service
 * @author Administrator
 *
 */
@Service("systemMsgInfoService")
@Transactional
public class SystemMsgInfoServiceImpl implements SystemMsgInfoService {

	@Resource(name="systemMsgInfoRepository")
	private SystemMsgInfoRepository systemMsgInfoRepository;
	
	public Page<SystemMsgInfo> userInfoPageData(DataPage page){
			
		Sort sort = new Sort(Sort.Direction.DESC, "id");
		Pageable pageable = PageRequest.of(page.getPage()-1,page.getLimit(),sort); //页码：前端从1开始，jpa从0开始，做个转换
		Page<SystemMsgInfo> userInfoPageData = systemMsgInfoRepository.findAll(pageable );
		
		return userInfoPageData;
	}

	@Override
	public void updateSystemMsgReadStatus(String id, String value) {
		systemMsgInfoRepository.updateSystemMsgReadStatus(id,value);
	}

	@Override
	public void batchDeleteSystemMsgReadStatus(String[] idStr) {
		systemMsgInfoRepository.batchDeleteSystemMsgReadStatus(idStr);
	}


}
