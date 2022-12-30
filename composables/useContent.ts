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

export const useMediaHandler = () => {
  function toImageUrl(url: string, {
    maxHeight = undefined,
    maxWidth = undefined,
    skipAutoFormat = false,
    focalPoint = undefined,
  }: MediaArguments) {
    if (url.startsWith('https://a.storyblok.com')) {
      return formatStoryblokImage(url);
    }

    return formatNativeImage(url);

    function formatStoryblokImage(image: string) {
      const qs = [];

      if (!skipAutoFormat) {
        qs.push('m');
      }

      if (maxWidth || maxHeight) {
        qs.push(`${maxWidth || 0}x${maxHeight || 0}`);
      }

      if (focalPoint) {
        qs.push(`filters:focal(${focalPoint})`);
      }

      let imageUrl = image;

      if (qs.length) {
        imageUrl += `/${qs.join('/')}/`;
      }
      return imageUrl;
    }

    function formatNativeImage(slug: string) {
      const qs = [];

      if (!skipAutoFormat) {
        qs.push('auto=format');
      }

      if (maxHeight) {
        qs.push(`h=${maxHeight}`);
      }
      if (maxWidth) {
        qs.push(`w=${maxWidth}`);
      }

      let imageUrl = `https://sebbejohansson.imgix.net/${slug}`;

      if (qs.length) {
        imageUrl += `?${qs.join('&')}`;
      }
      return imageUrl;
    }
  }

  function formatRichText(richText: string) {
    if (!richText) { return null; }
    const formattedText = richText;
    if (typeof formattedText.replace !== 'function') { return null; }
    const regex = /(?<start><img)(?<middle>.*?)(?<end>\/>)/ig;
    const newText = formattedText.replace(regex, (match, p1, p2, p3, offset, string, namedGroups) => `${namedGroups.start} loading="lazy" ${namedGroups.middle} ${namedGroups.end}`);
    return newText;
  }

  return {
    toImageUrl,
    formatRichText,
  };
};
