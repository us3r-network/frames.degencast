import { FRAMES_BASE_URL } from "@/lib/env";

export default function ItemContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      tw="flex flex-col mt-[25px]"
      style={{
        backgroundImage: `url(${FRAMES_BASE_URL}/images/portfolio-dialog.png)`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        width: "692px",
        height: "176px",
        padding: "0 25px",
        fontSize: "14px",
      }}
    >
      {children}
    </div>
  );
}
