import React, { useState, useEffect } from "react";
import Button from "./Button";
import Section from "./Section";
import { Dragendrop } from "./Dragendrop";

export const smb = () => {
  const [fileData, setFileData] = useState();
  const [data, setData] = useState(null);
  const [receiverAddress, setReceiverAddress] = useState("");
  const [method, setMethod] = useState("doScramble");
  const [imgLoaded, setImgLoaded] = useState(false);
  const [ctx, setCtx] = useState(null);
  const [canv, setCanv] = useState(null);

  const promp = (msg, err) => {
    const seed = prompt(`${err ? msg + err : msg}`);
    const toNumber = (str) => {
      return (
        str
          .split("")
          .map((c) => c.charCodeAt(0))
          .join("") % 0xffffff
      );
    };

    if (!seed) {
      return promp(msg, "\nPassword is required!");
    } else if (seed.length < 6) {
      return promp(msg, "\nPassword must be at least 6 characters long!");
    } else if (Number.isNaN(Number(seed))) {
      return toNumber(seed);
    }

    return seed | 0;
  };

  const canvToBlob = () => {
    const bin = atob(canv.toDataURL().split(",")[1]);
    const arr = new Uint8Array(bin.length).map((v, i) => bin.charCodeAt(i));

    return new Blob([arr], {
      type: "image/png",
    });
  };

  const doDownload = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(canvToBlob());
    a.download = "canvas.png";
    a.click();
    URL.revokeObjectURL(a.href);
    a.removeAttribute("href");
  };

  const methods = {
    doScramble: (what) => {
      const seed = promp("Password for encoding:");
      console.log("scramble image", seed);
      for (let i = 0; i < what.length; i++) {
        // const pos = (seed % (i + 1) + i) % what.length;
        const pos = (((i * i) % seed) + seed) % what.length;
        const temp = what[i];

        what[i] = what[pos];
        what[pos] = temp;
      }
    },
    doUnscramble: (what) => {
      const seed = promp("Password for decoding:");
      console.log("unscramble image", seed);
      for (let i = what.length - 1; i >= 0; i--) {
        // const pos = (seed % (i + 1) + i) % what.length;
        const pos = (((i * i) % seed) + seed) % what.length;
        const temp = what[i];

        what[i] = what[pos];
        what[pos] = temp;
      }
    },
  };

  useEffect(() => {
    const canvas = document.querySelector(".canv");
    const context = canvas.getContext("2d");
    setCanv(canvas);
    setCtx(context);
  }, []);

  const onImageLoad = (img) => {
    setImgLoaded(true);
    ctx.clearRect(0, 0, canv.width, canv.height);
    canv.width = img.width;
    canv.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imgData = ctx.getImageData(0, 0, canv.width, canv.height);
    methods[method](imgData.data);
    ctx.putImageData(imgData, 0, 0);
  };

  const readFile = (file) => {
    console.log(file.name);
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const img = new Image();
      img.onload = () => onImageLoad(img);
      img.src = e.target.result;
    };
    fileReader.readAsDataURL(file);
  };

  const updateMethod = () => {
    setMethod(method === "doScramble" ? "doUnscramble" : "doScramble");
    if (imgLoaded) {
      const imgData = ctx.getImageData(0, 0, canv.width, canv.height);
      methods[method](imgData.data);
      ctx.putImageData(imgData, 0, 0);
    }
  };

  const onFileChange = (e) => {
    const { files } = e.target;
    if (files && files.length) {
      readFile(files[0]);
    }
  };

  const checkUser = () => {};

  const handleFileData = () => {};

  const upload = () => {};

  return (
    <div className="w-1/2 h-[45rem] mb-5 bg-stone-900 p-2 rounded-md">
      <div className="flex gap-2">
        <input
          type="text"
          value={receiverAddress}
          onChange={(e) => setReceiverAddress(e.target.value)}
          className="w-full p-3 font-code rounded-md"
          placeholder="Receiver Id"
        />
        <Button onClick={checkUser}>Check</Button>
      </div>
      <Section
        className="w-full h-[580px] -mx-2 my-3"
        crosses
        customPaddings
        id="data"
      >
        <div className="container">
          <Dragendrop onFileData={handleFileData} />
        </div>
      </Section>
      <div className="options">
        <button className="download" onClick={doDownload}>
          Download
        </button>
        <input
          type="file"
          className="file"
          name="image"
          accept="image/*"
          onChange={onFileChange}
        />
        <label htmlFor="action">
          <input
            type="checkbox"
            id="action"
            name="action"
            checked={method === "doScramble"}
            onChange={updateMethod}
          />
          Scramble / Unscramble
        </label>
      </div>
      <canvas className="canv"></canvas>
      <div className="w-full">
        <Button onClick={upload} className="w-full content-end flex">
          Send
        </Button>
      </div>
    </div>
  );
};
