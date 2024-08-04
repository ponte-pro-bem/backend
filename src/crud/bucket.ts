import type { PutObjectCommandOutput } from "@aws-sdk/client-s3";
import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand
  } from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { AWS_ACCESS_KEY_ID, AWS_IMAGE_BUCKET, AWS_SECRET_ACCESS_KEY } from "../../libs/constants"

export interface UploadDeviceImageBufferOutput {
    cmd: PutObjectCommand & { input: { Bucket: string; Key: string } };
    output: PutObjectCommandOutput;
}


export const s3 = new S3Client({
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
    }
})

export async function uploadImageBuffer(
    key: string,
    imageBuffer: Buffer,
    bucketName: string = AWS_IMAGE_BUCKET
): Promise<UploadDeviceImageBufferOutput> {
    const putObjCmd = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: imageBuffer,
    });

    const putObjOut = await s3.send(putObjCmd);

    return {
        cmd: putObjCmd as UploadDeviceImageBufferOutput["cmd"],
        output: putObjOut,
    };
}

export async function getObjectUrl(
    key: string,
    bucketName: string = AWS_IMAGE_BUCKET
): Promise<string> {
    const url = await getSignedUrl(
        s3,
        new GetObjectCommand({
            Bucket: bucketName,
            Key: key,
        })
    );

    if (url === null || url === undefined) {
        throw new Error("Failed to retrieve signed url.");
    }
    return url;
}