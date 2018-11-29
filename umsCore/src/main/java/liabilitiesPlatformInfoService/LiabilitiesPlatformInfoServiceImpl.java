package liabilitiesPlatformInfoService;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ums.project.entity.LiabilitiesPlatformInfo;
import com.ums.project.entity.UserLiabilitiesInfo;
import com.ums.project.repository.LiabilitiesPlatformInfoRepository;
import com.ums.project.service.LiabilitiesPlatformInfoService;

/**
 * desc：负债平台service
 * @author Administrator
 *
 */
@Service("liabilitiesPlatformInfoService")
public class LiabilitiesPlatformInfoServiceImpl implements LiabilitiesPlatformInfoService {

	@Resource(name="liabilitiesPlatformInfoRepository")
	private LiabilitiesPlatformInfoRepository liabilitiesPlatformInfoRepository;
	
	@Override
	public List<LiabilitiesPlatformInfo> findAll(){
		List<LiabilitiesPlatformInfo> findAll = liabilitiesPlatformInfoRepository.findAll();
		return findAll;
	}
}
