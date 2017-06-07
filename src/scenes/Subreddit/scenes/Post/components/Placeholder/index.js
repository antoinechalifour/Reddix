import React from 'react'
import styled, { keyframes } from 'styled-components'

const backgroundAnimation = keyframes`
  0% {
    background-position: -468px 0
  }
  100% {
    background-position: 468px 0
  }
`

const Animated = styled.div`
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: ${backgroundAnimation};
  animation-timing-function: linear;
  background: #f6f7f8;
  background: #eeeeee;
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background-size: 800px 104px;
  height: 96px;
  position: relative;
`

const BaseMasker = styled.div`
  background: #fff;
  position: absolute;
  box-sizing: border-box;
`

const InformationMask = BaseMasker.extend`
  top: 0;
  right: 0;
  width: 350px;
  height: 18px;
`

const InformationSeparator = BaseMasker.extend`
  top: 18px;
  left: 0;
  right: 0;
  height: 8px;
`

const TitleSeparator = BaseMasker.extend`
  width: 12px;
  left: 70px;
  top: 26px;
  height: 70px;
`

const TitleSeparatorCenter = BaseMasker.extend`
  left: 70px;
  right: 0;
  top: 26px;
  height: 10px;
`

const TitleSeparatorMiddle = BaseMasker.extend`
  top: 54px;
  height: 6px;
  left: 70px;
  right: 0;
`

const TitleSeparatorBottom = BaseMasker.extend`
  bottom: 0;
  height: 18px;
  left: 70px;
  right: 0;
`

const TitleMaskRightTop = BaseMasker.extend`
  top: 36px;
  height: 18px;
  right: 0;
  width: 55px;
`

const TitleMaskRightBottom = BaseMasker.extend`
  top: 60px;
  height: 18px;
  right: 0;
  width: 210px;
`


const Placeholder = () => (
  <Animated>
    <InformationMask />
    <InformationSeparator />
    <TitleSeparator />
    <TitleSeparatorCenter />
    <TitleSeparatorMiddle />
    <TitleSeparatorBottom />
    <TitleMaskRightTop />
    <TitleMaskRightBottom />
  </Animated>
)

export default Placeholder
