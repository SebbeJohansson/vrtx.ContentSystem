export interface DeviceSpecificHeightType {
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface Image {
  url: string;
  alt_text: string;
  focal_point: string | undefined;
  name: string;
  title: string;
}

export interface Background {
  image: Image;
  color: string;
}

export interface MediaArguments {
  maxHeight?: number | undefined;
  maxWidth?: number | undefined;
  skipAutoFormat?: boolean | undefined;
  focalPoint?: string | undefined;
}
