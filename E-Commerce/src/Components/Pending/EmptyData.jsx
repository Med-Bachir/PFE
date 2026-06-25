import Lottie from 'lottie-react'
import React from 'react'
import styled from 'styled-components'
import empty from "../../assets/noData.json"


const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

`
const Empty = styled.span`
font-size: 32px;
font-weight: 600;
margin-top: -30px;

`

const EmptyData = ({text}) => {
  return (
    <Container>

<Lottie style={{width:'30%'}} animationData={empty}/>
<Empty>{text}</Empty>
                </Container>
  )
}

export default EmptyData
