package com.ums.project.memcaced;

import java.net.InetSocketAddress;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import net.rubyeye.xmemcached.XMemcachedClient;
import net.rubyeye.xmemcached.XMemcachedClientBuilder;
import net.rubyeye.xmemcached.command.BinaryCommandFactory;
import net.rubyeye.xmemcached.utils.AddrUtil;

@Component
@PropertySource("classpath:application.properties")
public class MemcachedConfiguration {
	
    @Value("${memcache.serverlist}")
	private String serverlist="127.0.0.1:11211";
	
    @Value("${memcache.poolname}")
	private String poolname="sidsock";
    
    @Value("${memcache.useMemcache}")
	private String useMemcache="true";

    @Value("${memcache.connectionPoolSize}")
	private int connectionPoolSize=15;

	/**
	 * 默认超时时间，单位秒,设置默认超时时间为8小时
	 */
	private int defaultExpiryTime =3600*8;//8小时
	
	private XMemcachedClient xMemcachedClient=null;

	
	//集群服务器的连接地址，以逗号分隔
	private static List<String> serverAddrList=new ArrayList<String>();
	/**
	 * 
	 */
	public MemcachedConfiguration() {
		String[] serverAddrArray=serverlist.split(",");
		for(String serverAddr:serverAddrArray){
			serverAddrList.add(serverAddr);
		}		

		try {
			List<InetSocketAddress> isaList=new ArrayList<InetSocketAddress>();
			for(String serverAddr:serverAddrList){
				isaList.addAll(AddrUtil.getAddresses(serverAddr));
			}
		     XMemcachedClientBuilder builder = new XMemcachedClientBuilder(isaList);
		     // 设置连接池大小，即客户端个数  
		     builder.setConnectionPoolSize(connectionPoolSize);  
		     //宕机报警  
	         builder.setFailureMode(true);  
	         //使用二进制文件  
		     builder.setCommandFactory(new BinaryCommandFactory());  
		     builder.setOpTimeout(1000*20);
		     xMemcachedClient= (XMemcachedClient) builder.build();
		     
		} catch (Exception e) {
			e.printStackTrace();
		}
			
	}
	
	/**
	 * 获取默认的超时时间，默认8小时<br>
	 * @return 返回是超时的秒
	 */
	private int getExpiryDate() {
		return defaultExpiryTime;
	}
	/**
	 * 将日期数据转成超时时间秒数
	 * @param expiryDate
	 * @return
	 */
	private int getExpiryDate(Date expiryDate) {
		long now=System.currentTimeMillis();
		long temp=expiryDate.getTime()-now;
		int r=(int) (temp/1000);//毫秒转成秒
		//因为转成int时，自动向下取整，所以秒数+1
		++r;
		//logger.info("超时时间转换,"+expiryDate+"->"+r);
		return r;
		
	}
	/**
	 * 判断是否存在
	 * @param id
	 * @return
	 */
	public boolean sessionExists(String id) {
		Object o=this.get(id);
		return o!=null;
	}
	/**
	 * 根据key获取值，如果存在，则更新超时时间为默认的8小时
	 * @param key
	 * @param create
	 * @return
	 */
	public Object get(String key, boolean create) {
		try {
			Object value = this.xMemcachedClient.get(key);
			if (null!=value) {
				this.xMemcachedClient.replace(key, getExpiryDate(), value);
			}
			return value;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	/**
	 * 保存数据，超时时间默认8小时
	 * @param key
	 * @param value
	 */
	public void save(String key, Object value) {
		try {
			this.xMemcachedClient.set(key, getExpiryDate(), value);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	/**
	 * 保存数据并设置超时时间
	 * @param key
	 * @param value
	 * @param expiryDate 为了兼容旧api,依旧使用Date
	 */
	public void saveOutTime(String key, Object value, Date expiryDate) {
		try {
			this.xMemcachedClient.set(key, getExpiryDate(expiryDate), value);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public boolean add(String key,Object value){
		boolean result = false;
		try {
			result =  this.xMemcachedClient.add(key,  getExpiryDate(), value);
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			return result;
		}		
	}
	
	
	public boolean add(String key,Object value,int  expiryDate){
		boolean result = false;
		try {
			result =  this.xMemcachedClient.add(key,expiryDate, value);
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			return result;
		}		
	}
	/**
	 * 删除key
	 * @param key
	 */
	public void remove(String key) {
		try {
			this.xMemcachedClient.delete(key);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	/**
	 * 刷新某个key的超时时间<br>
	 * 超时时间是默认超时时间
	 * @param id
	 */
	public void updateExpiryDate(String id) {
		try {
			Object val=this.xMemcachedClient.get(id);
			if(null!=val){
				this.xMemcachedClient.replace(id, getExpiryDate(), val);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	/**
	 * 对象被垃圾回收站回收时，释放资源
	 */
	protected void finalize() {
		if(null!=this.xMemcachedClient){
			try {
				this.xMemcachedClient.shutdown();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
    /**
     * 根据指定的KEY获取数据
     */
    public Object get(String key) {
    	//logger.info("SessionService->get(key:"+key+"})");
    	try {
    		return this.xMemcachedClient.get(key);
		} catch (Exception e) {
			e.printStackTrace();
		}
       return null;
    }

	public String getServerlist() {
		return serverlist;
	}

	public void setServerlist(String serverlist) {
		this.serverlist = serverlist;
	}

	public String getPoolname() {
		return poolname;
	}

	public void setPoolname(String poolname) {
		this.poolname = poolname;
	}

	public String getUseMemcache() {
		return useMemcache;
	}

	public void setUseMemcache(String useMemcache) {
		this.useMemcache = useMemcache;
	}

	public int getConnectionPoolSize() {
		return connectionPoolSize;
	}

	public void setConnectionPoolSize(int connectionPoolSize) {
		this.connectionPoolSize = connectionPoolSize;
	}

	public int getDefaultExpiryTime() {
		return defaultExpiryTime;
	}

	public void setDefaultExpiryTime(int defaultExpiryTime) {
		this.defaultExpiryTime = defaultExpiryTime;
	}

	public XMemcachedClient getxMemcachedClient() {
		return xMemcachedClient;
	}

	public void setxMemcachedClient(XMemcachedClient xMemcachedClient) {
		this.xMemcachedClient = xMemcachedClient;
	}

	public static List<String> getServerAddrList() {
		return serverAddrList;
	}

	public static void setServerAddrList(List<String> serverAddrList) {
		MemcachedConfiguration.serverAddrList = serverAddrList;
	}
    
    
    
}
