interface BlogPost {
  key: string;
  title: string;
  cover_color: string;
  cover_image: Image;
  description: string;
  slug: string;
}

interface BlogCategory {
  key: string;
  title: string;
  slug: string;
}

interface BlogAuthor {
  key: string;
  first_name: string;
  last_name: string;
  cover_image: Image;
}
