import styled from 'styled-components'

const Container = styled.div`
  padding: 1.5rem;
`

const Title = styled.h1`
  font-size: 2rem;
`

function MovieDetails() {
  return (
    <Container>
      <Title>Movie Details</Title>
    </Container>
  )
}

export default MovieDetails

