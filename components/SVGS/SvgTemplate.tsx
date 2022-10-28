import Svg, { SvgProps, Path } from "react-native-svg";
import { colors } from "../../constants/colors";

interface Props {
  path: string;
  color: keyof typeof colors.cardsColors;
  svgProps?: SvgProps;
}

const SvgTemplate = ({ svgProps, color, path }: Props) => (
  <Svg
    viewBox="0 0 512 512"
    style={{
      height: 48,
      width: 48,
    }}
    {...svgProps}
  >
    <Path d={path} fill={colors.cardsColors[color]} />
  </Svg>
);

export default SvgTemplate;
