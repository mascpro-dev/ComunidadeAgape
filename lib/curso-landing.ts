import { type Curso, type CursoReel } from "@/lib/content";
import { fotos } from "@/lib/fotos";

type Extra = Pick<Curso, "headline" | "slogan" | "manifesto" | "convite" | "glow" | "reels">;

function reels(items: CursoReel[]): CursoReel[] {
  return items;
}

const extraPorId: Record<string, Extra> = {
  cr1: {
    glow: "#3d8a45",
    headline: "Deus é o dono. Você é o administrador.",
    slogan: "Liberdade financeira começa no coração — não na calculadora.",
    manifesto:
      "Os princípios financeiros de Deus são muito mais do que livrar-se de dívidas e viver dentro de um orçamento. O desejo dEle é que cada um de nós cresça na compreensão do propósito para tudo o que somos e tudo o que temos. Recursos nunca foram para girar em torno de nós. Podemos pensar que possuir mais coisas nos deixa felizes, mas o Pai sabe: a verdadeira liberdade financeira chega quando entendemos que Ele é o dono de tudo e nós somos mordomos fiéis do que nos foi confiado. Em 10 semanas, em grupo pequeno, você lê a Palavra sobre dinheiro — dívida, conselho, honestidade, contribuição, trabalho, investimento e eternidade — e sai com um plano concreto para a casa.",
    convite:
      "Garanta sua vaga no próximo grupo. Material didático incluso. Presencial ou online. Até 12 pessoas para conversa real, não plateia.",
    reels: reels([
      { nome: "Ana e Pedro", papel: "Casal · 10 semanas", frase: "Pela primeira vez orçamos juntos sem briga. Deus no centro mudou a mesa.", capa: fotos.familia },
      { nome: "Rafa", papel: "Jovem · 18 anos", frase: "Eu achava que era curso de rico. Era curso de mordomo.", capa: fotos.jovens },
      { nome: "Bia", papel: "Família", frase: "Sair da dívida virou discipulado. A célula viu a diferença.", capa: fotos.mulheres },
      { nome: "Time Homens", papel: "Irmãos", frase: "Conselho antes de decisão grande. Isso salvou um carro e um casamento.", capa: fotos.homens },
    ]),
  },
  cr2: {
    glow: "#c4a35a",
    headline: "O dinheiro não precisa separar vocês.",
    slogan: "Deus quer que a crise vire laço — não muro.",
    manifesto:
      "Howard Dayton, Ministério Crown / UDF: o que Deus diz sobre dinheiro entra na vida a dois. Infelizmente muitos casais experimentam o dinheiro como obstáculo. O Senhor pretende que ele firme o amor. Não é só real, cartão e planilha — é a vida do cônjuge, dos filhos e das gerações seguintes. Em 6 encontros, noivos ou casados (ninho cheio ou vazio) aprendem a conversar sobre dízimo, poupança, dívida e alvos sem destruir a aliança. Ideal fazer juntos, em grupo de até seis casais.",
    convite: "Os dois na mesma turma. Mesma Palavra. Mesma mesa. Inscrevam-se como casal.",
    reels: reels([
      { nome: "Carla e João", papel: "7 anos de casados", frase: "A briga do cartão virou oração. Saímos mais próximos.", capa: fotos.familia },
      { nome: "Mari e Lucas", papel: "Noivos", frase: "Entramos no altar já falando de dinheiro com paz.", capa: fotos.entrar },
      { nome: "Helena", papel: "Ninho vazio", frase: "Aos 60, ainda dava para aprender a não separar o que Deus uniu.", capa: fotos.mulheres },
      { nome: "Time Famílias", papel: "Escola da Família", frase: "O curso é sobre vidas. Não sobre calculadora.", capa: fotos.celulas },
    ]),
  },
  cr3: {
    glow: "#2a9d8f",
    headline: "O fim do mês não precisa te assustar.",
    slogan: "Quatro semanas para reprogramar hábitos — com princípios eternos.",
    manifesto:
      "Baseado no best-seller de Andrés Panasiuk. Não é dica de consumo nem fórmula de ficar rico. É reprogramar estilo de vida: o SER antes do FAZER. Conselhos práticos para economizar, administrar, sair das dívidas e planejar liberdade financeira, com os Princípios P da prosperidade integral. Cabe na agenda de quem vive de boleto e não aguenta um curso de dez semanas.",
    convite: "Comece pequeno. Quatro encontros. Material incluso. Presencial ou online.",
    reels: reels([
      { nome: "Tiago", papel: "Autônomo", frase: "Parei de tapar buraco com outro cartão. O mês fechou no azul.", capa: fotos.homens },
      { nome: "Lívia", papel: "Mãe solo", frase: "Conteúdo curto, direto, sem vergonha de perguntar.", capa: fotos.mulheres },
      { nome: "Grupo Jovens", papel: "18+", frase: "A gente riu das charges e saiu com orçamento de verdade.", capa: fotos.jovens },
      { nome: "Irmãos", papel: "Célula", frase: "Quatro semanas. Mudança que a casa sentiu.", capa: fotos.celulas },
    ]),
  },
  cr4: {
    glow: "#3d9adf",
    headline: "Dar. Poupar. Gastar. Com Jesus no centro.",
    slogan: "O coração da criança aprende cedo — antes do consumismo.",
    manifesto:
      "ABC do Dinheiro (Crown / UDF) para 5 a 7 anos. Por uma história, o pequenino descobre que Jesus é o Senhor e dono de todas as coisas — e não servirá a dois senhores. A criança que aprende mordomia agora cresce livre para servir a Deus. Pais reforçam em casa o que a turma viveu no encontro. Check-in no culto. Material incluso.",
    convite: "Inscreva seu filho. 10 semanas, até 1h30. A família inteira ganha.",
    reels: reels([
      { nome: "Mãe do Davi", papel: "5 anos", frase: "Ele passou a separar o dizimo da mesada. Sem a gente pedir.", capa: fotos.infantil },
      { nome: "Pai da Laura", papel: "Kids", frase: "História, não palhaçada. Ela chegou cantando o que aprendeu.", capa: fotos.familia },
      { nome: "Tia Kids", papel: "Liderança", frase: "Turma pequena, coração grande. Vale cada domingo.", capa: fotos.educacao },
      { nome: "Avó", papel: "Família", frase: "Vi o neto falando que a bola é de Deus. Chorei.", capa: fotos.celulas },
    ]),
  },
  cr5: {
    glow: "#5bb8e8",
    headline: "O segredo não é ter mais. É ser fiel.",
    slogan: "8 a 12 anos: o mapa bíblico antes da adolescência.",
    manifesto:
      "O Segredo (Crown / UDF) leva a criança a entender como Deus lida com recursos — honestidade nas coisas pequenas, conselho, amizade, fidelidade. Linguagem de história, não aula de adulto. Quem aplica isso agora carrega o futuro da igreja com outro coração. 12 semanas que fazem diferença pelos próximos vinte anos.",
    convite: "Turma de 8 a 12. Material incluso. Presencial ou online. Pais bem-vindos na conversa de casa.",
    reels: reels([
      { nome: "Mãe do Miguel", papel: "10 anos", frase: "Ele devolveu o troco a mais. Disse que o curso ensinou.", capa: fotos.infantil },
      { nome: "Líder Kids", papel: "Sala", frase: "Neemias, potes, honestidade. Eles entendem mais do que a gente acha.", capa: fotos.educacao },
      { nome: "Pai", papel: "Família", frase: "Melhor investimento da temporada. Caráter, não cofrinho.", capa: fotos.homens },
      { nome: "Irmã mais velha", papel: "Geração", frase: "Queria ter feito isso aos 10. Ela vai chegar na adolescência diferente.", capa: fotos.adolescentes },
    ]),
  },
  cr6: {
    glow: "#ff6b3d",
    headline: "TER não é SER.",
    slogan: "Finanças e vida com perspectiva bíblica — dos 13 aos 17.",
    manifesto:
      "O mundo diz que você é o que consome. O Crown Teens ensina o contrário: anotar o que entra e o que sai, orçamento, currículo, poupança, conselho, contribuição. Grupos de até 12, líder capacitado. Ideal para mesada, primeiro bico e as decisões de profissão que vêm aí. 12 semanas para não entrar na faculdade escravo do cartão.",
    convite: "Adolescente de 13 a 17. Sextas da geração combinam. Garante a vaga.",
    reels: reels([
      { nome: "Gabi, 16", papel: "Aluna", frase: "Parei de gastar o PIX da mãe no mesmo dia. Orçamento no caderno.", capa: fotos.adolescentes },
      { nome: "Bruno, 15", papel: "Futebol + célula", frase: "Achei que era aula chata. Saí com currículo e poupança.", capa: fotos.jovens },
      { nome: "Mãe da Sofia", papel: "Família", frase: "Ela pediu para não aumentar a mesada. Quis aprender a administrar.", capa: fotos.mulheres },
      { nome: "Líder Geração", papel: "Time", frase: "Consumismo perde quando a Palavra ganha o bolso.", capa: fotos.celulaGeracao },
    ]),
  },
  hb1: {
    glow: "#d6c08a",
    headline: "Lidere você. Depois lidere os outros.",
    slogan: "Autodisciplina, identidade e segurança emocional — 13 semanas.",
    manifesto:
      "Módulo 1 de Habitudes (Dr. Tim Elmore). Caráter pautado nos princípios eternos da Palavra. Aulas dinâmicas, linguagem das imagens, aprendizagem social e emocional. Adolescentes e jovens de 12 a 24 que precisam de chão por dentro antes de pegar microfone, ministério ou namoro. Sem isso, liderança vira performance.",
    convite: "Turma 12–24. Presencial e online. Material incluso. Encontros de 60 a 90 minutos.",
    reels: reels([
      { nome: "Lucas, 19", papel: "Jovens", frase: "Parei de liderar no Instagram e comecei a liderar o despertador.", capa: fotos.jovens },
      { nome: "Isabela, 16", papel: "Geração", frase: "Identidade em Cristo, não em like. Isso me segurou.", capa: fotos.adolescentes },
      { nome: "Mentora", papel: "Time", frase: "A sala muda quando eles entendem valores centrais.", capa: fotos.lideranca },
      { nome: "Pai", papel: "Família", frase: "Meu filho voltou a ter rotina. Sem sermão meu.", capa: fotos.familia },
    ]),
  },
  hb2: {
    glow: "#e07a3d",
    headline: "Liderança é gente. Não palco.",
    slogan: "Escuta, humildade, encorajamento e serviço.",
    manifesto:
      "Iniciativa social, conversa de verdade, inteligência emocional, transparência. Cada capítulo desafia. Imagens que ensinam. Para 12 a 24 anos que querem relacionamentos saudáveis — na célula, na escola, em casa — e não só audiência. Conectar-se é um músculo. Aqui a gente treina.",
    convite: "13 semanas. Mesma geração. Mesma linguagem. Inscreva-se e traga um amigo.",
    reels: reels([
      { nome: "Rafa, 17", papel: "Célula", frase: "Aprendi a calar para ouvir. Minha casa percebeu.", capa: fotos.adolescentes },
      { nome: "Júlia, 21", papel: "Universitários", frase: "Humildade não é fraqueza. O curso mostrou na prática.", capa: fotos.jovens },
      { nome: "Líder", papel: "Jovens", frase: "O grupo parou de competir e começou a servir.", capa: fotos.celulas },
      { nome: "Irmã", papel: "Time", frase: "Encorajamento virou hábito, não frase de culto.", capa: fotos.mulheres },
    ]),
  },
  hb3: {
    glow: "#c44536",
    headline: "Exemplo primeiro. Cargo depois.",
    slogan: "Visão, prioridade, decisão e equipe.",
    manifesto:
      "Como liderar mudanças sem atropelar gente. Como priorizar. Como decidir. Como formar time. Habitudes 3 é para quem já influencia na escola, no ministério ou no grupo e não quer improvisar. Linguagem de imagens, Palavra no fundo, prática na sala.",
    convite: "Se já te pedem para ‘tocar’, vem aprender a tocar com alma.",
    reels: reels([
      { nome: "Pedro, 20", papel: "Louvor", frase: "Parei de mandar. Comecei a formar. A banda agradeceu.", capa: fotos.jovens },
      { nome: "Ana, 15", papel: "Geração", frase: "Priorizar salvou meu sábado. E o ministério.", capa: fotos.adolescentes },
      { nome: "Mentor", papel: "Time", frase: "Decisão assertiva sem ser grosso. Eles precisavam ver.", capa: fotos.lideranca },
      { nome: "Célula", papel: "Jovens", frase: "A equipe nasceu no curso. Continua na sexta.", capa: fotos.celulas },
    ]),
  },
  hb4: {
    glow: "#3d6fd4",
    headline: "Multiplique. Não acumule.",
    slogan: "Cultura se transforma com modelo, não com cartaz.",
    manifesto:
      "Como criar ambiente com princípios bíblicos: multiplicação de líderes, comportamento contagioso, escolhas sábias. Para quem quer deixar legado no grupo, na casa e na cidade — não só um culto bonito. 13 semanas para a cultura mudar de verdade.",
    convite: "Se a sua geração vai herdar a igreja, ela precisa de cultura. Começa aqui.",
    reels: reels([
      { nome: "Time Jovens", papel: "Liderança", frase: "Paramos de fazer evento. Começamos a fazer gente.", capa: fotos.jovens },
      { nome: "Mari, 18", papel: "Aluna", frase: "Comportamento contagioso. Eu virei o vírus bom.", capa: fotos.adolescentes },
      { nome: "Pastor de geração", papel: "Ágape", frase: "Esse módulo muda o corredor, não só a sala.", capa: fotos.culto },
      { nome: "Família", papel: "Pais", frase: "A casa ganhou outro clima. Eles trouxeram o curso pra mesa.", capa: fotos.familia },
    ]),
  },
  hb5: {
    glow: "#4a9a6a",
    headline: "Liderar como Jesus. Não como chefe.",
    slogan: "Propósito, caráter, empatia e feedback que não fere.",
    manifesto:
      "Liderança servidora na igreja local. Sensibilidade espiritual nas decisões. Capacidade de inspirar jovens e ministérios com intencionalidade. Para quem já serve e quer impacto que dure além do cargo. 13 semanas, 12 a 24 anos, Palavra no centro.",
    convite: "Ministério sem caráter queima gente. Vem formar o jeito de Jesus.",
    reels: reels([
      { nome: "Davi, 22", papel: "Líder de célula", frase: "Feedback sem ferir. Meu grupo não despencou mais.", capa: fotos.jovens },
      { nome: "Lívia, 17", papel: "Geração", frase: "Empatia não é deixar de corrigir. É corrigir como Cristo.", capa: fotos.adolescentes },
      { nome: "Pastora", papel: "Time", frase: "Esse módulo deveria ser obrigatório antes de microfone.", capa: fotos.oracao },
      { nome: "Irmão", papel: "Serviço", frase: "Inspirar sem manipular. Aprendi tarde? Ainda deu tempo.", capa: fotos.homens },
    ]),
  },
  ig1: {
    glow: "#7eb6ff",
    headline: "Não é para abrir empresa. É para abrir os olhos.",
    slogan: "Mente renovada. Identidade firmada. Propósito ativado.",
    manifesto:
      "Ignição confronta os enganos do mundo e alinha o pensamento ao padrão do Reino. Palavra, grupo, games, desafios progressivos. Seis encontros presenciais de 90 minutos. Cinco Inteligências do Reino: Protagonista, Liderança, Recursos, Relacional e Empreendedora. Realinhamento com o Céu — não curso de negócios secular. Plataforma exclusiva para líderes e participantes.",
    convite: "A partir de 12 anos. Presencial. Seis encontros. Vaga limitada.",
    reels: reels([
      { nome: "Felipe, 18", papel: "Participante", frase: "Achei que era startup. Era chamado. Melhor engano da minha vida.", capa: fotos.jovens },
      { nome: "Nina, 14", papel: "Geração", frase: "Os games não eram frescura. Era discipulado com suor.", capa: fotos.adolescentes },
      { nome: "Líder Ignição", papel: "Time", frase: "Identidade firmada. Depois o propósito aparece.", capa: fotos.missao },
      { nome: "Mãe", papel: "Família", frase: "Meu filho voltou falando de dons, não de fama.", capa: fotos.familia },
    ]),
  },
  n1: {
    glow: "#6b5bff",
    headline: "Namorar com direção. Ou não namorar ainda.",
    slogan: "Propósito, limites e chamado — antes do altar.",
    manifesto:
      "Trilha da Escola da Família para quem namora ou quer se preparar. Limites, discernimento, conversa sobre chamado e família. Seis semanas para não improvisar o coração. Cristo no centro, não pressão da idade.",
    convite: "Jovens da comunidade. Turma presencial. Traga clareza, não só crush.",
    reels: reels([
      { nome: "Casal da turma", papel: "Namoro", frase: "Aprendemos a pausar. O relacionamento agradeceu.", capa: fotos.jovens },
      { nome: "Sofia", papel: "Solteira", frase: "O curso me deu permissão de esperar. Paz.", capa: fotos.perfil },
      { nome: "Mentor", papel: "Famílias", frase: "Propósito não mata romance. Purifica.", capa: fotos.entrar },
      { nome: "Pais", papel: "Família", frase: "Finalmente uma conversa que nossos filhos ouvem.", capa: fotos.familia },
    ]),
  },
  n2: {
    glow: "#c4a35a",
    headline: "O altar começa na preparação.",
    slogan: "Aliança, comunicação, casa e missão a dois.",
    manifesto:
      "Oito semanas para noivos: expectativas na mesa, finanças da casa, comunicação e o chamado de servir juntos. Menos surpresa depois da festa. Mais pacto.",
    convite: "Casais noivos da Ágape. Os dois na sala. Sempre.",
    reels: reels([
      { nome: "Noivos 2025", papel: "Turma", frase: "Falamos de dinheiro antes do convite. Salvamos a lua de mel.", capa: fotos.entrar },
      { nome: "Mentora", papel: "Escola", frase: "Aliança não é feeling. É decisão. O curso ensina os dois.", capa: fotos.familia },
      { nome: "Padrinho", papel: "Família", frase: "Vi o casal crescer oito semanas. O culto de casamento pesou diferente.", capa: fotos.culto },
      { nome: "Irmã", papel: "Time", frase: "Missão a dois começa antes do ‘sim’.", capa: fotos.mulheres },
    ]),
  },
  n3: {
    glow: "#d6c08a",
    headline: "Casamento que missiona. Não só sobrevive.",
    slogan: "Unidade, serviço e cidade — a dois.",
    manifesto:
      "Oito semanas para casais que querem sair da rotina: fortalecer a amizade e servir a igreja e a cidade juntos. O lar como base de missão, não como desculpa para se isolar.",
    convite: "Casais da comunidade. Vaga para 20. Venham os dois.",
    reels: reels([
      { nome: "Ana e Pedro", papel: "Célula", frase: "Voltamos a ser amigos. Depois voltamos a servir.", capa: fotos.familia },
      { nome: "Time Serve", papel: "Missão", frase: "Casal que missiona contagia a célula.", capa: fotos.missao },
      { nome: "Carla", papel: "Hóspede de célula", frase: "Eles abriram a casa diferente depois do curso.", capa: fotos.celulas },
      { nome: "Pastor", papel: "Ágape", frase: "Unidade no lar vaza para a cidade. Sempre.", capa: fotos.culto },
    ]),
  },
  n4: {
    glow: "#3d9adf",
    headline: "Os primeiros discipuladores moram em casa.",
    slogan: "Palavra no lar. Graça e verdade. Cinco semanas.",
    manifesto:
      "Ferramentas para pais e mães serem os primeiros a discipular os filhos — em qualquer idade. Ritmos de Palavra, conversa, mesa. A igreja ajuda. A casa lidera.",
    convite: "Pais da comunidade. Cinco encontros. Leva o que viver na segunda de manhã.",
    reels: reels([
      { nome: "Pai do Davi", papel: "Kids", frase: "Parei de terceirizar para o culto infantil. A mesa virou altar.", capa: fotos.homens },
      { nome: "Mãe da Laura", papel: "Família", frase: "Discipular com graça. Eu só sabia cobrar.", capa: fotos.mulheres },
      { nome: "Casal", papel: "8 e 11 anos", frase: "Cinco semanas. Ritual de noite que as crianças cobram.", capa: fotos.familia },
      { nome: "Time Kids", papel: "Igreja", frase: "Quando a casa discipula, o domingo rende o dobro.", capa: fotos.infantil },
    ]),
  },
  mw1: {
    glow: "#4aa8c4",
    headline: "Prosperar sem perder a vida no caminho.",
    slogan: "Coração e alma pesam mais que o saldo da conta.",
    manifesto:
      "Na corrida da vida, não basta alcançar metas financeiras, de trabalho e econômicas. É vital chegar lá com o resto da vida intacto: tempo, talento e tesouros — dinheiro, empresa e casa, e também amor e respeito dos filhos. A prosperidade integral não depende só da capacidade econômica. Depende da forma como você escolhe viver cada dia. Tem mais relação com a atitude do coração e o estado da alma do que com o estado de uma conta bancária. Dez semanas, presencial ou online, com material incluso. Para mulheres casadas e solteiras acima de 18 anos.",
    convite: "Mulheres da Ágape, a partir de 18. Dez semanas. Família, finanças e vida no mesmo prato.",
    reels: reels([
      { nome: "Carla", papel: "Casada · 10 semanas", frase: "Eu perseguia meta e perdia a mesa. Agora as duas andam juntas.", capa: fotos.mulheres },
      { nome: "Luísa", papel: "Solteira · 28 anos", frase: "Prosperar deixou de ser só conta. Virou alma.", capa: fotos.celulaMulheres },
      { nome: "Ana", papel: "Mãe", frase: "O respeito dos filhos não entra no extrato. Entra neste curso.", capa: fotos.familia },
      { nome: "Time Mulheres", papel: "Ágape", frase: "Atitude de coração. Isso muda casa.", capa: fotos.oracao },
    ]),
  },
  hm1: {
    glow: "#c23b3b",
    headline: "Homem ao máximo não é ego. É Cristo.",
    slogan: "Ferro afia ferro. Treze semanas. Até 2h30.",
    manifesto:
      "O que é ser um homem ao máximo? Qual a referência? O que impede ou promove a maximização do homem? Neste curso, o Espírito Santo ministra ao coração e ajuda a desenvolver masculinidade em Cristo, conformando o comportamento à Palavra. Você também aprende a se fortalecer com outros homens do convívio. “Assim como o ferro afia o ferro, um amigo afia seu amigo” (Pv 27.17). Viver com todo o potencial é anseio do homem — e dos pais e da esposa, quando ele é casado. Guia para o sucesso familiar, na linha de Edwin Louis Cole. Presencial e online. Material incluso.",
    convite: "Homens a partir de 18 ou já casados. 13 encontros. Vaga para irmãos que querem o máximo em Cristo.",
    reels: reels([
      { nome: "Marcos", papel: "Casado", frase: "A referência deixou de ser o feed. Passou a ser Jesus.", capa: fotos.homens },
      { nome: "Thiago", papel: "18 anos", frase: "Ferro afia ferro. Eu não aguentava sozinho.", capa: fotos.jovens },
      { nome: "Paulo", papel: "Pai", frase: "Minha esposa sentiu o curso antes de eu terminar.", capa: fotos.familia },
      { nome: "Encontro de Homens", papel: "Ágape", frase: "Masculinidade em Cristo. Não em estereótipo.", capa: fotos.lideranca },
    ]),
  },
  hm2: {
    glow: "#d4a017",
    headline: "Não são os que nunca enfrentam. São os que nunca desistem.",
    slogan: "Crise pode virar combustível. Treze semanas.",
    manifesto:
      "Estresses, mudanças, crises… todos já passamos por isso. Já fomos tentados a dar as costas, esquecer e desistir. Deus tem solução para você se tornar vencedor em quaisquer circunstâncias. Perda de emprego, meia-idade, problemas conjugais, mudança de casa, aperto financeiro, estresse do cotidiano — isso pode impulsionar as maiores vitórias. A partir de 13 anos. Presencial e online. Material incluso.",
    convite: "Homens a partir de 13. Se a vontade é desistir, este é o próximo passo — não a última porta.",
    reels: reels([
      { nome: "Daniel", papel: "15 anos", frase: "Eu ia largar tudo. O curso me segurou na fé.", capa: fotos.adolescentes },
      { nome: "Roberto", papel: "Meia-idade", frase: "Perdi o emprego. Não perdi o chamado.", capa: fotos.homens },
      { nome: "Lucas", papel: "Casado", frase: "A crise em casa virou combustível, não desculpa.", capa: fotos.familia },
      { nome: "Time Geração", papel: "Ágape", frase: "Vencedor não é quem não cai. É quem levanta.", capa: fotos.celulaGeracao },
    ]),
  },
  hm3: {
    glow: "#e07a2f",
    headline: "Coragem de viver como homem de verdade.",
    slogan: "Responsabilidade. Maturidade. Batalha. Treze semanas.",
    manifesto:
      "Homens de todas as idades vivem vida agitada, numa batalha física e espiritual contra o inimigo das almas. Nunca foi tão importante que os jovens aprendam a ser homens de verdade e tenham coragem de viver como tal. Este curso ensina a assumir responsabilidade pelos atos, a ser maduro nas ações e a enfrentar as batalhas da vida — vencendo as mais difíceis. A partir de 13 anos. Presencial e online. Material incluso.",
    convite: "Homens a partir de 13. Coragem não se assiste. Treina. 13 encontros de até 2h30.",
    reels: reels([
      { nome: "Gabriel", papel: "14 anos", frase: "Coragem deixou de ser grito. Virou caráter.", capa: fotos.adolescentes },
      { nome: "Felipe", papel: "Jovem", frase: "Assumi o que eu fazia. Isso doeu. Depois libertou.", capa: fotos.jovens },
      { nome: "André", papel: "Pai de adolescente", frase: "Meu filho saiu homem. Não só mais alto.", capa: fotos.homens },
      { nome: "Time Adolescentes", papel: "Ágape", frase: "Batalha espiritual pede homem acordado.", capa: fotos.celulaGeracao },
    ]),
  },
  hm4: {
    glow: "#9b6b8a",
    headline: "Chega de imitação. Homem de verdade.",
    slogan: "Líder, marido, pai e amigo — no padrão de Jesus.",
    manifesto:
      "Este curso desconsidera estereótipos que não trazem realização, acaba com a pressão das exigências irreais, abandona substituições baratas e imitações mesquinhas da verdadeira masculinidade. Dá ao homem o poder de se posicionar e tornar-se homem de verdade. Você descobre a hombridade de Jesus Cristo; aprende a chegar ao topo e permanecer, a estabelecer a direção do coração e a esclarecer o papel como líder, marido, pai e amigo. A partir de 18 anos ou casados. 13 semanas. Presencial e online. Material incluso.",
    convite: "Homens a partir de 18 ou casados. Pare de copiar. Posicione o coração.",
    reels: reels([
      { nome: "Ricardo", papel: "Casado", frase: "Estereótipo me cansava. Hombridade de Cristo me firmou.", capa: fotos.homens },
      { nome: "João", papel: "Pai", frase: "Papel de pai deixou de ser palpite. Virou direção.", capa: fotos.familia },
      { nome: "Bruno", papel: "18 anos", frase: "Chegar ao topo e permanecer. Isso é caráter, não pose.", capa: fotos.jovens },
      { nome: "Célula Homens", papel: "Ágape", frase: "Líder, marido, pai, amigo. Quatro cadeiras, um homem.", capa: fotos.celulaHomens },
    ]),
  },
  hm5: {
    glow: "#3d7ab8",
    headline: "José não desperdiçou o poço. Nem o palácio.",
    slogan: "Potencial máximo. Sonhos renovados. Treze semanas.",
    manifesto:
      "Estudo sobre a vida de José, governador do Egito. Pequenos detalhes do dia a dia nos impedem de atingir o potencial máximo. Princípios diretos e inspiradores: fortalecer qualidades e virtudes; viver acima de injustiças e críticas; deixar a tensão e receber a paz; lidar com conflitos psicológicos e culpa; transformar preocupação em motivação; recuperar a visão e renovar os sonhos. Como concretizar os sonhos vivenciando ao máximo os princípios de Deus. Homens a partir de 13 anos. Presencial e online. Material incluso.",
    convite: "Homens a partir de 13. Se o sonho esfriou, José ainda fala. 13 semanas.",
    reels: reels([
      { nome: "Miguel", papel: "16 anos", frase: "A crítica da escola parou de mandar no meu chamado.", capa: fotos.adolescentes },
      { nome: "Sérgio", papel: "Trabalho", frase: "Culpa travava o potencial. Paz destrancou.", capa: fotos.homens },
      { nome: "Igor", papel: "Jovem", frase: "Preocupação virou motivação. Eu não conhecia isso.", capa: fotos.jovens },
      { nome: "Time Homens", papel: "Ágape", frase: "José no poço ainda era José. Isso mudou a gente.", capa: fotos.celulas },
    ]),
  },
  hm6: {
    glow: "#c45a28",
    headline: "Em casa não pode ser monólogo.",
    slogan: "Comunicação, sexo e dinheiro — na Palavra. Treze semanas.",
    manifesto:
      "Os homens costumam se comunicar bem com clientes, amigos e parceiros de projeto. Em casa, vira monólogo curto. Este curso ensina a arte da comunicação e princípios nas áreas sexual e financeira, alinhados à Palavra. “Quanto mais próxima da verdade, mais destrutiva é a mentira.” (Edwin Louis Cole). Os três desafios mais comuns do relacionamento conjugal, vencidos com verdade. Homens a partir de 18 anos ou casados. Presencial e online. Material incluso.",
    convite: "Homens a partir de 18 ou casados. Fale. Honre. Administre. Inscreva-se.",
    reels: reels([
      { nome: "Eduardo", papel: "Casado", frase: "Eu falava no trabalho. Em casa, calava. Isso acabou.", capa: fotos.familia },
      { nome: "Rafael", papel: "Marido", frase: "Sexo e dinheiro na Palavra. Sem vergonha. Com verdade.", capa: fotos.homens },
      { nome: "Casal", papel: "Célula", frase: "Mentira perto da verdade destrói. A gente escolheu verdade.", capa: fotos.celulas },
      { nome: "Time Famílias", papel: "Ágape", frase: "Três desafios. Um homem disposto a aprender.", capa: fotos.celulaHomens },
    ]),
  },
  hm7: {
    glow: "#b33a3a",
    headline: "Tempos difíceis pedem homens fortes. Como Daniel.",
    slogan: "Integridade em qualquer reinado. Treze semanas.",
    manifesto:
      "Daniel passou por quatro reinados e se manteve íntegro, fiel e forte. O que é, na prática, ser homem forte em tempos difíceis? A lacuna entre realização tecnológica e declínio moral clama por homens de coragem, integridade e hombridade. Muitos esqueceram o significado de hombridade e trocaram ideais por escolhas imorais, ilegais ou irresponsáveis. Estes tempos pedem esperança, dignidade, a verdade de Deus e a ordem — homens dispostos a serem heróis, como Jesus Cristo. A partir de 15 anos. Presencial e online. Material incluso.",
    convite: "Homens a partir de 15. O mundo está desesperado por heróis. Comece na Palavra.",
    reels: reels([
      { nome: "Henrique", papel: "17 anos", frase: "Daniel não mudou de rei em rei. Eu também não mudo de fé.", capa: fotos.adolescentes },
      { nome: "Carlos", papel: "Trabalho", frase: "Integridade custou. Depois pagou em paz.", capa: fotos.homens },
      { nome: "Samuel", papel: "Jovem", frase: "Herói no padrão de Jesus. Não de filme.", capa: fotos.jovens },
      { nome: "Encontro de Homens", papel: "Ágape", frase: "Tempos difíceis. Homens fortes. Ponto.", capa: fotos.lideranca },
    ]),
  },
};

export function cursoComLanding(curso: Curso): Curso {
  const extra = extraPorId[curso.id];
  if (!extra) return curso;
  return { ...curso, ...extra };
}
