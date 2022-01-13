import { Storage } from "@google-cloud/storage";

export class FileService {

    constructor(
        private config: { bucket: string },
        private storage: Storage,
    ) {}

    async upload(userId: string, file: Buffer, filename: string) {
        const gcBucket = this.storage.bucket(this.config.bucket);
        const fileRef = await gcBucket.file(`${userId}/segments/${filename}`);
        await fileRef.save(file, { resumable: false })
        let fileLink = await fileRef.getSignedUrl({ version: 'v2', action: 'read', expires: new Date(3000, 0, 1) });
        if (fileLink.length <= 0) {
            throw new Error("failed to retrieve url");
        }
        return filename;
    }

    async download(identifier: string) {
        const parent = "61ded6d3248bfc0030304e6d/segments";
        const storage = this.storage.bucket(this.config.bucket);
        const remoteFile = storage.file(`${parent}/${identifier}`);
        return remoteFile.createReadStream();
    }
}