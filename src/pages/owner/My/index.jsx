import React, { useEffect, useState } from "react";
import {
  getBusinesses,
  addBusiness,
  updateBusiness,
  deleteBusiness,
} from "../../../api/mypage";

import HeaderBar from "./Components/HeaderBar";
import ProfileSummary from "./Components/ProfileSummary";
import MatchHistory from "./Components/MatchHistory";
import CompanyList from "./Components/CompanyList";
import EditProfilePanel from "./Components/EditProfilePanel";
import CompanyWriteOverlay from "./Components/CompanyWriteOverlay";
import { STATUS_H, HEADER_H } from "../../owner/My/Components/styles";

export default function MyOwner() {
  const [view, setView] = useState("main"); // 'main' | 'edit'
  const [regOpen, setRegOpen] = useState(false);
  const [companies, setCompanies] = useState([
    { id: "dummy-1", name: "업체A", meta: "경기도 용인시 · 카페" },
    { id: "dummy-2", name: "업체B", meta: "수원시 팔달구 · 분식" },
    { id: "dummy-3", name: "업체C", meta: "영통구 · 디저트" },
  ]);
  const [editing, setEditing] = useState(null);

  const refreshBusinesses = async () => {
    try {
      const list = await getBusinesses();
      if (Array.isArray(list)) {
        setCompanies(
          list.map((b) => ({
            id: b.businessNumber ?? b.id ?? String(b.businessNumber ?? b.id ?? Date.now()),
            serverId: b.businessNumber ?? b.id ?? null,
            name: b.name ?? b.storeName ?? b.businessName ?? "업체",
            meta: `${b.address ?? b.addr ?? ""}${b.address || b.addr ? " · " : ""}${b.category ?? b.kind ?? ""}`,
            kind: b.kind ?? b.category,
            phone: b.phone ?? b.contact,
            addr: b.address ?? b.addr,
            bizno: b.businessNumber ?? b.bizno ?? b.registerNumber,
            about: b.about ?? b.description,
            scope: b.scope ?? (b.visibility === "PRIVATE" ? "나만 보기" : "전체 공개"),
          }))
        );
      }
    } catch (e) {
      console.warn("refreshBusinesses failed", e);
    }
  };

  useEffect(() => {
    refreshBusinesses();
  }, []);

  const handleDeleteOne = async (item) => {
    setCompanies((prev) => prev.filter((c) => c.id !== item.id));
    const targetId = item?.serverId ?? item?.bizno ?? item?.id;
    try {
      if (targetId == null) throw new Error("No business id");
      await deleteBusiness(targetId);
    } catch (e) {
      console.warn("deleteBusiness failed", e);
    }
    await refreshBusinesses();
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", background: "#f0f0f0", minHeight: "100vh" }}>
      <div style={{ width: 390, height: 844, background: "#FFF", position: "relative", border: "1px solid #000" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: STATUS_H, background: "#FFDDE4" }} />
        <HeaderBar />

        {view === "main" && (
          <div style={{ position: "absolute", top: STATUS_H + HEADER_H + 16, left: "50%", transform: "translateX(-50%)", width: 320 }}>
            <div style={{ width: 320, display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#111" }}>마이페이지</div>
              <button style={{ padding: "4px 10px", border: "1px solid #E5E5EA", borderRadius: 8, background: "#FFF" }} onClick={() => setView("edit")}>
                프로필 편집
              </button>
            </div>

            <ProfileSummary />
            <MatchHistory />
            <CompanyList
              companies={companies}
              onAdd={() => {
                setEditing(null);
                setRegOpen(true);
              }}
              onEdit={(c) => {
                setEditing(c);
                setRegOpen(true);
              }}
            />

            <div style={{ height: 24 }} />
          </div>
        )}

        {view === "edit" && <EditProfilePanel onBack={() => setView("main")} />}

        {regOpen && (
          <CompanyWriteOverlay
            initial={editing}
            onClose={() => {
              setRegOpen(false);
              setEditing(null);
            }}
            onDone={async (payload) => {
              try {
                if (editing?.id) {
                  const key = editing.serverId ?? editing.bizno ?? editing.id;
                  const saved = await updateBusiness(key, payload);
                  const merged = saved || payload;
                  setCompanies((prev) =>
                    prev.map((c) =>
                      c.id === editing.id
                        ? {
                            ...c,
                            ...merged,
                            name: c.name || "업체",
                            meta: `${merged.addr ?? c.addr ?? ""}${merged.addr || c.addr ? " · " : ""}${merged.kind ?? c.kind ?? ""}`,
                          }
                        : c
                    )
                  );
                } else {
                  const created = await addBusiness(payload);
                  const newItem = created
                    ? {
                        id: created.businessNumber ?? created.id ?? String(Date.now()),
                        serverId: created.businessNumber ?? created.id ?? null,
                        name: created.name ?? created.storeName ?? created.businessName ?? "업체",
                        meta: `${created.address ?? ""}${created.address ? " · " : ""}${created.category ?? created.kind ?? ""}`,
                        kind: created.kind ?? created.category,
                        phone: created.phone ?? created.contact,
                        addr: created.address ?? created.addr,
                        bizno: created.businessNumber ?? created.bizno ?? created.registerNumber,
                        about: created.about ?? created.description,
                        scope: created.scope,
                      }
                    : {
                        id: String(Date.now()),
                        serverId: null,
                        name: "업체",
                        meta: `${payload.addr ?? ""}${payload.addr ? " · " : ""}${payload.kind ?? ""}`,
                        ...payload,
                      };
                  setCompanies((prev) => [newItem, ...prev]);
                }
                setRegOpen(false);
                setEditing(null);
              } catch (e) {
                console.error(e);
                alert("저장에 실패했습니다.");
              }
            }}
            onDelete={
              editing?.id
                ? async () => {
                    try {
                      await handleDeleteOne(editing);
                    } finally {
                      setRegOpen(false);
                      setEditing(null);
                    }
                  }
                : undefined
            }
          />
        )}
      </div>
    </div>
  );
}