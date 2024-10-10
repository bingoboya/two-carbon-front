import * as echarts from "echarts/core";
import {
  GraphicComponent,
  GridComponent,
  LegendComponent,
  PolarComponent,
  TitleComponent,
  TooltipComponent,
  // MarkLineComponent,
  // DatasetComponent,
  // VisualMapComponent,
  // GeoComponent,
  // MarkPointComponent
} from "echarts/components";
import {
  BarChart,
  BoxplotChart,
  LineChart,
  PieChart,
  RadarChart,
  CustomChart,
  GaugeChart,
  PictorialBarChart,
  SankeyChart,
  MapChart,
  EffectScatterChart,
} from "echarts/charts";
import { UniversalTransition, LabelLayout } from "echarts/features";
import { CanvasRenderer, SVGRenderer } from "echarts/renderers";
import {
  Lines3DChart,
  Line3DChart,
  Map3DChart,
  Scatter3DChart,
  SurfaceChart,
} from "echarts-gl/charts";
import { Grid3DComponent } from "echarts-gl/components";

echarts.use([
  GraphicComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  LineChart,
  BarChart,
  PieChart,
  BoxplotChart,
  CanvasRenderer,
  // SVGRenderer
  UniversalTransition,
  RadarChart,
  PolarComponent,
  // LabelLayout
  // Lines3DChart,
  // Line3DChart,
  // Map3DChart,
  // Scatter3DChart,
  // SurfaceChart,
  // Grid3DComponent

  // CustomChart,
  // GaugeChart,
  // PictorialBarChart,
  // SankeyChart,
  // MapChart,EffectScatterChart
]);
// import * as echarts from 'echarts'
// import 'echarts-gl';  // 全量引入3d库

// 初始化语法糖
// const draw = (dom: HTMLElement, option: Record<string, any>) => {
//   const chart = echarts.init(dom);
//   chart.clear();
//   chart.setOption(option);
//   return chart;
// };

// export default {
//   ...echarts,
//   draw,
// } as any;
export default echarts;
