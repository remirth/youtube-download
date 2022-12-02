import type {ReadStream, WriteStream} from 'fs';
import {createReadStream, createWriteStream, existsSync, mkdirSync} from 'fs';
import type {NextApiRequest, NextApiResponse} from 'next';
import {join} from 'path';
import ytdl from 'ytdl-core';
import {DownloadConfig} from '../../constants';

export const handler = (
  {method, query}: NextApiRequest,
  res: NextApiResponse
) => {
  if (!['GET', 'POST'].includes(method ?? '')) {
    res.statusMessage = 'Method not allowed';
    res.status(405).end();
    return;
  }

  const {videoId, format} = query;
  const formatId: keyof typeof DownloadConfig =
    format === 'video' ? 'video' : 'audio';

  const id = Array.isArray(videoId) ? videoId[0] : videoId;

  if (!id) {
    res.statusMessage = 'Video ID is required';
    res.status(400).end();
    return;
  }

  const path = getDir(id, DownloadConfig[formatId].FileExtension, formatId);

  if (method === 'POST') {
    return writeFile({id, formatId, path}, res);
  }

  return readFile({id, formatId, path}, res);
};

type Props = {
  id: string;
  formatId: keyof typeof DownloadConfig;
  path: Path;
};

type Path = {
  dir: string;
  file: string;
  name: string;
};

const getDir = (id: string, FileExtension: string, format: string): Path => {
  const dir = join(process.cwd(), 'public', format);
  const name = `${id}${FileExtension}`;

  return {
    dir,
    name,
    file: join(dir, name),
  };
};

const writeFile = ({path, id, formatId}: Props, res: NextApiResponse) => {
  if (existsSync(path.file)) {
    res.status(200).end();
    return;
  }

  if (!existsSync(path.dir)) {
    try {
      mkdirSync(path.dir, {recursive: true});
    } catch {
      res.statusMessage = 'Failed to create directory';
      res.status(500).end();
      return;
    }
  }

  let writeStream: WriteStream;
  try {
    writeStream = createWriteStream(path.file, {flags: 'w'});
  } catch (error) {
    res.statusMessage = 'Internal Server Error';
    res.status(500).end();
    return;
  }

  ytdl(id, {...DownloadConfig[formatId]})
    .pipe(writeStream)
    .on('finish', () => {
      res.statusMessage = 'Download completed';
      res.status(200).end();
    })
    .on('error', (err) => {
      res.statusMessage = err.message;
      res.status(500).end();
    })
    .on('progress', (_, downloaded, total) => {
      const percent = downloaded / total;
      res.write(`data: ${percent}\n\n`);
    });
};

const readFile = ({path}: Props, res: NextApiResponse) => {
  res.setHeader('Content-Disposition', `attachment; filename="${path.name}"`);
  let readStream: ReadStream;
  try {
    readStream = createReadStream(path.file);
  } catch {
    res.statusMessage = 'Video not found';
    res.status(400).end();
    return;
  }

  readStream
    .on('error', (err) => {
      res.statusMessage = err.message;
      res.status(500).end();
    })
    .on('finish', () => {
      res.status(200).end();
    })
    .pipe(res);
};

export default handler;
