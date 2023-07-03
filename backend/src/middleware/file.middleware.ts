import { Request, Router } from "express";
import multer, { FileFilterCallback, memoryStorage } from "multer";
import stream from "stream";
import { google } from "googleapis";
import * as path from "path";

const uploadRouter = Router();

const KEYFILEPATH = path.join(__dirname, "credentials.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

export const uploadFile = async (fileObject: any) => {
  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObject.buffer);
  const { data } = await google.drive({ version: "v3", auth }).files.create({
    media: {
      mimeType: fileObject.mimeType,
      body: bufferStream,
    },
    requestBody: {
      name: fileObject.originalname,
      parents: ["1azla2qiXwuLdJNj4XWFU9ebAuk48y1wF"],
    },
    fields: "id,name,webViewLink",
  });
  return data.webViewLink;
};

const maxSizeImg = 2 * 1024 * 1024;
const maxSizeVideo = 5 * 1024 * 1024;

const storage = memoryStorage();

function changeNameImage(idParameter: Request["params"]) {
  let nameImage = "";
  if (idParameter.idUser) {
    nameImage = "userProfilePhoto";
  }
  if (idParameter.idCategory) {
    nameImage = "categoryPhoto";
  }
  return nameImage;
}

export const upload = multer({
  storage: storage,
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ): void => {
    const nameImage = changeNameImage(req.params);
    let size = +req.rawHeaders[5];
    const ext = file?.originalname.split(".").pop();
    const fileNameRandom = `${nameImage}-${Date.now()}.${ext}`;
    Object.keys(file).map((item) => {
      if (item === "originalname") file["originalname"] = fileNameRandom;
    });
    if (
      (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") &&
      size <= maxSizeImg
    ) {
      cb(null, true);
    } else if (
      (file.mimetype === "video/mp4" ||
        file.mimetype === "video/mpeg" ||
        file.mimetype === "video/mkv") &&
      size <= maxSizeVideo
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
}).single("file");

// export const getImageUrl = async (fileObject: any) => {
//   const drive = await google.drive({ version: 'v3', auth });
//   try {
//     // Realizar la solicitud para obtener la metainformación del archivo
//     const response = await drive.files.get({
//       fileId: fileId,
//       fields: 'webViewLink',
//     });

//     const webViewLink = response.data.webViewLink;
//     console.log('URL de la imagen:', webViewLink);
//   } catch (error) {
//     console.error('Error al obtener la URL de la imagen:', error);
//   }
// }
