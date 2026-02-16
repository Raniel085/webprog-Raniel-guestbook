import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class GuestbookService {
    constructor(private readonly supabaseService: SupabaseService) { }

    async findAll() {
        const { data, error } = await this.supabaseService
            .getClient()
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }

    async create(name: string, message: string) {
        const { data, error } = await this.supabaseService
            .getClient()
            .from('posts')
            .insert([{ name, message }])
            .select();

        if (error) {
            throw new Error(error.message);
        }

        return data[0];
    }
}
