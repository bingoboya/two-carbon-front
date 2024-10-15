import { GET, POST, FILE, FILEPOST, PUT, GETNOBASE } from "../api";
const indexUrl = {
  leftTop: "/bigscreen/countDeviceNum", //左上
  leftCenter: "/bigscreen/countUserNum", //左中
  centerMap: "/bigscreen/centerMap",
  centerBottom: "/bigscreen/installationPlan",

  leftBottom: "/bigscreen/leftBottom", //坐下
  rightTop: "/api/bigscreen/alarmNum", //报警次数
  rightBottom: "/bigscreen/rightBottom", //右下
  rightCenter: "/bigscreen/ranking", // 报警排名


  // 本钢模块接口
  // 第一页
  bengangfirstpage: "/api/bigscreen/bengang/firstpage",
  // 第二页
  bengangsecondpage: "/api/bigscreen/bengang/secondpage",
  // 第三页
  bengangthirdpage: "/api/bigscreen/bengang/thirdpage",
  // 第四页
  bengangfourthpage: "/api/bigscreen/bengang/fourthpage",
};

// export default indexUrl;

/**第一页 */
export const bengangfirstpage = (url?: string, param: any = {}) => {
  const url1 = url || indexUrl.bengangfirstpage;
  return GET(url1, param);
};
/**第二页 */
export const bengangsecondpage = (url?: string, param: any = {}) => {
  const url1 = url || indexUrl.bengangsecondpage;
  return GET(url1, param);
};
/**第三页 */
export const bengangthirdpage = (url?: string, param: any = {}) => {
  const url1 = url || indexUrl.bengangthirdpage;
  return GET(url1, param);
};
/**第四页 */
export const bengangfourthpage = (param: any = {}, url?: string ) => {
  console.log("bengangfourthpage", param);
  
  const url1 = url || indexUrl.bengangfourthpage;
  return GET(url1, param);
};






/**右上--报警次数 */
export const alarmNum = (url?: string, param: any = {}) => {
  const url1 = url || "/api/bigscreen/alarmNum";
  return GET(url1, param);
  // return GET(indexUrl.rightTop,param)
};


/**左上--设备内总览 */
export const countDeviceNum = (param: any = {}) => {
  return GET(indexUrl.leftTop, param);
};

/**左中--用户总览 */
export const countUserNum = (param: any = {}) => {
  return GET(indexUrl.leftCenter, param);
};

/**左下--设备提醒 */
export const leftBottom = (param: any = {}) => {
  return GET(indexUrl.leftBottom, param);
};

/**中上--地图 */
export const centerMap = (param: any = {}) => {
  return GET(indexUrl.centerMap, param);
};

/**中下--安装计划 */
export const installationPlan = (param: any = {}) => {
  return GET(indexUrl.centerBottom, param);
};



/**右中--报警排名 */
export const ranking = (param: any = {}) => {
  return GET(indexUrl.rightCenter, param);
};

/**右下--设备状态 */
export const rightBottom = (param: any = {}) => {
  return GET(indexUrl.rightBottom, param);
};
