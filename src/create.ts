import fs from "fs";
import path from 'path';
import extract from 'extract-zip';
import fse from 'fs-extra';

export async function downloadAndExtractRepo(folder: string) {
  const url = 'https://github.com/Nitlix/NitlixNextTemplate/archive/refs/heads/main.zip';
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const zipPath = path.join(folder, 'repo.zip');
  const outputPath = path.resolve(folder); // Convert the folder path to an absolute path

  if (!fs.existsSync(outputPath)) {
    await fs.mkdirSync(outputPath, { recursive: true });
  }

  await fs.writeFileSync(zipPath, buffer);

  await extract(zipPath, { dir: outputPath });

  await fs.unlinkSync(zipPath);

  const sourceFolder = path.join(outputPath, 'NitlixNextTemplate-main');
  const files = await fse.readdir(sourceFolder);
  for (const file of files) {
    const sourceFilePath = path.join(sourceFolder, file);
    const destinationFilePath = path.join(outputPath, file);
    await fse.move(sourceFilePath, destinationFilePath, { overwrite: true });
  }

  await fse.remove(sourceFolder);
  await fse.remove(path.join(outputPath, '.git'));
}