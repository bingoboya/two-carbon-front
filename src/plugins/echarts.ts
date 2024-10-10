// vue-echarts
import ECharts from "vue-echarts";
import * as echarts from "echarts/core";
// import 'echarts-gl';  // 全量引入3d库
import {
  Lines3DChart,
  Line3DChart,
  Map3DChart,
  Scatter3DChart,
  SurfaceChart,
} from "echarts-gl/charts";
import { Grid3DComponent } from "echarts-gl/components";
import { /* CanvasRenderer  , */ SVGRenderer } from "echarts/renderers";
import { LabelLayout } from "echarts/features";
import {
  CustomChart,
  GaugeChart,
  PictorialBarChart,
  SankeyChart,
  BarChart,
  PieChart,
  MapChart,
  EffectScatterChart,
  LineChart,
} from "echarts/charts";
import {
  GridComponent,
  MarkLineComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  DatasetComponent,
  VisualMapComponent,
  GeoComponent,
  MarkPointComponent,
} from "echarts/components";
echarts.use([
  Map3DChart,
  Lines3DChart,
  Grid3DComponent,
  Scatter3DChart,
  SurfaceChart,
  Line3DChart,
  CustomChart,
  LabelLayout,
  // CanvasRenderer,
  SVGRenderer,
  SankeyChart,
  MarkLineComponent,
  GaugeChart,
  PictorialBarChart,
  BarChart,
  PieChart,
  MapChart,
  EffectScatterChart,
  LineChart,
  GridComponent,
  LegendComponent,
  TooltipComponent,
  TitleComponent,
  DatasetComponent,
  VisualMapComponent,
  GeoComponent,
  MarkPointComponent,
]);

export const registerEcharts = (app: any) => {
  app.component("v-chart", ECharts);
};
