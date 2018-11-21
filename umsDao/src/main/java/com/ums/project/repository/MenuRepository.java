package com.ums.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ums.project.entity.Menu;

/**
 * desc：菜单数据操作库
 * @author Administrator
 *
 */
@Repository("menuRepository")
public interface MenuRepository  extends JpaRepository<Menu,String>{
	
	@Query("select menu from Menu menu where parentMenu is null ")
	public List<Menu> findData();

}
