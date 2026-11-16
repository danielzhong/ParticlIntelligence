import { withBase } from "../lib/paths";

export const navigation = [
  { label: "Technology", zh: "技术方向", path: "/technology/" },
  { label: "Applications", zh: "应用场景", path: "/applications/" },
  { label: "About", zh: "关于我们", path: "/about/" },
  { label: "Contact", zh: "联系我们", path: "/contact/" },
] as const;

/** Compare complete paths, including the configured deployment base. */
export function isCurrentPage(pathname: string, path: string): boolean {
  const normalize = (value: string) => value.replace(/\/+$/, "") || "/";
  return normalize(pathname) === normalize(withBase(path));
}
