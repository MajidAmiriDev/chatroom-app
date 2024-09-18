import { Request, Response } from 'express';
import Message from '../models/message';

export const getMessages = async (req: Request, res: Response) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (error) {
        if (error instanceof Error) { // بررسی نوع error
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

export const createMessage = async (req: Request, res: Response) => {
    try {
        const message = new Message(req.body);
        await message.save();
        res.status(201).json(message);
    } catch (error) {
        if (error instanceof Error) { // بررسی نوع error
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};