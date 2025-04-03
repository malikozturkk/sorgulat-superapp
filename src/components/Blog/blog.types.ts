export interface RichTextItem {
  type: string
  children?: RichTextItem[]
  text?: string
  url?: string
  format?: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
  level?: number
  image?: {
    url: string
    alternativeText?: string
  }
}

export interface Props {
  content: RichTextItem[]
}





interface TextNode {
  type: "text";
  text: string;
  bold?: boolean;
}

interface ContentNode {
  type: "paragraph" | "heading" | "list" | "list-item";
  children: TextNode[];
  level?: number;
  format?: "unordered" | "ordered";
}

interface Warning {
  title: string;
  description: string;
}

interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

interface Image {
  id: number;
  documentId: string;
  name: string;
  width: number;
  height: number;
  url: string;
  formats: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
}

export type VisaType = "visa-free" | "visa" | "visa-on-arrival" | "eta";

export interface TravelArticle {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: ContentNode[];
  visaStatus: VisaType
  warnings: Warning[];
  keywords: string[];
  createdAt: string;
  author: {
    id: number;
    documentId: string;
    name: string;
    bio: ContentNode[];
    photo: {
      url: string;
    }
    socialLinks: string[]
    createdAt: string;
    updatedAt: string | null;
    publishedAt: string | null;
    locale: 'tr' | 'en' | null;
  }
  updatedAt: string;
  publishedAt: string;
  locale: string;
  description: string;
  photos?: any;
  mainPhoto: Image;
}

export interface TravelData {
  data: TravelArticle[];
}


export type SortTypes = "createdAt:desc" | "createdAt:asc" | "title:asc" | "title:desc";

export type SearchParams = { 
    searchParams: Promise<{ page?: string, sort?: SortTypes }> 
}