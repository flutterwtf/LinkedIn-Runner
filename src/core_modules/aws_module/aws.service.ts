import { S3 } from '@aws-sdk/client-s3';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ERROR_MESSAGE } from './errors/error-message';
import { IFileMetadata } from './interfaces/file-meta-data.interface';

@Injectable()
export class AwsService {
  private readonly cdnEndpoint = 'https://ams3.digitaloceanspaces.com';
  private readonly bucketName = 'flutterwtf';
  private readonly rootDirectory = 'Screenshots';
  private readonly s3: S3;

  constructor(private readonly configService: ConfigService) {
    const accessKeyId = this.configService.getOrThrow<string>('aws.accessKey');
    const secretAccessKey = this.configService.getOrThrow<string>('aws.secretKey');
    this.s3 = new S3({
      forcePathStyle: false,
      endpoint: `${this.cdnEndpoint}/`,
      region: 'us-east-1',
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  public async uploadScreenshot(file: IFileMetadata): Promise<string> {
    const locationKey = `${this.rootDirectory}/${file.workspaceName ?? 'other'}/${file.name}`;
    const response = await this.s3.putObject({
      Bucket: this.bucketName,
      Key: locationKey,
      ContentType: 'image/png',
      Body: file.data,
      ACL: 'public-read',
    });

    if (response.$metadata.httpStatusCode !== HttpStatus.OK) {
      throw new Error(ERROR_MESSAGE.backUpFileError);
    }

    return `${this.cdnEndpoint}/${this.bucketName}/${locationKey}`;
  }

  public async fetchFile(path: string): Promise<Buffer> {
    const file = await this.s3.getObject({
      Bucket: this.bucketName,
      Key: path,
    });

    return Buffer.from((await file.Body?.transformToByteArray()) ?? '');
  }
}
