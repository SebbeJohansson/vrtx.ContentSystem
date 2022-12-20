interface BlogPost {
  key: string;
  title: string;
  cover_color: string;
  cover_image: {
    url: string;
    alt_text: string;
    focal_point: string | undefined;
    name: string,
    title: string,
  };
  description: string;
  slug: string;
}
