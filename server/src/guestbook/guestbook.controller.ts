import { Controller, Get, Post, Body } from '@nestjs/common';
import { GuestbookService } from './guestbook.service';

@Controller('guestbook')
export class GuestbookController {
    constructor(private readonly guestbookService: GuestbookService) { }

    @Get()
    async findAll() {
        return this.guestbookService.findAll();
    }

    @Post()
    async create(@Body() body: { name: string; message: string }) {
        return this.guestbookService.create(body.name, body.message);
    }
}
