import styled from 'styled-components';
import { ReactComponent as DarkSVGIcon } from '../../assets/dark.svg';
import { ReactComponent as LightSVGIcon } from '../../assets/light.svg';

const SVGIconButton = styled.div`
  cursor: pointer;
`;


export const DarkIcon = ({ title, onClick }) => (
  <SVGIconButton title={title} onClick={onClick}>
    <DarkSVGIcon />
  </SVGIconButton>
);
export const LightIcon = ({ title, onClick }) => (
  <SVGIconButton title={title} onClick={onClick}>
    <LightSVGIcon />
  </SVGIconButton>
);