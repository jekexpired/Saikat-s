
import { InstagramPost, SiteConfig } from './types';

export const INITIAL_CONFIG: SiteConfig = {
  name: "Jek Expired",
  tagline: "The Beauty of Imperfection. Captured on Film.",
  bio: "Exploring the world through the lens of expired film and vintage glass. My work is a study in grain, light leaks, and the nostalgic textures of analog photography.",
  contactEmail: "jek@expired-studios.com",
  whatsapp: "+628123456789",
  instagramHandle: "@jek.expired",
  profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800",
  theme: {
    accentColor: "#ffffff",
    backgroundColor: "#0a0a0a",
    surfaceColor: "#171717",
    fontFamily: 'serif',
    galleryLayout: 'masonry',
    borderOpacity: 0.1,
    heroHeight: 'full'
  }
};

export const MOCK_POSTS: InstagramPost[] = [
  {
    id: "jek_1",
    media_url: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&q=80&w=1200",
    permalink: "https://www.instagram.com/p/C-jek1",
    caption: "Kodak Portra 400. The grain feels alive today. #35mm #expiredfilm",
    timestamp: "2024-05-10T14:00:00Z",
    like_count: 3420,
    comments_count: 156,
    media_type: 'IMAGE',
    isPinned: true
  },
  {
    id: "jek_2",
    media_url: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&q=80&w=1200",
    permalink: "https://www.instagram.com/p/C-jek2",
    caption: "Shadow play in the old town. Fuji Pro 400H. #analog #filmisnotdead",
    timestamp: "2024-05-08T09:30:00Z",
    like_count: 2180,
    comments_count: 84,
    media_type: 'IMAGE',
  },
  {
    id: "jek_3",
    media_url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1200",
    permalink: "https://www.instagram.com/p/C-jek3",
    caption: "Leica M6 | Summicron 35mm. Light leaks or memories escaping? #leica #filmwave",
    timestamp: "2024-05-05T18:15:00Z",
    like_count: 5600,
    comments_count: 230,
    media_type: 'IMAGE',
    isPinned: true
  },
  {
    id: "jek_4",
    media_url: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?auto=format&fit=crop&q=80&w=1200",
    permalink: "https://www.instagram.com/p/C-jek4",
    caption: "The stillness of the morning. Ektar 100 colors. #streetphotography #35mmfilm",
    timestamp: "2024-05-01T07:00:00Z",
    like_count: 1890,
    comments_count: 42,
    media_type: 'IMAGE',
  },
  {
    id: "jek_5",
    media_url: "https://images.unsplash.com/photo-1502139214982-d0ad755818d8?auto=format&fit=crop&q=80&w=1200",
    permalink: "https://www.instagram.com/p/C-jek5",
    caption: "Double exposure experiments. #doubleexposure #filmphotography",
    timestamp: "2024-04-28T21:00:00Z",
    like_count: 4200,
    comments_count: 112,
    media_type: 'IMAGE',
  },
  {
    id: "jek_6",
    media_url: "https://images.unsplash.com/photo-1520390138845-fd2d229dd553?auto=format&fit=crop&q=80&w=1200",
    permalink: "https://www.instagram.com/p/C-jek6",
    caption: "Waiting for the train. Ilford HP5+ | Grain is good. #blackandwhitephotography",
    timestamp: "2024-04-25T11:45:00Z",
    like_count: 2750,
    comments_count: 67,
    media_type: 'IMAGE',
  }
];
