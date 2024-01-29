interface DeviceSpecificHeightType {
  mobile: string;
  tablet: string;
  desktop: string;
}

interface Image {
  url: string;
  alt_text: string;
  focal_point: string | undefined;
  name: string;
  title: string;
}

interface Background {
  image: Image;
  color: string;
}

interface MediaArguments {
  maxHeight?: number | undefined;
  maxWidth?: number | undefined;
  skipAutoFormat?: boolean | undefined;
  focalPoint?: string | undefined;
}
