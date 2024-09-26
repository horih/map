import React from "react";
import { IconWorld, IconMapPin, IconX } from "@tabler/icons-react";
import { Children } from "./Children";

type GroupCardProps = {
  group: Children | undefined;
  setGroup: (group: Children | undefined) => void;
};

const GroupCard: React.FC<GroupCardProps> = ({ group, setGroup }) => {
  if (!group) return null;

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
      <div
        style={{
          overflow: "auto",
          height: "100%",
          width: "100%",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "50%",
          }}
        >
          <img
            src={group.src}
            alt={group.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <div style={{ padding: "1rem" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              margin: 0,
              color: "#333",
            }}
          >
            {group.name}
          </h2>
          <p
            style={{
              fontSize: "1.5rem",
              color: "#333",
              margin: 0,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <IconWorld
              size={"1.5rem"}
              strokeWidth={2}
              style={{ margin: "0 0.5rem 0 1rem" }}
            />
            <a
              href={group.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "1rem",
                color: "#1D4ED8",
                textDecoration: "none",
              }}
            >
              {group.url}
            </a>
            <IconMapPin
              size={"1.5rem"}
              strokeWidth={2}
              style={{ marginRight: "0.5rem" }}
            />
            {group.room}
          </p>
          <p
            style={{
              fontSize: "0.875rem",
              color: "#666",
              margin: 0,
            }}
          >
            {group.description}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          setGroup(undefined);
        }}
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          padding: "0.5rem", // p-2
          backgroundColor: "#ef4444", // bg-red-500
          color: "#ffffff", // text-white
          borderRadius: "0.25rem", // rounded
        }}
      >
        <IconX size={"1rem"} strokeWidth={2} color={"black"} />
      </button>
    </div>
  );
};

export default GroupCard;
