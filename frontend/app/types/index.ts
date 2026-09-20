export type Link = {
  label: string;
  href: string;
  external?: boolean;
};

export type Social = {
  icon: string;
} & Link;

export type Image = {
  src: string;
  title: string;
  alt?: string;
  width?: string;
  height?: string;
};
