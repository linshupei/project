package com.ums.project.controller;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ums.project.result.MenuResult;
import com.ums.project.service.MenuService;
import com.ums.project.vo.MenuVo;

@RestController
public class MenuDataController {
	
	@Resource(name="menuService")
	private MenuService menuService;
	
	@RequestMapping("/api/menuData")
	public MenuResult memuData() {
		MenuResult result = new MenuResult();
		result.setCode("1");
		result.setMsg("success");
		result.setData(new ArrayList<MenuVo>(0));
		
		List<MenuVo> menu = menuService.getMenu();
		ObjectMapper objectMapper = new ObjectMapper();
		String fileJson;
		try {
			fileJson = objectMapper.writeValueAsString(menu);
			result.setData(menu);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return result;
	}

}
