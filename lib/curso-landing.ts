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
      "Estresses, mudanças, crises… todos já passamos por isso. Já fomos tentados a dar as costas, esquecer e desistir. Deus tem solução para você se tornar vencedor em quaisquer circunstâncias. Perda de emprego, meia-idade, problemas conjugais, mudança de casa, aperto financeiro, estresse do cotidiano — isso pode impulsionar as maiores vitórias. Todas as gerações. Presencial e online. Material incluso.",
    convite: "Mulheres, homens, adolescentes e jovens. Se a vontade é desistir, este é o próximo passo.",
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
      "Estudo sobre a vida de José, governador do Egito. Pequenos detalhes do dia a dia nos impedem de atingir o potencial máximo. Princípios diretos e inspiradores: fortalecer qualidades e virtudes; viver acima de injustiças e críticas; deixar a tensão e receber a paz; lidar com conflitos psicológicos e culpa; transformar preocupação em motivação; recuperar a visão e renovar os sonhos. Como concretizar os sonhos vivenciando ao máximo os princípios de Deus. Todas as gerações. Presencial e online. Material incluso.",
    convite: "Mulheres, homens, adolescentes e jovens. Se o sonho esfriou, José ainda fala. 13 semanas.",
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
      "Os homens costumam se comunicar bem com clientes, amigos e parceiros de projeto. Em casa, vira monólogo curto. Este curso ensina a arte da comunicação e princípios nas áreas sexual e financeira, alinhados à Palavra. “Quanto mais próxima da verdade, mais destrutiva é a mentira.” (Edwin Louis Cole). Os três desafios mais comuns do relacionamento, vencidos com verdade. Aberto a todas as gerações da Ágape. Presencial e online. Material incluso.",
    convite: "Mulheres, homens, adolescentes e jovens. Fale. Honre. Administre. Inscreva-se.",
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
  hm8: {
    glow: "#c4a35a",
    headline: "Pureza não é atraso. É revolução.",
    slogan: "Integridade sexual na Palavra. Sete semanas.",
    manifesto:
      "O que é integridade sexual? Como é uma revolução moral hoje? É possível mensurar a pureza? O sexo foi reduzido a piada, cobiça, sensualidade e aventura sem consequência. A imoralidade virou “normal” e a virgindade, mercadoria barata. Masturbação, pornografia, lascívia, abuso. O que a Bíblia diz — e como vencer? Este curso resgata princípios eternos para a vida do homem e da mulher. Todas as gerações: mulheres, homens, adolescentes e jovens. Presencial e online. Material incluso.",
    convite: "Todas as gerações da Ágape. Sete semanas. Entre na revolução chamada pureza.",
    reels: reels([
      { nome: "Sofia", papel: "Jovem", frase: "Pureza deixou de ser vergonha. Virou coragem.", capa: fotos.mulheres },
      { nome: "Pedro", papel: "15 anos", frase: "Pornografia mandava. A Palavra tomou o controle.", capa: fotos.adolescentes },
      { nome: "Mariana", papel: "Mulheres", frase: "Integridade não é só dos irmãos. É da casa toda.", capa: fotos.celulaMulheres },
      { nome: "Time Homens", papel: "Ágape", frase: "Revolução moral começa no coração. Não no feed.", capa: fotos.homens },
    ]),
  },
  hm9: {
    glow: "#2f8f4e",
    headline: "O tesouro é o nome. O nome é o caráter.",
    slogan: "Escolhas. Conduta. Destino. Sete semanas.",
    manifesto:
      "Um dos bens mais preciosos é o próprio nome — ligado ao caráter, revelado nas escolhas. Escolhas determinam conduta, caráter e destino. Este curso chama a desenvolver caráter e tornar-se alguém de sucesso nos princípios de Deus. Todas as gerações. Presencial e online. Material incluso.",
    convite: "Mulheres, homens, adolescentes e jovens. Sete semanas para guardar o tesouro do nome.",
    reels: reels([
      { nome: "Lucas", papel: "Adolescente", frase: "Meu nome valia o que eu postava. Agora vale o caráter.", capa: fotos.adolescentes },
      { nome: "Helena", papel: "Jovem", frase: "Escolha pequena. Destino grande. Eu não via isso.", capa: fotos.jovens },
      { nome: "Roberto", papel: "Homens", frase: "Sucesso sem caráter é falência atrasada.", capa: fotos.homens },
      { nome: "Time Mulheres", papel: "Ágape", frase: "Tesouro não é baú. É nome limpo.", capa: fotos.mulheres },
    ]),
  },
  hm10: {
    glow: "#3d6fd4",
    headline: "Entender a esposa é ministrar. Não adivinhar.",
    slogan: "Singularidade. Feminilidade. Amar como Cristo. Treze semanas.",
    manifesto:
      "Ajuda o homem a entender a singularidade, feminilidade e originalidade da mulher e a ministrar-lhe. As lições falam ao coração: ser canal de Deus para abençoar a esposa e exemplo para os filhos. Quem entende a esposa ama melhor — como Cristo ama a Igreja. Homens a partir de 18 ou casados. Presencial e online. Material incluso.",
    convite: "Homens a partir de 18 ou casados. Treze semanas para honrar quem Deus te deu.",
    reels: reels([
      { nome: "André", papel: "Casado", frase: "Eu achava que ela era difícil. Eu é que não ministrava.", capa: fotos.familia },
      { nome: "Paulo", papel: "Pai", frase: "Os filhos viram o jeito que eu olho para a mãe deles.", capa: fotos.homens },
      { nome: "Casal", papel: "Célula", frase: "Amar como Cristo ama a Igreja. Isso mudou o tom da casa.", capa: fotos.celulas },
      { nome: "Time Homens", papel: "Ágape", frase: "Singularidade não se corrige. Se honra.", capa: fotos.celulaHomens },
    ]),
  },
  hm11: {
    glow: "#1e4a8c",
    headline: "O que o pai não ensinou. O pastor queria dizer.",
    slogan: "Marido irresistível não é pose. É caráter. Treze semanas.",
    manifesto:
      "Para o homem que quer saber o que o pai não pôde ensinar, o que as mulheres não conseguem expressar e o que o pastor gostaria de dizer em particular. O que surpreende as mulheres; como não ser derrotado por forças exteriores; nadar contra a falta de paternidade; edificar caráter; investir no casamento. Sexo, compromisso, comunicação, carreira, filhos. Homens a partir de 18 ou casados. Presencial e online. Material incluso.",
    convite: "Homens a partir de 18 ou casados. Treze semanas. Para o homem que quer saber.",
    reels: reels([
      { nome: "Ricardo", papel: "Casado", frase: "Ninguém me ensinou isso. O curso ensinou.", capa: fotos.homens },
      { nome: "Fábio", papel: "Pai ausente na infância", frase: "A maré da falta de pai parou de me mandar.", capa: fotos.familia },
      { nome: "João", papel: "Jovem casado", frase: "Investir no casamento. Eu só investia no trabalho.", capa: fotos.jovens },
      { nome: "Encontro de Homens", papel: "Ágape", frase: "Irresistível é caráter. Não conquista de filme.", capa: fotos.lideranca },
    ]),
  },
  mw2: {
    glow: "#e07aa8",
    headline: "Única. Não cópia. Não clichê.",
    slogan: "Autoestima, valor e feminilidade em Cristo. Treze semanas.",
    manifesto:
      "Dirigido a mulheres: autoestima, valor, feminilidade e responsabilidade. Deus quer libertar e dar vida abundante em plenitude — impacto na família e na sociedade pela originalidade, identidade e singularidade. Público geral. Presencial e online. Material incluso.",
    convite: "Mulheres da Ágape — adolescentes, jovens e adultas. Treze semanas para viver única.",
    reels: reels([
      { nome: "Bruna", papel: "Jovem", frase: "Valor deixou de ser like. Virou identidade.", capa: fotos.jovens },
      { nome: "Carla", papel: "Mãe", frase: "Singularidade abriu a casa. Eu tentava caber.", capa: fotos.mulheres },
      { nome: "Lívia", papel: "Adolescente", frase: "Eu copiava todo mundo. Única doeu. Depois libertou.", capa: fotos.adolescentes },
      { nome: "Time Mulheres", papel: "Ágape", frase: "Vida abundante. Não versão reduzida.", capa: fotos.celulaMulheres },
    ]),
  },
  mw3: {
    glow: "#8b6bb5",
    headline: "Mulheres da Bíblia. Lição para a sua terça.",
    slogan: "Encontro com Jesus. Onze semanas. Reabastecer.",
    manifesto:
      "Histórias de várias mulheres da Palavra, direcionadas aos dias de hoje, para cada realidade. Encontros com Jesus para serem fortalecidas, renovadas e reabastecidas. Público geral. Presencial e online. Material incluso.",
    convite: "Mulheres de todas as idades. Onze semanas nas histórias que ainda falam.",
    reels: reels([
      { nome: "Ana", papel: "Célula", frase: "Eu achava que a Bíblia era deles. Era minha também.", capa: fotos.mulheres },
      { nome: "Júlia", papel: "Jovem", frase: "Reabastecida. Eu estava no automático.", capa: fotos.jovens },
      { nome: "Marta", papel: "Mãe", frase: "Fortalecida na terça. A casa sentiu na quarta.", capa: fotos.familia },
      { nome: "Time Mulheres", papel: "Ágape", frase: "Encontro com Jesus. Não só com a agenda.", capa: fotos.oracao },
    ]),
  },
  ff1: {
    glow: "#c4a35a",
    headline: "Aliança não é contrato. É até o fim.",
    slogan: "Oração, perdão e transparência. Dez semanas. Até 6 casais.",
    manifesto:
      "FFI — Fundamentos da Família: a mudança não ocorre só na mente, mas no coração, através de Cristo. Por que tantos conflitos viram separação? Este curso de casais (Craig e Jan Hill / Veredas Antigas) ensina o valor da aliança, a oração, o perdão e a transparência. Comunicação franca para que o casamento seja saudável e o amor perdure. Grupos de até 6 casais, com casal líder capacitado pela Universidade da Família. Presencial e online. Material incluso.",
    convite: "Casados, união estável ou noivos. Os dois na mesma turma. Dez semanas.",
    reels: reels([
      { nome: "Ana e Pedro", papel: "Casados", frase: "A briga ia virar muro. Virou aliança de novo.", capa: fotos.familia },
      { nome: "Mari e Lucas", papel: "Noivos", frase: "Entramos no altar já falando de perdão.", capa: fotos.entrar },
      { nome: "Casal líder", papel: "UDF", frase: "Seis casais. Conversa real. Não plateia.", capa: fotos.celulaFamilias },
      { nome: "Escola da Família", papel: "FFI", frase: "O amor perdura quando a aliança é ensinada.", capa: fotos.celulas },
    ]),
  },
  ff2: {
    glow: "#e07aa8",
    headline: "Pais e filhos na mesma mesa. Sem sermão.",
    slogan: "Identidade, valor e destino. Dez semanas juntos.",
    manifesto:
      "Adolescentes e jovens perdem identidade, valor e destino sob influência ruim, conceito torto e mídia tendenciosa. Romance à Maneira de Deus coloca pais e filhos no mesmo diálogo: amizade e cuidado, preparando um casamento duradouro. Até 6 pais com o filho(a). Semanal 2h30 ou seminário de fim de semana. Casal líder UDF. Presencial e online. Material incluso.",
    convite: "Pai ou mãe + filho adolescente ou jovem. Vaga para o par. Não para um sozinho.",
    reels: reels([
      { nome: "Carla e a filha", papel: "16 anos", frase: "A gente não conversava. O curso obrigou. Depois virou gosto.", capa: fotos.familia },
      { nome: "Rafa", papel: "Jovem", frase: "Meu pai parou de sermão. Começou a ouvir.", capa: fotos.jovens },
      { nome: "Time Adolescentes", papel: "Ágape", frase: "Identidade não se baixa no celular. Se constrói em casa.", capa: fotos.adolescentes },
      { nome: "Casal líder", papel: "FFI", frase: "Amizade entre gerações. Isso é romance à maneira de Deus.", capa: fotos.celulaFamilias },
    ]),
  },
  ff3: {
    glow: "#c47ab8",
    headline: "Ministrar o coração. Não só orar em volta.",
    slogan: "Ouvir a voz do Pai. Fim de semana. 12 horas.",
    manifesto:
      "Ministrar não é só orar por alguém: é ajudar a ouvir a voz do Pai nas necessidades. Qualquer pessoa que quer ser instrumento de Deus encontra método para facilitar a ação do Espírito Santo. Seminário intensivo para líderes de qualquer ministério — e para quem ainda não lidera. A partir de 13 anos. Vídeo, grupo pequeno, oração e ministração. Líderes UDF. Presencial e online. Material incluso.",
    convite: "A partir de 13. Três períodos de 4h. Venha para aprender a ministrar de verdade.",
    reels: reels([
      { nome: "Bia", papel: "Célula", frase: "Eu só pedia. Agora ajudo o irmão a ouvir o Pai.", capa: fotos.celulas },
      { nome: "Thiago", papel: "17 anos", frase: "Pensava que ministrar era de pastor. Era de discípulo.", capa: fotos.adolescentes },
      { nome: "Time Homens", papel: "Ágape", frase: "Espírito Santo no grupo pequeno. Não no palco.", capa: fotos.homens },
      { nome: "Liderança", papel: "FFI", frase: "Método + presença. Isso forma ministro.", capa: fotos.lideranca },
    ]),
  },
  ff4: {
    glow: "#4aa8d4",
    headline: "O que você falou não é o que ele ouviu.",
    slogan: "Linguagem tópica versus relacional. Fim de semana.",
    manifesto:
      "Relacionamentos esfriam porque o que se fala não é o que se entende — linguagem tópica versus relacional, a forma como é dito. Este seminário mostra como a comunicação interfere na harmonia familiar. A partir de 13 anos. Vídeo, compartilhamento, oração e ministração. Presencial e online. Material incluso.",
    convite: "A partir de 13. Se em casa ninguém se entende, este fim de semana é o próximo passo.",
    reels: reels([
      { nome: "Pedro", papel: "Casado", frase: "Eu estava certo no conteúdo. Errado no tom.", capa: fotos.familia },
      { nome: "Júlia", papel: "Jovem", frase: "Minha mãe ouviu ataque. Eu só pedia ajuda.", capa: fotos.jovens },
      { nome: "Time Mulheres", papel: "Ágape", frase: "Harmonia familiar começa na forma. Não só no fato.", capa: fotos.mulheres },
      { nome: "Célula", papel: "FFI", frase: "Surpresa: a comunicação era o curto-circuito.", capa: fotos.celulas },
    ]),
  },
  ff5: {
    glow: "#e08a3a",
    headline: "Medo, vergonha, culpa. O coração pode mudar.",
    slogan: "A mentira sai no nome de Jesus. Fim de semana.",
    manifesto:
      "FFI: a mudança não ocorre só na mente, mas no coração, através de Cristo. Medo, vergonha, culpa e justiça própria paralisam o plano de Deus. Neste seminário você olha o coração, acha onde a mentira se instalou e a elimina no poder do nome de Jesus. A partir de 13 anos. 12 horas. Presencial e online. Material incluso.",
    convite: "A partir de 13. Se algo no peito trava o chamado, venha neste fim de semana.",
    reels: reels([
      { nome: "Sofia", papel: "Jovem", frase: "Vergonha mandava. Jesus tomou o nome.", capa: fotos.jovens },
      { nome: "Marcos", papel: "Homens", frase: "Culpa não era humildade. Era paralisia.", capa: fotos.homens },
      { nome: "Ana", papel: "Mãe", frase: "Justiça própria vestia de fé. O seminário despiu.", capa: fotos.mulheres },
      { nome: "Escola da Família", papel: "FFI", frase: "Coração transformado. Mente acompanha.", capa: fotos.oracao },
    ]),
  },
  ff6: {
    glow: "#c4a35a",
    headline: "A bênção de hoje alimenta gerações.",
    slogan: "Filho amado. Identidade restaurada. Fim de semana.",
    manifesto:
      "A bênção proferida hoje será usufruída por muitas gerações. Se você já é adulto e nunca recebeu a bênção dos pais, neste seminário o próprio Deus restaura a identidade de filho amado e derrama a bênção. Influência geracional começa aqui. A partir de 13 anos. Presencial e online. Material incluso.",
    convite: "A partir de 13. Quem nunca foi abençoado — e quem precisa abençoar os filhos.",
    reels: reels([
      { nome: "Roberto", papel: "Pai", frase: "Eu não recebi. Aprendi a pronunciar nos meus.", capa: fotos.familia },
      { nome: "Lívia", papel: "Adolescente", frase: "Ouvir ‘filho amado’ mudou a semana inteira.", capa: fotos.adolescentes },
      { nome: "Helena", papel: "Mulheres", frase: "Identidade de filha. Não de órfã funcional.", capa: fotos.mulheres },
      { nome: "FFI", papel: "Ágape", frase: "Bênção não é sentimento. É pronunciamento.", capa: fotos.celulaFamilias },
    ]),
  },
  ff7: {
    glow: "#d45a8c",
    headline: "Quem sou eu? Deus quer responder.",
    slogan: "Versão homens. Versão mulheres. Fim de semana.",
    manifesto:
      "Quem sou eu? Qual a verdade sobre mim? Indefinição causa dor e deturpa a identidade. Deus espera a pergunta — e deseja responder com amor infinito. Duas versões: homens e mulheres. Linguagem simples, grupo pequeno, oração e ministração. A partir de 13 anos. Presencial e online. Material incluso.",
    convite: "A partir de 13. Escolha a turma de irmãos ou de irmãs. Traga a pergunta.",
    reels: reels([
      { nome: "Gabriel", papel: "15 anos", frase: "Eu não sabia quem era. O Pai respondeu.", capa: fotos.adolescentes },
      { nome: "Bruna", papel: "Jovem", frase: "A dúvida doía. A verdade do Pai coube.", capa: fotos.mulheres },
      { nome: "Paulo", papel: "Homens", frase: "Identidade não se baixa em cargo. Se recebe.", capa: fotos.homens },
      { nome: "Time Jovens", papel: "FFI", frase: "Pergunte. Ele responde com amor. Não com desempenho.", capa: fotos.jovens },
    ]),
  },
  ff8: {
    glow: "#c23b3b",
    headline: "Ira e vício têm raiz. Dá para vencer.",
    slogan: "Temperamento, comida, compra. Fim de semana no poder de Deus.",
    manifesto:
      "Dificuldade com temperamento ou hábitos compulsivos — comida, compras, outros vícios? Este seminário traz soluções práticas e bíblicas para achar de onde vêm a frustração e a ira, e superá-las no poder de Deus. A partir de 13 anos. Vídeo, grupo, oração e ministração. Presencial e online. Material incluso.",
    convite: "A partir de 13. Se a ira manda na casa ou no carrinho, este fim de semana é para você.",
    reels: reels([
      { nome: "Eduardo", papel: "Casado", frase: "Eu explodia. A raiz não era o trânsito.", capa: fotos.homens },
      { nome: "Carla", papel: "Mãe", frase: "Compra era ira disfarçada. O seminário nomeou.", capa: fotos.familia },
      { nome: "Igor", papel: "Jovem", frase: "Temperamento não é personalidade. É ferida.", capa: fotos.jovens },
      { nome: "Célula", papel: "FFI", frase: "No poder de Deus. Não na força de vontade sozinha.", capa: fotos.celulas },
    ]),
  },
  gf1: {
    glow: "#c47ab8",
    headline: "O bebê chega. A casa precisa de rumo.",
    slogan: "Amamentação, sono e cuidados. Cinco semanas. GFI.",
    manifesto:
      "GFI — Paternidade Bíblica (Growing Families International). Best-seller de Gary e Anne Marie Ezzo: aspectos essenciais do desenvolvimento infantil para os pais estabelecerem rotina de amamentação, vigília e sono, com cuidados completos do recém-nascido. Para grávidas a partir do 4º mês. Presencial e online. Material incluso.",
    convite: "Grávidas a partir do 4º mês. O pai é bem-vindo. Cinco semanas antes do parto contar.",
    reels: reels([
      { nome: "Mariana", papel: "7º mês", frase: "Sono deixou de ser mito de internet. Virou plano.", capa: fotos.familia },
      { nome: "Pedro", papel: "Pai", frase: "Eu ia improvisar. O curso me deu rotina.", capa: fotos.homens },
      { nome: "Time Kids", papel: "Ágape", frase: "Paternidade começa no quarto mês. Não na alta.", capa: fotos.infantil },
      { nome: "Escola da Família", papel: "GFI", frase: "Recém-nascido com cuidado. Não com palpite.", capa: fotos.celulaFamilias },
    ]),
  },
  gf2: {
    glow: "#3d9a7a",
    headline: "De 1 a 3 anos tudo entra. Inclusive o que você não planejou.",
    slogan: "Primeira infância com confiança. Nove semanas. GFI.",
    manifesto:
      "Conhecimentos úteis e práticos para educar na primeira infância — fase em que a criança aprende rápido e está suscetível a tudo que a cerca. Pais e mães com filhos de 1 a 3 anos. Encontros de até 2h. Presencial e online. Material incluso.",
    convite: "Pais de 1 a 3 anos. Nove semanas para educar com confiança, não só com cansaço.",
    reels: reels([
      { nome: "Ana", papel: "Mãe do Davi, 2 anos", frase: "Ele absorvia tudo. Eu não tinha método.", capa: fotos.infantil },
      { nome: "Lucas", papel: "Pai", frase: "Confiança. Eu só tinha improviso e YouTube.", capa: fotos.homens },
      { nome: "Célula Famílias", papel: "Ágape", frase: "Primeira infância é janela. GFI ensina a usar.", capa: fotos.familia },
      { nome: "Time Kids", papel: "GFI", frase: "Influência agora. Caráter depois.", capa: fotos.celulaFamilias },
    ]),
  },
  gf3: {
    glow: "#7eb64a",
    headline: "Dois milhões de famílias já testaram. Agora a sua.",
    slogan: "Como criar seus filhos. Dez semanas. Prático.",
    manifesto:
      "De fácil aceitação, aliado da igreja local, escolas e projetos sociais. Ensinos práticos já testados por mais de 2 milhões de famílias e 4 milhões de crianças. Pais, responsáveis e educadores. Até 2h por encontro. Presencial e online. Material incluso. GFI — Paternidade Bíblica.",
    convite: "Pais e educadores. Dez semanas. Método testado, não opinião da vez.",
    reels: reels([
      { nome: "Carla", papel: "Mãe de três", frase: "Fácil de entender. Difícil foi começar. Depois fluía.", capa: fotos.familia },
      { nome: "Escola", papel: "Educadora", frase: "Levei para o projeto social. As casas mudaram.", capa: fotos.educacao },
      { nome: "João", papel: "Pai", frase: "Dois milhões não mentem. Minha casa confirmou.", capa: fotos.homens },
      { nome: "Time Kids", papel: "GFI", frase: "Igreja local forte começa em casa treinada.", capa: fotos.infantil },
    ]),
  },
  gf4: {
    glow: "#e07a5a",
    headline: "Não só o comportamento. O coração.",
    slogan: "Educação à maneira de Deus. Dezessete semanas.",
    manifesto:
      "Primeiro curso para pais e mães cristãos: paternidade na Palavra, trabalhando não só o comportamento externo, mas as atitudes do coração. Da pré-escola à pré-adolescência, com propósito eterno. Gary e Anne Marie Ezzo. Até 2h. Presencial e online. Material incluso.",
    convite: "Pais e educadores. Dezessete semanas. O mais longo — porque o coração não se forma em atalho.",
    reels: reels([
      { nome: "Helena", papel: "Mãe", frase: "Eu treinava pose. O curso foi atrás do coração.", capa: fotos.mulheres },
      { nome: "Paulo", papel: "Pai", frase: "Palavra na paternidade. Eu só tinha grito.", capa: fotos.homens },
      { nome: "Time Kids", papel: "Pré", frase: "Propósito eterno. Não só nota e obediência.", capa: fotos.infantil },
      { nome: "Escola da Família", papel: "GFI", frase: "Dezessete semanas. Casa diferente no meio.", capa: fotos.familia },
    ]),
  },
  gf5: {
    glow: "#4a7ec4",
    headline: "Pureza se ensina em casa. Na dose certa.",
    slogan: "Verdade biológica e bíblica. Nove semanas. GFI.",
    manifesto:
      "Educação sexual das crianças de forma prática: confiança para ensinar verdades biológicas e bíblicas com dosagem e abordagem certas. Treinamento moral e proteção contra o que tenta entrar no lar. Pais, responsáveis e educadores. Até 2h. Presencial e online. Material incluso.",
    convite: "Pais e educadores. Nove semanas para falar antes da internet.",
    reels: reels([
      { nome: "Mariana", papel: "Mãe", frase: "Eu adiava. A dose certa veio neste curso.", capa: fotos.familia },
      { nome: "Roberto", papel: "Pai", frase: "Proteção não é silêncio. É conversa com verdade.", capa: fotos.homens },
      { nome: "Time Adolescentes", papel: "Ágape", frase: "O que não se ensina em casa, o feed ensina torto.", capa: fotos.adolescentes },
      { nome: "GFI", papel: "Paternidade Bíblica", frase: "Moral e Palavra. Sem pânico e sem omissão.", capa: fotos.celulaFamilias },
    ]),
  },
  gf6: {
    glow: "#e07a2f",
    headline: "Independência sem perder o filho.",
    slogan: "O coração do adolescente. Doze semanas. Até 1h30.",
    manifesto:
      "Adolescência é transição, conflito e busca de independência. Entender a fase e o que a Palavra diz ajuda a refletir atitudes, achar respostas e construir relacionamento que influencia a vida inteira. Pais, responsáveis e educadores. Gary e Anne Marie Ezzo. Presencial e online. Material incluso.",
    convite: "Pais de adolescentes. Doze encontros de até 1h30. Vá atrás do coração, não só da porta do quarto.",
    reels: reels([
      { nome: "André", papel: "Pai de 15", frase: "Eu brigava pela porta. O curso foi atrás do peito.", capa: fotos.homens },
      { nome: "Bia", papel: "Mãe", frase: "Independência não é abandono. Aprendi o meio.", capa: fotos.mulheres },
      { nome: "Time Adolescentes", papel: "Ágape", frase: "Relacionamento que dura a vida. Começa agora.", capa: fotos.adolescentes },
      { nome: "Famílias", papel: "GFI", frase: "Conflito é fase. Distância é escolha.", capa: fotos.familia },
    ]),
  },
  gf7: {
    glow: "#3d8ad4",
    headline: "Deficiência não cancela propósito.",
    slogan: "Sete necessidades. Sete semanas. Um convite para voar.",
    manifesto:
      "Bev Linder leva pais e mães de crianças com deficiência a ver, em cada pessoa, propósito único e necessidades universais. Maximizar potencial, suprindo sete necessidades básicas. Encontros de até 2h. Presencial e online. Material incluso. GFI.",
    convite: "Pais de crianças com deficiência. Sete semanas para voar — sem reduzir o filho ao laudo.",
    reels: reels([
      { nome: "Carla", papel: "Mãe", frase: "Eu via só o diagnóstico. O curso viu o chamado.", capa: fotos.familia },
      { nome: "Paulo", papel: "Pai", frase: "Necessidades básicas. Universais. Meu filho não é exceção de amor.", capa: fotos.homens },
      { nome: "Time Kids", papel: "Ágape", frase: "Potencial. A gente não mede por comparação.", capa: fotos.infantil },
      { nome: "GFI", papel: "Paternidade Bíblica", frase: "Um convite para voar. A casa inteira sobe.", capa: fotos.celulaFamilias },
    ]),
  },
};

export function cursoComLanding(curso: Curso): Curso {
  const extra = extraPorId[curso.id];
  if (!extra) return curso;
  return { ...curso, ...extra };
}
