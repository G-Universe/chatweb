import { useEffect, useState } from "react";

import styles from "./announcement.module.scss";

import clsx from "clsx";

interface AnnouncementProps {
  lastVersion: string;
  onClick: any;
  children?: React.ReactNode;
  title?: string;
}

const AnnouncementButton: React.FC<AnnouncementProps> = ({
  lastVersion,
  onClick,
  children,
  title = "",
}) => {
  const [lastReadVersion, setLastReadVersion] = useState("0.0.0");

  useEffect(() => {
    // 从 localStorage 获取上次已读的公告 ID
    setLastReadVersion(localStorage.getItem("lastVersion") || lastReadVersion);
  }, []);

  const handleButtonClick = () => {
    // 将最新的公告 ID 存储到 localStorage
    localStorage.setItem("lastVersion", lastVersion);
    setLastReadVersion(lastVersion);
    onClick();
  };

  const isUnread = lastVersion !== lastReadVersion;
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
