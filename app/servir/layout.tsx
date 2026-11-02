import { ServirFrame } from "@/components/servir/ServirChrome";

export default function ServirLayout({ children }: { children: React.ReactNode }) {
  return <ServirFrame>{children}</ServirFrame>;
}
