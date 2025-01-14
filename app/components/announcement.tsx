import { useEffect, useState } from "react";

import styles from "./announcement.module.scss";

import clsx from "clsx";

interface AnnouncementProps {
  lastId: number;
  onClick: any;
  children?: React.ReactNode;
  title?: string;
}

const AnnouncementButton: React.FC<AnnouncementProps> = ({
  lastId,
  onClick,
  children,
  title = "",
}) => {
  const [lastReadId, setLastReadId] = useState(0);

  useEffect(() => {
    // 从 localStorage 获取上次已读的公告 ID
    const storedId = localStorage.getItem("lastId");
    if (storedId) {
      setLastReadId(Number(storedId));
    }
  }, []);

  const handleButtonClick = () => {
    // 将最新的公告 ID 存储到 localStorage
    localStorage.setItem("lastId", lastReadId.toString());
    setLastReadId(lastReadId);
    onClick();
  };

  const isUnread = lastId !== lastReadId;
  console.log(isUnread);
  const cls = styles["announcement"];

  return (
    <a
      onClick={handleButtonClick}
      className={clsx("base-announce", {
        [cls]: isUnread,
      })}
      title={title}
      style={{ display: "flex" }}
    >
      {children}
    </a>
  );
};

export default AnnouncementButton;
