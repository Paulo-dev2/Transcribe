# YoutubeTranscription
# Equipe:
   - André Soares
   - Andrei Magalhães
   - Artur Dantas
   - Lucca de Carvalho
   - Paulo Abdiel
# Informações:
   - Disciplina: Computabilidade e Complexidade de Algoritmos
   - Curso: Ciência da Computação
   - Instiuição: Centro Universitário do Distrito Federal UDF, Coordenação de Tecnologia da Informação, Brasília, DF

  Use como exemplo de vídeo para transcrever, para testes: https://www.youtube.com/watch?v=_jnMR2-zKoc

# Objetivo:
  Com o propósito de fomentar a inclusão e a acessibilidade na internet, foi desenvolvida a ferramenta "YoutubeTranscription". Esta inovação tecnológica possibilita a transcrição de vídeos a partir de URLs do YouTube, convertendo-os para o formato SRT (SubRip Text). O formato SRT é amplamente reconhecido e utilizado para arquivos de legenda em vídeos, permitindo que o conteúdo audiovisual seja convertido em legendas precisas e sincronizadas.

  Além disso, a integração da "YoutubeTranscription" com a vLibras, uma plataforma que viabiliza a tradução do conteúdo do português para a Língua Brasileira de Sinais (Libras), representa um avanço significativo. Essa sinergia tecnológica torna a web mais acessível e inclusiva para pessoas com deficiência auditiva, oferecendo não apenas legendas, mas também a possibilidade de tradução do conteúdo visual e sonoro para uma linguagem visual e gestual, como a Libras.

  Essa ferramenta não só contribui para a acessibilidade de pessoas com deficiência auditiva, mas também enriquece a experiência de todos os usuários. A disponibilização de legendas pode ser útil em diversas situações, como ambientes barulhentos, aprendizado de idiomas e para melhor compreensão do conteúdo apresentado nos vídeos.

  A "YoutubeTranscription" surge como uma solução tecnológica inovadora que não apenas satisfaz as exigências de acessibilidade, mas também promove a inclusão e a diversidade na esfera digital. Ao tornar os vídeos mais acessíveis e compreensíveis para uma ampla gama de usuários, estamos dando um passo importante em direção a uma internet mais igualitária e inclusiva para todos.

  Com essa ferramenta, a internet se torna um espaço mais inclusivo, onde a diversidade de usuários é valorizada, garantindo que o acesso ao conteúdo online seja efetivo e enriquecedor para todos, independentemente de suas habilidades ou deficiências específicas.


# Introdução:
  A busca pela acessibilidade na internet transcende a mera recomendação, é uma obrigação moral e legal, dada a diversidade de usuários com necessidades variadas e deficiências. A internet é uma ferramenta global, e garantir que todos possam acessar e utilizar seus recursos é essencial. Para alcançar a inclusão, os desenvolvedores devem abordar vários aspectos, incluindo marcação semântica para uma estrutura clara, fornecer texto alternativo para imagens, garantir contraste adequado de cores, melhorar a navegabilidade, oferecer legendas e audiodescrição em conteúdo multimídia, entre outras práticas.

  Durante a concepção e desenvolvimento do YoutubeTranscription, nos inspiramos em plataformas de acessibilidade líderes, como Veed.io, para abordar as lacunas presentes em termos de acessibilidade em websites convencionais. Nosso foco principal foi transformar essas lacunas em recursos acessíveis para todos os usuários, priorizando aspectos como marcação semântica, texto alternativo, contraste de cores, navegabilidade, legendas e audiodescrição.

  De acordo com o site do Governo Federal, em 15 de setembro de 2023, estima-se que haja cerca de 18,9 milhões de pessoas com deficiências no Brasil. Portanto, é imperativo atender às necessidades desse público.

  Para tornar a internet mais inclusiva para pessoas com deficiência auditiva, desenvolvemos o "YoutubeTranscription". Essa inovadora ferramenta permite a transcrição de vídeos diretamente a partir de URLs do YouTube, transformando o áudio em legendas no formato SRT (SubRip Text). Além disso, a integração com a vLibras possibilita a tradução do conteúdo falado em português para a Língua Brasileira de Sinais (Libras), garantindo que pessoas com deficiências auditivas tenham acesso pleno ao conteúdo online. Esse projeto é um passo significativo em direção a uma internet verdadeiramente inclusiva e acessível para todos.


  # METODOLOGIA

 No desenvolvimento do YoutubeTranscription, nos baseamos na abordagem e nas práticas adotadas por plataformas de acessibilidade notáveis, incluindo o uso de tecnologias semelhantes e estratégias de design centradas na acessibilidade, conforme observado em sites como Veed.io. Implementamos melhorias significativas, como marcação semântica adequada, texto alternativo para imagens e elementos visuais, garantia de contraste de cores adequado, facilitação da navegabilidade, e inclusão de legendas e audiodescrição.

   - Marcação semântica: Empregamos marcações HTML adequadas e semânticas para garantir que o conteúdo seja interpretado corretamente por leitores de tela e outros dispositivos de assistência.

   - Texto alternativo: Disponibilizamos descrições apropriadas para imagens e elementos visuais, permitindo que usuários com deficiência visual compreendam o conteúdo.

   - Contraste de cores: Certificamo-nos de que o texto e elementos visuais apresentem contraste suficiente para garantir a legibilidade para pessoas com deficiência visual.

   - Navegabilidade: Projetamos uma navegação no site que seja fácil e lógica, permitindo que os usuários se desloquem eficazmente usando teclados, leitores de tela e outros dispositivos.

   - Legendas e audiodescrição: Incluímos legendas em vídeos e fornecemos audiodescrição para tornar o conteúdo de mídia acessível a pessoas surdas ou com deficiência visual.

  Além disso, com a tecnologia do vLibras, um tradutor de língua portuguesa para a Língua Brasileira de Sinais (Libras), que trabalha automaticamente para converter legendas em português ou outros idiomas em Libras. Essa abordagem integrada visa tornar a internet mais acessível, especialmente para pessoas com deficiências auditivas e visuais, contribuindo para uma experiência online verdadeiramente inclusiva.

  A complexidade do algoritmo vem da dificuldade de entender e transcrever um áudio em tempo polinomial pois mesmo com um som “cristalino” um modelo de idioma completo é necessário para lidar com diferenças minúsculas de um bom reconhecimento de fala, o que geralmente implica uma análise de contexto.

  Embora as redes neurais possam produzir bons resultados, uma boa rede neural é quase sempre cuidadosamente planejada e otimizada para uma necessidade específica. Uma ampla experiência e compreensão de línguas e redes neurais é necessária para isso, além de treinamento intensivo. 

  Para realizar a transcrição de vídeos no YoutubeTranscription, empregamos uma metodologia que envolve o uso de um modelo avançado de Inteligência Artificial (IA) desenvolvido pela DeepGreen. É essencial notar que, embora esse modelo de IA seja altamente sofisticado, ele não é infalível e, portanto, a precisão da transcrição pode variar em alguns casos. A IA faz o melhor esforço para converter o conteúdo de áudio em texto, mas a complexidade de alguns contextos de fala e sotaques pode afetar a precisão. Um grande desafio é "reverter uma engenharia" do conhecimento disponível sobre uma língua em um modelo, pois a maioria das línguas são evoluídas e não foram projetadas como modelos matemáticos.

  Apesar dessas limitações, o YoutubeTranscription é um recurso valioso que contribui significativamente para tornar a internet mais acessível para pessoas com deficiências auditivas, proporcionando vídeos em legendas e, em seguida, traduzindo-as para a Língua Brasileira de Sinais (Libras) com a ajuda da vLibras. A utilização deste modelo de IA avançada é um passo importante na busca da inclusão digital, mas os usuários devem estar cientes de que a transcrição não é 100% precisa em todos os casos.

  Por exemplo em alguns casos pode existir erros gramaticais, sêmaticos, ortográficos entre outros, por isso o YoutubeTranscription fornece recurso do usúario de poder editar a trânscrição do jeito que o usúario desejar, para que a partir disso possa ser baixado o arquivo em SRT, onde colocará a legenda no vídeo.


# Tornando a Internet Mais Acessível: A Importância da Legenda e do vLibras

 - A evolução da tecnologia e da internet trouxe inúmeras vantagens para a nossa sociedade. No entanto, também evidenciou desafios e desigualdades em relação à acessibilidade. Um desses desafios é a exclusão de pessoas com deficiência auditiva de conteúdos de áudio e vídeo na web. Felizmente, soluções estão sendo desenvolvidas para superar esse problema, e uma delas é o uso de legendas e ferramentas como o vLibras.

# Deficiência Auditiva e Barreiras Online

 - A deficiência auditiva afeta milhões de pessoas em todo o mundo. Embora muitas vezes as tecnologias modernas sejam uma grande aliada para superar desafios, a internet também pode se tornar um ambiente de barreiras quando não oferece recursos acessíveis. O conteúdo de áudio e vídeo, como vídeos no YouTube, torna-se inacessível para aqueles que não podem ouvir.

# A Solução das Legendas

 - As legendas, ou legendagem, são a resposta para esse problema. Elas são transcrições escritas do conteúdo de áudio e fornecem às pessoas com deficiência auditiva a oportunidade de acompanhar o conteúdo de vídeo. No entanto, a implementação de legendas é um passo essencial e frequentemente subestimado na criação de conteúdo na web.

# O Papel Fundamental do vLibras

 - Para tornar a internet mais inclusiva, uma inovação chamada vLibras foi desenvolvida. O vLibras é um tradutor automático de conteúdo em língua portuguesa para a Língua Brasileira de Sinais (Libras), usada por pessoas com deficiência auditiva. Ele é uma ferramenta de grande importância para tornar os sites mais acessíveis, facilitando a comunicação e a compreensão de conteúdos online.

# Benefícios do vLibras para Sites de Transcrição de Vídeo

 - Os sites de transcrição de vídeo do YouTube e plataformas semelhantes podem aproveitar o vLibras para criar uma experiência mais inclusiva para seus usuários. Ao incorporar o vLibras, eles tornam possível a tradução automática do conteúdo para Libras. Isso permite que pessoas com deficiência auditiva tenham acesso igualitário a informações, educação, entretenimento e muito mais.

# O Compromisso com a Acessibilidade na Internet

 - Tornar a internet mais acessível é uma responsabilidade que deve ser compartilhada por todos. Os desenvolvedores de sites, criadores de conteúdo e empresas precisam adotar medidas que garantam que todos, independentemente de suas capacidades, possam desfrutar plenamente do conteúdo online. A integração de legendas e ferramentas como o vLibras é um passo crucial na direção certa.

 - Em resumo, a acessibilidade na internet é uma questão de igualdade e inclusão. Ao criar sites de transcrição de vídeo que incorporam legendas e o vLibras, estamos promovendo uma internet mais acolhedora, onde todos podem acessar informações e participar da comunicação online. É um passo fundamental para um mundo virtual mais inclusivo e diversificado.

# Conclusão
 As legendas, ou legendagem, são a resposta para esse problema. Elas são transcrições escritas do conteúdo de áudio e fornecem às pessoas com deficiência auditiva a oportunidade de acompanhar o conteúdo de vídeo. No entanto, a implementação de legendas é um passo essencial e frequentemente subestimado na criação de conteúdo na web.

  Os sites de transcrição de vídeo do YouTube e plataformas semelhantes podem aproveitar o YoutubeTranscription para criar uma experiência mais inclusiva para seus usuários. Ao incorporar o vLibras, eles tornam possível a tradução automática do conteúdo para Libras. Isso permite que pessoas com deficiência auditiva tenham acesso igualitário a informações, educação, entretenimento e muito mais.

  Em resumo, a acessibilidade na internet é uma questão de igualdade e inclusão. Ao criar o YoutubeTranscription incorporam legendas, estamos promovendo uma internet mais acolhedora, onde todos podem acessar informações e participar da comunicação online. É um passo fundamental para um mundo virtual mais inclusivo e diversificado.

  Site: https://transcribe-frontend.vercel.app/


# Referências

- W3C (World Wide Web Consortium). Web Content Accessibility Guidelines (WCAG) 2.0. Disponível em: https://www.w3.org/Translations/WCAG20-pt-br/. Acessado em: 29 out. 2023, às 18:12.

- Patel, Neil. Acessibilidade na Web. Disponível em: https://neilpatel.com/br/blog/acessibilidade-na-web/. Acessado em: 31 out. 2023, às 18:31.

- Governo Federal. Ministério da Mulher, da Família e dos Direitos Humanos. Pessoa com Deficiência - Estatísticas. Disponível em: https://www.gov.br/mdh/pt-br/navegue-por-temas/pessoa-com-deficiencia/estatisticas. Acessado em: 4 nov. 2023, às 15:22.

- VEED. Recursos de acessibilidade da Veed.io. Disponível em: https://www.veed.io/. Acessado em: 27 nov. 2023, às 15:34.