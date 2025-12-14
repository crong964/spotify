export default function ImagePath(pathfile: string) {
  if (pathfile.indexOf("http") >= 0) {
    return pathfile;
  }
  return `https://res.cloudinary.com/dkd1k6e2r/image/upload/${pathfile}`;
}
