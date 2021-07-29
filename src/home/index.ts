import { Request, Response } from 'express';
import path from 'path';

export const Init = (req: Request, res: Response) => {
	res.status(200).sendFile(path.join(__dirname, '../../readme.md'));
}