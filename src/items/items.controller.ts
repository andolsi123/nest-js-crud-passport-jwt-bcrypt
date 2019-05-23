import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ItemDto } from './dto/item.dto';
import { Item } from './inerfaces/item.interface';
import { ItemsService } from './items.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemService: ItemsService) { }

    @Get()
    @UseGuards(AuthGuard('bearer'))
    async findAll(): Promise <Item[]> {
        return this.itemService.findAll();
    }

    @Get('getOne/:id')
    @UseGuards(AuthGuard('bearer'))
    async findOne(@Param('id') id: any): Promise<Item> {
        return this.itemService.findOne(id);
    }

    @Post('createItem')
    @UseGuards(AuthGuard('bearer'))
    createOne(@Body() itemDto: ItemDto): Promise <Item> {
        return this.itemService.createOne(itemDto);
    }

    @Post('deleteItem/:id')
    @UseGuards(AuthGuard('bearer'))
    deleteOne(@Param() params: any) {
        return this.itemService.deletOne(params.id);
    }

    @Post('updateOne/:id')
    @UseGuards(AuthGuard('bearer'))
    updateOne(@Param() params: any, @Body() item: ItemDto): Promise <Item> {
        return this.itemService.updateOne(params.id, item);
    }
}
