import React from "react";
import { IconMapPin, IconX } from "@tabler/icons-react";
import { Children } from "./Children";
import { Building } from "./Building";

interface ChildSheetProps {
  child: Children;
  index: number;
  onClick: (child: Children) => void;
}

function ChildSheet({ child, index, onClick }: ChildSheetProps) {
  return (
    <div
      key={index}
      style={{
        maxHeight: "150px",
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: "0.75rem",
        padding: "1rem",
        margin: "0.5rem 0",
        border: "solid 1px #ddd",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        display: "flex",
        alignItems: "center",
      }}
      onClick={() => onClick(child)}
    >
      <div
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "0.5rem",
          overflow: "hidden",
          marginRight: "1rem",
        }}
      >
        <img
          src={child.src}
          alt={child.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "0.25rem",
          }}
        >
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              margin: 0,
              color: "#333",
            }}
          >
            {child.name}
          </h3>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconMapPin
              size={"1.5rem"}
              strokeWidth={2}
              style={{ marginRight: "0.5rem", color: "#333" }}
            />
            <span
              style={{
                fontSize: "1rem",
                color: "#333",
                fontWeight: "bold",
              }}
            >
              {child.room}
            </span>
          </div>
        </div>

        <p
          style={{
            fontSize: "0.875rem",
            color: "#666",
            margin: 0,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            textOverflow: "ellipsis",
          }}
        >
          {child.description}
        </p>
      </div>
    </div>
  );
}

type BuildingCardProps = {
  building: Building | undefined;
  setBuilding: (building: Building | undefined) => void;
  setGroup: (group: Children | undefined) => void;
};

const BuildingCard: React.FC<BuildingCardProps> = ({
  building,
  setBuilding,
  setGroup,
}) => {
  if (!building) return null;

  return (
    <div
      style={{
        maxWidth: "800px",
        height: "100%",
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: "1rem 1rem 0 0",
        padding: "1rem",
        margin: "0 auto",
        border: "solid 1px #aaa",
        position: "relative",
      }}
    >
      <h2
        style={{
          fontSize: "1.25rem",
          fontWeight: "bold",
          marginTop: 0,
          marginBottom: "1rem",
        }}
      >
        {building.name}
      </h2>
      <div
        style={{
          overflow: "auto",
          height: "100%",
          width: "100%",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {building.children.map((child, index) => (
          <ChildSheet
            key={index}
            child={child}
            index={index}
            onClick={(selectedChild: Children) => {
              setGroup(selectedChild);
            }}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={() => {
          setBuilding(undefined);
          setGroup(undefined);
        }}
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          padding: "0.5rem",
          backgroundColor: "#ef4444",
          color: "#ffffff",
          borderRadius: "0.25rem",
        }}
      >
        <IconX size={"1rem"} strokeWidth={2} color={"black"} />
      </button>
    </div>
  );
};

export default BuildingCard;
