import React from 'react'
import styled from 'styled-components'
import InfiniteProgressWrapper from './InfiniteProgressWrapper'
import {
  PRIMARY_COLOR,
  BOX_SHADOW_1,
  BOX_SHADOW_2
} from '../util/constants'

const Outer = styled.div`
  min-height: 100vh;
  min-width: 100vw;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  background: ${PRIMARY_COLOR};
  color: #fff;
`

const Title = styled.h1`
  font-size: 6rem;
  text-transform: uppercase;
`

const Button = styled.button`
  border: none;
  font-size: inherit;
  color: inherit;

  padding: 16px 32px;
  border-radius: 4px;

  cursor: pointer;
  text-transform: uppercase;
  
  background: rgba(0, 0, 0, .2);
  box-shadow: ${BOX_SHADOW_1};
  transition: box-shadow .2s ease-in;

  &:hover {
    box-shadow: ${BOX_SHADOW_2}
  }
`

const ButtonWrapper = styled.div`
  display: inline-block;
  position: relative;
`

const ProgressWrapper = styled.div`
  > div {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
  }
`

const Progress = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, .2);
`

const Login = ({ actions, isLoading }) => (
  <Outer>
    <div>
      <Title>Reddix</Title>

      <ButtonWrapper>
        {isLoading && (
          <ProgressWrapper>
            <InfiniteProgressWrapper>
              <Progress />
            </InfiniteProgressWrapper>
          </ProgressWrapper>
        )}
        <Button onClick={() => actions.loginRequest()}>
          Login with Reddit
        </Button>
      </ButtonWrapper>
    </div>
  </Outer>
)

export default Login
