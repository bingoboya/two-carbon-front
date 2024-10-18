import { GET, POST, FILE, FILEPOST, PUT, GETNOBASE } from "../api";
import { generateData } from "../mockdata/index";

//TODO isMockLocal:true => 本地, false => 走本地nginx+node
const isMockLocal: any = (window as any)['__RUNTIME_CONFIG__'].IS_MOCK_LOCAL

const indexUrl = {
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

/**第一页 */
export const bengangfirstpage = async (param: any = {}, url?: string) => {
  console.log(222222, import.meta.env.VITE_APP_TITLE);
  const testEnv: any = (window as any)['__RUNTIME_CONFIG__']
  console.log('testEnv', testEnv);
  // {
  //   API_URL: 'https://api.example.com',
  //   FEATURE_FLAG: true
  // }
  if (isMockLocal) {
    const ret = await generateData("firstGenerateResponse");
    return ret.generateResponse(param);
  } else {
    const url1 = url || indexUrl.bengangfirstpage;
    return GET(url1, param);
  }
};
/**第二页 */
export const bengangsecondpage = async (param: any = {}, url?: string) => {
  if (isMockLocal) {
    const ret = await generateData("secondGenerateResponse");
    return ret.generateResponse(param);
  } else {
    const url1 = url || indexUrl.bengangsecondpage;
    return GET(url1, param);
  }
};
/**第三页 */
export const bengangthirdpage = async (param: any = {}, url?: string) => {
  if (isMockLocal) {
    const ret = await generateData("thirdGenerateResponse");
    return ret.generateResponse(param);
  } else {
    const url1 = url || indexUrl.bengangthirdpage;
    return GET(url1, param);
  }
};
/**第四页 */
export const bengangfourthpage = async (param: any = {}, url?: string) => {
  if (isMockLocal) {
    const ret = await generateData("fourthGenerateResponse");
    return ret.generateResponse(param);
  } else {
    const url1 = url || indexUrl.bengangfourthpage;
    return GET(url1, param);
  }
};

/**右上--报警次数 */
// export const alarmNum = (url?: string, param: any = {}) => {
//   const url1 = url || "/api/bigscreen/alarmNum";
//   return GET(url1, param);
// };
