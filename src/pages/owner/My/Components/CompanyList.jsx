import React from "react";
import SectionHeader from "./SectionHeader";
import CompanyItem from "./CompanyItem";
export default function CompanyList({ companies, onAdd, onEdit }) {
  return (
    <>
      <SectionHeader title="업체" actionLabel="추가" onAction={onAdd} />
      <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
        {companies.map((c) => (
          <CompanyItem key={c.id} company={c} onEdit={onEdit} />
        ))}
      </div>
    </>
  );
}