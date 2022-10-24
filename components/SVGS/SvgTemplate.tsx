import Svg, { SvgProps } from "react-native-svg";

interface Props {
  children: React.ReactNode;
  svgProps?: SvgProps;
}

const SvgTemplate = ({ children, svgProps }: Props) => (
  <Svg
    viewBox="0 0 512 512"
    style={{
      height: 48,
      width: 48,
    }}
    {...svgProps}
  >
    {children}
  </Svg>
);

export default SvgTemplate;
