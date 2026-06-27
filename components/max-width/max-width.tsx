import { ReactNode } from "react";
import styles from "./max-width.module.css";

interface MaxWidthProps {
  children: ReactNode;
}

export default function MaxWidth({ children }: MaxWidthProps) {
  return <div className={styles.container}>{children}</div>;
}