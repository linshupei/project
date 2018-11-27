package com.ums.project;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.ums.project.entity.AppUserInfo;
import com.ums.project.entity.Menu;
import com.ums.project.repository.AppUserInfoRepository;
import com.ums.project.repository.MenuRepository;
import com.ums.project.vo.MenuVo;

//@RunWith(SpringRunner.class)
//@SpringBootTest
public class UmsDaoApplicationTests {

	//@Resource(name="menuRepository")
   private MenuRepository menuRepository;
	
	//@Test
	public void contextLoads() {
		/*
		List<Menu> findAll = menuRepository.findAll();
	    List<MenuVo> datas = new ArrayList<MenuVo>();
	    for(Menu me:findAll){
	    	MenuVo vo = new MenuVo();
	    	vo.setChildren(new ArrayList<MenuVo>(0));
	    	vo.setFont(me.getFont());
	    	vo.setIcon(me.getIcon());
	    	vo.setId(me.getId());
	    	vo.setPid(me.getPid());
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
		ObjectMapper objectMapper = new ObjectMapper();
		String fileJson = objectMapper.writeValueAsString(datas);
		System.out.println(fileJson );*/
	}

}
