import {
  Book,
  Briefcase,
  Cpu,
  Gallery,
  Home,
  LoginCurve,
  Notepad2,
  People,
  Profile2User,
  TrendUp,
  VideoCircle
} from 'iconsax-react';
import {
  FaFacebook,
  FaGoogle,
  FaInstagram,
  FaPinterest,
  FaTiktok,
  FaTwitter,
  FaViber,
  FaYoutube
} from 'react-icons/fa';

export type Menu = {
  id?: string | number;
  url: string;
  title: string;
  icon?: 'string';
  child_items?: Menu[];
};

export const menuIcons = {
  login: LoginCurve,
  home: Home,
  people: People,
  notepad: Notepad2,
  trend_up: TrendUp,
  video_circle: VideoCircle,
  profile_user: Profile2User,
  cpu: Cpu,
  gallery: Gallery,
  briefcase: Briefcase,
  book: Book,
  facebook: FaFacebook,
  twitter: FaTwitter,
  youtube: FaYoutube,
  instagram: FaInstagram,
  tiktok: FaTiktok,
  pinterest: FaPinterest,
  google_news: FaGoogle,
  viber: FaViber
};
