export async function buscarCep(cep: string) {
  const d = cep.replace(/\D/g, "");
  if (d.length !== 8) return null;
  const res = await fetch(`https://viacep.com.br/ws/${d}/json/`);
  const data = (await res.json()) as {
    erro?: boolean;
    logradouro?: string;
    bairro?: string;
    localidade?: string;
    uf?: string;
    cep?: string;
  };
  if (!res.ok || data.erro) return null;
  return {
    endereco: data.logradouro || "",
    bairro: data.bairro || "",
    cidade: data.localidade && data.uf ? `${data.localidade}-${data.uf}` : data.localidade || "",
    cep: data.cep || `${d.slice(0, 5)}-${d.slice(5)}`,
  };
}
