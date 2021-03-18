import { IsNotEmpty } from "class-validator";

export class CreateShopDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    latitude: string;

    @IsNotEmpty()
    longitude: string;

    @IsNotEmpty()
    location: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    county: string;
}