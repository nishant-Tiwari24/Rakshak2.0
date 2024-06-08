
import { create } from 'ipfs-http-client';
import Express from 'express';
import cors from 'cors';
import fs from 'fs';
import bodyParser from 'body-parser';

//pinata

//gateway - https://amaranth-added-parrotfish-511.mypinata.cloud
import axios from 'axios';
import FormData from 'form-data';
const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmNjU0ZTNkNi03ZGY0LTQ0NzEtODJlMy05MjNjMDUxNzVmNDQiLCJlbWFpbCI6ImRhdmVkbWoxNzI1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIwOTk5OTE3NjlmMzNjYWRjNjFhMiIsInNjb3BlZEtleVNlY3JldCI6IjcwZjVmZjlkOWU2OGRhM2I3NjUyMWI5MzVlMzk3ZDk2YzUwOTU0OTgyZGU5YTQ5NTVkMTk0ZTRmOTg3ZDMyODYiLCJpYXQiOjE3MTcxNjY2NDV9.AnzcPJ3F2ImEnH2rMrXmSCHjo-E8HjrDx8rAhxrCxVw";

const PORT = 3000;
const app = Express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const corsOptions = {
    origin: "*",
};

app.use(Express.json());
app.use(cors(corsOptions));

const ipfsClient = create({
    host: "localhost",
    port: 5001,
    protocol: 'http',
});

// const ipfsClient = create({
//     host: "ipfs.io",
//     protocol: 'https',
// });

const addFileToIPFS = async (file) => {
    // try {
    //     const result = await ipfsClient.add(file);
    //     console.log(result);
    //     return result;
    // } catch (error) {
    //     console.error('Error uploading file to IPFS:', error);
    //     throw error;
    // }

    fs.writeFileSync('./fetched_image.jpg', file);
    console.log('Image file fetched from IPFS and saved as fetched_image.jpg');

    const formData = new FormData();
    const src = "./fetched_image.jpg";
    
    const f = fs.createReadStream(src)
    formData.append('file', f)
    
    const pinataMetadata = JSON.stringify({
      name: 'File name',
    });
    formData.append('pinataMetadata', pinataMetadata);
    
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', pinataOptions);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'Authorization': `Bearer ${JWT}`
        }
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
}

const getFile = async (hash) => {
    try {
        const chunks = [];
        for await (const chunk of ipfsClient.cat(hash)) {
            chunks.push(chunk);
        }
        return Buffer.concat(chunks);
    } catch (error) {
        console.error('Error fetching file from IPFS:', error);
        throw error;
    }
};

// QmdiApd69RefTwu8Bdb5UYrkGLRD8zHSn84Bay7ZsHuLwN
// QmRdXGSKqRXjPkNxDzHPqEe7fmYfzLKWKSimE3GnxQ3arx
// const exampleCID = "QmRdXGSKqRXjPkNxDzHPqEe7fmYfzLKWKSimE3GnxQ3arx";

// getFile(exampleCID).then(data => {
//     console.log(data);
//     // fs.writeFileSync('./fetched_image.jpg', data);
//     // console.log('Image file fetched from IPFS and saved as fetched_image.jpg');
//     const fileSignature = data.toString('hex', 0, 4); 
//     if (fileSignature === '89504e47') {
//         fs.writeFileSync('../assets/fetched_image.png', data);
//     }else if (fileSignature === 'ffd8ffe0') {
//         fs.writeFileSync('../client/src/assets/img_file.jpg', data);
//     }
//     else if (fileSignature === 'ffd8ffe0' || fileSignature === 'ffd8ffe1') {
//         fs.writeFileSync('../assets/fetched_image.jpeg', data);
//     } else {
//         console.log('File type: Unknown');
//     }
// }).catch(console.error);

// app.get('/img/:cid', async (req, res) => {
//     try {
//         const exampleCID = req.params.cid;
//         console.log(exampleCID);
//         getFile(exampleCID)
//             .then(data => {
//                 console.log(data);
//                 const fileSignature = data.toString('hex', 0, 4);
//                 if (fileSignature === '89504e47') {
//                     fs.writeFileSync('../client/src/assets/img_file.png', data);
//                 } else if (fileSignature === 'ffd8ffe0' || fileSignature === 'ffd8ffe1') {
//                     fs.writeFileSync('../client/src/assets/img_file.jpg', data);
//                 }
//                 else if (fileSignature === 'ffd8ffe0' || fileSignature === 'ffd8ffe1') {
//                             fs.writeFileSync('../client/src/assets/img_file.jpeg', data);
//                         } 
//                 else {
//                     console.log('File type: Unknown');
//                     res.status(400).json("File type is unknown.");
//                     return;
//                 }
//                 res.status(200).json("File added successfully.");
//             })
//             .catch(error => {
//                 console.error(error);
//                 res.status(400).json("Failed to fetch and save the file.");
//             });
//     } catch (error) {
//         console.error(error);
//     }
//     res.status(500).json("Internal server error.");
// });

app.get('/', async(req, res)=>{
    res.send("main page");
})

app.get('/img/:cid', async (req, res) => {
    try {
        const exampleCID = req.params.cid;
        console.log(exampleCID);

        try {
            const data = await getFile(exampleCID);
            console.log(data);
            const fileSignature = data.toString('hex', 0, 4);
            let filePath = '';

            if (fileSignature === '89504e47') {
                filePath = '../client/src/assets/img_file.png';
            } else if (fileSignature === 'ffd8ffe0' || fileSignature === 'ffd8ffe1') {
                filePath = '../client/src/assets/img_file.jpg';
            } else if (fileSignature === 'ffd8ffe0' || fileSignature === 'ffd8ffe1') {
                filePath = '../client/src/assets/img_file.jpeg';
            } else {
                console.log('File type: Unknown');
                res.status(400).json("File type is unknown.");
                return;
            }

            fs.writeFileSync(filePath, data);
            res.status(200).json("File added successfully.");
        } catch (error) {
            console.error(error);
            res.status(400).json("Failed to fetch and save the file.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal server error.");
    }
});


app.post('/share', async (req, res) => {
    try {
        console.log("/share");
        const base64Data = req.body.fileData;
        //console.log(base64Data);
        //console.log(req.body);
        const matches = base64Data.match(/^data:(.+);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
            throw new Error('Invalid base64 data format.');
        }
        const [, mimeType, base64EncodedData] = matches;
        const fileExtension = mimeType.split('/')[1];
        const fileName = `output.${fileExtension}`;

        const imageData = Buffer.from(base64Data.split(',')[1], 'base64');
        fs.writeFileSync(fileName, imageData);
	/*
        sdk.auth('pk_live_fe5b252a-ac8c-4882-a4b4-fdfb703af107');
        sdk.postNftStoreFile({filePath : 'output.jpeg'})
        .then(({ data }) => {
            console.log(data.ipfs_storage.ipfs_url);
            res.status(200).json({ message: 'Image saved successfully', cid: data.ipfs_storage.ipfs_url });
        })
        .catch(err => console.error(err));
	*/
        const result = await addFileToIPFS(imageData);
        console.log(result);
        return res.json(result);
        
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Error processing request');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
