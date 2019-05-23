import { Injectable } from '@nestjs/common';
import { Item } from './inerfaces/item.interface';
import { ItemDto } from './dto/item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ItemsService {
    constructor(@InjectModel('Item') private readonly ItemModel: Model<Item>) { }

    async findAll(): Promise<Item[]> {
        return await this.ItemModel.find();
    }

    async findOne(id: string): Promise<Item> {
        return await this.ItemModel.findById({_id: id});
    }

    async createOne(item: ItemDto): Promise<Item> {
        const newItem = new this.ItemModel(item);
        return await newItem.save();
    }

    async updateOne(id: string, item: ItemDto): Promise <Item> {
        return await this.ItemModel.findByIdAndUpdate({_id: id}, {$set: item});
    }

    async deletOne(id: string): Promise <Item> {
        return await this.ItemModel.findByIdAndRemove({_id: id});
    }
}
