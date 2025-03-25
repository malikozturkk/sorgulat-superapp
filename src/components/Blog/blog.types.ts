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
  formats: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
}

export interface TravelArticle {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: ContentNode[];
  visaStatus: string;
  warnings: Warning[];
  keywords: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  description: string;
  mainPhoto: Image;
}

export interface TravelData {
  data: TravelArticle[];
}
