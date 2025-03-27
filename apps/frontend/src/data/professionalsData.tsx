export interface ProfessionalInfo {
  id: number;
  name: string;
  function: string;
  description: string;
  imgUrl: string;
}

export const PROFESSIONALS_INFO: ProfessionalInfo[] = [
  {
    id: 1,
    name: "Ahmed Omer",
    function: "CEO",
    description:
      "Especialista em ortodontia com mais de 20 anos de experiência.",
    imgUrl:
      "https://media.istockphoto.com/id/1371009338/pt/foto/portrait-of-confident-a-young-dentist-working-in-his-consulting-room.jpg?s=1024x1024&w=is&k=20&c=lay2vHehOOHac_fTrq2ovOwLurc6WSJxWm1Kw4iqun0=",
  },
  {
    id: 2,
    name: "Laura Ferreira",
    function: "Cirurgiã Dentista",
    description:
      "Especialista em cirurgia bucomaxilofacial e implantes dentários.",
    imgUrl:
      "https://media.istockphoto.com/id/1371009338/pt/foto/portrait-of-confident-a-young-dentist-working-in-his-consulting-room.jpg?s=1024x1024&w=is&k=20&c=lay2vHehOOHac_fTrq2ovOwLurc6WSJxWm1Kw4iqun0=",
  },
  {
    id: 3,
    name: "Carlos Andrade",
    function: "Dentista Geral",
    description:
      "Atua com atendimentos gerais, incluindo limpezas e restaurações.",
    imgUrl:
      "https://media.istockphoto.com/id/1371009338/pt/foto/portrait-of-confident-a-young-dentist-working-in-his-consulting-room.jpg?s=1024x1024&w=is&k=20&c=lay2vHehOOHac_fTrq2ovOwLurc6WSJxWm1Kw4iqun0=",
  },
  {
    id: 4,
    name: "Mariana Silva",
    function: "Ortodontista",
    description:
      "Especializada em tratamentos com aparelhos ortodônticos e alinhadores.",
    imgUrl:
      "https://media.istockphoto.com/id/1371009338/pt/foto/portrait-of-confident-a-young-dentist-working-in-his-consulting-room.jpg?s=1024x1024&w=is&k=20&c=lay2vHehOOHac_fTrq2ovOwLurc6WSJxWm1Kw4iqun0=",
  },
];
