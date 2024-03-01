export interface SearchDataType {
  alt_description: string;
  blur_hash: string;
  breadcrumbs: {
    /* type of each object in the array */
  }[];
  color: string; // Hexadecimal color
  created_at: string; // Timestamp
  current_user_collections: any[]; // Array with unknown type
  description: string | null | undefined; // Nullable string
  height: number;
  id: string;
  liked_by_user: boolean;
  likes: number;
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  promoted_at: string; // Timestamp
  slug: string;
  sponsorship: null; // Null
  tags: {
    /* type of each object in the array */
  }[];
  topic_submissions: {}; // Empty object
  updated_at: string; // Timestamp
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    /* Additional possible keys */
  };
  user: {
    id: string;
    updated_at: string; // Timestamp
    username: string;
    name: string;
    first_name: string;
    /* Possibly more properties */
  };
  width: number;
}
