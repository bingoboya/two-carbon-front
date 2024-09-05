declare module "*.vue" {
  import { defineComponent } from "vue";
  const Component: ReturnType<typeof defineComponent>;
  export default Component;
}


declare module 'echarts' {
  const echarts: any
  export default echarts
}