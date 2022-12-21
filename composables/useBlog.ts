export interface Image {
  url: string;
  alt_text: string;
  focal_point: string | undefined;
  name: string;
  title: string;
}

export interface BlogPost {
  key: string;
  title: string;
  cover_color: string;
  cover_image: Image;
  description: string;
  slug: string;
}

export interface BlogCategory {
  key: string;
  title: string;
  slug: string;
}

export interface BlogAuthor {
  key: string;
  first_name: string;
  last_name: string;
  cover_image: Image;
}
