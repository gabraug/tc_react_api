import styled from 'styled-components'

const Container = styled.div`
  padding: 1.5rem;
`

const Title = styled.h1`
  font-size: 2rem;
`

function Home() {
  return (
    <Container>
      <Title>Home</Title>
    </Container>
  )
}

export default Home

