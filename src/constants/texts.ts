export const texts = {
  navigation: {
    home: 'Início',
    favorites: 'Favoritos',
    back: 'Voltar',
  },

  header: {
    logo: 'TMDB',
    searchPlaceholder: 'Buscar filmes...',
    searchButton: 'Buscar',
    searchAlreadyActive: 'Você já está pesquisando por este termo',
  },

  buttons: {
    confirm: 'Confirmar',
    cancel: 'Cancelar',
    save: 'Salvar',
    edit: 'Editar',
    delete: 'Deletar',
    remove: 'Remover',
    create: 'Criar',
    retry: 'Tentar novamente',
    clear: 'Limpar',
    addToFavorites: 'Adicionar aos Favoritos',
    removeFromFavorites: 'Remover dos Favoritos',
    exploreMovies: 'Explorar Filmes',
    searchAgain: 'Pesquisar novamente',
  },

  placeholders: {
    listName: 'Nome da lista',
  },

  labels: {
    sortBy: 'Ordenar por',
    tmdbRating: 'Nota TMDB',
    releaseDate: 'Data de lançamento:',
    synopsis: 'Sinopse',
    listName: 'Nome da lista',
  },

  sortOptions: {
    titleAsc: 'A-Z',
    titleDesc: 'Z-A',
    ratingDesc: 'Nota: Maior',
    ratingAsc: 'Nota: Menor',
    favoritesFirst: 'Favoritos primeiro',
  },

  loading: {
    default: 'Carregando...',
    movies: 'Carregando filmes...',
    moreMovies: 'Carregando mais filmes...',
    movieDetails: 'Carregando detalhes do filme...',
    searching: 'Buscando filmes...',
    image: 'Carregando imagem...',
  },

  errors: {
    loadMovies: 'Não foi possível carregar os filmes. Tente novamente mais tarde.',
    loadMoreMovies: 'Erro ao carregar mais filmes',
    searchMovies: 'Erro ao buscar filmes',
    loadMoreResults: 'Erro ao carregar mais resultados',
    loadFavorites: 'Erro ao carregar favoritos',
    loadMovieDetails: 'Não foi possível carregar os detalhes do filme.',
    invalidDate: 'Data inválida',
  },

  success: {
    listCreated: (listName: string) => `Lista "${listName}" criada com sucesso!`,
    listRenamed: (listName: string) => `Lista renomeada para "${listName}"`,
    movieAddedToFavorites: (movieTitle: string) => `"${movieTitle}" adicionado aos favoritos`,
    movieAddedToList: (movieTitle: string, listName: string) =>
      `"${movieTitle}" adicionado a "${listName}"`,
  },

  info: {
    movieRemovedFromFavorites: (movieTitle: string) => `"${movieTitle}" removido dos favoritos`,
    movieRemovedFromList: (movieTitle: string, listName: string) =>
      `"${movieTitle}" removido de "${listName}"`,
    listDeleted: (listName: string) => `Lista "${listName}" deletada`,
  },

  empty: {
    noFavorites: 'Ainda não há favoritos',
    emptyList: 'Esta lista está vazia',
    emptyListDescription: 'Comece adicionando filmes à sua lista de favoritos!',
    noMoviesFound: (query: string) => `Nenhum filme foi encontrado para "${query}"`,
    noMoviesFoundDescription:
      'Experimente pesquisar por um termo diferente ou verificar a ortografia',
    noSearchTerm: 'Digite um termo de busca para encontrar filmes',
    noPoster: 'Filme sem poster',
    noImage: 'Sem imagem disponível',
    noGenre: 'Sem gênero',
    noSynopsis: 'Sinopse não disponível.',
    noReleaseDate: 'Data não disponível',
  },

  modals: {
    addToFavorites: (movieTitle: string) => `Adicionar "${movieTitle}" aos favoritos`,
    removeFromFavorites: (movieTitle: string) => `Remover "${movieTitle}" dos favoritos`,
    deleteList: 'Deletar lista',
    deleteListConfirm: (listName: string) =>
      `Tem certeza que deseja deletar a lista "${listName}"? Esta ação não pode ser desfeita.`,
    selectListToRemove: 'Selecione de qual lista deseja remover:',
    favorites: 'Favoritos',
    createNewList: '+ Criar nova lista',
    listLimitReached: (current: number, max: number) =>
      `Limite de ${current}/${max} listas atingido`,
  },

  lists: {
    favorites: 'Favoritos',
    general: 'Favoritos',
    defaultListName: 'lista',
  },

  search: {
    resultsFor: (query: string) => `Resultados para "${query}"`,
    foundMovies: (count: number) => `Encontrados ${count} filme${count !== 1 ? 's' : ''}`,
  },

  aria: {
    search: 'Buscar',
    clear: 'Limpar',
    minimize: 'Minimizar',
    maximize: 'Maximizar',
  },
} as const

