import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Comunidade Cristã Ágape",
    short_name: "Ágape",
    description: "App da Comunidade Cristã Ágape",
    start_url: "/",
    display: "standalone",
    background_color: "#030b1f",
    theme_color: "#06153a",
    icons: [{ src: "/logo.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
