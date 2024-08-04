import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const institutionsToSeed = [
    {
      name: "Instituto Educação para Todos",
      description: "Promovendo educação de qualidade para comunidades carentes.",
      images: [],
      pixQRCodeRaw: "00020126580014br.gov.bcb.pix0136cf08ba72-58ac-491d-bb4b-2f1c855a1db927600016BR.COM.PAGSEGURO0136CBD8956F-8AA3-493E-AE8E-8CDC46362A505204000053039865802BR5920ANDRE SANTOS CASTELO6010Rio do Sul62290525PAGS00000000024072816473263045320",
      campaigns: [
        {
          startDate: '12/12/2024',
          endDate: '13/09/2025',
          name: "Campanha Livros para Todos",
          description: "Arrecadação de livros didáticos para escolas públicas.",
          images: [],
          pixQRCodeRaw: "00020126580014br.gov.bcb.pix0136cf08ba72-58ac-491d-bb4b-2f1c855a1db927600016BR.COM.PAGSEGURO0136CBD8956F-8AA3-493E-AE8E-8CDC46362A505204000053039865802BR5920ANDRE SANTOS CASTELO6010Rio do Sul62290525PAGS00000000024072816473263045320"
        },
        {
          startDate: '12/12/2024',
          endDate: '13/09/2025',
          name: "Campanha Tecnologia na Educação",
          description: "Aquisição de computadores e tablets para alunos.",
          images: [],
          pixQRCodeRaw: "00020126580014br.gov.bcb.pix0136cf08ba72-58ac-491d-bb4b-2f1c855a1db927600016BR.COM.PAGSEGURO0136CBD8956F-8AA3-493E-AE8E-8CDC46362A505204000053039865802BR5920ANDRE SANTOS CASTELO6010Rio do Sul62290525PAGS00000000024072816473263045320"
        },
        {
          startDate: '12/12/2024',
          endDate: '13/09/2025',
          name: "Campanha Professores Capacitados",
          description: "Cursos de capacitação para professores da rede pública.",
          images: [],
          pixQRCodeRaw: "00020126580014br.gov.bcb.pix0136cf08ba72-58ac-491d-bb4b-2f1c855a1db927600016BR.COM.PAGSEGURO0136CBD8956F-8AA3-493E-AE8E-8CDC46362A505204000053039865802BR5920ANDRE SANTOS CASTELO6010Rio do Sul62290525PAGS00000000024072816473263045320"
        }
      ]
    },
    {
      name: "Fundação Saúde e Vida",
      description: "Projetos de saúde e bem-estar para comunidades carentes.",
      images: [],
      pixQRCodeRaw: "00020126580014br.gov.bcb.pix0136cf08ba72-58ac-491d-bb4b-2f1c855a1db927600016BR.COM.PAGSEGURO0136CBD8956F-8AA3-493E-AE8E-8CDC46362A505204000053039865802BR5920ANDRE SANTOS CASTELO6010Rio do Sul62290525PAGS00000000024072816473263045320",
      campaigns: [
        {
          startDate: '12/12/2024',
          endDate: '13/09/2025',
          name: "Campanha Médicos Voluntários",
          description: "Recrutamento de médicos para atendimento gratuito.",
          images: [],
          pixQRCodeRaw: "00020126580014br.gov.bcb.pix0136cf08ba72-58ac-491d-bb4b-2f1c855a1db927600016BR.COM.PAGSEGURO0136CBD8956F-8AA3-493E-AE8E-8CDC46362A505204000053039865802BR5920ANDRE SANTOS CASTELO6010Rio do Sul62290525PAGS00000000024072816473263045320"
        },
        {
          startDate: '12/12/2024',
          endDate: '13/09/2025',
          name: "Campanha Saúde para Todos",
          description: "Campanha de vacinação em comunidades rurais.",
          images: [],
          pixQRCodeRaw: "00020126580014br.gov.bcb.pix0136cf08ba72-58ac-491d-bb4b-2f1c855a1db927600016BR.COM.PAGSEGURO0136CBD8956F-8AA3-493E-AE8E-8CDC46362A505204000053039865802BR5920ANDRE SANTOS CASTELO6010Rio do Sul62290525PAGS00000000024072816473263045320"
        },
        {
          startDate: '12/12/2024',
          endDate: '13/09/2025',
          name: "Campanha Alimentação Saudável",
          description: "Promoção de hábitos alimentares saudáveis nas escolas.",
          images: [],
          pixQRCodeRaw: "00020126580014br.gov.bcb.pix0136cf08ba72-58ac-491d-bb4b-2f1c855a1db927600016BR.COM.PAGSEGURO0136CBD8956F-8AA3-493E-AE8E-8CDC46362A505204000053039865802BR5920ANDRE SANTOS CASTELO6010Rio do Sul62290525PAGS00000000024072816473263045320"
        }
      ]
    },
    {
      name: "Associação Esperança",
      description: "Apoio social e psicológico para famílias em situação de vulnerabilidade.",
      images: [],
      pixQRCodeRaw: "00020126580014br.gov.bcb.pix0136cf08ba72-58ac-491d-bb4b-2f1c855a1db927600016BR.COM.PAGSEGURO0136CBD8956F-8AA3-493E-AE8E-8CDC46362A505204000053039865802BR5920ANDRE SANTOS CASTELO6010Rio do Sul62290525PAGS00000000024072816473263045320",
      campaigns: [
        {
          startDate: '12/12/2024',
          endDate: '13/09/2025',
          name: "Campanha de Apoio Psicológico",
          description: "Sessões de terapia para famílias de baixa renda.",
          images: [],
          pixQRCodeRaw: "00020126580014br.gov.bcb.pix0136cf08ba72-58ac-491d-bb4b-2f1c855a1db927600016BR.COM.PAGSEGURO0136CBD8956F-8AA3-493E-AE8E-8CDC46362A505204000053039865802BR5920ANDRE SANTOS CASTELO6010Rio do Sul62290525PAGS00000000024072816473263045320"
        },
        {
          startDate: '12/12/2024',
          endDate: '13/09/2025',
          name: "Campanha Abrigos Seguros",
          description: "Criação de abrigos para vítimas de violência doméstica.",
          images: [],
          pixQRCodeRaw: "00020126580014br.gov.bcb.pix0136cf08ba72-58ac-491d-bb4b-2f1c855a1db927600016BR.COM.PAGSEGURO0136CBD8956F-8AA3-493E-AE8E-8CDC46362A505204000053039865802BR5920ANDRE SANTOS CASTELO6010Rio do Sul62290525PAGS00000000024072816473263045320"
        }
      ]
    },
    {
      name: "Organização Ambiental Verde",
      description: "Preservação do meio ambiente e educação ambiental.",
      images: [],
      pixQRCodeRaw: "00020126580014br.gov.bcb.pix0136cf08ba72-58ac-491d-bb4b-2f1c855a1db927600016BR.COM.PAGSEGURO0136CBD8956F-8AA3-493E-AE8E-8CDC46362A505204000053039865802BR5920ANDRE SANTOS CASTELO6010Rio do Sul62290525PAGS00000000024072816473263045320",
      campaigns: [
        {
          startDate: '12/12/2024',
          endDate: '13/09/2025',
          name: "Campanha de Reflorestamento",
          description: "Plantio de árvores em áreas desmatadas.",
          images: [],
          pixQRCodeRaw: "00020126580014br.gov.bcb.pix0136cf08ba72-58ac-491d-bb4b-2f1c855a1db927600016BR.COM.PAGSEGURO0136CBD8956F-8AA3-493E-AE8E-8CDC46362A505204000053039865802BR5920ANDRE SANTOS CASTELO6010Rio do Sul62290525PAGS00000000024072816473263045320"
        },
        {
          startDate: '12/12/2024',
          endDate: '13/09/2025',
          name: "Campanha Limpeza de Rios",
          description: "Mutirões para limpeza de rios e lagos.",
          images: [],
          pixQRCodeRaw: "00020126580014br.gov.bcb.pix0136cf08ba72-58ac-491d-bb4b-2f1c855a1db927600016BR.COM.PAGSEGURO0136CBD8956F-8AA3-493E-AE8E-8CDC46362A505204000053039865802BR5920ANDRE SANTOS CASTELO6010Rio do Sul62290525PAGS00000000024072816473263045320"
        },
        {
          startDate: '12/12/2024',
          endDate: '13/09/2025',
          name: "Campanha Educação Ambiental",
          description: "Programas educativos sobre sustentabilidade para escolas.",
          images: [],
          pixQRCodeRaw: "00020126580014br.gov.bcb.pix0136cf08ba72-58ac-491d-bb4b-2f1c855a1db927600016BR.COM.PAGSEGURO0136CBD8956F-8AA3-493E-AE8E-8CDC46362A505204000053039865802BR5920ANDRE SANTOS CASTELO6010Rio do Sul62290525PAGS00000000024072816473263045320"
        }
      ]
    },
    {
      name: "Centro Cultural Cidadania",
      description: "Promoção da cultura e cidadania através de projetos artísticos.",
      images: [],
      pixQRCodeRaw: "00020126580014br.gov.bcb.pix0136cf08ba72-58ac-491d-bb4b-2f1c855a1db927600016BR.COM.PAGSEGURO0136CBD8956F-8AA3-493E-AE8E-8CDC46362A505204000053039865802BR5920ANDRE SANTOS CASTELO6010Rio do Sul62290525PAGS00000000024072816473263045320",
      campaigns: [
        {
          startDate: '12/12/2024',
          endDate: '13/09/2025',
          name: "Campanha Arte para Todos",
          description: "Oficinas de arte para jovens em situação de risco.",
          images: [],
          pixQRCodeRaw: "00020126580014br.gov.bcb.pix0136cf08ba72-58ac-491d-bb4b-2f1c855a1db927600016BR.COM.PAGSEGURO0136CBD8956F-8AA3-493E-AE8E-8CDC46362A505204000053039865802BR5920ANDRE SANTOS CASTELO6010Rio do Sul62290525PAGS00000000024072816473263045320"
        },
        {
          startDate: '12/12/2024',
          endDate: '13/09/2025',
          name: "Campanha Música para a Comunidade",
          description: "Aulas de música gratuitas para crianças e adolescentes.",
          images: [],
          pixQRCodeRaw: "00020126580014br.gov.bcb.pix0136cf08ba72-58ac-491d-bb4b-2f1c855a1db927600016BR.COM.PAGSEGURO0136CBD8956F-8AA3-493E-AE8E-8CDC46362A505204000053039865802BR5920ANDRE SANTOS CASTELO6010Rio do Sul62290525PAGS00000000024072816473263045320"
        },
        {
          startDate: '12/12/2024',
          endDate: '13/09/2025',
          name: "Campanha Teatro Inclusivo",
          description: "Produções teatrais inclusivas para pessoas com deficiência.",
          images: [],
          pixQRCodeRaw: "00020126580014br.gov.bcb.pix0136cf08ba72-58ac-491d-bb4b-2f1c855a1db927600016BR.COM.PAGSEGURO0136CBD8956F-8AA3-493E-AE8E-8CDC46362A505204000053039865802BR5920ANDRE SANTOS CASTELO6010Rio do Sul62290525PAGS00000000024072816473263045320"
        },
        {
          startDate: '12/12/2024',
          endDate: '13/09/2025',
          name: "Campanha Literatura na Comunidade",
          description: "Clubes de leitura e bibliotecas comunitárias.",
          images: [],
          pixQRCodeRaw: "00020126580014br.gov.bcb.pix0136cf08ba72-58ac-491d-bb4b-2f1c855a1db927600016BR.COM.PAGSEGURO0136CBD8956F-8AA3-493E-AE8E-8CDC46362A505204000053039865802BR5920ANDRE SANTOS CASTELO6010Rio do Sul62290525PAGS00000000024072816473263045320"
        }
      ]
    }
];
  
async function main() {
  // Seed institutions and campaigns
  institutionsToSeed.forEach(async (institution) => {
    await prisma.institution.create({
      data: {
        ...institution,
        campaigns: { createMany: { data: institution.campaigns } },
      },
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
