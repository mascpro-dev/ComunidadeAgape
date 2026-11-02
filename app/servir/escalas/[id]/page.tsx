"use client";

import { useParams } from "next/navigation";
import { EventoPainel } from "@/components/servir/EventoPainel";

export default function EventoPage() {
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  return <EventoPainel eventoId={id || ""} />;
}
