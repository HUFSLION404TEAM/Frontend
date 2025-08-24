// src/contexts/heartcontext.jsx
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { listHearts, addHeart, removeHeart } from "../api/heart";

// 전역 Heart 컨텍스트
const Ctx = createContext(null);

export function HeartProvider({ children }) {
  // 내부 세트: key = `${type}:${id}`
  const [heartSet, setHeartSet] = useState(() => new Set());

  // 앱 시작 시(선택): 필요한 타입의 찜 목록 미리 로드
  useEffect(() => {
    (async () => {
      try {
        const types = ["planner", "business", "post"]; // 필요한 타입만 남기세요
        const s = new Set();
        for (const t of types) {
          try {
            const res = await listHearts(t);
            const arr = Array.isArray(res?.items)
              ? res.items
              : Array.isArray(res)
              ? res
              : Array.isArray(res?.content)
              ? res.content
              : [];
            arr.forEach((x) => {
              const id = x?.id ?? x?.targetId ?? x?.target?.id;
              if (id != null) s.add(`${t}:${id}`);
            });
          } catch {
            // 타입별 실패는 무시 (로그인 전/권한 문제 등)
          }
        }
        setHeartSet(s);
      } catch {}
    })();
  }, []);

  const api = useMemo(
    () => ({
      isHeart(type, id) {
        return heartSet.has(`${type}:${id}`);
      },
      async toggle(type, id) {
        const key = `${type}:${id}`;

        // 낙관적 업데이트
        const next = new Set(heartSet);
        let rollback;
        if (next.has(key)) {
          next.delete(key);
          rollback = () => setHeartSet((prev) => new Set(prev).add(key));
          setHeartSet(next);
          try {
            await removeHeart(type, id);
          } catch (e) {
            rollback?.();
            throw e;
          }
        } else {
          next.add(key);
          rollback = () =>
            setHeartSet((prev) => {
              const s = new Set(prev);
              s.delete(key);
              return s;
            });
          setHeartSet(next);
          try {
            await addHeart(type, id);
          } catch (e) {
            rollback?.();
            throw e;
          }
        }
      },
    }),
    [heartSet]
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useHeart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("HeartProvider로 앱을 감싸주세요.");
  return ctx;
}
