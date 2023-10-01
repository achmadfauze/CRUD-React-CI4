
import Index from "views/Index.js";
import Barang from "views/pages/Barang.js";
import JenisBarang from "views/pages/JenisBarang.js";
import Transaksi from "views/pages/transaksi";
import Report from "views/pages/report.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/transaksi",
    name: "Transaksi",
    icon: "ni ni-shop text-primary",
    component: <Transaksi />,
    layout: "/admin",
  },
  {
    path: "/barang",
    name: "Barang",
    icon: "ni ni-box-2 text-info",
    component: <Barang />,
    layout: "/admin",
  },
  {
    path: "/jenis_barang",
    name: "Jenis Barang",
    icon: "ni ni-archive-2 text-info",
    component: <JenisBarang />,
    layout: "/admin",
  },
  {
    path: "/report",
    name: "Report",
    icon: "ni ni-chart-bar-32 text-red",
    component: <Report />,
    layout: "/admin",
  },
];
export default routes;
