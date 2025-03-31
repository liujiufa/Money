import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import DataPageLoding from "../components/DataPageLoding";
import MainLayout from "../Layout/MainLayout";
import DeputyLayout from "../Layout/DeputyLayout";
const Home = React.lazy(() => import("../view/Home"));
const IDO = React.lazy(() => import("../view/IDO"));
const Consensus = React.lazy(() => import("../view/Consensus"));
const USDTWithdraw = React.lazy(() => import("../view/USDTWithdraw"));
const USDTTransfer = React.lazy(() => import("../view/USDTTransfer"));
const InviteRecord = React.lazy(() => import("../view/InviteRecord"));
const AssetsRecord = React.lazy(() => import("../view/AssetsRecord"));
export default function Router() {
  return (
    <Suspense fallback={<DataPageLoding></DataPageLoding>}>
      <Routes>
        <Route path="/*" element={<MainLayout />}>
          <Route path=":address/">
            <Route index element={<Home />}></Route>
            <Route path="IDO" element={<IDO />}></Route>
            <Route path="Consensus" element={<Consensus />}></Route>
            <Route path="USDTWithdraw" element={<USDTWithdraw />}></Route>
            <Route path="USDTTransfer" element={<USDTTransfer />}></Route>
            <Route path="InviteRecord" element={<InviteRecord />}></Route>
            <Route path="AssetsRecord" element={<AssetsRecord />}></Route>
          </Route>
          <Route path="" element={<Home />}></Route>
        </Route>
        <Route path="/DeputyLayout" element={<DeputyLayout />}></Route>
      </Routes>
    </Suspense>
  );
}
