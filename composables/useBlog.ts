interface BlogPost {
  key: string;
  title: string;
  cover_image: {
    alt_tag: string;
    color: string;
    image: string;
  };
  description: string;
  slug: string;
}
