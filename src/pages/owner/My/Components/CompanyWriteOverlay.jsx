import React, { useEffect, useRef, useState } from "react";
import { STATUS_H, T } from "../../../owner/My/Components/styles";
import BackIconSrc from "../../../../assets/Back.svg";

export default function CompanyWriteOverlay({ onClose, onDone, initial, onDelete }) {
  const [kind, setKind] = useState("");
  const [phone, setPhone] = useState("");
  const [addr, setAddr] = useState("");
  const [bizno, setBizno] = useState("");
  const [about, setAbout] = useState("");
  const [scope, setScope] = useState("공개 범위 설정");
  const [scopeOpen, setScopeOpen] = useState(false);
  const scopeBtnRef = useRef(null);
  const overlayRef = useRef(null);
  const [panelTop, setPanelTop] = useState(0);

  useEffect(() => {
    if (initial) {
      setKind(initial.kind || initial.category || "");
      setPhone(initial.phone || "");
      setAddr(initial.addr || initial.address || "");
      setBizno(initial.bizno || initial.businessNumber || "");
      setAbout(initial.about || initial.description || "");
      setScope(initial.scope || "공개 범위 설정");
    } else {
      setKind("");
      setPhone("");
      setAddr("");
      setBizno("");
      setAbout("");
      setScope("공개 범위 설정");
    }
  }, [initial]);

  const openScope = () => {
    if (scopeBtnRef.current && overlayRef.current) {
      const fr = overlayRef.current.getBoundingClientRect();
      const br = scopeBtnRef.current.getBoundingClientRect();
      setPanelTop(br.bottom - fr.top + 6);
    }
    setScopeOpen((v) => !v);
  };

  const overlay = { position: "absolute", inset: 0, background: "#FFF", zIndex: 20 };
  const header = { position: "absolute", top: STATUS_H, left: 0, right: 0, height: 49, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid #EEE", background: "#FFF", zIndex: 21 };
  const back = { position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", width: 28, height: 28, cursor: "pointer" };
  const titleH = { fontFamily: "Pretendard", fontSize: 18, fontWeight: 700, letterSpacing: "-0.3px", color: "#111" };
  const scroll = { position: "absolute", top: STATUS_H + 49, bottom: 80, left: 0, right: 0, overflowY: "auto", padding: "14px 16px 24px 16px", boxSizing: "border-box", background: "#FFF" };
  const label = { fontFamily: "Pretendard", fontSize: 13, color: "#767676", margin: "10px 0 6px" };
  const input = { width: "100%", height: 40, borderRadius: 10, border: "1px solid #E5E5EA", background: "#FFF", outline: "none", padding: "10px 12px", fontSize: 14, boxShadow: "0 2px 6px rgba(0,0,0,0.04)", boxSizing: "border-box" };
  const textarea = { width: "100%", minHeight: 110, borderRadius: 10, border: "1px solid #E5E5EA", background: "#FFF", outline: "none", padding: "12px", fontSize: 14, lineHeight: 1.45, boxShadow: "0 2px 6px rgba(0,0,0,0.04)", boxSizing: "border-box", resize: "vertical" };
  const rowBetween = { display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12 };
  const scopeBtn = { width: 120, height: 34, borderRadius: 8, background: "#FFF", border: "1px solid #E5E5EA", boxShadow: "0 2px 6px rgba(0,0,0,0.04)", display: "inline-flex", alignItems: "center", justifyContent: "space-between", gap: 6, padding: "0 10px", fontSize: 12, cursor: "pointer" };
  const caret = { width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "6px solid #999" };
  const panel = { position: "absolute", zIndex: 25, width: 140, borderRadius: 8, background: "rgba(255,255,255,0.98)", boxShadow: "0 6px 16px rgba(0,0,0,0.12)", overflow: "hidden", right: 38, top: panelTop };
  const opt = (active) => ({ height: 36, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid #EEE", fontSize: 13, background: active ? "rgba(0,128,255,0.08)" : "#FFF", color: active ? "#0080FF" : "#111", fontWeight: active ? 700 : 400 });
  const ctaWrap = { position: "absolute", left: 0, right: 0, bottom: 24, display: "flex", justifyContent: "center", zIndex: 22 };
  const ctaBtn = { width: 330, height: 46, background: "#0080FF", color: "#FFF", fontSize: 16, fontWeight: 700, borderRadius: 8, border: "none", boxShadow: "0 4px 10px rgba(0, 128, 255, 0.3)", cursor: "pointer" };

  return (
    <div style={overlay} ref={overlayRef}>
      <div style={header}>
        <img src={BackIconSrc} alt="뒤로가기" style={back} onClick={onClose} />
        <div style={titleH}>업체등록</div>

        {initial?.id && (
          <button type="button" style={{ position: "absolute", right: 86, top: "50%", transform: "translateY(-50%)", padding: "6px 12px", fontSize: 12, fontWeight: 600, border: "1px solid #E5E5EA", borderRadius: 8, background: "#FFF", cursor: "pointer" }} onClick={onDelete}>
            삭제
          </button>
        )}

        <button type="button" style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", padding: "6px 12px", fontSize: 12, fontWeight: 600, border: "1px solid #E5E5EA", borderRadius: 8, background: "#FFF", cursor: "pointer" }} onClick={() => {}}>
          수정
        </button>
      </div>

      <div style={scroll}>
        <div style={label}>업종</div>
        <input style={input} value={kind} onChange={(e) => setKind(e.target.value)} />

        <div style={label}>연락처</div>
        <input style={input} value={phone} onChange={(e) => setPhone(e.target.value)} />

        <div style={label}>업체 위치</div>
        <input style={input} value={addr} onChange={(e) => setAddr(e.target.value)} />

        <div style={label}>사업자번호</div>
        <input style={input} value={bizno} onChange={(e) => setBizno(e.target.value)} />

        <div style={label}>간단한 소개</div>
        <textarea style={textarea} value={about} onChange={(e) => setAbout(e.target.value)} />

        <div style={rowBetween}>
          <div style={label}>공개여부</div>
          <button ref={scopeBtnRef} type="button" style={scopeBtn} onClick={openScope}>
            <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{scope}</span>
            <span style={caret} />
          </button>
        </div>
      </div>

      {scopeOpen && (
        <div style={{ position: "absolute", inset: 0, zIndex: 24 }} onClick={() => setScopeOpen(false)}>
          <div style={panel} onClick={(e) => e.stopPropagation()}>
            {["전체 공개", "나만 보기"].map((s, i) => (
              <div key={s} style={{ ...opt(scope === s), borderBottom: i === 1 ? "none" : "1px solid #EEE" }} onClick={() => { setScope(s); setScopeOpen(false); }}>
                {s}
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={ctaWrap}>
        <button type="button" style={ctaBtn} onClick={() => onDone?.({ kind, phone, addr, bizno, about, scope })}>
          완료
        </button>
      </div>
    </div>
  );
}