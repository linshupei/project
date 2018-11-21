package com.ums.project.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ums.project.entity.Menu;
import com.ums.project.repository.MenuRepository;
import com.ums.project.service.MenuService;
import com.ums.project.vo.MenuVo;

@Service("menuService")
public class MenuServiceImpl implements MenuService{

	@Resource(name="menuRepository")
	private MenuRepository menuRepository;
	
	public List<MenuVo> getMenu(){

		List<Menu> findAll = menuRepository.findAll();
	    List<MenuVo> datas = new ArrayList<MenuVo>();
	    List<MenuVo> returnDatas =  new ArrayList<MenuVo>();
	    for(Menu me:findAll){
	    	MenuVo vo = new MenuVo();
	    	vo.setChildren(new ArrayList<MenuVo>(0));
	    	vo.setFont(me.getFont());
	    	vo.setIcon(me.getIcon());
	    	vo.setId(me.getId());
	    	vo.setPid(me.getPid()==null?"0":me.getPid());
	    	vo.setSpread(me.getSpread());
	    	vo.setTitle(me.getTitle());
	    	vo.setUrl(me.getUrl());
	    	datas.add(vo);
	    }
	    
		for(MenuVo menu:datas){
			if(menu.getPid()!=null){
				for(MenuVo parent:datas){
					if(menu.getPid().equals(parent.getId())){
						parent.getChildren().add(menu);
						break;
					}
				}
			}
		}
		
		for(MenuVo menu:datas) {
			if("0".equals(menu.getPid())) {
				returnDatas.add(menu);
			}
		}
		return returnDatas;
	}
}
