declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";
declare module '*.css';
declare module 'axios';
declare module "js-cookie";
declare module 'react-file-base64' {
  import * as React from 'react';

  type FileBase64Props = {
    multiple?: boolean;
    onDone: (files: FileList) => void;
  };

  class FileBase64 extends React.Component<FileBase64Props> {}

  export default FileBase64;
}