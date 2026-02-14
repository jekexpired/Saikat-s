
export interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
  caption: string;
  timestamp: string;
  like_count: number;
  comments_count: number;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  isHidden?: boolean;
  isPinned?: boolean;
}

export interface UploadedPhoto {
  id: string;
  url: string;
  title: string;
  description: string;
  date: string;
  isHidden: boolean;
}

export interface ThemeSettings {
  accentColor: string;
  backgroundColor: string;
  surfaceColor: string;
  fontFamily: 'sans' | 'serif';
  galleryLayout: 'masonry' | 'grid';
  borderOpacity: number;
  heroHeight: 'full' | 'large';
}

export interface SiteConfig {
  name: string;
  tagline: string;
  bio: string;
  contactEmail: string;
  whatsapp: string;
  instagramHandle: string;
  profileImage: string;
  theme: ThemeSettings;
}

export interface AdminState {
  isAuthenticated: boolean;
  token: string | null;
}
