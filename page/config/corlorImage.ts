export default async function ColorImage(image: string): Promise<string> {
  return new Promise((result, rej) => {
    const img = new Image();
    img.onload = () => {
      const context = document.createElement("canvas").getContext("2d");
      if (context == null) {
        result("black");
        return;
      }
      context.drawImage(img, 0, 0);
      let e = 0;
      let e1 = 0;
      let e2 = 0;
      let e3 = 0;
      let a = 0;
      let t = 0;

      const { data } = context.getImageData(0, 0, img.width, img.height);

      for (let index = 0; index < data.length; index += 4) {
        let r = data[index];
        let g = data[index + 1];
        let b = data[index + 2];
        let totle = r + g + b;
        if (150 < totle && totle < 700) {
          e += r;
          e1 += g;
          e2 += b;
          a += data[index + 3];
          t += 1;
        }
      }

      result(
        `rgb(${Math.floor(e / t)}, 
        ${Math.floor(e1 / t)}, ${Math.floor(e2 / t)}, ${Math.floor(a / t)})`
      );
    };
    img.src = image;
    img.crossOrigin = "anonymous";
  });
}
